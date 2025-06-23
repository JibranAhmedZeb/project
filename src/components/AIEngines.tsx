import React from 'react';
import { Bot, Image, Volume2, Video, FileText, Code } from 'lucide-react';

const engines = [
  {
    name: 'OpenAI GPT-4',
    category: 'Text Generation',
    icon: FileText,
    description: 'Advanced language models for text, code, and reasoning',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    name: 'Stability AI',
    category: 'Image Generation',
    icon: Image,
    description: 'Cutting-edge text-to-image and image-to-image models',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    name: 'ElevenLabs',
    category: 'Voice Synthesis',
    icon: Volume2,
    description: 'Ultra-realistic voice cloning and text-to-speech',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    name: 'RunwayML',
    category: 'Video Generation',
    icon: Video,
    description: 'AI-powered video creation and editing tools',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  {
    name: 'Anthropic Claude',
    category: 'AI Assistant',
    icon: Bot,
    description: 'Constitutional AI for safe and helpful interactions',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  {
    name: 'Codex',
    category: 'Code Generation',
    icon: Code,
    description: 'Advanced code completion and generation models',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20'
  }
];

const AIEngines: React.FC = () => {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Supported <span className="gradient-text">AI Engines</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access the world's most powerful AI models through one unified API. 
            We automatically route your requests to the best engine for optimal results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {engines.map((engine, index) => {
            const IconComponent = engine.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-2xl ${engine.bgColor} ${engine.borderColor} border-2 hover:bg-white/5 transition-all duration-300 hover-lift`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${engine.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${engine.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{engine.name}</h3>
                    </div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${engine.bgColor} ${engine.color}`}>
                      {engine.category}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">{engine.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">20+</div>
            <div className="text-gray-300">AI Engines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">&lt;100ms</div>
            <div className="text-gray-300">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">10M+</div>
            <div className="text-gray-300">API Calls</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEngines;