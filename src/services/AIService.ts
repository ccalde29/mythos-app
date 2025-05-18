// src/services/AIService.ts
import { supabase } from '../lib/supabaseClient';

interface StoryRequest {
  region: string;
  grade: string;
  title?: string;
}

export const AIService = {
  /**
   * Get AI-generated story titles for a region
   */
  async getStoryTitles(region: string): Promise<string[]> {
    const { data, error } = await supabase.functions.invoke('get-story-titles', {
      body: { region }
    });

    if (error) throw new Error(error.message);
    return data.titles || [];
  },

  /**
   * Get AI-generated story content
   */
  async getStoryContent(params: StoryRequest): Promise<string> {
    const { data, error } = await supabase.functions.invoke('get-story-content', {
      body: params
    });

    if (error) throw new Error(error.message);
    return data.content || '';
  },

  /**
   * Get reading comprehension questions for a story
   */
  async getComprehensionQuestions(story: string): Promise<string[]> {
    const { data, error } = await supabase.functions.invoke('get-comprehension-questions', {
      body: { story }
    });

    if (error) throw new Error(error.message);
    return data.questions || [];
  }
};