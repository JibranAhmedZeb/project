import React from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Zap,
      features: [
        '100 credits per month',
        'Access to basic AI models',
        'Standard support',
        'Basic analytics',
        'API access'
      ],
      buttonText: 'Get Started',
      buttonClass: 'bg-primary-600 hover:bg-primary-700',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and growing teams',
      icon: Crown,
      features: [
        '5,000 credits per month',
        'Access to all AI models',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom workflows',
        'Team collaboration'
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'gradient-bg hover:opacity-90',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large teams and organizations',
      icon: Rocket,
      features: [
        'Unlimited credits',
        'Access to all AI models',
        'Dedicated support',
        'Custom analytics',
        'API access',
        'Custom workflows',
        'Team collaboration',
        'SLA guarantee',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'bg-accent-600 hover:bg-accent-700',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your AI needs. All plans include access to our powerful orchestration platform.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative glass-effect rounded-2xl p-8 hover-lift ${
                  plan.popular ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="gradient-bg text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full text-white py-3 rounded-lg font-semibold transition-all ${plan.buttonClass}`}>
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What are credits?</h3>
              <p className="text-gray-300">
                Credits are used to make requests to AI engines. Different models consume different amounts of credits based on complexity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-gray-300">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is there an API?</h3>
              <p className="text-gray-300">
                Yes, all plans include full API access with comprehensive documentation and SDKs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;