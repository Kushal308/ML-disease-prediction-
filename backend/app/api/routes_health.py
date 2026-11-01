from fastapi import APIRouter
import datetime
from app.services.ml_service import ml_service

router = APIRouter(tags=["Health & Status"])

@router.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "MediPredict AI - Backend Engine",
        "version": "1.0.0",
        "loaded_models": list(ml_service.models.keys()),
        "models_count": len(ml_service.models),
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }
