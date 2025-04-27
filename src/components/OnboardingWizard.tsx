// src/components/OnboardingWizard.tsx
import React, { useState } from 'react';
import { Grade, CulturalRegion } from '../types';
import ProgressSteps from './Onboarding/ProgressSteps';
import GradeSelector from './Onboarding/GradeSelector';
import RegionSelector from './Onboarding/RegionSelector';

interface OnboardingWizardProps {
  onComplete: (preferences: { grade: Grade; region: CulturalRegion }) => void;
}

const gradeLevels: Grade[] = [
  {
    id: 1,
    name: "1st Grade",
    icon: "🐛",
    description: "Beginning readers",
    ages: "6-7"
  },
  {
    id: 2,
    name: "2nd Grade", 
    icon: "🐝",
    description: "Growing readers",
    ages: "7-8"
  },
  // ... up to 12th grade
];

const culturalRegions: CulturalRegion[] = [
  {
    id: "west-african",
    name: "West African",
    color: "bg-amber-100",
    icon: "🦁",
    fact: "Home to Anansi the clever spider!"
  },
  {
    id: "nordic",
    name: "Nordic",
    color: "bg-blue-100",
    icon: "❄️",
    fact: "Land of mighty Thor and Loki's tricks"
  },
  // ... more regions
];

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<{
    grade: Grade | null;
    region: CulturalRegion | null;
  }>({
    grade: null,
    region: null
  });

  return (
    <div className="bg-amber-50 p-8 rounded-xl max-w-md mx-auto">
      <ProgressSteps currentStep={step} totalSteps={2} />
      
      {step === 1 && (
        <GradeSelector 
          grades={gradeLevels}
          onSelect={(grade) => {
            setPreferences(p => ({ ...p, grade }));
            setStep(2);
          }}
        />
      )}

      {step === 2 && preferences.grade && (
        <RegionSelector
          regions={culturalRegions}
          onSelect={(region) => {
            setPreferences(p => ({ ...p, region }));
            if (preferences.grade && region) {
              onComplete({
                grade: preferences.grade,
                region
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default OnboardingWizard;