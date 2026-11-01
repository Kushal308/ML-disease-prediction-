import os
import sys
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_liver_dataset, DATASETS_DIR
from ml.utils.evaluator import train_and_evaluate_disease

def train_liver():
    csv_path = os.path.join(DATASETS_DIR, "liver_disease.csv")
    if not os.path.exists(csv_path):
        df = generate_liver_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = [
        'age', 'gender', 'total_bilirubin', 'direct_bilirubin',
        'alkaline_phosphotase', 'alamine_aminotransferase',
        'aspartate_aminotransferase', 'total_proteins', 'albumin',
        'albumin_and_globulin_ratio'
    ]
    return train_and_evaluate_disease(
        disease_key="liver",
        disease_name="Liver Disease",
        df=df,
        feature_cols=features,
        target_col="target"
    )

if __name__ == "__main__":
    train_liver()
