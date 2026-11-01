import os
import sys
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_heart_dataset, DATASETS_DIR
from ml.utils.evaluator import train_and_evaluate_disease

def train_heart():
    csv_path = os.path.join(DATASETS_DIR, "heart_disease.csv")
    if not os.path.exists(csv_path):
        df = generate_heart_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
        'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
    ]
    return train_and_evaluate_disease(
        disease_key="heart",
        disease_name="Heart Disease",
        df=df,
        feature_cols=features,
        target_col="target"
    )

if __name__ == "__main__":
    train_heart()
