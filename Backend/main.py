from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from pycaret.classification import load_model, predict_model
import os

app = FastAPI(title="API de Predicción de ACV")

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
MODEL_PATH = os.path.join("app", "models", "final_logistic_regression_model") # PyCaret busca el .pkl solo

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

# El orden estricto de columnas que exige tu scaler.pkl
FEATURES_ORDER = [
    'gender', 'age', 'hypertension', 'heart_disease', 'ever_married', 
    'Residence_type', 'avg_glucose_level', 'bmi',
    'work_type_Never_worked', 'work_type_Private', 'work_type_Self-employed', 'work_type_children',
    'smoking_status_formerly smoked', 'smoking_status_never smoked', 'smoking_status_smokes'
]

@app.post("/predict")
def predict_stroke(patient: PatientInput):
    try:
        data = patient.dict()
        
        # 1. Mapeos Binarios (Label Encoding manual)
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
        
        # 2. Inicializar columnas de One-Hot Encoding en 0
        for col in FEATURES_ORDER:
            if col not in processed:
                processed[col] = 0
        
        # 3. Activar la columna correspondiente (drop_first maneja automáticamente Govt_job y Unknown en 0)
        work_col = f"work_type_{data['work_type']}"
        smoke_col = f"smoking_status_{data['smoking_status']}"
        
        if work_col in processed:
            processed[work_col] = 1
        if smoke_col in processed:
            processed[smoke_col] = 1
            
        # 4. Crear DataFrame y reordenar columnas
        df_input = pd.DataFrame([processed])[FEATURES_ORDER]
        
        # 5. Escalar variables numéricas
        df_scaled = pd.DataFrame(scaler.transform(df_input), columns=FEATURES_ORDER)
        
        # 6. Predicción con PyCaret
        prediction_df = predict_model(model, data=df_scaled)
        
        return {
            "prediction": int(prediction_df['prediction_label'].iloc[0]),
            "probability": float(prediction_df['prediction_score'].iloc[0])
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))