import React from 'react';
import { Play, ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <section id="home" className={`relative pt-20 pb-32 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }`}>
      {/* Beautiful Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient overlay */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-violet-600/20 via-blue-600/15 to-emerald-600/20' 
            : 'bg-gradient-to-r from-violet-500/8 via-blue-500/6 to-emerald-500/8'
        } animate-gradient-x`} />
        
        {/* Attractive floating orbs */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-gradient-to-r from-violet-400 to-purple-500'
          }`} />
          <div className={`absolute top-40 right-32 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gradient-to-r from-blue-400 to-cyan-500'
          }`} style={{ animationDelay: '2s', animationDuration: '4s' }} />
          <div className={`absolute bottom-32 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-25 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
          }`} style={{ animationDelay: '1s', animationDuration: '5s' }} />
        </div>

        {/* Subtle pattern overlay */}
        <div className={`absolute inset-0 opacity-5 ${
          isDarkMode ? 'bg-white' : 'bg-gray-900'
        }`} style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Premium Badge */}
          <div className={`inline-flex items-center px-8 py-4 rounded-full text-sm font-semibold mb-8 backdrop-blur-xl border transition-all hover:scale-105 cursor-pointer ${
            isDarkMode 
              ? 'bg-white/5 text-emerald-400 border-emerald-500/30 shadow-2xl shadow-emerald-500/10' 
              : 'bg-white/80 text-emerald-600 border-emerald-300/50 shadow-2xl shadow-emerald-500/20'
          }`}>
            <Star className="w-4 h-4 mr-2 text-yellow-400 animate-pulse" />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500 bg-clip-text text-transparent font-bold">
              #1 Marketing Automation Platform
            </span>
            <Sparkles className="w-4 h-4 ml-2 text-violet-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          {/* Stunning Headline */}
          <h1 className={`text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block mb-2">Smart Messaging.</span>
            <span className="block bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-x">
              Limitless Leads.
            </span>
          </h1>

          {/* Compelling Subheadline */}
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Transform your business with <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>AI-powered</span> email campaigns, 
            WhatsApp automation, and intelligent lead generation that <span className={`font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>scales infinitely</span>.
          </p>

          {/* Beautiful CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/30 flex items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            
            <button className={`group px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center backdrop-blur-xl border-2 ${
              isDarkMode 
                ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10' 
                : 'text-gray-900 border-gray-300/50 hover:border-gray-400/70 hover:bg-white/90 hover:shadow-2xl hover:shadow-gray-500/20'
            }`}>
              <Play className="mr-3 w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
              Watch Demo
            </button>
          </div>

          {/* Impressive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: '5M+', label: 'Messages Delivered', icon: '🚀', gradient: 'from-violet-400 to-purple-500' },
              { value: '250K+', label: 'Leads Generated', icon: '🎯', gradient: 'from-blue-400 to-cyan-500' },
              { value: '99.9%', label: 'Success Rate', icon: '⚡', gradient: 'from-emerald-400 to-teal-500' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10' 
                    : 'bg-white/60 border-white/50 hover:border-white/80 hover:bg-white/80'
                } hover:shadow-2xl`}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                <div className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-semibold ${
                  isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                } transition-colors duration-300`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-300 ${
          isDarkMode ? 'border-gray-600 hover:border-gray-400' : 'border-gray-400 hover:border-gray-600'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-b from-violet-400 to-blue-500' : 'bg-gradient-to-b from-violet-500 to-blue-600'
          }`} />
        </div>
      </div>
    </section>
  );
};

export default Hero;