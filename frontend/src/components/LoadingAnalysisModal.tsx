import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, Cpu, Database, BarChart3, Sparkles } from 'lucide-react';

interface LoadingAnalysisModalProps {
  isOpen: boolean;
  diseaseName: string;
}

const STAGES = [
  { id: 1, label: 'Analyzing input parameters...', icon: Database },
  { id: 2, label: 'Preprocessing & standardizing clinical data...', icon: Activity },
  { id: 3, label: 'Running trained machine learning model...', icon: Cpu },
  { id: 4, label: 'Calculating statistical risk probability...', icon: BarChart3 },
  { id: 5, label: 'Synthesizing Explainable AI insights...', icon: Sparkles },
];

export const LoadingAnalysisModal: React.FC<LoadingAnalysisModalProps> = ({ isOpen, diseaseName }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STAGES.length ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 text-center relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-mediblue-200/50 to-transparent blur-2xl pointer-events-none" />

        {/* Central Pulse Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-mediblue-600 to-mediteal-500 flex items-center justify-center text-white shadow-xl shadow-mediblue-500/30 mb-6 relative">
          <Activity className="w-10 h-10 animate-pulse" />
          <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-ping opacity-30" />
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Processing Risk Analysis
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-8">
          Evaluating health indicators against the {diseaseName} ML model.
        </p>

        {/* Stages Progress */}
        <div className="space-y-3.5 text-left">
          {STAGES.map((stage) => {
            const isDone = currentStep > stage.id;
            const isCurrent = currentStep === stage.id;
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-mediblue-50 border border-mediblue-200 shadow-sm'
                    : isDone
                    ? 'text-slate-700'
                    : 'text-slate-300'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-600'
                      : isCurrent
                      ? 'bg-mediblue-600 text-white animate-spin'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? 'text-mediblue-900 font-bold'
                      : isDone
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 mt-6 italic">
          Connecting to backend FastAPI engine...
        </p>
      </div>
    </div>
  );
};
