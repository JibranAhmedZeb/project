import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateRequest {
  prompt: string;
  engine: string;
  outputType: 'text' | 'image' | 'audio';
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Invalid token')
    }

    const { prompt, engine, outputType, settings }: GenerateRequest = await req.json()

    // Create request record
    const { data: request, error: requestError } = await supabase
      .from('requests')
      .insert({
        user_id: user.id,
        input_text: prompt,
        engine: engine,
        status: 'pending'
      })
      .select()
      .single()

    if (requestError) {
      throw requestError
    }

    // Simulate AI processing
    const startTime = Date.now()
    
    // Route to appropriate AI service
    const result = await routeToAIService(engine, outputType, prompt, settings)
    
    const processingTime = (Date.now() - startTime) / 1000

    // Update request status
    await supabase
      .from('requests')
      .update({ status: 'completed' })
      .eq('id', request.id)

    // Create result record
    await supabase
      .from('results')
      .insert({
        request_id: request.id,
        output_type: outputType,
        output_url: result.imageUrl || result.audioUrl,
        metadata: {
          ...settings,
          engine,
          processingTime,
          content: result.content
        }
      })

    return new Response(
      JSON.stringify({
        id: request.id,
        status: 'completed',
        result,
        processingTime
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

async function routeToAIService(
  engine: string, 
  outputType: string, 
  prompt: string, 
  settings?: any
): Promise<{ content?: string; imageUrl?: string; audioUrl?: string }> {
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

  switch (outputType) {
    case 'text':
      return {
        content: generateMockTextResponse(prompt, engine)
      }
    
    case 'image':
      return {
        imageUrl: generateMockImageUrl(prompt)
      }
    
    case 'audio':
      return {
        audioUrl: generateMockAudioUrl(prompt)
      }
    
    default:
      throw new Error('Unsupported output type')
  }
}

function generateMockTextResponse(prompt: string, engine: string): string {
  const responses = {
    'OpenAI GPT-4': `Advanced AI response for: "${prompt}"

This response demonstrates GPT-4's sophisticated language understanding and generation capabilities. The model has analyzed your prompt and generated contextually relevant, high-quality content.

Key features:
• Deep contextual understanding
• Coherent and well-structured output
• Relevant and informative content
• Professional tone and style

This showcases the power of state-of-the-art language models in understanding and responding to complex prompts with nuanced, helpful information.`,

    'Anthropic Claude': `Hello! I'm Claude, responding to: "${prompt}"

I approach this with careful consideration, aiming to be helpful, harmless, and honest. My constitutional AI training helps me provide balanced, thoughtful responses.

This response demonstrates:
- Ethical AI principles
- Balanced perspective
- Safety-conscious approach
- Helpful and informative content

I hope this response meets your needs. Please let me know if you'd like me to elaborate on any aspect!`,

    default: `AI-generated response for: "${prompt}"

This content has been intelligently routed through the ${engine} engine, demonstrating AutoSummon's powerful orchestration capabilities. The system automatically selected the optimal AI model for your specific request.

Response characteristics:
- Engine-optimized generation
- High-quality output
- Contextually appropriate
- Efficiently processed

This showcases how intelligent AI routing ensures optimal results for every type of request.`
  }

  return responses[engine as keyof typeof responses] || responses.default
}

function generateMockImageUrl(prompt: string): string {
  const imageMap: { [key: string]: string } = {
    'futuristic': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    'cityscape': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    'nature': 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    'technology': 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
    'abstract': 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800',
    'space': 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
  }

  const lowerPrompt = prompt.toLowerCase()
  for (const [keyword, url] of Object.entries(imageMap)) {
    if (lowerPrompt.includes(keyword)) {
      return url
    }
  }

  return 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
}

function generateMockAudioUrl(prompt: string): string {
  // In production, this would generate actual audio
  return `https://example.com/audio/${encodeURIComponent(prompt)}.mp3`
}