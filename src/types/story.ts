// src/types.ts
export interface Grade {
  id: number;
  name: string;
  icon: string;
  description: string;
  ages: string;
}

export interface CulturalRegion {
  id: string;
  name: string;
  color: string;
  icon: string;
  fact: string;
}

export interface Story {
  title: string;
  content: string;
  region: string;
  gradeLevel: string;
}

export interface OnboardingCompleteData {
  grade: Grade;
  region: CulturalRegion;
  story: Story;
}