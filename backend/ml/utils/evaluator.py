"""
MediPredict AI - Model Training & Evaluation Engine
Compares 4 ML algorithms:
- Logistic Regression
- Decision Tree
- Random Forest
- Gradient Boosting
Calculates standard classification metrics: Accuracy, Precision, Recall, F1, ROC-AUC, Confusion Matrix.
Extracts normalized feature importance rankings.
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix
)
from sklearn.utils.class_weight import compute_sample_weight

SAVED_MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "saved_models"))
os.makedirs(SAVED_MODELS_DIR, exist_ok=True)

def train_and_evaluate_disease(
    disease_key: str,
    disease_name: str,
    df: pd.DataFrame,
    feature_cols: list,
    target_col: str = 'target',
    categorical_cols: list = None
):
    print(f"\n==========================================")
    print(f"Training models for: {disease_name} ({disease_key})")
    print(f"Dataset shape: {df.shape}, Features: {len(feature_cols)}")
    print(f"==========================================")

    # Clean missing values
    data = df.dropna().copy()
    X = data[feature_cols].copy()
    y = data[target_col].copy()

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Scaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    sample_weights_train = compute_sample_weight('balanced', y_train)

    # Models with balanced class weights for realistic medical diagnostics
    models = {
        "Random Forest": RandomForestClassifier(n_estimators=120, max_depth=6, class_weight='balanced', random_state=42),
        "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=3, random_state=42),
        "Logistic Regression": LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42),
        "Decision Tree": DecisionTreeClassifier(max_depth=5, min_samples_split=8, class_weight='balanced', random_state=42)
    }

    comparison_results = {}
    best_model_name = None
    best_score = -1.0
    best_model_obj = None

    for name, clf in models.items():
        if name == "Gradient Boosting":
            clf.fit(X_train_scaled, y_train, sample_weight=sample_weights_train)
        else:
            clf.fit(X_train_scaled, y_train)

        y_pred = clf.predict(X_test_scaled)

        # Probabilities for ROC-AUC
        if hasattr(clf, "predict_proba"):
            y_prob = clf.predict_proba(X_test_scaled)[:, 1]
            auc_val = float(roc_auc_score(y_test, y_prob))
        else:
            auc_val = 0.0

        acc = float(accuracy_score(y_test, y_pred))
        prec = float(precision_score(y_test, y_pred, zero_division=0))
        rec = float(recall_score(y_test, y_pred, zero_division=0))
        f1 = float(f1_score(y_test, y_pred, zero_division=0))
        cm = confusion_matrix(y_test, y_pred).tolist()

        comparison_results[name] = {
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1_score": round(f1, 4),
            "roc_auc": round(auc_val, 4),
            "confusion_matrix": cm
        }

        print(f"[{name}] Acc: {acc:.4f} | Prec: {prec:.4f} | Rec: {rec:.4f} | F1: {f1:.4f} | AUC: {auc_val:.4f}")

        # Choose best model primarily on balance of AUC and F1
        composite_score = 0.6 * auc_val + 0.4 * f1
        if composite_score > best_score:
            best_score = composite_score
            best_model_name = name
            best_model_obj = clf

    print(f"Selected Best Model: {best_model_name} (Composite Score: {best_score:.4f})")

    # Feature Importance
    feature_importance_dict = {}
    if hasattr(best_model_obj, "feature_importances_"):
        raw_imp = best_model_obj.feature_importances_
        norm_imp = raw_imp / (np.sum(raw_imp) + 1e-9)
        for col, imp in zip(feature_cols, norm_imp):
            feature_importance_dict[col] = round(float(imp), 4)
    elif hasattr(best_model_obj, "coef_"):
        raw_imp = np.abs(best_model_obj.coef_[0])
        norm_imp = raw_imp / (np.sum(raw_imp) + 1e-9)
        for col, imp in zip(feature_cols, norm_imp):
            feature_importance_dict[col] = round(float(imp), 4)
    else:
        for col in feature_cols:
            feature_importance_dict[col] = round(1.0 / len(feature_cols), 4)

    # Sort descending
    sorted_importance = dict(sorted(feature_importance_dict.items(), key=lambda item: item[1], reverse=True))

    # Save artifacts
    model_path = os.path.join(SAVED_MODELS_DIR, f"{disease_key}_model.joblib")
    scaler_path = os.path.join(SAVED_MODELS_DIR, f"{disease_key}_scaler.joblib")
    meta_path = os.path.join(SAVED_MODELS_DIR, f"{disease_key}_metadata.json")

    joblib.dump(best_model_obj, model_path)
    joblib.dump(scaler, scaler_path)

    metadata = {
        "disease_key": disease_key,
        "disease_name": disease_name,
        "selected_model": best_model_name,
        "total_samples": int(len(data)),
        "train_samples": int(len(X_train)),
        "test_samples": int(len(X_test)),
        "features": feature_cols,
        "target": target_col,
        "metrics": comparison_results[best_model_name],
        "all_models_comparison": comparison_results,
        "feature_importance": sorted_importance,
        "scaler_means": {col: float(m) for col, m in zip(feature_cols, scaler.mean_)},
        "scaler_scales": {col: float(s) for col, s in zip(feature_cols, scaler.scale_)}
    }

    with open(meta_path, "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"Saved {disease_key} model and metadata to {SAVED_MODELS_DIR}")
    return metadata
