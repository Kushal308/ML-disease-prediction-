import React from 'react';
import { Activity, ShieldAlert, Cpu, Heart, Database, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Medical Disclaimer Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-wide uppercase text-amber-300">
              Important Medical & Clinical Disclaimer
            </h4>
            <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
              This system provides machine-learning-based risk estimates for educational and informational purposes only. 
              It is not a medical diagnosis. Please consult a qualified healthcare professional for medical advice, 
              diagnostic evaluation, and personalized treatment planning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-mediblue-600 to-mediteal-500 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                MediPredict AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Machine Learning Based Disease Risk Prediction System. Bridging clinical benchmark datasets and modern explainable AI for proactive health intelligence.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-mediteal-400" />
              <span>Row-Level Security & Encrypted Data</span>
            </div>
          </div>

          {/* Quick Models */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Prediction Models
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('predict', 'heart')} className="hover:text-mediblue-400 transition">
                  Heart Disease (Cardiovascular)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('predict', 'diabetes')} className="hover:text-mediblue-400 transition">
                  Diabetes (Metabolic Risk)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('predict', 'kidney')} className="hover:text-mediblue-400 transition">
                  Kidney Disease (Renal CKD)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('predict', 'liver')} className="hover:text-mediblue-400 transition">
                  Liver Disease (Hepatic Function)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('predict', 'stroke')} className="hover:text-mediblue-400 transition">
                  Stroke (Cerebrovascular Event)
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-mediblue-400 transition">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-mediblue-400 transition">
                  Clinical Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-mediblue-400 transition">
                  Prediction History
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('performance')} className="hover:text-mediblue-400 transition">
                  Model Evaluation Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-mediblue-400 transition">
                  AI Architecture & Limitations
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Technology & Pipeline
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-mediblue-400" />
                <span>FastAPI + Pydantic ML Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-mediteal-400" />
                <span>Scikit-learn (Joblib Ensembles)</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>Supabase PostgreSQL + RLS</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Explainable AI Factor Attribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediPredict AI. Machine Learning Based Disease Risk Prediction System.</p>
          <p className="text-[11px] text-slate-500">
            For academic, major project demonstration, and research evaluation purposes.
          </p>
        </div>

      </div>
    </footer>
  );
};
