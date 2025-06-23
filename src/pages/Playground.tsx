import React, { useState } from 'react';
import { Send, Copy, Download, Sparkles, Image, Volume2, FileText, Loader2, Settings, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useEngines } from '../hooks/useEngines';
import { useAI } from '../hooks/useAI';

const Playground: React.FC = () => {
  const { user } = useAuth();
  const { engines } = useEngines();
  const { generateContent, loading } = useAI();
  
  const [prompt, setPrompt] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('auto');
  const [outputType, setOutputType] = useState<'text' | 'image' | 'audio'>('text');
  const [result, setResult] = useState<any>(null);
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0,
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await generateContent({
        prompt,
        engine: selectedEngine,
        outputType,
        settings,
      });
      setResult(response);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const copyToClipboard = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-xl text-gray-300">
            Experiment with different AI models and see the results in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span>Input</span>
              </h3>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-40 bg-dark-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Enter your prompt here..."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Output Type
                    </label>
                    <select
                      value={outputType}
                      onChange={(e) => setOutputType(e.target.value as 'text' | 'image' | 'audio')}
                      className="w-full bg-dark-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="audio">Audio</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-secondary-400" />
                  <span>Output</span>
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-[300px] bg-dark-800 rounded-lg p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Generating content...</p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="text-gray-300 leading-relaxed">
                    {outputType === 'image' && result.imageUrl ? (
                      <img
                        src={result.imageUrl}
                        alt="Generated content"
                        className="max-w-full rounded-lg"
                      />
                    ) : outputType === 'audio' && result.audioUrl ? (
                      <audio controls className="w-full">
                        <source src={result.audioUrl} type="audio/mpeg" />
                      </audio>
                    ) : (
                      <pre className="whitespace-pre-wrap">{result.content}</pre>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generated content will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-accent-400" />
                <span>Settings</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Temperature: {settings.temperature}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Focused</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Tokens: {settings.maxTokens}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="4000"
                    step="100"
                    value={settings.maxTokens}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Top P: {settings.topP}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.topP}
                    onChange={(e) => setSettings(prev => ({ ...prev, topP: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary-400" />
                <span>Usage</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Credits Used</span>
                    <span className="text-white">25 / 100</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;