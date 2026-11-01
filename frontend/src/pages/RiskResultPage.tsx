import React, { useState } from 'react';
import { PredictionResponse } from '../types/disease';
import { RiskGauge } from '../components/RiskGauge';
import { FeatureImpactChart } from '../components/FeatureImpactChart';
import { PdfReportModal } from '../components/PdfReportModal';
import { recordNewPrediction } from '../services/historyStorage';
import { useAuth } from '../hooks/useAuth';
import { 
  ArrowLeft, 
  Download, 
  Bookmark, 
  History, 
  PlusCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Info,
  Heart,
  ChevronDown,
  ChevronUp,
  FileCheck2
} from 'lucide-react';

interface RiskResultPageProps {
  prediction: PredictionResponse;
  onNewPrediction: () => void;
  onViewHistory: () => void;
}

export const RiskResultPage: React.FC<RiskResultPageProps> = ({
  prediction,
  onNewPrediction,
  onViewHistory,
}) => {
  const { user } = useAuth();
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [paramsExpanded, setParamsExpanded] = useState(false);

  const handleSave = async () => {
    await recordNewPrediction(prediction, user?.id, user?.email);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3500);
  };

  const percentage = Math.round(prediction.risk_probability * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Navigation & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onNewPrediction}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Start Another Prediction</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-sm"
          >
            <Bookmark className="w-3.5 h-3.5 text-mediblue-600" />
            <span>Save Result</span>
          </button>

          <button
            onClick={() => setPdfModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-mediblue-400" />
            <span>Download PDF Report</span>
          </button>

          <button
            onClick={onViewHistory}
            className="px-4 py-2 rounded-xl bg-mediblue-50 text-mediblue-700 border border-mediblue-200 text-xs font-bold hover:bg-mediblue-100 transition flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" />
            <span>View History</span>
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {savedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Prediction result successfully saved to your clinical history record!</span>
        </div>
      )}

      {/* Mandatory Non-Diagnosis Medical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold uppercase tracking-wider text-[11px] mb-0.5">
            Non-Medical Diagnosis Notice
          </strong>
          <span>
            {prediction.disclaimer}
          </span>
        </div>
      </div>

      {/* Hero Assessment Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Risk Gauge & Score */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200/90 bg-white/90 shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Evaluation Output
              </span>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {prediction.disease}
              </span>
            </div>

            {/* Circular Gauge */}
            <RiskGauge
              probability={prediction.risk_probability}
              riskLevel={prediction.risk_level}
            />
          </div>

          {/* Model Algorithm Box */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Selected Model</span>
              <p className="font-bold text-slate-800 mt-0.5">{prediction.model_info.algorithm}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Model ROC-AUC</span>
              <p className="font-bold text-slate-800 mt-0.5">{(prediction.model_info.roc_auc * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Right Column: Explainable AI Factors */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white/90 shadow-lg flex flex-col justify-between">
          <FeatureImpactChart factors={prediction.important_factors} />
        </div>

      </div>

      {/* Recommendations Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white/90 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Evidence-Informed Clinical & Lifestyle Guidance</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Suggested non-prescriptive action items customized to your high-influence parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prediction.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                rec.priority === 'high'
                  ? 'bg-rose-50/50 border-rose-200'
                  : rec.priority === 'medium'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    rec.priority === 'high'
                      ? 'bg-rose-100 text-rose-800'
                      : rec.priority === 'medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {rec.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 capitalize">
                  {rec.priority} Priority
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {rec.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {rec.advice}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Parameters Recap */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <button
          onClick={() => setParamsExpanded(!paramsExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-mediblue-600" />
            <span className="text-sm font-bold text-slate-900">
              Review Evaluated Parameters ({Object.keys(prediction.input_data).length} Inputs)
            </span>
          </div>
          {paramsExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {paramsExpanded && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-slate-100">
            {Object.entries(prediction.input_data).map(([key, val]) => (
              <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-black text-slate-800 mt-1 block">
                  {val}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onNewPrediction}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-mediblue-600 text-white font-bold text-xs hover:bg-mediblue-700 transition flex items-center justify-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Prediction</span>
        </button>

        <button
          onClick={() => setPdfModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Assessment PDF</span>
        </button>
      </div>

      {/* PDF Generation Modal */}
      <PdfReportModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        prediction={prediction}
        userEmail={user?.email}
      />

    </div>
  );
};
