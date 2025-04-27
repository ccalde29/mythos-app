// src/types/story.ts
export interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  difficulty?: 'easy' | 'hard'; // Optional for backwards compatibility
  prompt_id?: string;
  user_id?: string;
}