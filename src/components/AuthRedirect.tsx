// src/components/AuthRedirect.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import LoadingSpinner from './LoadingSpinner';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        navigate('/login');
        return;
      }

      const { data } = await supabase
        .from('user_profiles')
        .select('onboarding_complete')
        .eq('user_id', user.id)
        .single();

      navigate(data?.onboarding_complete ? '/stories' : '/onboarding');
    };

    checkAuth();
  }, [navigate]);

  return <LoadingSpinner />;
};

export default AuthRedirect;