import React, { useRef, useState } from 'react';
import { PredictionResponse } from '../types/disease';
import { Download, X, Printer, ShieldAlert, Activity, CheckCircle, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: PredictionResponse;
  userEmail?: string;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  prediction,
  userEmail,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`MediPredict_${prediction.disease_key}_Risk_Report_${Date.now()}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not generate PDF. You can also use the Print Report button.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const percentage = Math.round(prediction.risk_probability * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Controls Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-mediblue-400" />
            <span className="font-bold text-sm tracking-wide">
              Official Assessment Summary Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-4 py-2 rounded-xl bg-mediblue-600 text-white hover:bg-mediblue-500 transition text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Rendering PDF...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Canvas */}
        <div className="p-8 sm:p-12 max-h-[80vh] overflow-y-auto bg-slate-50/50">
          <div
            ref={reportRef}
            className="p-10 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-8 print:p-0 print:border-none print:shadow-none"
          >
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-mediblue-700 text-white flex items-center justify-center shadow-md">
                  <Activity className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    MediPredict AI
                  </h1>
                  <p className="text-xs font-semibold text-slate-500">
                    Machine Learning Based Disease Risk Prediction System
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500 space-y-1">
                <p>
                  <strong>Report Date:</strong>{' '}
                  {new Date(prediction.timestamp).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p>
                  <strong>Assessment:</strong> {prediction.disease}
                </p>
                <p>
                  <strong>Identifier:</strong> {userEmail || 'Anonymous Guest Assessment'}
                </p>
              </div>
            </div>

            {/* Mandatory Non-Diagnosis Medical Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold uppercase tracking-wider text-[11px] block mb-1">
                  Non-Medical Diagnosis Notice
                </strong>
                <span>
                  {prediction.disclaimer}
                </span>
              </div>
            </div>

            {/* Risk Assessment Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-center p-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Estimated Probability
                </span>
                <p className="text-4xl font-black text-slate-900 mt-1">
                  {percentage}%
                </p>
              </div>

              <div className="text-center p-3 border-y sm:border-y-0 sm:border-x border-slate-200">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Risk Category
                </span>
                <p
                  className={`text-xl font-black mt-2 ${
                    prediction.risk_level === 'High Risk'
                      ? 'text-rose-600'
                      : prediction.risk_level === 'Moderate Risk'
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {prediction.risk_level}
                </p>
              </div>

              <div className="text-center p-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Model Algorithm
                </span>
                <p className="text-sm font-bold text-slate-800 mt-2">
                  {prediction.model_info.algorithm}
                </p>
                <span className="text-[11px] text-slate-500">
                  Acc: {(prediction.model_info.accuracy * 100).toFixed(1)}% | AUC: {prediction.model_info.roc_auc.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Evaluated Health Parameters Table */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Evaluated Clinical & Physiological Parameters
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(prediction.input_data).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <strong className="text-slate-800 font-bold text-sm mt-0.5">
                      {val}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Explainable Model Factors */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Significant Model Factor Attributions
              </h3>
              <div className="space-y-2 text-xs">
                {prediction.important_factors.slice(0, 4).map((factor, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-white flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800">{factor.label}</strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">{factor.description}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        factor.direction === 'increases_risk'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {factor.direction === 'increases_risk' ? 'Elevated' : 'Protective'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                Suggested Lifestyle & Preventive Action Items
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mediblue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-semibold">{rec.title}:</strong> {rec.advice}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Sign-off */}
            <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 space-y-1">
              <p>
                Generated by MediPredict AI Clinical Engine v1.0.0. Not a medical diagnostic device.
              </p>
              <p>
                Records are encrypted and protected under Row-Level Security policies.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
