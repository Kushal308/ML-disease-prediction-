import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Layers,
  Search,
  Lock,
  Stethoscope
} from 'lucide-react';
import { DISEASES } from '../utils/diseaseConfig';
import { DiseaseKey } from '../types/disease';

interface HomePageProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Subtle background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-mediblue-200/40 via-mediteal-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mediblue-50 border border-mediblue-200/70 text-mediblue-700 text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-mediblue-600" />
                <span>Next-Gen Machine Learning Healthcare</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Predict Health Risks Earlier with{' '}
                <span className="bg-gradient-to-r from-mediblue-600 via-mediblue-700 to-mediteal-600 bg-clip-text text-transparent">
                  Machine Learning
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                Analyze health parameters using machine learning models and understand potential disease risk through data-driven insights.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('diseases')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-mediblue-600 via-mediblue-700 to-mediteal-600 text-white font-bold text-sm shadow-xl shadow-mediblue-600/25 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <Activity className="w-5 h-5" />
                  <span>Check Your Risk</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore How It Works</span>
                </button>
              </div>

              {/* Security & Disclaimer Sub-badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Non-Diagnostic Risk Estimates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-mediblue-500" />
                  <span>Encrypted Patient Inputs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  <span>5 Evaluated ML Ensembles</span>
                </div>
              </div>
            </div>

            {/* Right Medical + AI CSS/SVG Illustration */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer decorative glow disc */}
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-mediblue-500/20 via-mediteal-400/20 to-indigo-500/20 absolute blur-2xl" />

              {/* Central Medical Scanner Graphic Frame */}
              <div className="w-full max-w-md p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xl relative">
                
                {/* Simulated Header Monitor */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800">
                      MediPredict Neural Monitor
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    LIVE ML ENGINE
                  </span>
                </div>

                {/* SVG Medical Pulse Waveform Canvas */}
                <div className="h-36 bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] text-mediteal-400 font-mono">
                    <span>ECG / VITALS WAVEFORM</span>
                    <span>98.6 BPM NORMAL</span>
                  </div>

                  {/* Animated SVG Pulse Line */}
                  <svg className="w-full h-20" viewBox="0 0 400 100" fill="none">
                    <path
                      d="M0 50 L80 50 L95 15 L115 85 L130 35 L145 65 L160 50 L240 50 L255 10 L275 90 L290 35 L305 65 L320 50 L400 50"
                      stroke="#10b78c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pulse"
                    />
                  </svg>

                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                    <span>NORMAL SINUS RHYTHM</span>
                    <span>ALGORITHM: LOGISTIC/ENSEMBLE</span>
                  </div>
                </div>

                {/* Micro Metric Widgets */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Blood Pressure
                    </span>
                    <p className="text-sm font-black text-slate-800 mt-0.5">120 / 80 mmHg</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Optimal Range</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Blood Glucose
                    </span>
                    <p className="text-sm font-black text-slate-800 mt-0.5">92 mg/dL</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Normal Fasting</span>
                  </div>
                </div>

                {/* Floating Feature Badges */}
                <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '6s' }}>
                  <div className="w-7 h-7 rounded-lg bg-mediblue-100 text-mediblue-700 flex items-center justify-center font-bold">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-900 leading-tight">AI Risk Analysis</p>
                    <p className="text-[9px] text-slate-400">Trained on clinical datasets</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '7s' }}>
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-900 leading-tight">Secure Data</p>
                    <p className="text-[9px] text-slate-400">Row-Level Security</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          <div className="text-center pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-mediblue-700 tracking-tight">
              5
            </p>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
              Disease Models
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Heart, Diabetes, Kidney, Liver, Stroke
            </p>
          </div>

          <div className="text-center pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-mediteal-600 tracking-tight">
              ML-Based
            </p>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
              Analysis Engine
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Supervised algorithms evaluated
            </p>
          </div>

          <div className="text-center pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real-Time
            </p>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
              Prediction Speed
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Instant inference via FastAPI backend
            </p>
          </div>

          <div className="text-center pt-4 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-indigo-600 tracking-tight">
              Secure
            </p>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
              User Data
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Confidentiality with PostgreSQL RLS
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION (4 STEPS) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-mediblue-100 text-mediblue-700">
            Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How MediPredict AI Works
          </h2>
          <p className="text-sm text-slate-600">
            From clinical parameter input to explainable risk attribution in four transparent phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="glass-card rounded-3xl p-7 text-center relative border border-slate-200/80 bg-white/70">
            <div className="w-12 h-12 rounded-2xl bg-mediblue-50 text-mediblue-600 mx-auto flex items-center justify-center font-bold text-lg mb-5 border border-mediblue-100">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Enter Health Data
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Users provide vital statistics, laboratory biomarkers, and lifestyle indicators through validated interactive sliders.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-3xl p-7 text-center relative border border-slate-200/80 bg-white/70">
            <div className="w-12 h-12 rounded-2xl bg-mediteal-50 text-mediteal-600 mx-auto flex items-center justify-center font-bold text-lg mb-5 border border-mediteal-100">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Data Preprocessing
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inputs are normalized using fitted StandardScaler pipelines to align with clinical benchmark distributions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-3xl p-7 text-center relative border border-slate-200/80 bg-white/70">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center font-bold text-lg mb-5 border border-indigo-100">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              ML Analysis
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              The highest-performing trained model calculates calibrated risk probability via scikit-learn ensemble weights.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-card rounded-3xl p-7 text-center relative border border-slate-200/80 bg-white/70">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center font-bold text-lg mb-5 border border-rose-100">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Risk Assessment
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generates visual risk tiers (Low, Moderate, High), explainable feature attributions, and evidence-informed recommendations.
            </p>
          </div>

        </div>
      </section>

      {/* SUPPORTED DISEASE MODELS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-mediblue-700">
              Diagnostic Models
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explore Available Risk Predictors
            </h2>
          </div>
          <button
            onClick={() => onNavigate('diseases')}
            className="text-xs font-bold text-mediblue-700 hover:text-mediblue-800 flex items-center gap-1"
          >
            <span>View All Parameters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(DISEASES).map((disease) => (
            <div
              key={disease.key}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200/80 bg-white/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {disease.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {disease.fields.length} inputs
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {disease.title}
                </h3>
                <p className="text-xs text-mediblue-700 font-semibold mb-2">
                  {disease.subtitle}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {disease.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate('predict', disease.key)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-mediblue-600 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Assess {disease.title} Risk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Performance Benchmark Highlight Card */}
          <div className="glass-card rounded-3xl p-6 border border-mediblue-200 bg-gradient-to-br from-mediblue-50/50 to-white flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-mediblue-100 text-mediblue-800">
                Evaluation Benchmarks
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-4">
                Model Evaluation & Metrics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Inspect accuracy, precision, recall, F1 scores, ROC-AUC, and confusion matrices generated by our Python ML pipeline.
              </p>
            </div>

            <button
              onClick={() => onNavigate('performance')}
              className="w-full py-2.5 rounded-xl bg-mediblue-600 text-white hover:bg-mediblue-700 text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Technical Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-mediblue-950 to-slate-900 text-white p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mediblue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Take Control of Your Health Risk Awareness Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Fast, confidential machine-learning predictions backed by real models and transparent explanations.
          </p>

          <button
            onClick={() => onNavigate('diseases')}
            className="px-8 py-4 rounded-2xl bg-mediblue-500 hover:bg-mediblue-400 text-white text-sm font-bold shadow-lg shadow-mediblue-500/30 transition transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Select a Disease Model</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

    </div>
  );
};
