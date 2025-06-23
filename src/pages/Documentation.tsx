import React, { useState } from 'react';
import { Book, Code, Zap, Settings, Users, Shield } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Book },
    { id: 'api-reference', title: 'API Reference', icon: Code },
    { id: 'authentication', title: 'Authentication', icon: Shield },
    { id: 'engines', title: 'AI Engines', icon: Zap },
    { id: 'workflows', title: 'Workflows', icon: Settings },
    { id: 'team-management', title: 'Team Management', icon: Users },
  ];

  const content = {
    'getting-started': {
      title: 'Getting Started with AutoSummon',
      content: `
# Quick Start Guide

Welcome to AutoSummon! This guide will help you get up and running in minutes.

## 1. Create Your Account

Sign up for a free account to get started. You'll receive 100 credits to test our platform.

## 2. Make Your First Request

Use our playground to experiment with different AI models:

\`\`\`javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'Generate a creative story about AI',
    engine: 'auto',
    outputType: 'text'
  })
});
\`\`\`

## 3. Integrate with Your App

Use our REST API or SDKs to integrate AutoSummon into your applications.
      `
    },
    'api-reference': {
      title: 'API Reference',
      content: `
# API Reference

## Base URL
\`https://api.autosummon.com/v1\`

## Authentication
All API requests require authentication using your API key in the Authorization header.

## Endpoints

### POST /generate
Generate content using AI engines.

**Parameters:**
- \`prompt\` (string, required): The input prompt
- \`engine\` (string, optional): Specific engine to use, defaults to 'auto'
- \`outputType\` (string, optional): 'text', 'image', or 'audio'
- \`settings\` (object, optional): Engine-specific settings

**Example Request:**
\`\`\`json
{
  "prompt": "Create a futuristic cityscape",
  "engine": "Stability AI",
  "outputType": "image",
  "settings": {
    "width": 1024,
    "height": 1024,
    "steps": 50
  }
}
\`\`\`

**Example Response:**
\`\`\`json
{
  "id": "req_123456",
  "status": "completed",
  "result": {
    "type": "image",
    "url": "https://cdn.autosummon.com/images/123456.png"
  },
  "metadata": {
    "engine": "Stability AI",
    "credits_used": 4,
    "processing_time": 2.3
  }
}
\`\`\`
      `
    },
    'authentication': {
      title: 'Authentication',
      content: `
# Authentication

AutoSummon uses API keys for authentication. You can find your API key in your dashboard.

## Getting Your API Key

1. Log in to your AutoSummon dashboard
2. Navigate to Settings > API Keys
3. Click "Generate New Key"
4. Copy and securely store your key

## Using Your API Key

Include your API key in the Authorization header of all requests:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Security Best Practices

- Never expose your API key in client-side code
- Use environment variables to store your key
- Rotate your keys regularly
- Monitor your API usage for unusual activity
      `
    },
    'engines': {
      title: 'AI Engines',
      content: `
# AI Engines

AutoSummon supports 20+ AI engines across different categories.

## Text Generation
- **OpenAI GPT-4**: Advanced language model for complex tasks
- **OpenAI GPT-3.5**: Fast and efficient for most text tasks
- **Anthropic Claude**: Constitutional AI for safe interactions

## Image Generation
- **Stability AI**: High-quality text-to-image generation
- **DALL-E 3**: Creative image generation from OpenAI
- **Midjourney**: Artistic image creation

## Voice Synthesis
- **ElevenLabs**: Ultra-realistic voice cloning
- **OpenAI Whisper**: Speech recognition and transcription

## Auto-Selection

When you use \`engine: "auto"\`, our intelligent routing system:

1. Analyzes your prompt
2. Determines the best engine for the task
3. Routes your request automatically
4. Optimizes for quality and cost

## Engine-Specific Settings

Each engine supports different parameters:

\`\`\`javascript
// Text generation settings
{
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 1.0
}

// Image generation settings
{
  "width": 1024,
  "height": 1024,
  "steps": 50,
  "guidance_scale": 7.5
}
\`\`\`
      `
    },
    'workflows': {
      title: 'Workflows',
      content: `
# Workflows

Workflows allow you to chain multiple AI operations together for complex tasks.

## Creating a Workflow

\`\`\`json
{
  "name": "Blog Post Generator",
  "steps": [
    {
      "id": "outline",
      "engine": "OpenAI GPT-4",
      "prompt": "Create an outline for: {{topic}}",
      "outputType": "text"
    },
    {
      "id": "content",
      "engine": "OpenAI GPT-4",
      "prompt": "Write a blog post based on this outline: {{outline.result}}",
      "outputType": "text"
    },
    {
      "id": "image",
      "engine": "Stability AI",
      "prompt": "Create a featured image for: {{topic}}",
      "outputType": "image"
    }
  ]
}
\`\`\`

## Running a Workflow

\`\`\`javascript
const response = await fetch('/api/workflows/run', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workflowId: 'workflow_123',
    inputs: {
      topic: 'The Future of AI'
    }
  })
});
\`\`\`

## Workflow Variables

Use \`{{variable}}\` syntax to reference:
- Input variables: \`{{topic}}\`
- Previous step results: \`{{stepId.result}}\`
- System variables: \`{{user.email}}\`, \`{{timestamp}}\`
      `
    },
    'team-management': {
      title: 'Team Management',
      content: `
# Team Management

Collaborate with your team using AutoSummon's team features.

## Adding Team Members

1. Go to Settings > Team
2. Click "Invite Member"
3. Enter their email address
4. Select their role and permissions

## Roles and Permissions

### Owner
- Full access to all features
- Can manage billing and subscriptions
- Can add/remove team members

### Admin
- Can manage team members
- Access to all workflows and data
- Cannot manage billing

### Member
- Can create and run requests
- Limited access to team workflows
- Cannot manage team settings

## Usage Tracking

Monitor your team's usage:
- Individual member statistics
- Project-based tracking
- Cost allocation by team member
- Usage alerts and limits

## Shared Resources

Teams can share:
- Workflows and templates
- API keys (with proper permissions)
- Custom engine configurations
- Analytics and reports
      `
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass-effect rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-white mb-8">
                {content[activeSection as keyof typeof content].title}
              </h1>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {content[activeSection as keyof typeof content].content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;