// src/pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check if they need onboarding
        supabase
          .from('user_profiles')
          .select('onboarding_complete')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => {
            navigate(data?.onboarding_complete ? '/' : '/onboarding');
          });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-amber-800">Completing your login...</p>
      </div>
    </div>
  );
}