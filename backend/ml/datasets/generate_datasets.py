"""
MediPredict AI - Dataset Generator & Preprocessor
Creates high-fidelity medical benchmark datasets based on UCI / Kaggle clinical distributions:
1. Heart Disease (UCI Cleveland benchmark features)
2. Diabetes (Pima Indians Diabetes benchmark features)
3. Kidney Disease (Chronic Kidney Disease benchmark features)
4. Liver Disease (Indian Liver Patient Dataset ILPD benchmark features)
5. Stroke (Kaggle Stroke Prediction benchmark features)
"""

import os
import numpy as np
import pandas as pd

DATASETS_DIR = os.path.dirname(os.path.abspath(__file__))
os.makedirs(DATASETS_DIR, exist_ok=True)

def generate_heart_dataset(n_samples=1000, random_state=42):
    np.random.seed(random_state)
    age = np.random.normal(54.4, 9.0, n_samples).clip(29, 77).astype(int)
    sex = np.random.binomial(1, 0.68, n_samples)
    cp = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.48, 0.17, 0.28, 0.07])
    trestbps = np.random.normal(131.6, 17.5, n_samples).clip(94, 200).astype(int)
    chol = np.random.normal(246.3, 51.8, n_samples).clip(126, 564).astype(int)
    fbs = np.random.binomial(1, 0.15, n_samples) 
    restecg = np.random.choice([0, 1, 2], size=n_samples, p=[0.49, 0.49, 0.02])
    thalach = np.random.normal(149.6, 22.9, n_samples).clip(71, 202).astype(int)
    exang = np.random.binomial(1, 0.33, n_samples)
    oldpeak = np.round(np.random.exponential(1.0, n_samples).clip(0.0, 6.2), 1)
    slope = np.random.choice([0, 1, 2], size=n_samples, p=[0.07, 0.46, 0.47])
    ca = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.58, 0.22, 0.13, 0.07])
    thal = np.random.choice([1, 2, 3], size=n_samples, p=[0.06, 0.55, 0.39])

    # Realistic clinical logit scoring
    z = (
        -4.2
        + 0.035 * (age - 50)
        + 0.8 * sex
        + 0.9 * (cp > 0)
        + 0.02 * (trestbps - 120)
        + 0.01 * (chol - 200)
        + 0.5 * fbs
        - 0.025 * (thalach - 140)
        + 1.1 * exang
        + 0.7 * oldpeak
        + 0.8 * ca
        + 0.9 * (thal == 3)
    )
    prob = 1 / (1 + np.exp(-z))
    target = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        'age': age,
        'sex': sex,
        'cp': cp,
        'trestbps': trestbps,
        'chol': chol,
        'fbs': fbs,
        'restecg': restecg,
        'thalach': thalach,
        'exang': exang,
        'oldpeak': oldpeak,
        'slope': slope,
        'ca': ca,
        'thal': thal,
        'target': target
    })
    path = os.path.join(DATASETS_DIR, 'heart_disease.csv')
    df.to_csv(path, index=False)
    print(f"Saved heart dataset: {path} ({len(df)} rows)")
    return df

def generate_diabetes_dataset(n_samples=1000, random_state=42):
    np.random.seed(random_state)
    pregnancies = np.random.poisson(3.8, n_samples).clip(0, 17)
    glucose = np.random.normal(120.9, 32.0, n_samples).clip(44, 199).astype(int)
    blood_pressure = np.random.normal(69.1, 19.3, n_samples).clip(24, 122).astype(int)
    skin_thickness = np.random.normal(20.5, 15.9, n_samples).clip(0, 99).astype(int)
    insulin = np.random.exponential(80.0, n_samples).clip(0, 846).astype(int)
    bmi = np.round(np.random.normal(32.0, 7.8, n_samples).clip(18.2, 67.1), 1)
    diabetes_pedigree = np.round(np.random.exponential(0.47, n_samples).clip(0.078, 2.42), 3)
    age = np.random.normal(33.2, 11.7, n_samples).clip(21, 81).astype(int)

    z = (
        -5.0
        + 0.12 * pregnancies
        + 0.038 * (glucose - 100)
        + 0.015 * (blood_pressure - 70)
        + 0.08 * (bmi - 25)
        + 1.2 * diabetes_pedigree
        + 0.04 * (age - 30)
    )
    prob = 1 / (1 + np.exp(-z))
    target = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        'pregnancies': pregnancies,
        'glucose': glucose,
        'blood_pressure': blood_pressure,
        'skin_thickness': skin_thickness,
        'insulin': insulin,
        'bmi': bmi,
        'diabetes_pedigree': diabetes_pedigree,
        'age': age,
        'target': target
    })
    path = os.path.join(DATASETS_DIR, 'diabetes.csv')
    df.to_csv(path, index=False)
    print(f"Saved diabetes dataset: {path} ({len(df)} rows)")
    return df

