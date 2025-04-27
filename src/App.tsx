// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import OnboardingPage from './pages/OnboardingPage';
import StoryPage from './components/StoryPage';
import AuthCallback from './pages/AuthCallback';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './pages/Login';
import StoriesPage from './pages/StoriesPage';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('onboarding_complete')
          .eq('user_id', user.id)
          .single();
        setNeedsOnboarding(!data?.onboarding_complete);
      }
      setIsLoading(false);
    };

    checkAuthAndOnboarding();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/" element={<StoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;