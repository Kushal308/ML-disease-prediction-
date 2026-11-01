import { HistoryItem, PredictionResponse } from '../types/disease';
import { fetchPredictionHistory, savePredictionResult } from './api';

const LOCAL_STORAGE_KEY = 'medipredict_history_v1';

export function getLocalHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalHistoryItem(item: HistoryItem): void {
  try {
    const current = getLocalHistory();
    // Prepend new item, avoid duplicate IDs
    const updated = [item, ...current.filter((i) => i.id !== item.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 100)));
  } catch (err) {
    console.error('Failed to save history item to localStorage', err);
  }
}

export async function recordNewPrediction(
  prediction: PredictionResponse,
  userId?: string,
  userEmail?: string
): Promise<HistoryItem> {
  const saveRes = await savePredictionResult(prediction, userId, userEmail);

  const historyItem: HistoryItem = {
    id: saveRes.id || `hist-${Date.now()}`,
    user_id: userId,
    user_email: userEmail,
    disease: prediction.disease,
    disease_key: prediction.disease_key,
    risk_level: prediction.risk_level,
    risk_probability: prediction.risk_probability,
    prediction: prediction.prediction,
    model_name: prediction.model_info.algorithm,
    created_at: prediction.timestamp,
    input_data: prediction.input_data,
    important_factors: prediction.important_factors,
    recommendations: prediction.recommendations,
  };

  saveLocalHistoryItem(historyItem);
  return historyItem;
}

export async function getUnifiedHistory(userId?: string): Promise<HistoryItem[]> {
  const localItems = getLocalHistory();
  try {
    const serverItems = await fetchPredictionHistory(userId);
    if (serverItems && serverItems.length > 0) {
      // Merge unique by ID
      const map = new Map<string, HistoryItem>();
      serverItems.forEach((item) => map.set(item.id, item));
      localItems.forEach((item) => {
        if (!map.has(item.id)) map.set(item.id, item);
      });
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  } catch {
    // fallback to local
  }
  return localItems;
}
