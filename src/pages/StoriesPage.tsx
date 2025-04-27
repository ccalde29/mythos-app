// src/pages/StoriesPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Added useState import
import StorySelection from '../components/StorySelection';
import LoadingSpinner from '../components/LoadingSpinner';

export default function StoriesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication first
  useEffect(() => {
    const checkAuth = async () => {
      // Add your auth check logic here if needed
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Check for required state after auth check
  useEffect(() => {
    if (!isLoading && !location.state?.region) {
      navigate('/onboarding', { replace: true }); // Added replace to prevent back button issues
    }
  }, [isLoading, location.state, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // While redirecting, return null briefly
  if (!location.state?.region) {
    return null;
  }

  return <StorySelection />;
}