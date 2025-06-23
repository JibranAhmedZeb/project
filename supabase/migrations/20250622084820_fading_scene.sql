/*
  # Seed AI Engines Data

  1. New Data
    - Insert popular AI engines with their details
    - Include categories and cost information
    - Set up engines that match the frontend display

  2. Engines Added
    - OpenAI GPT-4 (Text Generation)
    - Stability AI (Image Generation)  
    - ElevenLabs (Voice Synthesis)
    - RunwayML (Video Generation)
    - Anthropic Claude (AI Assistant)
    - GitHub Copilot (Code Generation)
*/

INSERT INTO engines (name, category, api_url, cost_per_call) VALUES
  ('OpenAI GPT-4', 'Text Generation', 'https://api.openai.com/v1/chat/completions', 0.03),
  ('OpenAI GPT-3.5', 'Text Generation', 'https://api.openai.com/v1/chat/completions', 0.002),
  ('Stability AI SDXL', 'Image Generation', 'https://api.stability.ai/v1/generation', 0.04),
  ('Stability AI SD 1.5', 'Image Generation', 'https://api.stability.ai/v1/generation', 0.02),
  ('ElevenLabs TTS', 'Voice Synthesis', 'https://api.elevenlabs.io/v1/text-to-speech', 0.18),
  ('ElevenLabs Voice Clone', 'Voice Synthesis', 'https://api.elevenlabs.io/v1/voice-generation', 0.30),
  ('RunwayML Gen-2', 'Video Generation', 'https://api.runwayml.com/v1/generate', 0.95),
  ('Anthropic Claude-3', 'AI Assistant', 'https://api.anthropic.com/v1/messages', 0.015),
  ('Anthropic Claude-2', 'AI Assistant', 'https://api.anthropic.com/v1/messages', 0.008),
  ('GitHub Copilot', 'Code Generation', 'https://api.github.com/copilot', 0.10),
  ('Cohere Generate', 'Text Generation', 'https://api.cohere.ai/v1/generate', 0.015),
  ('Hugging Face Transformers', 'Text Generation', 'https://api-inference.huggingface.co', 0.001),
  ('Google PaLM', 'Text Generation', 'https://generativelanguage.googleapis.com/v1beta', 0.0005),
  ('Midjourney', 'Image Generation', 'https://api.midjourney.com/v1/imagine', 0.08),
  ('DALL-E 3', 'Image Generation', 'https://api.openai.com/v1/images/generations', 0.04),
  ('Whisper API', 'Speech Recognition', 'https://api.openai.com/v1/audio/transcriptions', 0.006),
  ('Azure Cognitive Services', 'Multi-Modal', 'https://api.cognitive.microsoft.com', 0.001),
  ('Google Cloud AI', 'Multi-Modal', 'https://ml.googleapis.com/v1', 0.002),
  ('AWS Bedrock', 'Multi-Modal', 'https://bedrock-runtime.amazonaws.com', 0.0008),
  ('Replicate', 'Multi-Modal', 'https://api.replicate.com/v1/predictions', 0.0023)
ON CONFLICT (name) DO NOTHING;