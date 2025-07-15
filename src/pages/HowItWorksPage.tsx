import React from 'react';
import { Play, UserPlus, Upload, Send, Settings, BarChart3, Zap, CheckCircle } from 'lucide-react';

interface HowItWorksPageProps {
  isDarkMode: boolean;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ isDarkMode }) => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Choose Your Tool',
      description: 'Create your account in under 2 minutes and select from our suite of marketing tools tailored to your specific business needs.',
      details: [
        'Quick 2-minute signup process',
        'Choose your primary marketing tool',
        'Set up your business profile',
        'Connect your existing accounts'
      ],
      videoId: 'dQw4w9WgXcQ', // Replace with actual video IDs
      number: '01'
    },
    {
      icon: Upload,
      title: 'Import Contacts or Scrape Leads',
      description: 'Upload your existing contact lists or use our intelligent lead scraper to find new prospects automatically from various platforms.',
      details: [
        'Import CSV/Excel files instantly',
        'Use AI-powered lead scraping',
        'Verify and clean contact data',
        'Organize contacts into segments'
      ],
      videoId: 'dQw4w9WgXcQ',
      number: '02'
    },
    {
      icon: Settings,
      title: 'Customize Your Campaigns',
      description: 'Design personalized email templates, set up WhatsApp message flows, and configure automation rules that match your brand.',
      details: [
        'Drag-and-drop email builder',
        'WhatsApp message templates',
        'Brand customization options',
        'Automation rule setup'
      ],
      videoId: 'dQw4w9WgXcQ',
      number: '03'
    },
    {
      icon: Send,
      title: 'Launch Your Campaigns',
      description: 'Send your first campaign with a single click. Our platform handles delivery optimization, timing, and compliance automatically.',
      details: [
        'One-click campaign launch',
        'Automatic send time optimization',
        'Compliance checking',
        'Real-time delivery monitoring'
      ],
      videoId: 'dQw4w9WgXcQ',
      number: '04'
    },
    {
      icon: BarChart3,
      title: 'Track & Optimize Results',
      description: 'Monitor your campaign performance with detailed analytics and use AI-powered insights to continuously improve your results.',
      details: [
        'Real-time analytics dashboard',
        'Performance insights',
        'A/B testing results',
        'Optimization recommendations'
      ],
      videoId: 'dQw4w9WgXcQ',
      number: '05'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Setup',
      description: 'Get started in minutes, not hours. Our intuitive interface makes complex marketing automation simple.'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Built-In',
      description: 'Stay compliant with GDPR, CAN-SPAM, and other regulations with our built-in compliance features.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track every metric that matters with our comprehensive analytics and reporting dashboard.'
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
          <h1 className={`text-5xl md:text-7xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How It <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Works</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            From setup to success in 5 simple steps. See how Chatriox transforms your marketing automation workflow.
          </p>

          {/* Overview Video */}
          <div className={`max-w-4xl mx-auto rounded-3xl overflow-hidden border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <div className="relative aspect-video bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center">
              <button className="group bg-white/20 backdrop-blur-lg rounded-full p-6 transition-all duration-300 hover:scale-110 hover:bg-white/30">
                <Play className="w-12 h-12 text-white ml-1" />
              </button>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">Complete Platform Overview</h3>
                <p className="text-sm opacity-90">Watch how Chatriox works in 3 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Step-by-Step Process
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Follow these simple steps to transform your marketing automation
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-blue-400 border-2 border-blue-500' 
                      : 'bg-white text-blue-500 border-2 border-blue-500'
                  }`}>
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>

                  <h3 className={`text-3xl font-bold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-lg mb-8 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <CheckCircle className={`w-5 h-5 mr-3 ${
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                        }`} />
                        <span className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    <Play className="w-4 h-4 mr-2" />
                    Watch Step {step.number}
                  </button>
                </div>

                {/* Video */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`rounded-3xl overflow-hidden border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700' 
                      : 'bg-white/50 border-gray-200 hover:shadow-xl'
                  }`}>
                    <div className="relative aspect-video bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center">
                      <button className="group bg-white/20 backdrop-blur-lg rounded-full p-4 transition-all duration-300 hover:scale-110 hover:bg-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">Step {step.number} Demo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
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
              Why Choose Chatriox?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Built for modern businesses that demand results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 text-center ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Success Stories
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              See how businesses like yours achieve remarkable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                metric: '300%',
                label: 'Increase in Lead Generation',
                company: 'TechFlow Inc.',
                description: 'Automated lead scraping and email campaigns'
              },
              {
                metric: '150%',
                label: 'Higher Email Open Rates',
                company: 'GrowthLab',
                description: 'AI-powered send time optimization'
              },
              {
                metric: '5x',
                label: 'Faster Campaign Setup',
                company: 'StartupBoost',
                description: 'Streamlined workflow automation'
              }
            ].map((story, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 text-center ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`text-5xl font-black mb-4 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent`}>
                  {story.metric}
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {story.label}
                </h3>
                
                <p className={`text-sm font-medium mb-3 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {story.company}
                </p>
                
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {story.description}
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
            Join thousands of businesses already using Chatriox to automate their marketing and generate unlimited leads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center justify-center">
              <Play className="mr-3 w-6 h-6" />
              Start Free Trial
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

export default HowItWorksPage;