// src/api/generate-story.ts (move this file from pages/api/)
import { OpenAI } from 'openai';
import { supabase } from '../lib/supabaseClient';

const openai = new OpenAI({apiKey:'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', dangerouslyAllowBrowser: true });

export async function generateStory(culture: string, age: string, words: string[]) {
  const prompt = `
    Write a ${culture} folktale for children aged ${age}.
    Use simple language (Lexile 300-500) and include these words: ${words.join(', ')}.
    Format: { "title": "Story Title", "easy": "Simple text.", "hard": "Advanced text." }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const generatedStory = JSON.parse(completion.choices[0].message.content!);

    const { error } = await supabase
      .from('stories')
      .insert([{
        title: generatedStory.title,
        culture,
        lexile_level: 400,
        content: { easy: generatedStory.easy, hard: generatedStory.hard }
      }]);

    if (error) throw error;
    return generatedStory;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}