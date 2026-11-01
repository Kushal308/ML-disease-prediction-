# MediPredict AI
### Machine Learning Based Disease Risk Prediction System

> **Medical & Regulatory Disclaimer**  
> *This system provides machine-learning-based risk estimates for educational and informational purposes only. It is not a medical diagnosis. Please consult a qualified healthcare professional for medical advice, definitive diagnostic evaluations, and personalized treatment plans.*

---

## 1. Project Overview

**MediPredict AI** is a full-stack, enterprise-grade clinical AI platform designed to estimate statistical disease risks across five critical organ systems using supervised machine learning models:

1. **Heart Disease Risk Prediction** (Cardiovascular assessment based on Cleveland Clinic benchmark parameters)
2. **Diabetes Risk Prediction** (Type-2 metabolic likelihood using Pima Indians Diabetes parameters)
3. **Chronic Kidney Disease (CKD) Prediction** (Renal filtration and urinalysis biomarker evaluation)
4. **Liver Disease Risk Prediction** (Hepatic transaminases, bilirubin, and serum protein ratios)
5. **Stroke Risk Prediction** (Cerebrovascular event probability based on clinical and demographic indicators)

Unlike generic template projects, MediPredict AI features **actual trained machine learning pipelines**, **calibrated statistical probability estimation**, **Explainable AI (XAI)** feature attributions (detailing why the model produced the estimation), **interactive visualization gauges**, **customizable lifestyle recommendations**, and **instant clinical PDF report generation**.

---

## 2. Key Features

- **Predictive Healthcare Engine**:
  - Multi-disease support across 5 distinct clinical categories.
  - Multi-algorithm evaluation: Compares **Logistic Regression**, **Decision Trees**, **Random Forest**, and **Gradient Boosting** for each disease.
  - Class-balanced training with empirical metric evaluation (Accuracy, Precision, Recall, F1-Score, and ROC-AUC).
- **Explainable AI (XAI)**:
  - Localized feature attribution breakdowns displaying how individual patient metrics deviate from population baselines.
  - Identifies which factors increase statistical risk versus protective factors, accompanied by non-causality notices.
- **Dynamic Clinical Forms**:
  - Sliders, range selectors, dropdowns, and segmented toggles with clinical unit labels (`mmHg`, `mg/dL`, `kg/m²`, `bpm`).
  - Contextual tooltips explaining medical terminology.
  - **Quick Pre-Fill Presets**: "Normal Baseline" and "Elevated Risk Sample" buttons for testing.
- **Interactive Visualizations**:
  - Circular animated risk gauge indicating probability percentages and risk tiers (**Low Risk**, **Moderate Risk**, **High Risk**).
  - Horizontal feature attribution comparison charts.
  - Analytics dashboard with Recharts (Risk progression timeline, disease distribution donut, and risk categorical breakdown).
- **Downloadable Assessment Reports**:
  - Client-side vector PDF generation using `jsPDF` and `html2canvas` containing patient identifier, evaluated biomarkers, XAI factor impacts, and legal disclaimers.
- **Authentication & Security**:
  - Supabase integration supporting email/password authentication and Row Level Security (RLS).
  - Automatic zero-friction sandbox mode with local SQLite and browser caching for local evaluation.
  - Strict input validation via Pydantic schemas.

---

## 3. Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom glassmorphism and modern medical color palette
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **PDF Generation**: jsPDF + html2canvas

### Backend
- **Framework**: Python 3.12+ / FastAPI
- **Data Validation**: Pydantic v2
- **Server**: Uvicorn ASGI
- **CORS**: Configured for local development and production origins

### Machine Learning
- **Libraries**: Scikit-Learn, Pandas, NumPy, Joblib
- **Evaluation**: Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix
- **Persistence**: Serialized `.joblib` models and scalers, with `.json` evaluation metadata

### Database & Authentication
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Local Fallback**: SQLite (`predictions.db`) for immediate offline execution

---

## 4. System Architecture

```
[ User Browser / Client ]
           │
           ▼
[ React + TypeScript + Vite + Tailwind CSS ]
           │
           ├─── REST API Requests (JSON)
           ▼
[ FastAPI Backend Engine (Port 8000) ]
           │
           ├─── Preprocessing Pipeline (StandardScaler)
           ├─── Trained ML Models (Joblib Ensembles)
           ├─── Explainability Engine (XAI Attribution)
           │
     ┌─────┴─────────────────────┐
     ▼                           ▼
[ Supabase PostgreSQL ]   [ Local SQLite Cache ]
(Row Level Security)       (predictions.db)
```

---

## 5. Directory Structure

