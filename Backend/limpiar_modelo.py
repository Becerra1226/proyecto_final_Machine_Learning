import joblib
import sklearn
from pycaret.classification import load_model

MODELO_VIEJO_PATH = r"D:\aprendizaje\Proyecto_Final\backend\app\models\final_logistic_regression_smote"
MODELO_NUEVO_PATH = r"D:\aprendizaje\Proyecto_Final\backend\app\models\final_logistic_regression_smote_limpio.pkl"

print(f"-> Versión de Scikit-Learn local: {sklearn.__version__}")
print("-> Cargando modelo original desde PyCaret...")

try:
    # 1. Cargar el pipeline de PyCaret
    pipeline_completo = load_model(MODELO_VIEJO_PATH)
    print("✓ Modelo cargado correctamente por PyCaret.")

    # 2. Extraer el paso final del pipeline
    print("-> Extrayendo estimador final de Scikit-Learn...")
    paso_final = pipeline_completo.steps[-1][1]
    
    # 3. Validar si tiene envoltorio de PyCaret o si ya es puro
    if hasattr(paso_final, "actual_estimator"):
        modelo_sklearn_puro = paso_final.actual_estimator
        print("✓ Estimador desempaquetado exitosamente.")
    else:
        modelo_sklearn_puro = paso_final
        print("✓ El estimador ya es un modelo puro de Scikit-Learn.")
    
    print(f"✓ Tipo de objeto a guardar: {type(modelo_sklearn_puro)}")

    # 4. Guardar
    print(f"-> Guardando modelo limpio en: {MODELO_NUEVO_PATH}...")
    joblib.dump(modelo_sklearn_puro, MODELO_NUEVO_PATH)
    print("✓ ¡Proceso completado con éxito! El modelo está listo para producción.")

except Exception as e:
    print(f"❌ Error durante la conversión: {e}")