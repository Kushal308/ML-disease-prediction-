"""
MediPredict AI - Core Machine Learning & Explainability Service
Loads trained models, performs inference, generates Explainable AI feature attributions,
and compiles clinical risk reports.
"""

import os
import json
import joblib
import datetime
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Tuple
from app.schemas.disease_schemas import (
    PredictionResponse,
    FactorImpact,
    Recommendation,
    ModelInfoSummary
)

SAVED_MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "ml", "saved_models"))

DISCLAIMER_TEXT = (
    "This system provides machine-learning-based risk estimates for educational and "
    "informational purposes only. It is not a medical diagnosis. Please consult a qualified "
    "healthcare professional for medical advice."
)

FEATURE_METADATA = {
    # Heart
    "age": {"label": "Age", "unit": "years"},
    "sex": {"label": "Biological Sex", "unit": ""},
    "cp": {"label": "Chest Pain Type", "unit": "grade 0-3"},
    "trestbps": {"label": "Resting Blood Pressure", "unit": "mmHg"},
    "chol": {"label": "Serum Cholesterol", "unit": "mg/dL"},
    "fbs": {"label": "Fasting Blood Sugar", "unit": ">120 mg/dL"},
    "restecg": {"label": "Resting ECG Result", "unit": "type 0-2"},
    "thalach": {"label": "Max Heart Rate Achieved", "unit": "bpm"},
    "exang": {"label": "Exercise Induced Angina", "unit": ""},
    "oldpeak": {"label": "ST Depression (Oldpeak)", "unit": "mm"},
    "slope": {"label": "ST Segment Slope", "unit": "type 0-2"},
    "ca": {"label": "Major Vessels Colored", "unit": "count 0-3"},
    "thal": {"label": "Thalassemia Indicator", "unit": "type 1-3"},

    # Diabetes
    "pregnancies": {"label": "Pregnancies", "unit": "count"},
    "glucose": {"label": "Plasma Glucose Concentration", "unit": "mg/dL"},
    "blood_pressure": {"label": "Diastolic Blood Pressure", "unit": "mmHg"},
    "skin_thickness": {"label": "Triceps Skinfold Thickness", "unit": "mm"},
    "insulin": {"label": "2-Hour Serum Insulin", "unit": "mu U/mL"},
    "bmi": {"label": "Body Mass Index (BMI)", "unit": "kg/m²"},
    "diabetes_pedigree": {"label": "Diabetes Pedigree Score", "unit": "index"},

    # Kidney
    "specific_gravity": {"label": "Urine Specific Gravity", "unit": ""},
    "albumin": {"label": "Urinary Albumin", "unit": "grade 0-5"},
    "sugar": {"label": "Urinary Glucose/Sugar", "unit": "grade 0-5"},
    "blood_glucose_random": {"label": "Random Blood Glucose", "unit": "mg/dL"},
    "blood_urea": {"label": "Blood Urea Level", "unit": "mg/dL"},
    "serum_creatinine": {"label": "Serum Creatinine Level", "unit": "mg/dL"},
    "sodium": {"label": "Serum Sodium", "unit": "mEq/L"},
    "potassium": {"label": "Serum Potassium", "unit": "mEq/L"},
    "hemoglobin": {"label": "Blood Hemoglobin", "unit": "g/dL"},
    "packed_cell_volume": {"label": "Packed Cell Volume (PCV)", "unit": "%"},
    "white_blood_cell_count": {"label": "White Blood Cell Count", "unit": "/cumm"},
    "red_blood_cell_count": {"label": "Red Blood Cell Count", "unit": "M/cmm"},
    "hypertension": {"label": "Hypertension History", "unit": ""},
    "diabetes_mellitus": {"label": "Diabetes History", "unit": ""},

    # Liver
    "gender": {"label": "Gender", "unit": ""},
    "total_bilirubin": {"label": "Total Bilirubin", "unit": "mg/dL"},
    "direct_bilirubin": {"label": "Direct Bilirubin", "unit": "mg/dL"},
    "alkaline_phosphotase": {"label": "Alkaline Phosphatase (ALP)", "unit": "IU/L"},
    "alamine_aminotransferase": {"label": "ALT / SGPT Transaminase", "unit": "IU/L"},
    "aspartate_aminotransferase": {"label": "AST / SGOT Transaminase", "unit": "IU/L"},
    "total_proteins": {"label": "Total Serum Proteins", "unit": "g/dL"},
    "albumin_and_globulin_ratio": {"label": "Albumin to Globulin (A/G) Ratio", "unit": ""},

    # Stroke
    "heart_disease": {"label": "Heart Disease History", "unit": ""},
    "ever_married": {"label": "Marital Status", "unit": ""},
    "work_type": {"label": "Occupation Type", "unit": ""},
    "residence_type": {"label": "Residence Type", "unit": ""},
    "avg_glucose_level": {"label": "Average Blood Glucose", "unit": "mg/dL"},
    "smoking_status": {"label": "Smoking Status History", "unit": ""}
}


