import { DiseaseConfig, DiseaseKey } from '../types/disease';

export const DISEASES: Record<DiseaseKey, DiseaseConfig> = {
  heart: {
    key: 'heart',
    title: 'Heart Disease',
    subtitle: 'Cardiovascular Risk Assessment',
    description: 'Estimate cardiovascular disease risk using resting blood pressure, cholesterol, ECG indicators, and cardiac stress factors.',
    badge: 'Cardiovascular',
    accentColor: '#026bc9',
    secondaryColor: '#e0effe',
    iconName: 'Heart',
    benchmarkDataset: 'Cleveland Heart Disease Benchmark',
    sampleNormal: {
      age: 42,
      sex: 0,
      cp: 0,
      trestbps: 118,
      chol: 185,
      fbs: 0,
      restecg: 0,
      thalach: 165,
      exang: 0,
      oldpeak: 0.2,
      slope: 0,
      ca: 0,
      thal: 1
    },
    sampleAtRisk: {
      age: 63,
      sex: 1,
      cp: 3,
      trestbps: 155,
      chol: 288,
      fbs: 1,
      restecg: 1,
      thalach: 118,
      exang: 1,
      oldpeak: 2.8,
      slope: 2,
      ca: 2,
      thal: 3
    },
    fields: [
      // Personal
      {
        name: 'age',
        label: 'Age',
        type: 'slider',
        min: 18,
        max: 95,
        step: 1,
        unit: 'years',
        defaultValue: 50,
        description: 'Chronological age in completed years.',
        category: 'personal'
      },
      {
        name: 'sex',
        label: 'Biological Sex',
        type: 'radio',
        defaultValue: 1,
        description: 'Biological sex assigned at birth.',
        options: [
          { label: 'Male', value: 1 },
          { label: 'Female', value: 0 }
        ],
        category: 'personal'
      },
      // Vital
      {
        name: 'trestbps',
        label: 'Resting Blood Pressure',
        type: 'slider',
        min: 85,
        max: 210,
        step: 1,
        unit: 'mmHg',
        defaultValue: 125,
        description: 'Resting systemic blood pressure on admission.',
        category: 'vital'
      },
      {
        name: 'chol',
        label: 'Serum Cholesterol',
        type: 'slider',
        min: 120,
        max: 500,
        step: 1,
        unit: 'mg/dL',
        defaultValue: 220,
        description: 'Total serum cholesterol level.',
        category: 'vital'
      },
      {
        name: 'thalach',
        label: 'Max Heart Rate Achieved',
        type: 'slider',
        min: 70,
        max: 210,
        step: 1,
        unit: 'bpm',
        defaultValue: 150,
        description: 'Maximum heart rate recorded during peak cardiovascular exertion.',
        category: 'vital'
      },
      // Medical
      {
        name: 'cp',
        label: 'Chest Pain Type',
        type: 'select',
        defaultValue: 0,
        description: 'Clinical characteristics of thoracic chest discomfort.',
        options: [
          { label: 'Typical Angina (Exertional Substernal Pain)', value: 0 },
          { label: 'Atypical Angina (Non-exertional variant)', value: 1 },
          { label: 'Non-Anginal Pain (Musculoskeletal / Pleuritic)', value: 2 },
          { label: 'Asymptomatic (No overt pain symptoms)', value: 3 }
        ],
        category: 'medical'
      },
      {
        name: 'restecg',
        label: 'Resting Electrocardiogram (ECG)',
        type: 'select',
        defaultValue: 0,
        description: 'Standard 12-lead resting electrocardiographic interpretation.',
        options: [
          { label: 'Normal ECG Rhythm', value: 0 },
          { label: 'ST-T Wave Abnormality (T-wave inversions/shifts)', value: 1 },
          { label: 'Left Ventricular Hypertrophy (Estes criteria)', value: 2 }
        ],
        category: 'medical'
      },
      {
        name: 'oldpeak',
        label: 'ST Depression (Oldpeak)',
        type: 'slider',
        min: 0.0,
        max: 6.0,
        step: 0.1,
        unit: 'mm',
        defaultValue: 1.0,
        description: 'ST depression induced by exercise test relative to resting baseline.',
        category: 'medical'
      },
      {
        name: 'slope',
        label: 'Slope of Peak Exercise ST',
        type: 'select',
        defaultValue: 1,
        description: 'Geometry of the ST segment at peak exercise duration.',
        options: [
          { label: 'Upsloping (Physiological recovery)', value: 0 },
          { label: 'Flat (Ischemic indicator)', value: 1 },
          { label: 'Downsloping (Severe ischemic depression)', value: 2 }
        ],
        category: 'medical'
      },
      {
        name: 'ca',
        label: 'Major Vessels Colored',
        type: 'slider',
        min: 0,
        max: 3,
        step: 1,
        unit: 'vessels',
        defaultValue: 0,
        description: 'Number of major coronary blood vessels (0-3) visualized by fluoroscopy.',
        category: 'medical'
      },
      {
        name: 'thal',
        label: 'Thalassemia Defect Status',
        type: 'select',
        defaultValue: 2,
        description: 'Myocardial nuclear perfusion scan status.',
        options: [
          { label: 'Normal Perfusion', value: 1 },
          { label: 'Fixed Perfusion Defect (Prior infarction)', value: 2 },
          { label: 'Reversible Defect (Active ischemia)', value: 3 }
        ],
        category: 'medical'
      },
      // Lifestyle
      {
        name: 'fbs',
        label: 'Fasting Blood Sugar > 120 mg/dL',
        type: 'radio',
        defaultValue: 0,
        description: 'Indicator if fasting blood sugar exceeds pre-diabetic threshold.',
        options: [
          { label: 'No (Normal ≤ 120 mg/dL)', value: 0 },
          { label: 'Yes (Elevated > 120 mg/dL)', value: 1 }
        ],
        category: 'lifestyle'
      },
      {
        name: 'exang',
        label: 'Exercise Induced Angina',
        type: 'radio',
        defaultValue: 0,
        description: 'Precipitation of angina pectoris during physical exercise.',
        options: [
          { label: 'No Angina with exertion', value: 0 },
          { label: 'Yes (Exercise provokes chest tightness)', value: 1 }
        ],
        category: 'lifestyle'
      }
    ]
  },

  diabetes: {
    key: 'diabetes',
    title: 'Diabetes',
    subtitle: 'Type-2 Metabolic Risk Model',
    description: 'Estimate diabetes risk from plasma glucose, insulin levels, BMI, pedigree lineage, and physiological indicators.',
    badge: 'Metabolic',
    accentColor: '#10b78c',
    secondaryColor: '#ecfdf7',
    iconName: 'Droplets',
    benchmarkDataset: 'Pima Indians Diabetes Benchmark',
    sampleNormal: {
      pregnancies: 1,
      glucose: 95,
      blood_pressure: 68,
      skin_thickness: 18,
      insulin: 60,
      bmi: 22.4,
      diabetes_pedigree: 0.28,
      age: 28
    },
    sampleAtRisk: {
      pregnancies: 5,
      glucose: 172,
      blood_pressure: 88,
      skin_thickness: 34,
      insulin: 220,
      bmi: 36.8,
      diabetes_pedigree: 0.95,
      age: 52
    },
    fields: [
      {
        name: 'age',
        label: 'Age',
        type: 'slider',
        min: 18,
        max: 90,
        step: 1,
        unit: 'years',
        defaultValue: 35,
        description: 'Patient age in years.',
        category: 'personal'
      },
      {
        name: 'pregnancies',
        label: 'Pregnancies',
        type: 'slider',
        min: 0,
        max: 15,
        step: 1,
        unit: 'times',
        defaultValue: 1,
        description: 'Number of full-term pregnancies (set 0 for males or no history).',
        category: 'personal'
      },
      {
        name: 'glucose',
        label: 'Plasma Glucose Concentration',
        type: 'slider',
        min: 50,
        max: 260,
        step: 1,
        unit: 'mg/dL',
        defaultValue: 110,
        description: 'Plasma glucose concentration at 2 hours in an oral glucose tolerance test.',
        category: 'vital'
      },
      {
        name: 'blood_pressure',
        label: 'Diastolic Blood Pressure',
        type: 'slider',
        min: 40,
        max: 140,
        step: 1,
        unit: 'mmHg',
        defaultValue: 72,
        description: 'Diastolic arterial pressure during cardiac relaxation.',
        category: 'vital'
      },
      {
        name: 'bmi',
        label: 'Body Mass Index (BMI)',
        type: 'slider',
        min: 16.0,
        max: 55.0,
        step: 0.1,
        unit: 'kg/m²',
        defaultValue: 26.5,
        description: 'Ratio of mass (kg) divided by height squared (m²).',
        category: 'vital'
      },
      {
        name: 'skin_thickness',
        label: 'Triceps Skinfold Thickness',
        type: 'slider',
        min: 0,
        max: 70,
        step: 1,
        unit: 'mm',
        defaultValue: 22,
        description: 'Anthropometric measurement of subcutaneous adipose tissue.',
        category: 'medical'
      },
      {
        name: 'insulin',
        label: '2-Hour Serum Insulin',
        type: 'slider',
        min: 0,
        max: 500,
        step: 5,
        unit: 'mu U/mL',
        defaultValue: 85,
        description: 'Post-prandial serum insulin hormone concentration.',
        category: 'medical'
      },
      {
        name: 'diabetes_pedigree',
        label: 'Diabetes Pedigree Function',
        type: 'slider',
        min: 0.08,
        max: 2.2,
        step: 0.01,
        unit: 'score',
        defaultValue: 0.45,
        description: 'Genetic scoring metric reflecting family diabetes pedigree lineage.',
        category: 'lifestyle'
      }
    ]
  },

  kidney: {
    key: 'kidney',
    title: 'Kidney Disease',
    subtitle: 'Chronic Kidney Disease (CKD) Estimator',
    description: 'Assess potential chronic kidney disease risk using renal panels including creatinine, urea, albumin, and blood pressure.',
    badge: 'Renal',
    accentColor: '#089472',
    secondaryColor: '#d1faea',
    iconName: 'Activity',
    benchmarkDataset: 'Chronic Kidney Disease Benchmark',
    sampleNormal: {
      age: 38,
      blood_pressure: 75,
      specific_gravity: 1.020,
      albumin: 0,
      sugar: 0,
      blood_glucose_random: 95,
      blood_urea: 28,
      serum_creatinine: 0.8,
      sodium: 140,
      potassium: 4.2,
      hemoglobin: 15.2,
      packed_cell_volume: 45,
      white_blood_cell_count: 6800,
      red_blood_cell_count: 5.2,
      hypertension: 0,
      diabetes_mellitus: 0
    },
    sampleAtRisk: {
      age: 65,
      blood_pressure: 95,
      specific_gravity: 1.010,
      albumin: 3,
      sugar: 2,
      blood_glucose_random: 210,
      blood_urea: 82,
      serum_creatinine: 3.6,
      sodium: 130,
      potassium: 5.6,
      hemoglobin: 9.4,
      packed_cell_volume: 28,
      white_blood_cell_count: 11200,
      red_blood_cell_count: 3.4,
      hypertension: 1,
      diabetes_mellitus: 1
    },
    fields: [
      {
        name: 'age',
        label: 'Age',
        type: 'slider',
        min: 15,
        max: 90,
        step: 1,
        unit: 'years',
        defaultValue: 50,
        description: 'Patient age in years.',
        category: 'personal'
      },
      {
        name: 'blood_pressure',
        label: 'Blood Pressure',
        type: 'slider',
        min: 55,
        max: 180,
        step: 1,
        unit: 'mmHg',
        defaultValue: 75,
        description: 'Resting systolic/diastolic base pressure.',
        category: 'vital'
      },
      {
        name: 'specific_gravity',
        label: 'Urine Specific Gravity',
        type: 'select',
        defaultValue: 1.020,
        description: 'Concentration of solutes in urine relative to water.',
        options: [
          { label: '1.005 (Dilute)', value: 1.005 },
          { label: '1.010 (Low)', value: 1.010 },
          { label: '1.015 (Moderate)', value: 1.015 },
          { label: '1.020 (Optimal)', value: 1.020 },
          { label: '1.025 (Concentrated)', value: 1.025 }
        ],
        category: 'vital'
      },
      {
        name: 'albumin',
        label: 'Urine Albumin Grade',
        type: 'select',
        defaultValue: 0,
        description: 'Presence of protein in urine (proteinuria grade 0-5).',
        options: [
          { label: '0 (Negative - Healthy)', value: 0 },
          { label: '1 (Trace / Mild)', value: 1 },
          { label: '2 (Moderate)', value: 2 },
          { label: '3 (High Proteinuria)', value: 3 },
          { label: '4 (Severe)', value: 4 },
          { label: '5 (Nephrotic Level)', value: 5 }
        ],
        category: 'medical'
      },
      {
        name: 'sugar',
        label: 'Urine Sugar Grade',
        type: 'select',
        defaultValue: 0,
        description: 'Glycosuria presence in urinalysis.',
        options: [
          { label: '0 (Negative)', value: 0 },
          { label: '1 (Trace)', value: 1 },
          { label: '2 (Positive)', value: 2 },
          { label: '3 (High)', value: 3 },
          { label: '4 (Very High)', value: 4 }
        ],
        category: 'medical'
      },
      {
        name: 'serum_creatinine',
        label: 'Serum Creatinine',
        type: 'slider',
        min: 0.4,
        max: 12.0,
        step: 0.1,
        unit: 'mg/dL',
        defaultValue: 1.1,
        description: 'Kidney glomerular filtration biomarker (normal 0.6-1.2 mg/dL).',
        category: 'medical'
      },
      {
        name: 'blood_urea',
        label: 'Blood Urea Level',
        type: 'slider',
        min: 15,
        max: 250,
        step: 1,
        unit: 'mg/dL',
        defaultValue: 45,
        description: 'Waste byproduct from protein breakdown filtered by kidneys.',
        category: 'medical'
      },
      {
        name: 'blood_glucose_random',
        label: 'Random Blood Glucose',
        type: 'slider',
        min: 60,
        max: 380,
        step: 1,
        unit: 'mg/dL',
        defaultValue: 120,
        description: 'Non-fasting blood glucose level.',
        category: 'medical'
      },
      {
        name: 'hemoglobin',
        label: 'Hemoglobin',
        type: 'slider',
        min: 5.0,
        max: 18.0,
        step: 0.1,
        unit: 'g/dL',
        defaultValue: 13.5,
        description: 'Oxygen carrying protein in red blood cells.',
        category: 'medical'
      },
      {
        name: 'packed_cell_volume',
        label: 'Packed Cell Volume (PCV)',
        type: 'slider',
        min: 15,
        max: 54,
        step: 1,
        unit: '%',
        defaultValue: 40,
        description: 'Hematocrit percentage of blood volume.',
        category: 'medical'
      },
      {
        name: 'sodium',
        label: 'Serum Sodium',
        type: 'slider',
        min: 110,
        max: 160,
        step: 1,
        unit: 'mEq/L',
        defaultValue: 138,
        description: 'Serum sodium electrolyte balance.',
        category: 'medical'
      },
      {
        name: 'potassium',
        label: 'Serum Potassium',
        type: 'slider',
        min: 2.5,
        max: 8.0,
        step: 0.1,
        unit: 'mEq/L',
        defaultValue: 4.5,
        description: 'Serum potassium electrolyte balance.',
        category: 'medical'
      },
      {
        name: 'white_blood_cell_count',
        label: 'White Blood Cell Count (WBC)',
        type: 'slider',
        min: 3000,
        max: 20000,
        step: 100,
        unit: '/cumm',
        defaultValue: 7500,
        description: 'Total leukocyte count.',
        category: 'medical'
      },
      {
        name: 'red_blood_cell_count',
        label: 'Red Blood Cell Count (RBC)',
        type: 'slider',
        min: 2.0,
        max: 7.0,
        step: 0.1,
        unit: 'M/cmm',
        defaultValue: 4.8,
        description: 'Erythrocyte count in millions per cubic mm.',
        category: 'medical'
      },
      {
        name: 'hypertension',
        label: 'Hypertension Clinical History',
        type: 'radio',
        defaultValue: 0,
        description: 'Documented diagnosis or chronic medication for high blood pressure.',
        options: [
          { label: 'No Hypertension History', value: 0 },
          { label: 'Yes (Diagnosed / Treated)', value: 1 }
        ],
        category: 'lifestyle'
      },
      {
        name: 'diabetes_mellitus',
        label: 'Diabetes Mellitus History',
        type: 'radio',
        defaultValue: 0,
        description: 'Documented diagnosis of diabetes.',
        options: [
          { label: 'No Diabetes History', value: 0 },
          { label: 'Yes (Diagnosed / Treated)', value: 1 }
        ],
        category: 'lifestyle'
      }
    ]
  },

  liver: {
    key: 'liver',
    title: 'Liver Disease',
    subtitle: 'Hepatic Function Risk Assessment',
    description: 'Estimate liver disease risk using bilirubin fractions, hepatic enzymes (ALT/AST), and serum protein balances.',
    badge: 'Hepatic',
    accentColor: '#0284c7',
    secondaryColor: '#f0f9ff',
    iconName: 'Activity',
    benchmarkDataset: 'Indian Liver Patient Dataset (ILPD)',
    sampleNormal: {
      age: 36,
      gender: 1,
      total_bilirubin: 0.7,
      direct_bilirubin: 0.2,
      alkaline_phosphotase: 165,
      alamine_aminotransferase: 26,
      aspartate_aminotransferase: 24,
      total_proteins: 7.1,
      albumin: 3.8,
      albumin_and_globulin_ratio: 1.15
    },
    sampleAtRisk: {
      age: 58,
      gender: 1,
      total_bilirubin: 4.8,
      direct_bilirubin: 2.2,
      alkaline_phosphotase: 480,
      alamine_aminotransferase: 145,
      aspartate_aminotransferase: 175,
      total_proteins: 5.4,
      albumin: 2.2,
      albumin_and_globulin_ratio: 0.65
    },
    fields: [
      {
        name: 'age',
        label: 'Age',
        type: 'slider',
        min: 15,
        max: 85,
        step: 1,
        unit: 'years',
        defaultValue: 45,
        description: 'Age in completed years.',
        category: 'personal'
      },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 1,
        description: 'Biological gender indicator.',
        options: [
          { label: 'Male', value: 1 },
          { label: 'Female', value: 0 }
        ],
        category: 'personal'
      },
      {
        name: 'total_bilirubin',
        label: 'Total Bilirubin',
        type: 'slider',
        min: 0.3,
        max: 25.0,
        step: 0.1,
        unit: 'mg/dL',
        defaultValue: 1.0,
        description: 'Yellow bile pigment byproduct of hemoglobin catabolism (normal 0.2-1.2 mg/dL).',
        category: 'vital'
      },
      {
        name: 'direct_bilirubin',
        label: 'Direct (Conjugated) Bilirubin',
        type: 'slider',
        min: 0.1,
        max: 12.0,
        step: 0.1,
        unit: 'mg/dL',
        defaultValue: 0.3,
        description: 'Water-soluble conjugated bilirubin processed by liver hepatocytes.',
        category: 'vital'
      },
      {
        name: 'alkaline_phosphotase',
        label: 'Alkaline Phosphatase (ALP)',
        type: 'slider',
        min: 60,
        max: 950,
        step: 5,
        unit: 'IU/L',
        defaultValue: 190,
        description: 'Enzyme related to the bile ducts and hepatic filtration.',
        category: 'medical'
      },
      {
        name: 'alamine_aminotransferase',
        label: 'ALT / SGPT Transaminase',
        type: 'slider',
        min: 10,
        max: 450,
        step: 2,
        unit: 'IU/L',
        defaultValue: 35,
        description: 'Key enzyme released into bloodstream upon liver cell inflammation/injury.',
        category: 'medical'
      },
      {
        name: 'aspartate_aminotransferase',
        label: 'AST / SGOT Transaminase',
        type: 'slider',
        min: 10,
        max: 550,
        step: 2,
        unit: 'IU/L',
        defaultValue: 38,
        description: 'Hepatic and muscular enzyme released during cellular strain.',
        category: 'medical'
      },
      {
        name: 'total_proteins',
        label: 'Total Serum Proteins',
        type: 'slider',
        min: 3.0,
        max: 9.5,
        step: 0.1,
        unit: 'g/dL',
        defaultValue: 6.8,
        description: 'Combined albumin and globulin protein content in blood.',
        category: 'medical'
      },
      {
        name: 'albumin',
        label: 'Albumin Level',
        type: 'slider',
        min: 1.0,
        max: 5.5,
        step: 0.1,
        unit: 'g/dL',
        defaultValue: 3.5,
        description: 'Essential protein synthesized solely by the liver.',
        category: 'medical'
      },
      {
        name: 'albumin_and_globulin_ratio',
        label: 'Albumin to Globulin (A/G) Ratio',
        type: 'slider',
        min: 0.3,
        max: 2.2,
        step: 0.05,
        unit: 'ratio',
        defaultValue: 1.05,
        description: 'Fractional ratio of serum albumin relative to globulins.',
        category: 'lifestyle'
      }
    ]
  },

  stroke: {
    key: 'stroke',
    title: 'Stroke',
    subtitle: 'Cerebrovascular Event Risk Model',
    description: 'Estimate stroke risk using blood pressure history, cardiac health, glucose, BMI, and lifestyle factors.',
    badge: 'Cerebrovascular',
    accentColor: '#7c3aed',
    secondaryColor: '#f5f3ff',
    iconName: 'Brain',
    benchmarkDataset: 'Kaggle Stroke Prediction Benchmark',
    sampleNormal: {
      gender: 0,
      age: 34,
      hypertension: 0,
      heart_disease: 0,
      ever_married: 1,
      work_type: 0,
      residence_type: 1,
      avg_glucose_level: 88.5,
      bmi: 23.5,
      smoking_status: 0
    },
    sampleAtRisk: {
      gender: 1,
      age: 72,
      hypertension: 1,
      heart_disease: 1,
      ever_married: 1,
      work_type: 0,
      residence_type: 1,
      avg_glucose_level: 215.0,
      bmi: 34.2,
      smoking_status: 2
    },
    fields: [
      {
        name: 'age',
        label: 'Age',
        type: 'slider',
        min: 18,
        max: 95,
        step: 1,
        unit: 'years',
        defaultValue: 55,
        description: 'Chronological age in years.',
        category: 'personal'
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        defaultValue: 1,
        description: 'Biological gender.',
        options: [
          { label: 'Male', value: 1 },
          { label: 'Female', value: 0 }
        ],
        category: 'personal'
      },
      {
        name: 'avg_glucose_level',
        label: 'Average Blood Glucose',
        type: 'slider',
        min: 55.0,
        max: 280.0,
        step: 1.0,
        unit: 'mg/dL',
        defaultValue: 98.0,
        description: 'Fasting or average circulating blood sugar level.',
        category: 'vital'
      },
      {
        name: 'bmi',
        label: 'Body Mass Index (BMI)',
        type: 'slider',
        min: 15.0,
        max: 55.0,
        step: 0.1,
        unit: 'kg/m²',
        defaultValue: 27.2,
        description: 'Standard measure of body adiposity.',
        category: 'vital'
      },
      {
        name: 'hypertension',
        label: 'Hypertension Diagnosis',
        type: 'radio',
        defaultValue: 0,
        description: 'Diagnosed high blood pressure history.',
        options: [
          { label: 'No Hypertension History', value: 0 },
          { label: 'Yes (Diagnosed High BP)', value: 1 }
        ],
        category: 'medical'
      },
      {
        name: 'heart_disease',
        label: 'Pre-existing Heart Disease',
        type: 'radio',
        defaultValue: 0,
        description: 'Prior coronary heart disease, atrial fibrillation, or cardiac defect.',
        options: [
          { label: 'No Heart Disease', value: 0 },
          { label: 'Yes (Documented Cardiac Condition)', value: 1 }
        ],
        category: 'medical'
      },
      {
        name: 'smoking_status',
        label: 'Tobacco Smoking Status',
        type: 'select',
        defaultValue: 0,
        description: 'Cumulative tobacco and nicotine exposure history.',
        options: [
          { label: 'Never Smoked', value: 0 },
          { label: 'Formerly Smoked', value: 1 },
          { label: 'Currently Smokes', value: 2 },
          { label: 'Unknown History', value: 3 }
        ],
        category: 'lifestyle'
      },
      {
        name: 'work_type',
        label: 'Employment / Occupation',
        type: 'select',
        defaultValue: 0,
        description: 'General occupational exertion category.',
        options: [
          { label: 'Private Sector Enterprise', value: 0 },
          { label: 'Self-Employed / Business', value: 1 },
          { label: 'Government / Public Sector', value: 2 },
          { label: 'Other / Homemaker', value: 3 }
        ],
        category: 'lifestyle'
      },
      {
        name: 'residence_type',
        label: 'Living Environment',
        type: 'radio',
        defaultValue: 1,
        description: 'Primary residential environment.',
        options: [
          { label: 'Urban / Metro', value: 1 },
          { label: 'Rural / Non-Metro', value: 0 }
        ],
        category: 'lifestyle'
      },
      {
        name: 'ever_married',
        label: 'Marital Status',
        type: 'radio',
        defaultValue: 1,
        description: 'Demographic partnership record.',
        options: [
          { label: 'Yes (Married or Previously Married)', value: 1 },
          { label: 'No (Never Married)', value: 0 }
        ],
        category: 'lifestyle'
      }
    ]
  }
};
