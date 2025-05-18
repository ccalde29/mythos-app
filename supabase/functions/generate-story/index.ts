// supabase/functions/get-story-content/index.ts
import { serve } from '@supabase/functions-js'
import OpenAI from 'openai'

const openai = new OpenAI(process.env.OPENAI_API_KEY!)

serve(async (req) => {
  const { region, grade, title } = await req.json()
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Adapt the ${region} story "${title}" for ${grade} grade reading level. 
               Keep cultural authenticity while using age-appropriate vocabulary.`
    }]
  })

  return new Response(JSON.stringify({ 
    content: completion.choices[0]?.message?.content || '' 
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})