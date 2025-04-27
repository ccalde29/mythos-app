// src/pages/OnboardingPage.tsx
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import OnboardingWizard from '../components/OnboardingWizard';
import Header from '../components/Header';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleComplete = async (preferences: {
    grade: { id: number; name: string };
    region: { id: string; name: string };
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        grade: preferences.grade,
        preferred_region: preferences.region,
        onboarding_complete: true
      });

    if (!error) {
      navigate('/stories', { state: preferences });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <OnboardingWizard onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
}