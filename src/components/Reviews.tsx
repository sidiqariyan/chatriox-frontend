import React from 'react';
import { Star, Quote } from 'lucide-react';

interface ReviewsProps {
  isDarkMode: boolean;
}

const Reviews: React.FC<ReviewsProps> = ({ isDarkMode }) => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechFlow Inc.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Chatriox transformed our lead generation completely. We went from 50 leads per month to over 2,000 with their AI-powered tools. The WhatsApp integration is phenomenal!',
      gradient: 'from-violet-400 to-purple-500'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CEO',
      company: 'GrowthLab',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The email verification feature alone saved us thousands in bounced emails. ROI was positive within the first week. Best investment we\'ve made for our marketing stack.',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Emily Watson',
      role: 'Growth Manager',
      company: 'StartupBoost',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Lead scraper is incredibly accurate. We found 10,000+ qualified prospects in our niche within hours. The automation features are next-level sophisticated.',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      name: 'David Kim',
      role: 'Sales Director',
      company: 'ScaleUp Solutions',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Customer support is outstanding and the platform is incredibly intuitive. Our team was up and running in minutes, not hours. Highly recommend!',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      name: 'Lisa Thompson',
      role: 'Marketing Manager',
      company: 'InnovateCorp',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The bulk email sender has incredible deliverability rates. Our open rates increased by 300% and conversions by 150%. Game-changing platform!',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      name: 'Alex Johnson',
      role: 'Founder',
      company: 'DigitalEdge',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'API integration was seamless and documentation is excellent. We built custom workflows that perfectly fit our business needs. Fantastic product!',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];

  return (
    <section className={`py-24 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Loved by <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">10,000+</span> Businesses
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            See what our customers are saying about their success with Chatriox
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4.9</span>
            <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>from 2,847 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`group p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10' 
                  : 'bg-white/60 border-white/50 hover:border-white/80 hover:bg-white/90'
              } hover:shadow-2xl`}
            >
              {/* Quote Icon */}
              <div className={`absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                <Quote className="w-8 h-8 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className={`text-sm leading-relaxed mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${review.gradient} flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {review.name}
                  </h4>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {review.role} at {review.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className={`text-sm mb-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['TechCrunch', 'Forbes', 'Entrepreneur', 'Inc.', 'Fast Company'].map((brand, index) => (
              <div
                key={index}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-100 ${
                  isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;