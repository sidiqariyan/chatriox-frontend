import React from 'react';
import { UserPlus, Upload, Send } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isDarkMode }) => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Choose Your Tool',
      description: 'Create your account and select from our suite of marketing tools tailored to your needs.',
      number: '01'
    },
    {
      icon: Upload,
      title: 'Import Contacts or Scrape Leads',
      description: 'Upload your existing contacts or use our lead scraper to find new prospects automatically.',
      number: '02'
    },
    {
      icon: Send,
      title: 'Start Messaging Instantly',
      description: 'Launch your campaigns with personalized messages and track results in real-time.',
      number: '03'
    }
  ];

  return (
    <section id="how-it-works" className={`py-24 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How it Works?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get started in minutes with our simple three-step process designed for maximum efficiency.
          </p>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg z-10 ${
                  isDarkMode 
                    ? 'bg-slate-900 text-blue-400 border-2 border-blue-500' 
                    : 'bg-white text-blue-500 border-2 border-blue-500'
                }`}>
                  {step.number}
                </div>
                
                <div className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 mt-8 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-xl font-semibold mb-4 text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-center leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;