import React from 'react';
import { Mail, MessageCircle, CheckCircle, Search } from 'lucide-react';

interface FeaturesProps {
  isDarkMode: boolean;
}

const Features: React.FC<FeaturesProps> = ({ isDarkMode }) => {
  const features = [
    {
      icon: Mail,
      title: 'Bulk Email Sender',
      description: 'Send thousands of personalized emails with advanced automation and tracking capabilities.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Bulk Messaging',
      description: 'Reach customers directly on WhatsApp with bulk messaging tools that respect privacy.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: CheckCircle,
      title: 'Email Verifier',
      description: 'Validate email addresses in real-time to improve deliverability and reduce bounce rates.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Search,
      title: 'Lead Scraper',
      description: 'Extract high-quality leads from various platforms with our intelligent scraping technology.',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="features" className={`py-24 ${
      isDarkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block">Powerful Tools for</span>
            <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent"> Modern Marketing</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to scale your outreach and generate more leads with cutting-edge automation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 group ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                  : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;