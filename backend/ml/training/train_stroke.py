import os
import sys
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_stroke_dataset, DATASETS_DIR
from ml.utils.evaluator import train_and_evaluate_disease

def train_stroke():
    csv_path = os.path.join(DATASETS_DIR, "stroke.csv")
    if not os.path.exists(csv_path):
        df = generate_stroke_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = [
        'gender', 'age', 'hypertension', 'heart_disease',
        'ever_married', 'work_type', 'residence_type',
        'avg_glucose_level', 'bmi', 'smoking_status'
    ]
    return train_and_evaluate_disease(
        disease_key="stroke",
        disease_name="Stroke",
        df=df,
        feature_cols=features,
        target_col="target"
    )

if __name__ == "__main__":
    train_stroke()