```
vision/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes_predict.py      # POST /api/predict/{disease}
│   │   │   ├── routes_models.py       # GET /api/model-info
│   │   │   ├── routes_history.py      # GET & POST /api/predictions/*
│   │   │   └── routes_health.py       # GET /api/health
│   │   ├── schemas/
│   │   │   └── disease_schemas.py     # Pydantic input/output schemas
│   │   ├── services/
│   │   │   ├── ml_service.py          # ML inference & XAI attributions
│   │   │   └── prediction_storage.py  # SQLite & Supabase persistence
│   │   └── main.py                    # FastAPI server entrypoint
│   ├── ml/
│   │   ├── datasets/                  # Benchmark clinical CSV datasets
│   │   │   └── generate_datasets.py   # Dataset generation & preprocessing
│   │   ├── saved_models/              # Serialized .joblib models & metadata
│   │   ├── training/
│   │   │   ├── train_heart.py
│   │   │   ├── train_diabetes.py
│   │   │   ├── train_kidney.py
│   │   │   ├── train_liver.py
│   │   │   ├── train_stroke.py
│   │   │   └── train_all.py           # Master training pipeline
│   │   └── utils/
│   │       └── evaluator.py           # Model comparison & evaluation engine
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── RiskGauge.tsx          # Circular risk progress gauge
│   │   │   ├── FeatureImpactChart.tsx # Explainable AI bar chart
│   │   │   ├── DiseaseCard.tsx
│   │   │   ├── LoadingAnalysisModal.tsx
│   │   │   └── PdfReportModal.tsx     # Downloadable clinical PDF report
│   │   ├── pages/
│   │   │   ├── HomePage.tsx           # Landing page with visual canvas & stats
│   │   │   ├── DiseaseSelectionPage.tsx
│   │   │   ├── PredictionFormPage.tsx # Dynamic disease input forms
│   │   │   ├── RiskResultPage.tsx     # Detailed assessment breakdown
│   │   │   ├── UserDashboardPage.tsx  # Analytics & Recharts trends
│   │   │   ├── PredictionHistoryPage.tsx
│   │   │   ├── ModelPerformancePage.tsx # Benchmark metrics & confusion matrices
│   │   │   ├── AboutPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── services/
│   │   │   ├── api.ts                 # FastAPI client
│   │   │   ├── supabase.ts            # Supabase client wrapper
│   │   │   └── historyStorage.ts      # Unified history cache
│   │   ├── hooks/
│   │   │   └── useAuth.tsx            # Authentication hook
│   │   ├── types/
│   │   │   └── disease.ts             # TypeScript definitions
│   │   ├── utils/
│   │   │   └── diseaseConfig.ts       # Biomarker schemas & presets
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── supabase_schema.sql                # Complete SQL schema & RLS policies
├── .env.example                       # Root environment variables guide
└── README.md
```

---

## 6. Installation & Setup Guide

### Prerequisites
- Python 3.10+ (tested with Python 3.12)
- Node.js 18+ and npm
- Git

### 1. Backend Setup

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Machine Learning Model Training

Trained models and scalers are pre-generated in `backend/ml/saved_models/`. To retrain the models from scratch:

```bash
cd backend
python ml/training/train_all.py
```

This trains all 5 disease models, compares Logistic Regression, Decision Tree, Random Forest, and Gradient Boosting, saves the champion models as `.joblib` files, and generates evaluation metadata with confusion matrices.

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Build for production validation
npm run build
```

---

## 7. Running the Application

### Start the Backend
In one terminal, from the `backend/` directory:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Backend API will be accessible at: `http://127.0.0.1:8000`  
Interactive Swagger API Documentation: `http://127.0.0.1:8000/docs`

### Start the Frontend
In another terminal, from the `frontend/` directory:
```bash
npm run dev -- --host 127.0.0.1 --port 5173
```
Frontend web application will be accessible at: `http://127.0.0.1:5173`

---

## 8. Supabase Database & Auth Configuration (Optional)

MediPredict AI runs out-of-the-box with local authentication and SQLite storage. To connect your cloud Supabase database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and execute the contents of [`supabase_schema.sql`](file:///c:/Users/KUSHAL%20D%20S/OneDrive/Desktop/vision/supabase_schema.sql).
4. In your `frontend/` folder, copy `.env.example` to `.env`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. In your `backend/` folder, set:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-supabase-service-role-key
   ```

---

## 9. API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health status and loaded models |
| `POST` | `/api/predict/heart` | Heart disease risk evaluation |
| `POST` | `/api/predict/diabetes` | Diabetes risk evaluation |
| `POST` | `/api/predict/kidney` | Chronic kidney disease evaluation |
| `POST` | `/api/predict/liver` | Liver disease risk evaluation |
| `POST` | `/api/predict/stroke` | Stroke risk evaluation |
| `GET` | `/api/model-info` | All models' benchmark evaluation metrics |
| `GET` | `/api/model-info/{disease}` | Disease-specific confusion matrix & metrics |
| `POST` | `/api/predictions/save` | Persist prediction record |
| `GET` | `/api/predictions/history` | Retrieve prediction history |

---

## 10. Verification Checklist

- [x] Full-stack architecture (FastAPI + React TypeScript + Vite).
- [x] Real trained ML models for Heart, Diabetes, Kidney, Liver, and Stroke.
- [x] Multi-algorithm comparison with confusion matrices and ROC-AUC.
- [x] Explainable AI (XAI) feature attributions showing positive and negative risk factors.
- [x] Circular animated risk gauge with Low, Moderate, and High risk tiers.
- [x] Downloadable clinical assessment PDF report.
- [x] Interactive user analytics dashboard with Recharts trends.
- [x] Prediction history with search, disease filtering, and risk category filtering.
- [x] Supabase integration with Row-Level Security and offline fallback.
- [x] Clear medical non-diagnosis disclaimer displayed throughout the application.
