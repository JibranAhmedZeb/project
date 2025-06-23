import React, { useState } from 'react';
import { Plus, Play, Edit, Trash2, Copy, Settings } from 'lucide-react';

const Workflows: React.FC = () => {
  const [workflows] = useState([
    {
      id: '1',
      name: 'Blog Post Generator',
      description: 'Generate complete blog posts with outline, content, and featured image',
      steps: 3,
      lastRun: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'Social Media Campaign',
      description: 'Create social media posts for multiple platforms',
      steps: 5,
      lastRun: '1 day ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Product Description',
      description: 'Generate product descriptions and marketing copy',
      steps: 2,
      lastRun: '3 days ago',
      status: 'draft'
    }
  ]);

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI <span className="gradient-text">Workflows</span>
            </h1>
            <p className="text-xl text-gray-300">
              Chain multiple AI operations together for complex tasks.
            </p>
          </div>
          <button className="gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Workflow</span>
          </button>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="glass-effect rounded-2xl p-6 hover-lift">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{workflow.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{workflow.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {workflow.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <span>{workflow.steps} steps</span>
                <span>Last run: {workflow.lastRun}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Builder Preview */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Settings className="w-6 h-6 text-primary-400" />
            <span>Workflow Builder</span>
          </h2>
          
          <div className="bg-dark-800 rounded-lg p-6 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Visual Workflow Builder Coming Soon</p>
              <p className="text-sm">Drag and drop interface to create complex AI workflows</p>
            </div>
            <button className="gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Join Beta Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;