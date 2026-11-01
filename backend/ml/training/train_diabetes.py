import os
import sys
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_diabetes_dataset, DATASETS_DIR
from ml.utils.evaluator import train_and_evaluate_disease

def train_diabetes():
    csv_path = os.path.join(DATASETS_DIR, "diabetes.csv")
    if not os.path.exists(csv_path):
        df = generate_diabetes_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = [
        'pregnancies', 'glucose', 'blood_pressure', 'skin_thickness',
        'insulin', 'bmi', 'diabetes_pedigree', 'age'
    ]
    return train_and_evaluate_disease(
        disease_key="diabetes",
        disease_name="Diabetes",
        df=df,
        feature_cols=features,
        target_col="target"
    )

if __name__ == "__main__":
    train_diabetes()
