"""
MediPredict AI - Prediction Storage Service
Supports Supabase persistence when credentials are provided,
with automatic SQLite fallback for zero-friction local execution.
"""

import os
import sqlite3
import json
import uuid
import datetime
from typing import List, Dict, Any, Optional

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "predictions.db"))

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            user_email TEXT,
            disease TEXT,
            disease_key TEXT,
            risk_level TEXT,
            risk_probability REAL,
            prediction INTEGER,
            model_name TEXT,
            created_at TEXT,
            input_data TEXT,
            important_factors TEXT,
            recommendations TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

class PredictionStorageService:
    def __init__(self):
        self.supabase_url = os.environ.get("SUPABASE_URL")
        self.supabase_key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_ANON_KEY")
        self.supabase_client = None

        if self.supabase_url and self.supabase_key:
            try:
                from supabase import create_client
                self.supabase_client = create_client(self.supabase_url, self.supabase_key)
                print("[StorageService] Initialized Supabase connection.")
            except Exception as e:
                print(f"[StorageService] Supabase init failed: {e}. Using local SQLite.")

    def save_prediction(self, user_id: Optional[str], user_email: Optional[str], prediction_data: Dict[str, Any]) -> Dict[str, Any]:
        record_id = str(uuid.uuid4())
        created_at = prediction_data.get("timestamp") or datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        # Save to SQLite
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO predictions (
                    id, user_id, user_email, disease, disease_key, risk_level,
                    risk_probability, prediction, model_name, created_at,
                    input_data, important_factors, recommendations
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                record_id,
                user_id or "anonymous",
                user_email or "guest@medipredict.ai",
                prediction_data["disease"],
                prediction_data["disease_key"],
                prediction_data["risk_level"],
                prediction_data["risk_probability"],
                prediction_data["prediction"],
                prediction_data["model_info"]["algorithm"],
                created_at,
                json.dumps(prediction_data.get("input_data", {})),
                json.dumps([f if isinstance(f, dict) else f.model_dump() for f in prediction_data.get("important_factors", [])]),
                json.dumps([r if isinstance(r, dict) else r.model_dump() for r in prediction_data.get("recommendations", [])])
            ))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[StorageService] Error saving to SQLite: {e}")

        # Optional Supabase sync
        if self.supabase_client:
            try:
                self.supabase_client.table("predictions").insert({
                    "id": record_id,
                    "user_id": user_id,
                    "disease": prediction_data["disease"],
                    "disease_key": prediction_data["disease_key"],
                    "risk_level": prediction_data["risk_level"],
                    "risk_probability": prediction_data["risk_probability"],
                    "model_name": prediction_data["model_info"]["algorithm"],
                    "input_data": prediction_data.get("input_data", {}),
                    "created_at": created_at
                }).execute()
            except Exception as e:
                print(f"[StorageService] Supabase insert note: {e}")

        return {"id": record_id, "status": "saved", "created_at": created_at}

    def get_history(self, user_id: Optional[str] = None, limit: int = 50) -> List[Dict[str, Any]]:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        if user_id and user_id != "anonymous":
            cursor.execute("""
                SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
            """, (user_id, limit))
        else:
            cursor.execute("""
                SELECT * FROM predictions ORDER BY created_at DESC LIMIT ?
            """, (limit,))

        rows = cursor.fetchall()
        results = []
        for r in rows:
            results.append({
                "id": r["id"],
                "user_id": r["user_id"],
                "user_email": r["user_email"],
                "disease": r["disease"],
                "disease_key": r["disease_key"],
                "risk_level": r["risk_level"],
                "risk_probability": r["risk_probability"],
                "prediction": r["prediction"],
                "model_name": r["model_name"],
                "created_at": r["created_at"],
                "input_data": json.loads(r["input_data"]) if r["input_data"] else {},
                "important_factors": json.loads(r["important_factors"]) if r["important_factors"] else [],
                "recommendations": json.loads(r["recommendations"]) if r["recommendations"] else []
            })
        conn.close()
        return results

prediction_storage = PredictionStorageService()
