import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DiseaseSelectionPage } from './pages/DiseaseSelectionPage';
import { PredictionFormPage } from './pages/PredictionFormPage';
import { RiskResultPage } from './pages/RiskResultPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { PredictionHistoryPage } from './pages/PredictionHistoryPage';
import { ModelPerformancePage } from './pages/ModelPerformancePage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { DiseaseKey, PredictionResponse } from './types/disease';

function MainLayout() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseKey>('heart');
  const [latestPrediction, setLatestPrediction] = useState<PredictionResponse | null>(null);

  const handleNavigate = (tab: string, param?: any) => {
    if (tab === 'predict' && param) {
      setSelectedDisease(param as DiseaseKey);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDisease = (diseaseKey: DiseaseKey) => {
    setSelectedDisease(diseaseKey);
    setCurrentTab('predict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePredictionComplete = (result: PredictionResponse) => {
    setLatestPrediction(result);
    setCurrentTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentTab === 'home' && <HomePage onNavigate={handleNavigate} />}

        {currentTab === 'diseases' && (
          <DiseaseSelectionPage onSelectDisease={handleSelectDisease} />
        )}

        {currentTab === 'predict' && (
          <PredictionFormPage
            diseaseKey={selectedDisease}
            onBack={() => setCurrentTab('diseases')}
            onPredictionComplete={handlePredictionComplete}
          />
        )}

        {currentTab === 'result' && latestPrediction && (
          <RiskResultPage
            prediction={latestPrediction}
            onNewPrediction={() => setCurrentTab('diseases')}
            onViewHistory={() => setCurrentTab('history')}
          />
        )}

        {currentTab === 'dashboard' && (
          <UserDashboardPage
            onNewPrediction={() => setCurrentTab('diseases')}
            onViewHistory={() => setCurrentTab('history')}
          />
        )}

        {currentTab === 'history' && (
          <PredictionHistoryPage
            onNewPrediction={() => setCurrentTab('diseases')}
          />
        )}

        {currentTab === 'performance' && <ModelPerformancePage />}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'login' && (
          <LoginPage
            onSuccess={() => setCurrentTab('dashboard')}
            onNavigateRegister={() => setCurrentTab('register')}
          />
        )}

        {currentTab === 'register' && (
          <RegisterPage
            onSuccess={() => setCurrentTab('dashboard')}
            onNavigateLogin={() => setCurrentTab('login')}
          />
        )}

        {currentTab === 'profile' && <ProfilePage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
