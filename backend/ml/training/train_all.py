import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ml.datasets.generate_datasets import generate_all
from ml.training.train_heart import train_heart
from ml.training.train_diabetes import train_diabetes
from ml.training.train_kidney import train_kidney
from ml.training.train_liver import train_liver
from ml.training.train_stroke import train_stroke

def train_all_models():
    print("=" * 60)
    print("MediPredict AI - Training Pipeline For All 5 Diseases")
    print("=" * 60)
    generate_all()
    results = {}
    results["heart"] = train_heart()
    results["diabetes"] = train_diabetes()
    results["kidney"] = train_kidney()
    results["liver"] = train_liver()
    results["stroke"] = train_stroke()
    print("\n" + "=" * 60)
    print("All 5 Disease Models Trained and Evaluated Successfully!")
    print("=" * 60)
    for k, v in results.items():
        print(f"[{v['disease_name']}] Selected: {v['selected_model']} | Accuracy: {v['metrics']['accuracy']:.2%} | F1: {v['metrics']['f1_score']:.4f}")

if __name__ == "__main__":
    train_all_models()
