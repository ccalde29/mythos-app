// src/services/AIService.ts
//import Config from 'react-native-config';
import OpenAI from 'openai';
//import config from '../config';

// Initialize with environment variable
const config = {
  OPENAI_API_KEY: 'your-actual-key-here' // Replace with your key
};

export default config;

export const generateStoryTitles = async (region: string): Promise<string[]> => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: `You are a children's story expert. Provide 3 real, traditional story titles from ${region}. 
                 Only include authentic, culturally accurate stories. Respond with just the titles in this format:
                 "1. Story One
                 2. Story Two
                 3. Story Three"`
      }]
    });

    const titles = response.choices[0]?.message?.content?.split('\n') || [];
    return titles.filter(title => title.trim().length > 0);
  } catch (error) {
    console.error('Error generating titles:', error);
    return [];
  }};

export const generateStoryContent = async (title: string, grade: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: `Adapt the traditional story "${title}" for a ${grade} grade reading level. 
                 Keep the cultural authenticity while using appropriate vocabulary and sentence length.
                 Respond with just the story content, no headings or explanations.`
      }]
    });

    return response.choices[0]?.message?.content || 'Story generation failed.';
  } catch (error) {
    console.error('Error generating story:', error);
    return 'Error generating story content.';
  }
};