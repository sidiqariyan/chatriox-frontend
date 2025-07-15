import React from 'react';
import { Users, Target, Award, Globe, ArrowRight, Zap } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former VP of Growth at TechCorp with 15+ years in marketing automation.'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Ex-Google engineer specializing in AI and machine learning systems.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Product leader with expertise in SaaS platforms and user experience.'
    },
    {
      name: 'Emily Watson',
      role: 'VP of Marketing',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Growth marketing expert who scaled multiple startups to $100M+ ARR.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that transform how businesses communicate.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We build tools that genuinely help businesses grow and thrive.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer support.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Empowering businesses worldwide to connect with their audiences more effectively than ever before.'
    }
  ];

  const stats = [
    { value: '2023', label: 'Founded' },
    { value: '++', label: 'Team Members' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '99.9%', label: 'Uptime' }
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
            About <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Chatriox</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We're on a mission to revolutionize how businesses connect with their customers through intelligent automation and cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Story
              </h2>
              <div className="space-y-6">
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Founded in 2023, Chatriox emerged from a simple observation: businesses were struggling to reach their customers effectively in an increasingly digital world. Traditional marketing methods were becoming obsolete, and companies needed smarter, more efficient ways to connect.
                </p>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Our founders, having experienced these challenges firsthand while scaling their previous companies, decided to build the solution they wished existed. Today, Chatriox serves over 10,000 businesses worldwide, helping them generate millions of leads and send billions of messages.
                </p>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  We believe that every business, regardless of size, should have access to enterprise-level marketing automation tools. That's why we've made our platform accessible, affordable, and incredibly powerful.
                </p>
              </div>
            </div>
            <div className={`p-8 rounded-3xl backdrop-blur-xl border ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/60 border-gray-200'
            }`}>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-black mb-2 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do at Chatriox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-violet-500 to-purple-600' 
              : 'bg-gradient-to-r from-violet-500 to-purple-600'
          }`}>
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Join Our Mission?
          </h2>
          
          <p className={`text-xl mb-12 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Be part of the revolution in business communication. Start your journey with Chatriox today.
          </p>
          
          <button className="group bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center mx-auto">
            <span className="flex items-center">
              <a href='/signup'> Get Started Now</a>
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;