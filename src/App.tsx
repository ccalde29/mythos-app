// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import OnboardingPage from './pages/OnboardingPage';
import StoryPage from './components/StoryPage';
import AuthCallback from './pages/AuthCallback';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './pages/Login';
import StoriesPage from './pages/StoriesPage';
import { Grade, CulturalRegion } from './types';
//import { config } from 'dotenv';
//config({ path: '.env.local' });

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);
  const [userPreferences, setUserPreferences] = useState<{
    grade: Grade | null;
    region: CulturalRegion | null;
  }>({ grade: null, region: null });

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user has preferences saved
        const { data: preferences } = await supabase
          .from('user_profiles')
          .select('grade, region, onboarding_complete')
          .eq('user_id', user.id)
          .single();
          
        if (preferences) {
          setUserPreferences({
            grade: preferences.grade,
            region: preferences.region
          });
          setNeedsOnboarding(!preferences.onboarding_complete);
        } else {
          setNeedsOnboarding(true);
        }
      }
      setIsLoading(false);
    };

    checkAuthAndOnboarding();
  }, []);

  const handleOnboardingComplete = async (preferences: { grade: Grade; region: CulturalRegion }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setUserPreferences(preferences);
    setNeedsOnboarding(false);
    
    await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        grade: preferences.grade,
        region: preferences.region,
        onboarding_complete: true,
        updated_at: new Date().toISOString()
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {needsOnboarding ? (
          <Route 
            path="/onboarding" 
            element={
              <OnboardingPage 
                onComplete={handleOnboardingComplete} 
              />
            } 
          />
        ) : (
          <>
            <Route path="/stories" element={
              <StoriesPage 
                grade={userPreferences.grade} 
                region={userPreferences.region} 
              />
            } />
            <Route path="/story/:id" element={<StoryPage />} />
          </>
        )}
        
        <Route path="/" element={
          needsOnboarding ? (
            <OnboardingPage onComplete={handleOnboardingComplete} />
          ) : (
            <StoriesPage 
              grade={userPreferences.grade} 
              region={userPreferences.region} 
            />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;