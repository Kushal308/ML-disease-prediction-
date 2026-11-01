import React from 'react';
import { 
  Cpu, 
  Database, 
  Activity, 
  Layers, 
  ShieldAlert, 
  GitBranch, 
  CheckCircle2, 
  Stethoscope,
  HeartHandshake,
  AlertTriangle
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-mediblue-100 text-mediblue-800">
          Educational Reference
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About MediPredict AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Understanding machine learning in health screening, training methodology, explainable AI, and critical clinical boundaries.
        </p>
      </div>

      {/* Mandatory Non-Diagnosis Medical Disclaimer Notice */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold uppercase tracking-wider text-[11px] mb-1">
            Core Clinical Disclaimer
          </strong>
          <span>
            This system provides machine-learning-based risk estimates for educational and informational purposes only. 
            It is not a medical diagnosis. Please consult a qualified healthcare professional for medical advice, definitive diagnostic testing, and clinical management.
          </span>
        </div>
      </div>

      {/* Grid of Core Concepts */}
      <div className="space-y-8">
        
        {/* Concept 1: What is ML in Medicine */}
        <div className="glass-card rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mediblue-50 text-mediblue-600 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              What is Machine Learning?
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Machine Learning (ML) is a branch of artificial intelligence where algorithms identify mathematical patterns, correlations, and relationships within vast datasets without being explicitly programmed with rigid deterministic rules. In clinical research, ML models learn how non-linear combinations of biometric biomarkers (such as blood pressure, glucose, creatinine, and lipid fractions) correlate with positive disease occurrences across patient populations.
          </p>
        </div>

        {/* Concept 2: How Risk Prediction Works */}
        <div className="glass-card rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mediteal-50 text-mediteal-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              How Disease Risk Prediction Works
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            When a user inputs their physiological parameters into MediPredict AI, the values are mapped through our standardized feature pipeline. The trained algorithm computes a calibrated decision boundary score, which is transformed into an estimated risk probability between 0% and 100%. This probability is stratified into three intuitive risk categories: <strong>Low Risk</strong> (&lt;35%), <strong>Moderate Risk</strong> (35% - 70%), and <strong>High Risk</strong> (&gt;70%).
          </p>
        </div>

        {/* Concept 3: Why Preprocessing is Essential */}
        <div className="glass-card rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Why Data Preprocessing is Required
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Raw medical features have vastly disparate numerical scales. For example, White Blood Cell count is measured in thousands (/cumm), while urine specific gravity operates in decimals around 1.020, and serum creatinine is typically 0.8–1.5 mg/dL. Without rigorous standardization, algorithms would disproportionately overweight high-magnitude features regardless of their true clinical significance. We apply fitted <code>StandardScaler</code> pipelines during both training and real-time inference to ensure all predictors contribute fairly.
          </p>
        </div>

        {/* Concept 4: Model Training and Multi-Algorithm Comparison */}
        <div className="glass-card rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <GitBranch className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Why Multiple Models are Compared
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            No single machine learning model dominates all medical scenarios. For each condition, our automated evaluation suite trains and benchmarks four distinct architectures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 font-bold block">1. Logistic Regression</strong>
              <span className="text-slate-500">Provides calibrated probabilistic outputs and linear explainability.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 font-bold block">2. Decision Trees</strong>
              <span className="text-slate-500">Captures rule-based splits but prone to overfitting without pruning.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 font-bold block">3. Random Forest</strong>
              <span className="text-slate-500">Ensemble bagging of randomized decision trees reduces variance.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 font-bold block">4. Gradient Boosting</strong>
              <span className="text-slate-500">Sequentially minimizes residual errors for complex non-linear frontiers.</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-2 leading-relaxed">
            The champion model is selected based on out-of-sample F1-score and ROC-AUC balance to ensure high sensitivity without excessive false alerts.
          </p>
        </div>

        {/* Concept 5: Critical Limitations & Medical Responsibility */}
        <div className="glass-card rounded-3xl p-8 bg-rose-50/40 border border-rose-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-rose-950">
              Limitations of ML-Based Health Screening
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-rose-900/90 leading-relaxed list-disc list-inside">
            <li>
              <strong>Dataset Representation:</strong> Models are trained on specific historical cohort datasets. Genetic, ethnic, and demographic differences across global populations can influence baseline accuracy.
            </li>
            <li>
              <strong>Association vs Causation:</strong> An elevated factor attribution indicates a statistical correlation in the training distribution, not that the feature caused the disease.
            </li>
            <li>
              <strong>Temporal Snapshot:</strong> A single assessment cannot replace continuous longitudinal clinical records, doctor interviews, and professional diagnostic pathology.
            </li>
          </ul>

          <div className="pt-2">
            <div className="p-4 rounded-xl bg-white border border-rose-200 text-xs text-slate-700 flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-mediblue-600 shrink-0" />
              <span>
                <strong>Always Consult a Professional:</strong> Never initiate, modify, or cease any medication or medical treatment plan based solely on algorithmic estimations.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
