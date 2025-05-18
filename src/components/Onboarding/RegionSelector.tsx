// src/components/Onboarding/RegionSelector.tsx
import React from 'react';
import { CulturalRegion } from '../../types';
import './RegionSelector.css'; // We'll create this next

interface RegionSelectorProps {
  regions: CulturalRegion[];
  onSelect: (region: CulturalRegion) => void;
  selectedRegion?: CulturalRegion | null;
}

export const RegionSelector = ({ 
  regions, 
  onSelect,
  selectedRegion 
}: RegionSelectorProps) => {
  return (
    <div className="region-selector-container">
      <h2 className="region-title">
        <span role="img" aria-label="globe">🌍</span><br />
        Which culture would you like to explore?
      </h2>

      <div className="region-list">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onSelect(region)}
            className={`region-button ${selectedRegion?.id === region.id ? 'selected' : ''}`}
            type="button"
          >
            <div className="region-content">
              <span className="region-icon" role="img" aria-label={region.name}>
                {region.icon}
              </span>
              <div className="region-text">
                <h3 className="region-name">{region.name}</h3>
                <p className="region-fact">{region.fact}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};