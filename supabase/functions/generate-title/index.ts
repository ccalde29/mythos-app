// supabase/functions/get-story-titles/index.ts
import { serve } from '@supabase/functions-js'
import OpenAI from 'openai'

const openai = new OpenAI(process.env.OPENAI_API_KEY!)

serve(async (req) => {
  const { region } = await req.json()
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Provide 3 authentic story titles from ${region} mythology. Respond with just the titles, one per line.`
    }]
  })

  const titles = completion.choices[0]?.message?.content?.split('\n').filter(t => t.trim()) || []
  
  return new Response(JSON.stringify({ titles }), {
    headers: { 'Content-Type': 'application/json' }
  })
})