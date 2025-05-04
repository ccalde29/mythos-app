// src/components/Onboarding/RegionSelector.tsx
import React, { useState } from 'react';
import { CulturalRegion } from '../../types';
import { generateStoryTitles } from '../../services/AIService';
import LoadingSpinner from '../LoadingSpinner';

interface RegionSelectorProps {
  regions: CulturalRegion[];
  grade: string;
  onSelect: (region: CulturalRegion) => Promise<void>;
  onStoryTitlesReady: (titles: string[]) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  regions, 
  grade,
  onSelect,
  onStoryTitlesReady
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = async (region: CulturalRegion) => {
    setLoading(true);
    setError('');
    try {
      await onSelect(region);
      // Generate story titles after region selection
      const titles = await generateStoryTitles(region.name);
      onStoryTitlesReady(titles);
    } catch (err) {
      setError('Failed to load stories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-amber-800">
        <span className="text-4xl">🌍</span><br />
        Which culture would you like to explore?
      </h2>
      
      {error && (
        <div className="text-red-500 p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => handleSelect(region)}
              className={`w-full p-4 rounded-xl ${region.color} hover:shadow-md transition-all text-left`}
              disabled={loading}
            >
              <div className="flex items-center">
                <span className="text-4xl mr-4">{region.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{region.name}</h3>
                  <p className="text-sm text-gray-600">{region.fact}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;