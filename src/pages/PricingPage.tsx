import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, ArrowRight, Star } from 'lucide-react';

interface PricingPageProps {
  isDarkMode: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ isDarkMode }) => {
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
        'Basic lead scraper (500 leads/month)',
        'Email verification (1,000/month)',
        'Standard support',
        'Basic analytics',
        'Template library',
        'Contact management'
      ],
      popular: false,
      savings: '$60/year'
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
        'Advanced lead scraper (5,000 leads/month)',
        'Real-time email verification (10,000/month)',
        'Priority support',
        'Advanced analytics & reporting',
        'API access',
        'Custom integrations',
        'A/B testing',
        'Automation workflows'
      ],
      popular: true,
      savings: '$168/year'
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
        'Premium lead scraper (unlimited)',
        'Instant email verification (unlimited)',
        'Dedicated support manager',
        'Custom analytics dashboard',
        'Full API access',
        'White-label options',
        'Custom workflows',
        'SLA guarantee',
        'Advanced security features',
        'Team collaboration tools'
      ],
      popular: false,
      savings: '$408/year'
    }
  ];

  const addOns = [
    {
      name: 'Additional Email Credits',
      price: '$0.001 per email',
      description: 'Extra email sending capacity beyond your plan limits'
    },
    {
      name: 'Premium Support',
      price: '$99/month',
      description: '24/7 phone support with dedicated account manager'
    },
    {
      name: 'Custom Integration',
      price: '$299 one-time',
      description: 'Professional setup of custom API integrations'
    },
    {
      name: 'Data Migration',
      price: '$199 one-time',
      description: 'Professional migration of your existing data'
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'What happens if I exceed my limits?',
      answer: 'You can purchase additional credits or upgrade to a higher plan. We\'ll notify you before you reach your limits.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all plans. Contact support for assistance.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-32 pb-20 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      }`}>
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-violet-600/20 via-blue-600/15 to-emerald-600/20' 
              : 'bg-gradient-to-r from-violet-500/8 via-blue-500/6 to-emerald-500/8'
          } animate-gradient-x`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-white/5 text-emerald-400 border-emerald-500/30' 
              : 'bg-white/80 text-emerald-600 border-emerald-300/50'
          }`}>
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            14-day free trial • No credit card required
          </div>

          <h1 className={`text-5xl md:text-7xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Simple, <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Choose the perfect plan for your business. Upgrade or downgrade at any time with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className={`inline-flex items-center p-1 rounded-full backdrop-blur-xl border ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/60 border-gray-200'
          }`}>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
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
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative ${
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
      </section>

      {/* Pricing Plans */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-6`}>
                    <plan.icon className="w-10 h-10 text-white" />
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
                    <div className="mt-2">
                      <p className={`text-sm ${
                        isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        Billed annually • Save {plan.savings}
                      </p>
                    </div>
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

                <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : isDarkMode
                      ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40'
                      : 'bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                }`}>
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Add-ons & Extras
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Enhance your plan with additional features and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {addon.name}
                </h3>
                <p className={`text-2xl font-bold mb-3 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent`}>
                  {addon.price}
                </p>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Pricing FAQ
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.question}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Get Started?
          </h2>
          
          <p className={`text-xl mb-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start your free trial today and see why thousands of businesses choose Chatriox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            
            <button className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl border-2 ${
              isDarkMode 
                ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/10' 
                : 'text-gray-900 border-gray-300/50 hover:border-gray-400/70 hover:bg-white/90'
            }`}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;