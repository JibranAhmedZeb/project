import React from 'react';
import { Brain, Zap, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Brain,
    title: 'Input Your Prompt',
    description: 'Type any prompt - text, image, audio, or video generation request.',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/20'
  },
  {
    icon: Zap,
    title: 'AI Auto-Routing',
    description: 'Our intelligent system analyzes and routes to the optimal AI engine.',
    color: 'text-secondary-400',
    bgColor: 'bg-secondary-500/10',
    borderColor: 'border-secondary-500/20'
  },
  {
    icon: Rocket,
    title: 'Get Perfect Results',
    description: 'Receive high-quality output from the best-suited AI for your task.',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
    borderColor: 'border-accent-500/20'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23374151%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three simple steps to harness the power of multiple AI engines through one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-8">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-4 h-4 text-gray-600" />
                  </div>
                )}

                <div className="text-center group hover-lift">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.bgColor} ${step.borderColor} border-2 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Step Number */}
                  <div className="text-sm font-bold text-gray-500 mb-2">STEP {index + 1}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo CTA */}
        <div className="text-center mt-20">
          <button className="group gradient-bg text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center space-x-2 mx-auto hover-lift">
            <span>See It In Action</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;