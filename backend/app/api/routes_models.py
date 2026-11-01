from fastapi import APIRouter, HTTPException
from app.services.ml_service import ml_service

router = APIRouter(prefix="/api/model-info", tags=["Model Information & Metrics"])

@router.get("")
async def get_all_models_info():
    """Returns technical evaluation metrics, dataset sizes, and feature importances for all 5 models."""
    return ml_service.get_all_models_info()

@router.get("/{disease_key}")
async def get_disease_model_info(disease_key: str):
    """Returns detailed technical comparison and confusion matrices for a specific disease model."""
    info = ml_service.get_model_info_by_disease(disease_key.lower())
    if not info:
        raise HTTPException(status_code=404, detail=f"Model for disease '{disease_key}' not found.")
    return info
