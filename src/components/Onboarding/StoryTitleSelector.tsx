// src/components/Onboarding/StoryTitleSelector.tsx
import React, { useState } from 'react';

interface StoryTitleSelectorProps {
  titles: string[];
  onSelect: (title: string) => void;
  loading?: boolean;  // Made optional with default
}

const StoryTitleSelector: React.FC<StoryTitleSelectorProps> = ({ 
  titles = [],       // Default empty array
  onSelect = () => {}, // Default empty function
  loading = false    // Default false
}) => {
  // Safely format titles by removing numbering
  const formatTitle = (title: string) => {
    if (!title) return '';
    return title.replace(/^\d+\.\s*/, ''); // Remove leading numbers/dots
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <span className="text-4xl block" role="img" aria-label="Book">📖</span>
        <h2 className="text-2xl font-bold text-amber-800 mt-2">
          Choose a Story
        </h2>
      </header>

      <div className="space-y-4">
        {titles.length > 0 ? (
          titles.map((title, index) => (
            <button
              key={`story-${index}`}  // More unique key
              onClick={() => onSelect(title)}
              className={`
                w-full p-4 rounded-xl 
                bg-white hover:shadow-md 
                transition-all text-left 
                border border-amber-200
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={loading}
              aria-busy={loading}
            >
              <h3 className="font-bold text-lg">
                {formatTitle(title)}
              </h3>
            </button>
          ))
        ) : (
          <p className="text-amber-700 text-center py-4">
            No stories available
          </p>
        )}
      </div>
    </div>
  );
};

export default StoryTitleSelector;