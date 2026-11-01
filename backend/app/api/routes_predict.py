from fastapi import APIRouter, HTTPException
from app.schemas.disease_schemas import (
    HeartPredictionInput,
    DiabetesPredictionInput,
    KidneyPredictionInput,
    LiverPredictionInput,
    StrokePredictionInput,
    PredictionResponse
)
from app.services.ml_service import ml_service

router = APIRouter(prefix="/api/predict", tags=["Disease Risk Predictions"])

@router.post("/heart", response_model=PredictionResponse)
async def predict_heart_risk(input_data: HeartPredictionInput):
    try:
        return ml_service.predict("heart", input_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/diabetes", response_model=PredictionResponse)
async def predict_diabetes_risk(input_data: DiabetesPredictionInput):
    try:
        return ml_service.predict("diabetes", input_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/kidney", response_model=PredictionResponse)
async def predict_kidney_risk(input_data: KidneyPredictionInput):
    try:
        return ml_service.predict("kidney", input_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/liver", response_model=PredictionResponse)
async def predict_liver_risk(input_data: LiverPredictionInput):
    try:
        return ml_service.predict("liver", input_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/stroke", response_model=PredictionResponse)
async def predict_stroke_risk(input_data: StrokePredictionInput):
    try:
        return ml_service.predict("stroke", input_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
