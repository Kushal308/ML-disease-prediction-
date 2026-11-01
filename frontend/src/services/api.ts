import { DiseaseKey, PredictionResponse, ModelInfoSummary, HistoryItem } from '../types/disease';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<{ status: string; models_count: number; loaded_models: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
    return await res.json();
  } catch (err: any) {
    throw new Error(`Unable to connect to backend server at ${API_BASE}. Please ensure FastAPI is running.`);
  }
}

export async function predictDisease(
  diseaseKey: DiseaseKey,
  inputData: Record<string, number>
): Promise<PredictionResponse> {
  const url = `${API_BASE}/api/predict/${diseaseKey}`;
  
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
  } catch (err: any) {
    throw new Error(`Connection error: Could not reach ML prediction server at ${API_BASE}. Please ensure the backend is started.`);
  }

  if (!res.ok) {
    let errorDetail = `Error ${res.status}: ${res.statusText}`;
    try {
      const errJson = await res.json();
      if (errJson.details && Array.isArray(errJson.details)) {
        errorDetail = errJson.details.map((d: any) => `${d.field}: ${d.message}`).join(', ');
      } else if (errJson.message) {
        errorDetail = errJson.message;
      } else if (errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorDetail);
  }

  return await res.json();
}

export async function getAllModelsInfo(): Promise<Record<string, any>> {
  const res = await fetch(`${API_BASE}/api/model-info`);
  if (!res.ok) throw new Error('Failed to retrieve model performance benchmarks');
  return await res.json();
}

export async function getDiseaseModelInfo(diseaseKey: DiseaseKey): Promise<any> {
  const res = await fetch(`${API_BASE}/api/model-info/${diseaseKey}`);
  if (!res.ok) throw new Error(`Failed to retrieve details for ${diseaseKey}`);
  return await res.json();
}

export async function savePredictionResult(
  prediction: PredictionResponse,
  userId?: string,
  userEmail?: string
): Promise<{ id: string; status: string; created_at: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/predictions/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        user_email: userEmail,
        prediction_result: prediction,
      }),
    });
    if (!res.ok) throw new Error('Failed to save to database');
    return await res.json();
  } catch (err) {
    console.warn('Backend save notice (continuing with local cache):', err);
    return {
      id: 'local-' + Date.now(),
      status: 'cached_locally',
      created_at: prediction.timestamp,
    };
  }
}

export async function fetchPredictionHistory(userId?: string): Promise<HistoryItem[]> {
  try {
    const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
    const res = await fetch(`${API_BASE}/api/predictions/history${query}`);
    if (!res.ok) throw new Error('Failed to fetch history');
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch server history, falling back to local cache.');
    return [];
  }
}
