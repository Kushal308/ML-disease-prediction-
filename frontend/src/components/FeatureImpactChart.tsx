import React from 'react';
import { FactorImpact } from '../types/disease';
import { HelpCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FeatureImpactChartProps {
  factors: FactorImpact[];
}

export const FeatureImpactChart: React.FC<FeatureImpactChartProps> = ({ factors }) => {
  if (!factors || factors.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-xs">
        No specific feature contribution data available for this prediction.
      </div>
    );
  }

  // Find max absolute impact to normalize widths
  const maxAbs = Math.max(...factors.map((f) => Math.abs(f.impact_score)), 0.1);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Model Factor Attributions</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-mediblue-100 text-mediblue-700">
              Explainable AI (XAI)
            </span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical weight each health parameter added towards or against the estimated risk.
          </p>
        </div>
      </div>

      {/* Factors List */}
      <div className="space-y-4">
        {factors.map((factor, idx) => {
          const absImpact = Math.abs(factor.impact_score);
          const widthPct = Math.min(Math.round((absImpact / maxAbs) * 100), 100);
          const isRisk = factor.direction === 'increases_risk';
          const isProtective = factor.direction === 'decreases_risk';

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center gap-2">
                  {isRisk ? (
                    <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </span>
                  ) : isProtective ? (
                    <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
                      <TrendingDown className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-md bg-slate-50 text-slate-400">
                      <Minus className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="font-bold text-slate-800">{factor.label}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">
                    Patient Value: <strong className="text-slate-800">{factor.patient_value} {factor.unit}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    (Avg: {factor.population_baseline} {factor.unit})
                  </span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex items-center">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isRisk
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : isProtective
                      ? 'bg-gradient-to-r from-teal-400 to-emerald-500'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.max(widthPct, 6)}%` }}
                />
              </div>

              {/* Factor Description Note */}
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Important Explainability Note */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Interpretation Note:</strong> These attributions reflect statistical associations within the trained dataset and 
          do not imply direct medical causation. An elevated factor does not necessarily cause disease independently.
        </span>
      </div>
    </div>
  );
};
