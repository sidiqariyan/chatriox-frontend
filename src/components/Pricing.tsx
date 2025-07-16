import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

interface PricingProps {
  isDarkMode: boolean;
}

const Pricing: React.FC<PricingProps> = ({ isDarkMode }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 29,
      annualPrice: 24,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        '5,000 emails/month',
        '1,000 WhatsApp messages',
        'Basic lead scraper',
        'Email verification',
        'Standard support',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Professional',
      icon: Crown,
      description: 'Most popular for growing businesses',
      monthlyPrice: 79,
      annualPrice: 65,
      gradient: 'from-violet-500 to-purple-600',
      features: [
        '50,000 emails/month',
        '10,000 WhatsApp messages',
        'Advanced lead scraper',
        'Real-time verification',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: 'For large teams and high-volume needs',
      monthlyPrice: 199,
      annualPrice: 165,
      gradient: 'from-emerald-500 to-teal-600',
      features: [
        'Unlimited emails',
        'Unlimited WhatsApp messages',
        'Premium lead scraper',
        'Instant verification',
        'Dedicated support',
        'Custom analytics',
        'Full API access',
        'White-label options',
        'Custom workflows',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className={`py-24 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Simple, <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Choose the perfect plan for your business. Upgrade or downgrade at any time.
          </p>

          {/* Billing Toggle */}
          <div className={`inline-flex items-center p-1 rounded-full backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/60 border-gray-200'
          }`}>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isAnnual
                  ? isDarkMode
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-gray-900 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                isAnnual
                  ? isDarkMode
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-gray-900 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? isDarkMode
                    ? 'bg-white/10 border-violet-500/50 shadow-2xl shadow-violet-500/20'
                    : 'bg-white/90 border-violet-300/50 shadow-2xl shadow-violet-500/20'
                  : isDarkMode
                    ? 'bg-white/5 border-white/10 hover:border-white/20'
                    : 'bg-white/60 border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className={`text-5xl font-black ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-lg ml-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    /month
                  </span>
                </div>
                {isAnnual && (
                  <p className={`text-sm mt-2 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    Billed annually (${(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-3 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                    }`} />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : isDarkMode
                    ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40'
                    : 'bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className={`inline-flex items-center px-8 py-4 rounded-full backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          }`}>
            <Check className="w-5 h-5 mr-2" />
            <span className="font-semibold">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;