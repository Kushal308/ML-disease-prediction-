import React, { useEffect, useState } from 'react';
import { HistoryItem, DiseaseKey } from '../types/disease';
import { getUnifiedHistory } from '../services/historyStorage';
import { useAuth } from '../hooks/useAuth';
import { 
  Activity, 
  PlusCircle, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  PieChart as PieIcon, 
  BarChart2, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';

interface UserDashboardPageProps {
  onNewPrediction: () => void;
  onViewHistory: () => void;
  onSelectHistoricalResult?: (item: HistoryItem) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onNewPrediction,
  onViewHistory,
  onSelectHistoricalResult,
}) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUnifiedHistory(user?.id).then((items) => {
      setHistory(items);
      setLoading(false);
    });
  }, [user]);

  // Compute metrics
  const totalPredictions = history.length;
  const latestItem = history.length > 0 ? history[0] : null;

  // Disease frequency count
  const diseaseCounts: Record<string, number> = {};
  const riskCounts: Record<string, number> = { 'Low Risk': 0, 'Moderate Risk': 0, 'High Risk': 0 };

  history.forEach((item) => {
    diseaseCounts[item.disease] = (diseaseCounts[item.disease] || 0) + 1;
    if (riskCounts[item.risk_level] !== undefined) {
      riskCounts[item.risk_level]++;
    }
  });

  const mostCheckedDisease = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None yet';

  // Prepare chart data
  const pieData = Object.entries(diseaseCounts).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(riskCounts).map(([name, count]) => ({ name, count }));

  // History timeline data (reverse chronological for time axis)
  const timelineData = history.slice(0, 10).reverse().map((item, idx) => ({
    label: `Test ${idx + 1}`,
    disease: item.disease,
    probability: Math.round(item.risk_probability * 100),
    date: new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  }));

  const PIE_COLORS = ['#026bc9', '#10b78c', '#089472', '#0284c7', '#7c3aed'];
  const RISK_COLORS: Record<string, string> = {
    'Low Risk': '#10b981',
    'Moderate Risk': '#f59e0b',
    'High Risk': '#ef4444',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-mediblue-700">
            Overview Dashboard
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Clinical Risk Intelligence Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics and predictive history for {user?.full_name || user?.email || 'Guest User'}.
          </p>
        </div>

        <button
          onClick={onNewPrediction}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-mediblue-600 to-mediteal-600 text-white text-xs font-bold shadow-lg shadow-mediblue-600/20 hover:scale-105 transition flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start New Prediction</span>
        </button>
      </div>

      {/* Mandatory Non-Diagnosis Medical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>Medical Notice:</strong> Dashboard risk trends provide educational tracking only. They are not clinical diagnostic indicators.
        </p>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Predictions */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/90 bg-white/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Predictions
            </span>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {totalPredictions}
            </p>
            <span className="text-[11px] text-mediblue-700 font-semibold">
              Lifetime evaluations
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-mediblue-50 text-mediblue-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Latest Risk Score */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/90 bg-white/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Latest Risk Result
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {latestItem ? `${Math.round(latestItem.risk_probability * 100)}%` : 'N/A'}
            </p>
            <span
              className={`text-[11px] font-bold ${
                latestItem?.risk_level === 'High Risk'
                  ? 'text-rose-600'
                  : latestItem?.risk_level === 'Moderate Risk'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {latestItem?.risk_level || 'No data recorded'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Most Checked Disease */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/90 bg-white/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Most Checked Condition
            </span>
            <p className="text-base font-black text-slate-900 mt-1 truncate max-w-[150px]">
              {mostCheckedDisease}
            </p>
            <span className="text-[11px] text-slate-500 font-medium">
              Primary focus area
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PieIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Last Evaluation Date */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/90 bg-white/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Last Prediction
            </span>
            <p className="text-sm font-black text-slate-900 mt-1">
              {latestItem
                ? new Date(latestItem.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Never'}
            </p>
            <span className="text-[11px] text-slate-500 font-medium">
              {latestItem ? latestItem.disease : 'No tests run'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Charts Section */}
      {totalPredictions > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Timeline Chart */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/90 bg-white/80 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Risk Probability Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Historical trend across your recent health evaluations.
                </p>
              </div>
              <span className="text-xs font-bold text-mediblue-700 bg-mediblue-50 px-2.5 py-1 rounded-lg">
                Last {timelineData.length} Tests
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#026bc9" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#026bc9" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="probability"
                    name="Risk %"
                    stroke="#026bc9"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#probGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Disease Distribution */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/90 bg-white/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Disease Distribution
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Proportion of evaluations by organ system.
              </p>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '11px',
                        border: 'none',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-slate-100">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    <span className="text-slate-600 truncate max-w-[160px]">{item.name}</span>
                  </div>
                  <strong className="text-slate-900 font-bold">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-mediblue-50 text-mediblue-600 mx-auto flex items-center justify-center">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            No Health Evaluations Recorded Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Run your first disease risk prediction to populate this analytics dashboard with personalized trend charts.
          </p>
          <button
            onClick={onNewPrediction}
            className="px-6 py-3 rounded-2xl bg-mediblue-600 text-white text-xs font-bold hover:bg-mediblue-700 transition"
          >
            Start Your First Prediction
          </button>
        </div>
      )}

      {/* Recent Predictions Table */}
      {totalPredictions > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Recent Evaluations
              </h3>
              <p className="text-xs text-slate-500">
                Latest risk estimations saved to your profile.
              </p>
            </div>

            <button
              onClick={onViewHistory}
              className="text-xs font-bold text-mediblue-700 hover:text-mediblue-800 flex items-center gap-1"
            >
              <span>View Full History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Disease Model</th>
                  <th className="pb-3">Risk Category</th>
                  <th className="pb-3">Estimated Probability</th>
                  <th className="pb-3">Model Algorithm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 text-slate-600 font-medium">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 font-bold text-slate-800">
                      {item.disease}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          item.risk_level === 'High Risk'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.risk_level === 'Moderate Risk'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {item.risk_level}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      {Math.round(item.risk_probability * 100)}%
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">
                      {item.model_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