class MLService:
    def __init__(self):
        self.models: Dict[str, Any] = {}
        self.scalers: Dict[str, Any] = {}
        self.metadata: Dict[str, Dict[str, Any]] = {}
        self.load_all_artifacts()

    def load_all_artifacts(self):
        diseases = ["heart", "diabetes", "kidney", "liver", "stroke"]
        for key in diseases:
            model_file = os.path.join(SAVED_MODELS_DIR, f"{key}_model.joblib")
            scaler_file = os.path.join(SAVED_MODELS_DIR, f"{key}_scaler.joblib")
            meta_file = os.path.join(SAVED_MODELS_DIR, f"{key}_metadata.json")

            if os.path.exists(model_file) and os.path.exists(scaler_file) and os.path.exists(meta_file):
                self.models[key] = joblib.load(model_file)
                self.scalers[key] = joblib.load(scaler_file)
                with open(meta_file, "r") as f:
                    self.metadata[key] = json.load(f)
                print(f"[MLService] Loaded artifacts for {key}: model={self.metadata[key].get('selected_model')}")
            else:
                print(f"[MLService] WARNING: Missing artifacts for {key} in {SAVED_MODELS_DIR}")

    def get_all_models_info(self) -> Dict[str, Any]:
        info = {}
        for key, meta in self.metadata.items():
            info[key] = {
                "disease_name": meta.get("disease_name"),
                "selected_model": meta.get("selected_model"),
                "features": meta.get("features"),
                "total_samples": meta.get("total_samples"),
                "metrics": meta.get("metrics"),
                "all_models_comparison": meta.get("all_models_comparison"),
                "feature_importance": meta.get("feature_importance")
            }
        return info

    def get_model_info_by_disease(self, disease_key: str) -> Dict[str, Any]:
        return self.metadata.get(disease_key, {})

    def predict(self, disease_key: str, input_dict: Dict[str, Any]) -> PredictionResponse:
        if disease_key not in self.models:
            raise ValueError(f"Model for disease key '{disease_key}' is not loaded.")

        meta = self.metadata[disease_key]
        model = self.models[disease_key]
        scaler = self.scalers[disease_key]
        features = meta["features"]

        # 1. Arrange input into exact feature order
        row_values = []
        for feat in features:
            if feat not in input_dict:
                raise ValueError(f"Missing required parameter '{feat}' for {disease_key}")
            row_values.append(float(input_dict[feat]))

        X_raw = np.array([row_values])
        X_df = pd.DataFrame(X_raw, columns=features)

        # 2. Scale features
        X_scaled = scaler.transform(X_df)

        # 3. Model probability and prediction
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X_scaled)[0]
            risk_prob = float(probs[1]) if len(probs) > 1 else float(probs[0])
        else:
            pred_val = model.predict(X_scaled)[0]
            risk_prob = 1.0 if pred_val == 1 else 0.0

        risk_prob = round(float(np.clip(risk_prob, 0.01, 0.99)), 4)
        binary_pred = 1 if risk_prob >= 0.50 else 0

        # 4. Categorize risk level
        if risk_prob < 0.35:
            risk_level = "Low Risk"
        elif risk_prob <= 0.70:
            risk_level = "Moderate Risk"
        else:
            risk_level = "High Risk"

        # 5. Explainable AI Feature Attribution
        important_factors = self._compute_feature_attributions(
            disease_key=disease_key,
            model=model,
            scaler=scaler,
            features=features,
            X_raw=X_raw[0],
            X_scaled=X_scaled[0]
        )

        # 6. Generate clinical lifestyle recommendations
        recommendations = self._generate_recommendations(
            disease_key=disease_key,
            risk_level=risk_level,
            input_dict=input_dict,
            important_factors=important_factors
        )

        model_summary = ModelInfoSummary(
            algorithm=meta.get("selected_model", "Standard Model"),
            accuracy=meta["metrics"]["accuracy"],
            precision=meta["metrics"]["precision"],
            recall=meta["metrics"]["recall"],
            f1_score=meta["metrics"]["f1_score"],
            roc_auc=meta["metrics"]["roc_auc"],
            dataset_samples=meta["total_samples"]
        )

        return PredictionResponse(
            disease=meta["disease_name"],
            disease_key=disease_key,
            risk_level=risk_level,
            risk_probability=risk_prob,
            prediction=binary_pred,
            important_factors=important_factors,
            recommendations=recommendations,
            model_info=model_summary,
            disclaimer=DISCLAIMER_TEXT,
            timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),
            input_data=input_dict
        )

    def _compute_feature_attributions(
        self,
        disease_key: str,
        model: Any,
        scaler: Any,
        features: List[str],
        X_raw: np.ndarray,
        X_scaled: np.ndarray
    ) -> List[FactorImpact]:
        """
        Calculates localized feature attributions showing how individual patient
        values deviate from population averages and contribute towards or against risk.
        """
        factors = []
        means = scaler.mean_

        # If logistic regression, use exact additive linear logit contributions
        if hasattr(model, "coef_"):
            coefs = model.coef_[0]
            contributions = X_scaled * coefs
        elif hasattr(model, "feature_importances_"):
            # For tree ensembles, weight deviation from mean by global feature importance
            importances = model.feature_importances_
            contributions = X_scaled * importances
        else:
            contributions = np.zeros(len(features))

        # Compile factor impacts
        for idx, feat in enumerate(features):
            val = round(float(X_raw[idx]), 2)
            pop_mean = round(float(means[idx]), 2)
            impact = round(float(contributions[idx]), 3)

            meta = FEATURE_METADATA.get(feat, {"label": feat.replace("_", " ").title(), "unit": ""})
            label = meta["label"]
            unit = meta["unit"]

            if abs(impact) < 0.02:
                direction = "neutral"
                desc = f"{label} is aligned with standard population baseline ({val} {unit})."
            elif impact > 0:
                direction = "increases_risk"
                desc = f"{label} ({val} {unit}) positively associates with elevated risk relative to population average ({pop_mean} {unit})."
            else:
                direction = "decreases_risk"
                desc = f"{label} ({val} {unit}) associates with protective/lower risk profile relative to population baseline."

            factors.append(FactorImpact(
                feature=feat,
                label=label,
                patient_value=val,
                population_baseline=pop_mean,
                unit=unit,
                impact_score=impact,
                direction=direction,
                description=desc
            ))

        # Sort by absolute impact magnitude descending
        factors.sort(key=lambda x: abs(x.impact_score), reverse=True)
        return factors[:6] # Return top 6 key contributing factors

    def _generate_recommendations(
        self,
        disease_key: str,
        risk_level: str,
        input_dict: Dict[str, Any],
        important_factors: List[FactorImpact]
    ) -> List[Recommendation]:
        """
        Generates structured, non-prescriptive health lifestyle and follow-up guidance.
        """
        recs = []

        # Urgent medical disclaimer for high risk
        if risk_level == "High Risk":
            recs.append(Recommendation(
                category="Clinical Consultation",
                title="Professional Medical Follow-Up Recommended",
                advice="Your estimated risk score is in the higher tier. We strongly recommend scheduling a clinical evaluation with your physician or specialist to review your lab panels and cardiovascular health.",
                priority="high"
            ))
        elif risk_level == "Moderate Risk":
            recs.append(Recommendation(
                category="Preventive Care",
                title="Proactive Monitoring Advised",
                advice="Your inputs place you in a moderate risk bracket. Consider discussing these indicators during your next routine health checkup.",
                priority="medium"
            ))
        else:
            recs.append(Recommendation(
                category="Wellness",
                title="Maintain Healthy Habits",
                advice="Your current parameters suggest a lower statistical risk. Continue adhering to balanced nutrition, regular physical activity, and scheduled screenings.",
                priority="routine"
            ))

        # Factor-specific guidance
        for factor in important_factors:
            f = factor.feature
            val = factor.patient_value

            if f in ["trestbps", "blood_pressure"] and val > 130:
                recs.append(Recommendation(
                    category="Blood Pressure",
                    title="Cardiovascular Pressure Management",
                    advice="Resting blood pressure above 130 mmHg was identified. Monitor readings weekly, maintain moderate sodium intake (<2,300 mg/day), and practice stress-reduction techniques.",
                    priority="high" if val > 140 else "medium"
                ))
            elif f in ["glucose", "avg_glucose_level", "blood_glucose_random"] and val > 125:
                recs.append(Recommendation(
                    category="Metabolic Health",
                    title="Glycemic Control & Carb Awareness",
                    advice="Elevated blood glucose levels strongly influence risk. Prioritize low glycemic-index whole grains, increase soluble fiber, and schedule an HbA1c test with your doctor.",
                    priority="high"
                ))
            elif f == "bmi" and val >= 28.0:
                recs.append(Recommendation(
                    category="Weight & Metabolism",
                    title="Targeted Weight Optimization",
                    advice=f"Your recorded BMI of {val} kg/m² is a contributing factor. A steady 5-10% body weight reduction through caloric mindfulness and daily movement significantly lowers systemic risk.",
                    priority="medium"
                ))
            elif f == "chol" and val > 220:
                recs.append(Recommendation(
                    category="Lipid Profile",
                    title="Cholesterol & Lipid Balance",
                    advice="Serum cholesterol is elevated above recommended thresholds. Consider reducing saturated and trans-fat intake while emphasizing heart-healthy omega-3 fatty acids.",
                    priority="medium"
                ))
            elif f in ["smoking_status", "exang"] and val > 0:
                recs.append(Recommendation(
                    category="Lifestyle",
                    title="Vascular Health & Smoking Cessation",
                    advice="Tobacco exposure accelerates endothelial damage. Clinical smoking cessation programs provide proven behavioral and pharmacotherapy support.",
                    priority="high"
                ))

        # Ensure at least 3 high quality recommendations
        if len(recs) < 3:
            recs.append(Recommendation(
                category="Physical Activity",
                title="Consistent Aerobic Movement",
                advice="Aim for at least 150 minutes of moderate-intensity exercise (e.g. brisk walking, cycling) per week to support optimal circulation and metabolic resilience.",
                priority="routine"
            ))

        return recs[:4]

# Global singleton
ml_service = MLService()
