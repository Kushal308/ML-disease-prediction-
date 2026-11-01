import React from 'react';
import { RiskLevel } from '../types/disease';
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskGaugeProps {
  probability: number; // 0.0 to 1.0
  riskLevel: RiskLevel;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ probability, riskLevel, size = 260 }) => {
  const percentage = Math.round(probability * 100);
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 260-degree arc for an open gauge aesthetic
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * percentage) / 100;

  // Colors based on risk level
  const config = {
    'Low Risk': {
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      label: 'Low Statistical Risk',
      description: 'Your entered parameters closely align with normal physiological baselines.',
    },
    'Moderate Risk': {
      color: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      label: 'Moderate Statistical Risk',
      description: 'Certain key indicators deviate from optimal ranges and warrant monitoring.',
    },
    'High Risk': {
      color: '#ef4444',
      bgGlow: 'rgba(239, 68, 68, 0.15)',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertCircle,
      label: 'Elevated Statistical Risk',
      description: 'Multiple clinical parameters correlate with elevated disease risk patterns.',
    },
  }[riskLevel] || {
    color: '#026bc9',
    bgGlow: 'rgba(2, 107, 201, 0.15)',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: ShieldCheck,
    label: riskLevel,
    description: 'Calculated statistical estimate.',
  };

  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* Gauge Visualization */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-[135deg] transition-all duration-700"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={config.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center Text Information */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
          <span className="text-5xl font-black tracking-tight text-slate-800">
            {percentage}%
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">
            Risk Probability
          </span>
        </div>
      </div>

      {/* Risk Category Badge */}
      <div className="mt-3 flex flex-col items-center gap-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold shadow-sm ${config.badgeBg}`}>
          <IconComponent className="w-4 h-4" />
          <span>{riskLevel}</span>
        </div>
        <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
          {config.description}
        </p>
      </div>
    </div>
  );
};
