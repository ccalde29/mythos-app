// src/components/Onboarding/RegionSelector.tsx
import React from 'react';
import { CulturalRegion } from '../../types';

interface RegionSelectorProps {
  regions: CulturalRegion[];
  onSelect: (region: CulturalRegion) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-amber-800">
        <span className="text-4xl">🌍</span><br />
        Which culture would you like to explore?
      </h2>
      <div className="space-y-4">
        {regions.map(region => (
          <button
            key={region.id}
            onClick={() => onSelect(region)}
            className={`w-full p-4 rounded-xl ${region.color} hover:shadow-md transition-all text-left`}
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
    </div>
  );
};

export default RegionSelector;