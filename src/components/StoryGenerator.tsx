import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Story } from '../types/story';

interface StoryGeneratorProps {
  onStoryGenerated: (story: Story) => void;
}

export default function StoryGenerator({ onStoryGenerated }: StoryGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get that OpenAI key from our environment
  const openaiKey = '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';
  if (!openaiKey) {
    console.error("Lawdy me! Missing OpenAI key in environment variables");
  }

  const generateStory = async () => {
    setIsGenerating(true);
    setError(null);
  
    try {
      // 1. Verify user is logged in
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("You need to be signed in, sugar!");
  
      // 2. Verify OpenAI key exists
      const openaiKey = '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';
      if (!openaiKey) throw new Error("Our story magic key is missing!");
  
      // 3. Save prompt to Supabase
      const { data: promptData, error: promptError } = await supabase
        .from('story_prompts')
        .insert([{ 
          user_id: user.id, 
          prompt_text: prompt 
        }])
        .select()
        .single();
  
      if (promptError) throw new Error(`Prompt failed: ${promptError.message}`);
  
      // 4. Generate story with OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ 
            role: "user", 
            content: `Create a children's story about: ${prompt}. 
                      Keep it under 300 words with a moral lesson.`
          }],
          temperature: 0.7,
        }),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI error: ${errorData.error?.message || 'Unknown error'}`);
      }
  
      const result = await response.json();
      const generatedStory = result.choices[0]?.message?.content;
      if (!generatedStory) throw new Error("The story came out emptier than a hollow log!");
  
      // 5. Save story to Supabase
      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .insert([{
          prompt_id: promptData.id,
          content: generatedStory,
          user_id: user.id,
          title: `Story: ${prompt.slice(0, 20)}...`
        }])
        .select()
        .single();
  
      if (storyError) throw new Error(`Saving failed: ${storyError.message}`);
  
      onStoryGenerated(storyData);
  
    } catch (error) {
      console.error("Full error details:", error);
      setError(
        error instanceof Error ? 
        `Whoopsie-daisy! ${error.message}` : 
        "The story critters got loose!"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-amber-800">
        Story Generator
        <span className="ml-2 text-amber-600">✨</span>
      </h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            What's your story about, sugar?
          </label>
          <textarea
            id="prompt"
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            rows={4}
            placeholder="A brave little rabbit who discovers the value of sharing..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={generateStory}
          disabled={!prompt || isGenerating}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all
            ${!prompt || isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg'}
          `}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Weavin' your tale...
            </span>
          ) : (
            'Generate Story'
          )}
        </button>
      </div>
    </div>
  );
}