def generate_kidney_dataset(n_samples=1000, random_state=42):
    np.random.seed(random_state)
    age = np.random.normal(51.5, 17.0, n_samples).clip(12, 90).astype(int)
    blood_pressure = np.random.normal(76.5, 13.6, n_samples).clip(50, 180).astype(int)
    specific_gravity = np.random.choice([1.005, 1.010, 1.015, 1.020, 1.025], size=n_samples, p=[0.05, 0.15, 0.35, 0.35, 0.10])
    albumin = np.random.choice([0, 1, 2, 3, 4, 5], size=n_samples, p=[0.55, 0.15, 0.12, 0.10, 0.05, 0.03])
    sugar = np.random.choice([0, 1, 2, 3, 4, 5], size=n_samples, p=[0.75, 0.08, 0.07, 0.05, 0.03, 0.02])
    blood_glucose_random = np.random.normal(148.0, 79.0, n_samples).clip(70, 490).astype(int)
    blood_urea = np.random.normal(57.4, 50.5, n_samples).clip(10, 391).astype(int)
    serum_creatinine = np.round(np.random.exponential(2.5, n_samples).clip(0.4, 15.0), 2)
    sodium = np.random.normal(137.5, 10.4, n_samples).clip(104, 163).astype(int)
    potassium = np.round(np.random.normal(4.6, 3.2, n_samples).clip(2.5, 47.0), 1)
    hemoglobin = np.round(np.random.normal(12.5, 2.9, n_samples).clip(3.1, 17.8), 1)
    packed_cell_volume = np.random.normal(38.8, 8.9, n_samples).clip(9, 54).astype(int)
    white_blood_cell_count = np.random.normal(8406, 2944, n_samples).clip(2200, 26400).astype(int)
    red_blood_cell_count = np.round(np.random.normal(4.7, 1.0, n_samples).clip(2.1, 8.0), 1)
    hypertension = np.random.binomial(1, 0.37, n_samples)
    diabetes_mellitus = np.random.binomial(1, 0.34, n_samples)

    z = (
        -3.5
        + 0.03 * (age - 50)
        + 0.02 * (blood_pressure - 75)
        - 150.0 * (specific_gravity - 1.015)
        + 0.7 * albumin
        + 0.4 * sugar
        + 0.01 * (blood_urea - 40)
        + 1.3 * (serum_creatinine - 1.0)
        - 0.4 * (hemoglobin - 13.0)
        + 1.1 * hypertension
        + 0.9 * diabetes_mellitus
    )
    prob = 1 / (1 + np.exp(-z))
    target = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        'age': age,
        'blood_pressure': blood_pressure,
        'specific_gravity': specific_gravity,
        'albumin': albumin,
        'sugar': sugar,
        'blood_glucose_random': blood_glucose_random,
        'blood_urea': blood_urea,
        'serum_creatinine': serum_creatinine,
        'sodium': sodium,
        'potassium': potassium,
        'hemoglobin': hemoglobin,
        'packed_cell_volume': packed_cell_volume,
        'white_blood_cell_count': white_blood_cell_count,
        'red_blood_cell_count': red_blood_cell_count,
        'hypertension': hypertension,
        'diabetes_mellitus': diabetes_mellitus,
        'target': target
    })
    path = os.path.join(DATASETS_DIR, 'kidney_disease.csv')
    df.to_csv(path, index=False)
    print(f"Saved kidney dataset: {path} ({len(df)} rows)")
    return df

def generate_liver_dataset(n_samples=1000, random_state=42):
    np.random.seed(random_state)
    age = np.random.normal(44.7, 16.2, n_samples).clip(10, 85).astype(int)
    gender = np.random.binomial(1, 0.75, n_samples) # 1=Male, 0=Female
    total_bilirubin = np.round(np.random.exponential(3.3, n_samples).clip(0.4, 75.0), 1)
    direct_bilirubin = np.round((total_bilirubin * np.random.uniform(0.3, 0.6, n_samples)).clip(0.1, 19.7), 1)
    alkaline_phosphotase = np.random.normal(290.5, 242.9, n_samples).clip(63, 2110).astype(int)
    alamine_aminotransferase = np.random.normal(80.7, 182.6, n_samples).clip(10, 2000).astype(int)
    aspartate_aminotransferase = np.random.normal(109.9, 288.9, n_samples).clip(10, 4929).astype(int)
    total_proteins = np.round(np.random.normal(6.48, 1.08, n_samples).clip(2.7, 9.6), 1)
    albumin = np.round(np.random.normal(3.14, 0.79, n_samples).clip(0.9, 5.5), 1)
    albumin_and_globulin_ratio = np.round((albumin / (total_proteins - albumin + 0.1)).clip(0.3, 2.8), 2)

    z = (
        -3.2
        + 0.02 * (age - 40)
        + 0.4 * (total_bilirubin - 1.2)
        + 0.6 * (direct_bilirubin - 0.4)
        + 0.003 * (alkaline_phosphotase - 200)
        + 0.015 * (alamine_aminotransferase - 40)
        + 0.01 * (aspartate_aminotransferase - 40)
        - 0.5 * (albumin - 3.5)
        - 0.6 * (albumin_and_globulin_ratio - 1.0)
    )
    prob = 1 / (1 + np.exp(-z))
    target = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        'age': age,
        'gender': gender,
        'total_bilirubin': total_bilirubin,
        'direct_bilirubin': direct_bilirubin,
        'alkaline_phosphotase': alkaline_phosphotase,
        'alamine_aminotransferase': alamine_aminotransferase,
        'aspartate_aminotransferase': aspartate_aminotransferase,
        'total_proteins': total_proteins,
        'albumin': albumin,
        'albumin_and_globulin_ratio': albumin_and_globulin_ratio,
        'target': target
    })
    path = os.path.join(DATASETS_DIR, 'liver_disease.csv')
    df.to_csv(path, index=False)
    print(f"Saved liver dataset: {path} ({len(df)} rows)")
    return df

def generate_stroke_dataset(n_samples=1200, random_state=42):
    np.random.seed(random_state)
    gender = np.random.binomial(1, 0.41, n_samples) # 1=Male, 0=Female
    age = np.random.normal(52.5, 18.0, n_samples).clip(18, 85).astype(int)
    hypertension = np.random.binomial(1, 0.22, n_samples)
    heart_disease = np.random.binomial(1, 0.15, n_samples)
    ever_married = np.where(age > 25, np.random.binomial(1, 0.85, n_samples), np.random.binomial(1, 0.15, n_samples))
    work_type = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.58, 0.16, 0.13, 0.13]) # 0=Private, 1=Self-employed, 2=Govt, 3=Other
    residence_type = np.random.binomial(1, 0.51, n_samples) # 1=Urban, 0=Rural
    avg_glucose_level = np.round(np.random.normal(106.1, 45.2, n_samples).clip(55.1, 271.7), 2)
    bmi = np.round(np.random.normal(28.9, 7.8, n_samples).clip(15.3, 60.5), 1)
    smoking_status = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.37, 0.17, 0.15, 0.31]) # 0=never, 1=former, 2=smokes, 3=unknown

    z = (
        -5.6
        + 0.075 * (age - 50)
        + 1.1 * hypertension
        + 1.3 * heart_disease
        + 0.015 * (avg_glucose_level - 100)
        + 0.05 * (bmi - 25)
        + 0.7 * (smoking_status == 2)
        + 0.3 * (smoking_status == 1)
    )
    prob = 1 / (1 + np.exp(-z))
    target = (np.random.rand(n_samples) < prob).astype(int)

    df = pd.DataFrame({
        'gender': gender,
        'age': age,
        'hypertension': hypertension,
        'heart_disease': heart_disease,
        'ever_married': ever_married,
        'work_type': work_type,
        'residence_type': residence_type,
        'avg_glucose_level': avg_glucose_level,
        'bmi': bmi,
        'smoking_status': smoking_status,
        'target': target
    })
    path = os.path.join(DATASETS_DIR, 'stroke.csv')
    df.to_csv(path, index=False)
    print(f"Saved stroke dataset: {path} ({len(df)} rows)")
    return df

def generate_all():
    print("Generating benchmark datasets for all 5 disease models...")
    generate_heart_dataset()
    generate_diabetes_dataset()
    generate_kidney_dataset()
    generate_liver_dataset()
    generate_stroke_dataset()
    print("All datasets generated successfully.")

if __name__ == "__main__":
    generate_all()
