from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any, Optional

# --- Input Schemas ---

class HeartPredictionInput(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    age: int = Field(..., ge=18, le=100, description="Age in years (e.g. 54)")
    sex: int = Field(..., ge=0, le=1, description="Gender (1 = Male, 0 = Female)")
    cp: int = Field(..., ge=0, le=3, description="Chest Pain Type (0: Typical Angina, 1: Atypical, 2: Non-Anginal, 3: Asymptomatic)")
    trestbps: int = Field(..., ge=80, le=240, description="Resting Blood Pressure in mmHg")
    chol: int = Field(..., ge=100, le=600, description="Serum Cholesterol in mg/dL")
    fbs: int = Field(..., ge=0, le=1, description="Fasting Blood Sugar > 120 mg/dL (1 = Yes, 0 = No)")
    restecg: int = Field(..., ge=0, le=2, description="Resting Electrocardiogram (0: Normal, 1: ST-T wave abnormality, 2: Left ventricular hypertrophy)")
    thalach: int = Field(..., ge=60, le=220, description="Maximum Heart Rate Achieved (bpm)")
    exang: int = Field(..., ge=0, le=1, description="Exercise Induced Angina (1 = Yes, 0 = No)")
    oldpeak: float = Field(..., ge=0.0, le=7.0, description="ST depression induced by exercise relative to rest")
    slope: int = Field(..., ge=0, le=2, description="Slope of peak exercise ST segment (0: Upsloping, 1: Flat, 2: Downsloping)")
    ca: int = Field(..., ge=0, le=3, description="Number of major vessels colored by fluoroscopy (0-3)")
    thal: int = Field(..., ge=1, le=3, description="Thalassemia (1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect)")

class DiabetesPredictionInput(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    pregnancies: int = Field(0, ge=0, le=20, description="Number of pregnancies")
    glucose: int = Field(..., ge=40, le=300, description="Plasma Glucose Concentration 2 hours post-test in mg/dL")
    blood_pressure: int = Field(..., ge=40, le=160, description="Diastolic Blood Pressure in mmHg")
    skin_thickness: int = Field(..., ge=0, le=100, description="Triceps skin fold thickness in mm")
    insulin: int = Field(..., ge=0, le=900, description="2-Hour serum insulin in mu U/mL")
    bmi: float = Field(..., ge=15.0, le=70.0, description="Body Mass Index (kg/m²)")
    diabetes_pedigree: float = Field(..., ge=0.05, le=2.5, description="Diabetes pedigree genetic likelihood function")
    age: int = Field(..., ge=18, le=100, description="Age in years")

class KidneyPredictionInput(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    age: int = Field(..., ge=10, le=100, description="Age in years")
    blood_pressure: int = Field(..., ge=50, le=200, description="Blood pressure in mmHg")
    specific_gravity: float = Field(..., ge=1.000, le=1.035, description="Urine specific gravity (e.g. 1.020)")
    albumin: int = Field(..., ge=0, le=5, description="Albumin level (0-5)")
    sugar: int = Field(..., ge=0, le=5, description="Sugar level (0-5)")
    blood_glucose_random: int = Field(..., ge=50, le=500, description="Random blood glucose in mg/dL")
    blood_urea: int = Field(..., ge=10, le=400, description="Blood urea in mg/dL")
    serum_creatinine: float = Field(..., ge=0.2, le=20.0, description="Serum creatinine in mg/dL")
    sodium: int = Field(..., ge=100, le=180, description="Sodium in mEq/L")
    potassium: float = Field(..., ge=2.0, le=10.0, description="Potassium in mEq/L")
    hemoglobin: float = Field(..., ge=3.0, le=20.0, description="Hemoglobin in g/dL")
    packed_cell_volume: int = Field(..., ge=10, le=60, description="Packed Cell Volume (%)")
    white_blood_cell_count: int = Field(..., ge=2000, le=30000, description="White Blood Cell count (/cumm)")
    red_blood_cell_count: float = Field(..., ge=1.5, le=9.0, description="Red Blood Cell count (million/cmm)")
    hypertension: int = Field(..., ge=0, le=1, description="Hypertension history (1 = Yes, 0 = No)")
    diabetes_mellitus: int = Field(..., ge=0, le=1, description="Diabetes mellitus status (1 = Yes, 0 = No)")

class LiverPredictionInput(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    age: int = Field(..., ge=10, le=100, description="Age in years")
    gender: int = Field(..., ge=0, le=1, description="Gender (1 = Male, 0 = Female)")
    total_bilirubin: float = Field(..., ge=0.2, le=80.0, description="Total Bilirubin in mg/dL")
    direct_bilirubin: float = Field(..., ge=0.1, le=30.0, description="Direct Bilirubin in mg/dL")
    alkaline_phosphotase: int = Field(..., ge=50, le=2500, description="Alkaline Phosphotase in IU/L")
    alamine_aminotransferase: int = Field(..., ge=10, le=2500, description="Alamine Aminotransferase (ALT/SGPT) in IU/L")
    aspartate_aminotransferase: int = Field(..., ge=10, le=5000, description="Aspartate Aminotransferase (AST/SGOT) in IU/L")
    total_proteins: float = Field(..., ge=2.0, le=12.0, description="Total Proteins in g/dL")
    albumin: float = Field(..., ge=0.5, le=7.0, description="Albumin in g/dL")
    albumin_and_globulin_ratio: float = Field(..., ge=0.2, le=4.0, description="Albumin and Globulin Ratio")

class StrokePredictionInput(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    gender: int = Field(..., ge=0, le=1, description="Gender (1 = Male, 0 = Female)")
    age: int = Field(..., ge=18, le=100, description="Age in years")
    hypertension: int = Field(..., ge=0, le=1, description="Hypertension history (1 = Yes, 0 = No)")
    heart_disease: int = Field(..., ge=0, le=1, description="Heart disease history (1 = Yes, 0 = No)")
    ever_married: int = Field(..., ge=0, le=1, description="Ever married (1 = Yes, 0 = No)")
    work_type: int = Field(..., ge=0, le=3, description="Work type (0: Private, 1: Self-employed, 2: Govt job, 3: Other)")
    residence_type: int = Field(..., ge=0, le=1, description="Residence Type (1 = Urban, 0 = Rural)")
    avg_glucose_level: float = Field(..., ge=50.0, le=300.0, description="Average Glucose Level in mg/dL")
    bmi: float = Field(..., ge=14.0, le=65.0, description="Body Mass Index (kg/m²)")
    smoking_status: int = Field(..., ge=0, le=3, description="Smoking Status (0: Never, 1: Formerly, 2: Smokes, 3: Unknown)")

# --- Output Schemas ---

class FactorImpact(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    feature: str
    label: str
    patient_value: Any
    population_baseline: Any
    unit: str
    impact_score: float
    direction: str
    description: str

class Recommendation(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    category: str
    title: str
    advice: str
    priority: str

class ModelInfoSummary(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    algorithm: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    dataset_samples: int

class PredictionResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    disease: str
    disease_key: str
    risk_level: str
    risk_probability: float
    prediction: int
    important_factors: List[FactorImpact]
    recommendations: List[Recommendation]
    model_info: ModelInfoSummary
    disclaimer: str
    timestamp: str
    input_data: Dict[str, Any]

class SavePredictionRequest(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    user_id: Optional[str] = None
    user_email: Optional[str] = None
    prediction_result: PredictionResponse

class HistoryItem(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    id: str
    user_id: Optional[str]
    disease: str
    disease_key: str
    risk_level: str
    risk_probability: float
    model_name: str
    created_at: str
    input_data: Dict[str, Any]
    important_factors: List[Dict[str, Any]]
