import os
import sys
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_kidney_dataset, DATASETS_DIR
from ml.utils.evaluator import train_and_evaluate_disease

def train_kidney():
    csv_path = os.path.join(DATASETS_DIR, "kidney_disease.csv")
    if not os.path.exists(csv_path):
        df = generate_kidney_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = [
        'age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar',
        'blood_glucose_random', 'blood_urea', 'serum_creatinine', 'sodium',
        'potassium', 'hemoglobin', 'packed_cell_volume', 'white_blood_cell_count',
        'red_blood_cell_count', 'hypertension', 'diabetes_mellitus'
    ]
    return train_and_evaluate_disease(
        disease_key="kidney",
        disease_name="Chronic Kidney Disease",
        df=df,
        feature_cols=features,
        target_col="target"
    )

if __name__ == "__main__":
    train_kidney()
