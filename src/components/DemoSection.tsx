import React, { useState } from 'react';
import { Send, Copy, Download, Sparkles, Image, Volume2, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useRequests } from '../hooks/useRequests';
import { useEngines } from '../hooks/useEngines';

const demoOutputs = {
  text: {
    title: 'Generated Text',
    content: 'AutoSummon is revolutionizing how developers interact with AI. By providing a unified interface to multiple AI engines, we eliminate the complexity of managing different APIs, authentication methods, and response formats. Our intelligent routing system ensures your prompts always reach the most suitable AI model for optimal results.',
    icon: FileText
  },
  image: {
    title: 'Generated Image',
    content: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Image
  },
  audio: {
    title: 'Generated Audio',
    content: 'High-quality voice synthesis ready for download',
    icon: Volume2
  }
};

const DemoSection: React.FC = () => {
  const { user } = useAuth();
  const { createRequest, updateRequestStatus, createResult } = useRequests();
  const { engines } = useEngines();
  
  const [prompt, setPrompt] = useState('Create a futuristic AI-powered workspace');
  const [selectedOutput, setSelectedOutput] = useState<'text' | 'image' | 'audio'>('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState('auto');
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!user) {
      alert('Please sign in to use the AI generation features');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      // Determine engine based on output type if auto-selected
      let engineName = selectedEngine;
      if (selectedEngine === 'auto') {
        switch (selectedOutput) {
          case 'text':
            engineName = 'OpenAI GPT-4';
            break;
          case 'image':
            engineName = 'Stability AI';
            break;
          case 'audio':
            engineName = 'ElevenLabs';
            break;
        }
      }

      // Create request in database
      const request = await createRequest(prompt, engineName);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update request status
      await updateRequestStatus(request.id, 'completed');
      
      // Create result
      const currentOutput = demoOutputs[selectedOutput];
      await createResult(
        request.id,
        selectedOutput,
        selectedOutput === 'image' ? currentOutput.content : undefined,
        { prompt, engine: engineName }
      );
      
      setResult(currentOutput.content);
      
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentOutput = demoOutputs[selectedOutput];
  const IconComponent = currentOutput.icon;

  return (
    <section id="demo" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%236366f1%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M30%2030c0-11-9-20-20-20s-20%209-20%2020%209%2020%2020%2020%2020-9%2020-20zm20%200c0-11-9-20-20-20s-20%209-20%2020%209%2020%2020%2020%2020-9%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Try It <span className="gradient-text">Live</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI orchestration. Enter any prompt and watch as we route it to the perfect AI engine.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                  <span>Enter Your Prompt</span>
                </h3>
                
                <div className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 bg-dark-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Describe what you want to create..."
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400">Try:</span>
                    {['Generate a logo', 'Write a poem', 'Create narration'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs bg-primary-500/20 border border-primary-500/30 text-primary-300 px-3 py-1 rounded-full hover:bg-primary-500/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  {/* Engine Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      AI Engine
                    </label>
                    <select
                      value={selectedEngine}
                      onChange={(e) => setSelectedEngine(e.target.value)}
                      className="w-full bg-dark-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="auto">Auto-Select Best Engine</option>
                      {engines.map((engine) => (
                        <option key={engine.id} value={engine.name}>
                          {engine.name} ({engine.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !user}
                    className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{user ? 'Generate' : 'Sign In to Generate'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output Type Selector */}
              <div className="glass-effect rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Output Type</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(demoOutputs).map(([key, output]) => {
                    const OutputIcon = output.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedOutput(key as 'text' | 'image' | 'audio')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedOutput === key
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-gray-600 bg-dark-800 hover:border-gray-500'
                        }`}
                      >
                        <OutputIcon className={`w-5 h-5 mx-auto mb-1 ${
                          selectedOutput === key ? 'text-primary-400' : 'text-gray-400'
                        }`} />
                        <div className={`text-xs ${
                          selectedOutput === key ? 'text-primary-300' : 'text-gray-400'
                        }`}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Output Panel */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <IconComponent className="w-5 h-5 text-secondary-400" />
                  <span>{currentOutput.title}</span>
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-[300px] bg-dark-800 rounded-lg p-4 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating amazing content...</p>
                  </div>
                ) : result ? (
                  selectedOutput === 'image' ? (
                    <img
                      src={result}
                      alt="Generated content"
                      className="max-w-full max-h-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="text-gray-300 leading-relaxed">
                      {result}
                    </div>
                  )
                ) : (
                  <div className="text-center text-gray-500">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Generated content will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;