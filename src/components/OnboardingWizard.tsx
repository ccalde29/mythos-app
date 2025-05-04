// src/components/OnboardingWizard.tsx
import React, { useState } from 'react';
import { Grade, CulturalRegion } from '../types';
import ProgressSteps from './Onboarding/ProgressSteps';
import GradeSelector from './Onboarding/GradeSelector';
import RegionSelector from './Onboarding/RegionSelector';
import StoryTitleSelector from './Onboarding/StoryTitleSelector';
import { generateStoryContent } from '../services/AIService';

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
  const [storyTitles, setStoryTitles] = useState<string[]>([]);
  const [loadingStory, setLoadingStory] = useState(false);

  const handleStorySelect = async (title: string) => {
    if (!preferences.grade || !preferences.region) return;
    
    setLoadingStory(true);
    try {
      const content = await generateStoryContent(
        title, 
        preferences.grade.name
      );
      
      onComplete({
        grade: preferences.grade,
        region: preferences.region,
        story: {
          title,
          content,
          region: preferences.region.name,
          gradeLevel: preferences.grade.name
        }
      });
    } catch (error) {
      console.error("Failed to generate story:", error);
      // Handle error appropriately
    } finally {
      setLoadingStory(false);
    }
  };

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
        <>
          {storyTitles.length > 0 ? (
            <StoryTitleSelector 
              titles={storyTitles}
              onSelect={handleStorySelect}
              loading={loadingStory}
            />
          ) : (
            <RegionSelector
              regions={culturalRegions}
              grade={preferences.grade.name}
              onSelect={async (region) => {
                setPreferences(p => ({ ...p, region }));
              }}
              onStoryTitlesReady={setStoryTitles}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OnboardingWizard;