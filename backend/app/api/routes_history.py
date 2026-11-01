from fastapi import APIRouter, Query
from typing import Optional
from app.schemas.disease_schemas import SavePredictionRequest
from app.services.prediction_storage import prediction_storage

router = APIRouter(prefix="/api/predictions", tags=["Predictions History & Persistence"])

@router.post("/save")
async def save_prediction(request: SavePredictionRequest):
    result = prediction_storage.save_prediction(
        user_id=request.user_id,
        user_email=request.user_email,
        prediction_data=request.prediction_result.model_dump()
    )
    return result

@router.get("/history")
async def get_prediction_history(user_id: Optional[str] = Query(None), limit: int = Query(50)):
    return prediction_storage.get_history(user_id=user_id, limit=limit)
