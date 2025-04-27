// src/components/Header.tsx
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const goToOnboarding = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('user_profiles')
        .update({ onboarding_complete: false })
        .eq('user_id', user.id);
    }
    navigate('/onboarding');
  };

  return (
    <header className="bg-amber-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mythos</h1>
        <div className="flex gap-4">
          <button 
            onClick={goToOnboarding}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-700 rounded-lg transition"
          >
            Change Grade/Region
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}