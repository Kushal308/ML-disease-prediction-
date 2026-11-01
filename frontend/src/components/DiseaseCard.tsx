import React from 'react';
import { DiseaseConfig } from '../types/disease';
import { Heart, Activity, Brain, Droplets, ArrowRight, ShieldCheck } from 'lucide-react';

interface DiseaseCardProps {
  config: DiseaseConfig;
  onSelect: (key: string) => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ config, onSelect }) => {
  const renderIcon = () => {
    switch (config.iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-500" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-teal-500" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-purple-500" />;
      case 'Activity':
      default:
        return <Activity className="w-6 h-6 text-mediblue-600" />;
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between border border-slate-200/90 relative group overflow-hidden bg-white/80">
      
      {/* Decorative subtle corner gradient */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500"
        style={{ backgroundColor: config.accentColor }}
      />

      <div>
        {/* Top Badges & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
            {renderIcon()}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {config.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-mediblue-700 transition-colors">
          {config.title}
        </h3>
        <p className="text-xs font-semibold text-mediblue-700/80 mb-3">
          {config.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-5">
          {config.description}
        </p>

        {/* Required Inputs Preview Tags */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Primary Inputs Evaluated
          </span>
          <div className="flex flex-wrap gap-1.5">
            {config.fields.slice(0, 4).map((f, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-slate-600"
              >
                {f.label}
              </span>
            ))}
            {config.fields.length > 4 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                +{config.fields.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => onSelect(config.key)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-mediblue-600 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg"
        >
          <span>Predict Risk</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
