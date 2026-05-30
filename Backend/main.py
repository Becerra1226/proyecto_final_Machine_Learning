from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from pycaret.classification import load_model, predict_model
import os

app = FastAPI(title="API de Predicción de ACV - Ensemble Híbrido")

# Permitir que el Frontend (React) se conecte en el futuro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definir las rutas locales dentro de la estructura del backend
SCALER_PATH = os.path.join("app", "models", "scaler.pkl")
# ACTUALIZADO: Nuevo modelo con SMOTE
MODEL_PATH = os.path.join("app", "models", "final_logistic_regression_smote") 

if not os.path.exists(SCALER_PATH):
    raise FileNotFoundError(f"No se encontró el escalador en {SCALER_PATH}. Verifica que el archivo esté en la carpeta app/models/")

# Cargar el Scaler y el Modelo en memoria al iniciar el servidor
print("Cargando componentes de Machine Learning...")
scaler = joblib.load(SCALER_PATH)
model = load_model(MODEL_PATH)
print("¡Componentes cargados con éxito!")

# Definir el formato del JSON que va a recibir la API
class PatientInput(BaseModel):
    gender: str
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    work_type: str
    smoking_status: str

FEATURES_ORDER = [
    'gender', 'age', 'hypertension', 'heart_disease', 'ever_married', 
    'Residence_type', 'avg_glucose_level', 'bmi',
    'work_type_Never_worked', 'work_type_Private', 'work_type_Self-employed', 'work_type_children',
    'smoking_status_formerly smoked', 'smoking_status_never smoked', 'smoking_status_smokes'
]

def map_risk_final(p):
    if p < 0.15: return "RIESGO BAJO"
    elif p < 0.30: return "RIESGO MODERADO"
    elif p < 0.60: return "RIESGO ELEVADO"
    elif p < 0.80: return "RIESGO ALTO"
    else: return "RIESGO MUY ALTO"

@app.post("/predict")
def predict_stroke(patient: PatientInput):
    try:
        data = patient.dict()
        
        # ==========================================
        # 1. PREPARACIÓN DE DATOS PARA ML
        # ==========================================
        processed = {
            "gender": 1 if data["gender"] == "Male" else 0,
            "age": data["age"],
            "hypertension": data["hypertension"],
            "heart_disease": data["heart_disease"],
            "ever_married": 1 if data["ever_married"] == "Yes" else 0,
            "Residence_type": 1 if data["Residence_type"] == "Urban" else 0,
            "avg_glucose_level": data["avg_glucose_level"],
            "bmi": data["bmi"]
        }
        
        for col in FEATURES_ORDER:
            if col not in processed:
                processed[col] = 0
                
        work_col = f"work_type_{data['work_type']}"
        smoke_col = f"smoking_status_{data['smoking_status']}"
        
        if work_col in processed: processed[work_col] = 1
        if smoke_col in processed: processed[smoke_col] = 1
            
        df_input = pd.DataFrame([processed])[FEATURES_ORDER]
        df_scaled = pd.DataFrame(scaler.transform(df_input), columns=FEATURES_ORDER)
        
        # ==========================================
        # 2. PREDICCIÓN MODELO ML
        # ==========================================
        prediction_df = predict_model(model, data=df_scaled)
        prediction_label = int(prediction_df['prediction_label'].iloc[0])
        prediction_score = float(prediction_df['prediction_score'].iloc[0])
        
        # Corregir la probabilidad de la clase 1 (ACV)
        if prediction_label == 1:
            pos_prob = prediction_score
        else:
            pos_prob = 1.0 - prediction_score

        # ==========================================
        # 3. EVALUACIÓN CLÍNICA (REGLAS)
        # ==========================================
        clinical_score = 0.0
        
        if data["hypertension"] == 1: clinical_score += 2.0
        if data["heart_disease"] == 1: clinical_score += 2.0
        
        glucose = data["avg_glucose_level"]
        if glucose > 200: clinical_score += 1.5
        elif glucose > 126: clinical_score += 1.0
            
        bmi = data["bmi"]
        if bmi >= 30: clinical_score += 1.0
        elif bmi >= 25: clinical_score += 0.5
            
        smoke_status = data["smoking_status"]
        if smoke_status == "smokes": clinical_score += 1.0
        elif smoke_status == "formerly smoked": clinical_score += 0.3
            
        age = data["age"]
        if age > 60: clinical_score += 1.0
        elif age > 50: clinical_score += 0.5

        if clinical_score >= 4.0:
            clinical_category, clinical_equiv_prob = "RIESGO MUY ALTO", 0.8
        elif clinical_score >= 2.5:
            clinical_category, clinical_equiv_prob = "RIESGO ALTO", 0.65
        elif clinical_score >= 1.5:
            clinical_category, clinical_equiv_prob = "RIESGO MODERADO", 0.4
        else:
            clinical_category, clinical_equiv_prob = "RIESGO BAJO", 0.15

        # ==========================================
        # 4. ENSEMBLE HÍBRIDO
        # ==========================================
        if clinical_score >= 4.0:
            weight_ml, weight_clinical = 0.15, 0.85
        elif clinical_score >= 2.5:
            weight_ml, weight_clinical = 0.35, 0.65
        else:
            weight_ml, weight_clinical = 0.60, 0.40

        hybrid_prob = (weight_ml * pos_prob) + (weight_clinical * clinical_equiv_prob)
        final_category = map_risk_final(hybrid_prob)

        # Determinar recomendaciones
        if hybrid_prob >= 0.60:
            recommendation = "🚨 RIESGO ELEVADO/ALTO - Se recomienda evaluación clínica urgente"
        elif hybrid_prob >= 0.30:
            recommendation = "⚠️ RIESGO MODERADO - Se recomienda seguimiento clínico"
        else:
            recommendation = "✓ RIESGO BAJO - Continuar con monitoreo rutinario"

        # ==========================================
        # 5. RESPUESTA DE LA API
        # ==========================================
        return {
            "ml_model": {
                "prediction_label": prediction_label,
                "probability_stroke": round(pos_prob, 4)
            },
            "clinical_rules": {
                "score": clinical_score,
                "category": clinical_category,
                "probability_equivalent": clinical_equiv_prob
            },
            "hybrid_ensemble": {
                "final_probability": round(hybrid_prob, 4),
                "final_category": final_category,
                "weights_used": {"ml": weight_ml, "clinical": weight_clinical},
                "recommendation": recommendation
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))