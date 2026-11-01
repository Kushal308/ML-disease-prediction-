import React, { useState } from 'react';
import { DiseaseKey, FormFieldDef, PredictionResponse } from '../types/disease';
import { DISEASES } from '../utils/diseaseConfig';
import { predictDisease } from '../services/api';
import { LoadingAnalysisModal } from '../components/LoadingAnalysisModal';
import { 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  User,
  HeartPulse,
  Stethoscope,
  Activity,
  Sliders
} from 'lucide-react';

interface PredictionFormPageProps {
  diseaseKey: DiseaseKey;
  onBack: () => void;
  onPredictionComplete: (result: PredictionResponse) => void;
}

export const PredictionFormPage: React.FC<PredictionFormPageProps> = ({
  diseaseKey,
  onBack,
  onPredictionComplete,
}) => {
  const config = DISEASES[diseaseKey] || DISEASES.heart;

  // Initialize form state with defaults
  const [formData, setFormData] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    config.fields.forEach((f) => {
      initial[f.name] = f.defaultValue;
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'vital' | 'medical' | 'lifestyle'>('all');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleInputChange = (name: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreFill = (type: 'normal' | 'atRisk') => {
    const preset = type === 'normal' ? config.sampleNormal : config.sampleAtRisk;
    setFormData((prev) => ({
      ...prev,
      ...preset,
    }));
    setErrorMessage(null);
  };

  const handleReset = () => {
    const resetVals: Record<string, number> = {};
    config.fields.forEach((f) => {
      resetVals[f.name] = f.defaultValue;
    });
    setFormData(resetVals);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const result = await predictDisease(diseaseKey, formData);
      setLoading(false);
      onPredictionComplete(result);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'An error occurred while calculating prediction.');
    }
  };

  // Group fields by category
  const personalFields = config.fields.filter((f) => f.category === 'personal');
  const vitalFields = config.fields.filter((f) => f.category === 'vital');
  const medicalFields = config.fields.filter((f) => f.category === 'medical');
  const lifestyleFields = config.fields.filter((f) => f.category === 'lifestyle');

  const renderField = (field: FormFieldDef) => {
    const value = formData[field.name] ?? field.defaultValue;

    return (
      <div
        key={field.name}
        className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-tight">
              {field.label}
            </label>
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip(field.name)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === field.name ? null : field.name)}
                className="text-slate-400 hover:text-mediblue-600 transition p-0.5"
                aria-label="Info"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>

              {activeTooltip === field.name && (
                <div className="absolute left-6 top-0 w-60 p-2.5 rounded-xl bg-slate-900 text-white text-[11px] font-normal leading-relaxed shadow-xl z-30 pointer-events-none animate-in fade-in">
                  {field.description}
                  {field.unit && (
                    <span className="block mt-1 text-[10px] text-mediteal-400">
                      Standard Unit: {field.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Current Value Display */}
          <div className="text-right">
            <span className="text-sm font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {value} {field.unit && <span className="text-[11px] font-normal text-slate-500">{field.unit}</span>}
            </span>
          </div>
        </div>

        {/* Input Controls */}
        {field.type === 'slider' && (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step || 1}
              value={value}
              onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-mediblue-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-medium text-slate-400">
              <span>{field.min} {field.unit}</span>
              <span>{field.max} {field.unit}</span>
            </div>
          </div>
        )}

        {field.type === 'select' && (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-mediblue-500"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {field.type === 'radio' && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            {field.options?.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleInputChange(field.name, opt.value)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  value === opt.value
                    ? 'bg-mediblue-50 border-mediblue-500 text-mediblue-800 font-bold shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Disease Selection</span>
        </button>

        {/* Quick Pre-fill test buttons */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Quick Fill:
          </span>
          <button
            type="button"
            onClick={() => handlePreFill('normal')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Normal Baseline</span>
          </button>
          <button
            type="button"
            onClick={() => handlePreFill('atRisk')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Elevated Risk Sample</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Form Header Banner */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-mediblue-100 text-mediblue-800">
              {config.badge}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Trained on {config.benchmarkDataset}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {config.title} Risk Assessment
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            {config.description}
          </p>
        </div>

        <div className="shrink-0 p-4 rounded-2xl bg-mediblue-50/70 border border-mediblue-100 text-xs text-mediblue-900 flex items-center gap-3">
          <Activity className="w-5 h-5 text-mediblue-600 shrink-0" />
          <span>
            {config.fields.length} clinical parameters required for real-time model evaluation.
          </span>
        </div>
      </div>

      {/* Mandatory Medical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Educational & Informational Notice:</strong> This system provides machine-learning-based risk estimates 
          for educational purposes only. It is not a medical diagnosis. Please consult a qualified healthcare professional.
        </div>
      </div>

      {/* Error state if submission failed */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>All Inputs ({config.fields.length})</span>
        </button>

        {personalFields.length > 0 && (
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'personal'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal Information ({personalFields.length})</span>
          </button>
        )}

        {vitalFields.length > 0 && (
          <button
            onClick={() => setActiveTab('vital')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vital'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Vital Indicators ({vitalFields.length})</span>
          </button>
        )}

        {medicalFields.length > 0 && (
          <button
            onClick={() => setActiveTab('medical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'medical'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Biomarkers ({medicalFields.length})</span>
          </button>
        )}

        {lifestyleFields.length > 0 && (
          <button
            onClick={() => setActiveTab('lifestyle')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lifestyle'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Lifestyle & History ({lifestyleFields.length})</span>
          </button>
        )}
      </div>

      {/* Form Submission */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeTab === 'all' || activeTab === 'personal') &&
            personalFields.map(renderField)}

          {(activeTab === 'all' || activeTab === 'vital') &&
            vitalFields.map(renderField)}

          {(activeTab === 'all' || activeTab === 'medical') &&
            medicalFields.map(renderField)}

          {(activeTab === 'all' || activeTab === 'lifestyle') &&
            lifestyleFields.map(renderField)}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Clicking analyze triggers real-time inference against our trained scikit-learn models.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-mediblue-600 via-mediblue-700 to-mediteal-600 text-white text-sm font-bold shadow-xl shadow-mediblue-600/25 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze My Risk</span>
          </button>
        </div>

      </form>

      {/* Loading Modal with stages */}
      <LoadingAnalysisModal isOpen={loading} diseaseName={config.title} />

    </div>
  );
};
