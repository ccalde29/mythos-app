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
  id: string;
  title: string;
  content: string;
  created_at: string;
  grade?: Grade;
  region?: CulturalRegion;
  moral?: string;
  prompt_id?: string;
  user_id?: string;
}

export interface UserProfile {
  user_id: string;
  grade: Grade | null;
  preferred_region: CulturalRegion | null;
  onboarding_complete: boolean;
}