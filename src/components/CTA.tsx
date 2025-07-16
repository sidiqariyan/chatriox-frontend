import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface CTAProps {
  isDarkMode: boolean;
}

const CTA: React.FC<CTAProps> = ({ isDarkMode }) => {
  return (
    <section className={`py-24 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-violet-600/20 via-blue-600/15 to-emerald-600/20' 
            : 'bg-gradient-to-r from-violet-500/8 via-blue-500/6 to-emerald-500/8'
        } animate-gradient-x`} />
        
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-gradient-to-r from-violet-400 to-purple-500'
          }`} />
          <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-25 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
          }`} style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-violet-500 to-purple-600' 
            : 'bg-gradient-to-r from-violet-500 to-purple-600'
        } animate-pulse`}>
          <Zap className="w-10 h-10 text-white" />
        </div>

        {/* Headline */}
        <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Ready to <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">10X</span> Your Leads?
        </h2>

        {/* Subheadline */}
        <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Join thousands of businesses already using Chatriox to automate their marketing and generate unlimited leads.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/30 flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-3 w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
              Start Free Trial
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
          
          <button className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl border-2 ${
            isDarkMode 
              ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/10' 
              : 'text-gray-900 border-gray-300/50 hover:border-gray-400/70 hover:bg-white/90'
          }`}>
            Schedule Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              No credit card required
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Setup in under 5 minutes
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;