// src/components/Onboarding/GradeSelector.tsx
import React from 'react';
import { Grade } from '../../types';

interface GradeSelectorProps {
  grades: Grade[];
  onSelect: (grade: Grade) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ grades, onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-amber-800">
        <span className="text-4xl">📚</span><br />
        What grade are you in, sweetpea?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {grades.map(grade => (
          <button
            key={grade.id}
            onClick={() => onSelect(grade)}
            className={`p-4 border-2 rounded-lg text-center transition-all
              ${grade.id === grades[0].id // Example selection highlight
                ? 'border-amber-500 bg-amber-100 shadow-md' 
                : 'border-amber-200 hover:border-amber-300'}`}
          >
            <span className="block text-3xl mb-2">{grade.icon}</span>
            <span className="block font-medium">{grade.name}</span>
            <span className="block text-sm text-amber-600">{grade.ages} years</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GradeSelector;