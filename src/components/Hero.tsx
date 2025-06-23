import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Hero: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%236366f1%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary-400" />
          <span className="text-primary-300 text-sm font-medium">Now supporting 20+ AI engines</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
          <span className="gradient-text">Summon Any AI.</span>
          <br />
          <span className="text-white">Instantly.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          The ultimate AI orchestration platform. Route your prompts to the perfect AI engine every time — 
          <span className="text-primary-400"> OpenAI, Stability AI, ElevenLabs,</span> and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link 
            to={user ? "/playground" : "/"}
            className="group gradient-bg text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center space-x-2 hover-lift"
          >
            <span>{user ? 'Go to Playground' : 'Try It Free'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="group bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 text-sm mb-4">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-500 font-semibold">Microsoft</div>
            <div className="text-gray-500 font-semibold">Google</div>
            <div className="text-gray-500 font-semibold">Meta</div>
            <div className="text-gray-500 font-semibold">OpenAI</div>
            <div className="text-gray-500 font-semibold">Anthropic</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;