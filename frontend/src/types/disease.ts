export type DiseaseKey = 'heart' | 'diabetes' | 'kidney' | 'liver' | 'stroke';

export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk';

export interface FactorImpact {
  feature: string;
  label: string;
  patient_value: number | string;
  population_baseline: number | string;
  unit: string;
  impact_score: number;
  direction: 'increases_risk' | 'decreases_risk' | 'neutral';
  description: string;
}

export interface Recommendation {
  category: string;
  title: string;
  advice: string;
  priority: 'high' | 'medium' | 'routine';
}

export interface ModelInfoSummary {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  dataset_samples: number;
}

export interface PredictionResponse {
  disease: string;
  disease_key: DiseaseKey;
  risk_level: RiskLevel;
  risk_probability: number;
  prediction: number;
  important_factors: FactorImpact[];
  recommendations: Recommendation[];
  model_info: ModelInfoSummary;
  disclaimer: string;
  timestamp: string;
  input_data: Record<string, any>;
}

export interface HistoryItem {
  id: string;
  user_id?: string;
  user_email?: string;
  disease: string;
  disease_key: DiseaseKey;
  risk_level: RiskLevel;
  risk_probability: number;
  prediction?: number;
  model_name: string;
  created_at: string;
  input_data: Record<string, any>;
  important_factors: FactorImpact[];
  recommendations?: Recommendation[];
}

export interface FormFieldDef {
  name: string;
  label: string;
  type: 'number' | 'slider' | 'select' | 'radio' | 'toggle';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue: number;
  description: string;
  options?: { label: string; value: number }[];
  category: 'personal' | 'vital' | 'medical' | 'lifestyle';
}

export interface DiseaseConfig {
  key: DiseaseKey;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  accentColor: string;
  secondaryColor: string;
  iconName: 'Heart' | 'Activity' | 'Brain' | 'Droplets' | 'ShieldAlert';
  benchmarkDataset: string;
  sampleNormal: Record<string, number>;
  sampleAtRisk: Record<string, number>;
  fields: FormFieldDef[];
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}
