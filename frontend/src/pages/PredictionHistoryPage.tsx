import React, { useEffect, useState } from 'react';
import { HistoryItem, PredictionResponse } from '../types/disease';
import { getUnifiedHistory } from '../services/historyStorage';
import { useAuth } from '../hooks/useAuth';
import { PdfReportModal } from '../components/PdfReportModal';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  ShieldAlert, 
  Clock, 
  Download, 
  Trash2,
  Calendar,
  Activity,
  PlusCircle,
  Eye
} from 'lucide-react';

interface PredictionHistoryPageProps {
  onNewPrediction: () => void;
}

export const PredictionHistoryPage: React.FC<PredictionHistoryPageProps> = ({ onNewPrediction }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedResult, setSelectedResult] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    getUnifiedHistory(user?.id).then((items) => {
      setHistory(items);
    });
  }, [user]);

  // Filter & Search logic
  const filteredItems = history
    .filter((item) => {
      const matchesSearch =
        item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDisease =
        diseaseFilter === 'all' || item.disease_key === diseaseFilter;

      const matchesRisk =
        riskFilter === 'all' || item.risk_level.toLowerCase() === riskFilter.toLowerCase();

      return matchesSearch && matchesDisease && matchesRisk;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleOpenReport = (item: HistoryItem) => {
    // Reconstruct PredictionResponse structure for modal
    const predResp: PredictionResponse = {
      disease: item.disease,
      disease_key: item.disease_key,
      risk_level: item.risk_level,
      risk_probability: item.risk_probability,
      prediction: item.prediction ?? (item.risk_probability >= 0.5 ? 1 : 0),
      important_factors: item.important_factors || [],
      recommendations: item.recommendations || [
        {
          category: 'Medical Follow-Up',
          title: 'Review with Practitioner',
          advice: 'Discuss these recorded parameters during your routine medical checkup.',
          priority: 'medium',
        },
      ],
      model_info: {
        algorithm: item.model_name,
        accuracy: 0.85,
        precision: 0.83,
        recall: 0.82,
        f1_score: 0.82,
        roc_auc: 0.89,
        dataset_samples: 1000,
      },
      disclaimer:
        'This system provides machine-learning-based risk estimates for educational and informational purposes only. It is not a medical diagnosis. Please consult a qualified healthcare professional for medical advice.',
      timestamp: item.created_at,
      input_data: item.input_data,
    };
    setSelectedResult(predResp);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-mediblue-700">
            Historical Records
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Prediction History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access past assessments, input values, factor attributions, and downloadable reports.
          </p>
        </div>

        <button
          onClick={onNewPrediction}
          className="px-5 py-2.5 rounded-2xl bg-mediblue-600 text-white text-xs font-bold hover:bg-mediblue-700 transition flex items-center justify-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Prediction</span>
        </button>
      </div>

      {/* Mandatory Non-Diagnosis Medical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>Medical Notice:</strong> Prediction records are confidential machine learning estimates and do not constitute an official patient medical record or diagnosis.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200/90 bg-white/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search condition or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-mediblue-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Disease filter */}
          <select
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Conditions</option>
            <option value="heart">Heart Disease</option>
            <option value="diabetes">Diabetes</option>
            <option value="kidney">Kidney Disease</option>
            <option value="liver">Liver Disease</option>
            <option value="stroke">Stroke</option>
          </select>

          {/* Risk Level filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="low risk">Low Risk</option>
            <option value="moderate risk">Moderate Risk</option>
            <option value="high risk">High Risk</option>
          </select>

          {/* Sort order toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>

      </div>

      {/* History Table */}
      <div className="glass-card rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Assessment Date</th>
                  <th className="py-3.5 px-6">Condition</th>
                  <th className="py-3.5 px-6">Risk Category</th>
                  <th className="py-3.5 px-6">Risk Probability</th>
                  <th className="py-3.5 px-6">Model Algorithm</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {new Date(item.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.disease}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-[11px] inline-flex items-center gap-1.5 ${
                          item.risk_level === 'High Risk'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.risk_level === 'Moderate Risk'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.risk_level === 'High Risk'
                              ? 'bg-rose-500'
                              : item.risk_level === 'Moderate Risk'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        {item.risk_level}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <strong className="text-slate-900 font-black text-sm">
                        {Math.round(item.risk_probability * 100)}%
                      </strong>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500">
                      {item.model_name}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenReport(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-mediblue-600 transition font-bold text-[11px] inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 p-8 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              No predictions match your criteria
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, disease filter, or risk category.
            </p>
          </div>
        )}
      </div>

      {/* PDF View Modal */}
      {selectedResult && (
        <PdfReportModal
          isOpen={Boolean(selectedResult)}
          onClose={() => setSelectedResult(null)}
          prediction={selectedResult}
          userEmail={user?.email}
        />
      )}

    </div>
  );
};
