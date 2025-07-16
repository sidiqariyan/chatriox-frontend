import React from 'react';
import { Mail, MessageCircle, CheckCircle, Search, Zap, Shield, Globe, BarChart3 } from 'lucide-react';

interface ServicesProps {
  isDarkMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ isDarkMode }) => {
  const services = [
    {
      icon: Mail,
      title: 'Bulk Email Sender',
      description: 'Send thousands of personalized emails with advanced automation, A/B testing, and detailed analytics.',
      features: [
        'Unlimited email campaigns',
        'Advanced personalization',
        'A/B testing capabilities',
        'Real-time analytics',
        'Automated follow-ups',
        'Template library'
      ],
      gradient: 'from-blue-500 to-blue-600',
      price: 'Starting at $29/month'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Bulk Messaging',
      description: 'Reach customers directly on WhatsApp with compliant bulk messaging tools and automation.',
      features: [
        'WhatsApp Business API',
        'Bulk message campaigns',
        'Media file support',
        'Contact management',
        'Delivery tracking',
        'Compliance tools'
      ],
      gradient: 'from-green-500 to-green-600',
      price: 'Starting at $49/month'
    },
    {
      icon: CheckCircle,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time to improve deliverability and reduce bounce rates.',
      features: [
        'Real-time verification',
        'Bulk email validation',
        'Syntax checking',
        'Domain validation',
        'Disposable email detection',
        'API integration'
      ],
      gradient: 'from-purple-500 to-purple-600',
      price: 'Starting at $19/month'
    },
    {
      icon: Search,
      title: 'Lead Scraper',
      description: 'Extract high-quality leads from various platforms with intelligent scraping technology.',
      features: [
        'Multi-platform scraping',
        'AI-powered filtering',
        'Contact enrichment',
        'Export capabilities',
        'CRM integration',
        'Compliance monitoring'
      ],
      gradient: 'from-orange-500 to-orange-600',
      price: 'Starting at $39/month'
    }
  ];

  const additionalServices = [
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into your campaigns with advanced analytics and custom reports.'
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Stay compliant with GDPR, CAN-SPAM, and other regulations with built-in compliance tools.'
    },
    {
      icon: Globe,
      title: 'API Integration',
      description: 'Seamlessly integrate with your existing tools and workflows using our robust API.'
    },
    {
      icon: Zap,
      title: 'Automation Workflows',
      description: 'Create complex automation sequences to nurture leads and convert prospects.'
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
            Our <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive marketing automation tools designed to scale your business and generate unlimited leads.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Core Services
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything you need to automate your marketing and generate more leads
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-xl'
                }`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-lg mb-6 leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className={`w-4 h-4 mr-2 ${
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                        }`} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                  <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r ${service.gradient} text-white`}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
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
              Additional Services
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Comprehensive support services to maximize your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 text-center ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center mx-auto mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Process
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              How we help you achieve marketing success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation & Strategy',
                description: 'We analyze your business needs and create a customized marketing automation strategy.'
              },
              {
                step: '02',
                title: 'Setup & Integration',
                description: 'Our team helps you set up and integrate all tools with your existing systems seamlessly.'
              },
              {
                step: '03',
                title: 'Launch & Optimize',
                description: 'We launch your campaigns and continuously optimize for maximum performance and ROI.'
              }
            ].map((process, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 text-center ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`text-6xl font-black mb-6 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent`}>
                  {process.step}
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {process.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;