import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag, Plus, Edit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogProps {
  isDarkMode: boolean;
}

const Blog: React.FC<BlogProps> = ({ isDarkMode }) => {
  const featuredPost = {
    id: 1,
    title: 'The Future of Email Marketing: AI-Powered Personalization',
    excerpt: 'Discover how artificial intelligence is revolutionizing email marketing with unprecedented personalization capabilities that drive higher engagement and conversion rates.',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Email Marketing',
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: 'WhatsApp Business API: Complete Guide for 2024',
      excerpt: 'Everything you need to know about WhatsApp Business API, from setup to advanced automation strategies.',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Marcus Rodriguez',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'WhatsApp Marketing'
    },
    {
      id: 3,
      title: 'Lead Generation Strategies That Actually Work in 2024',
      excerpt: 'Proven tactics and tools to generate high-quality leads that convert into paying customers.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Emily Watson',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Lead Generation'
    },
    {
      id: 4,
      title: 'Email Deliverability: Best Practices for 2024',
      excerpt: 'Master email deliverability with these proven strategies to ensure your emails reach the inbox.',
      image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Email Marketing'
    },
    {
      id: 5,
      title: 'Automation Workflows: From Beginner to Expert',
      excerpt: 'Learn how to create sophisticated automation workflows that nurture leads and drive conversions.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Lisa Thompson',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'Automation'
    },
    {
      id: 6,
      title: 'GDPR Compliance in Email Marketing: What You Need to Know',
      excerpt: 'Stay compliant with GDPR regulations while maintaining effective email marketing campaigns.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Alex Johnson',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Compliance'
    },
    {
      id: 7,
      title: 'ROI Optimization: Measuring Marketing Success',
      excerpt: 'Learn how to track, measure, and optimize your marketing campaigns for maximum return on investment.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Sarah Chen',
      date: '2024-01-01',
      readTime: '11 min read',
      category: 'Analytics'
    }
  ];

  const categories = [
    'All Posts',
    'Email Marketing',
    'WhatsApp Marketing',
    'Lead Generation',
    'Automation',
    'Analytics',
    'Compliance'
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
            Chatriox <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Insights, tips, and strategies to help you master marketing automation and grow your business.
          </p>
          
          {/* Admin Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/blog/create"
              className="group bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Blog
            </Link>
            
            <button className="group bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              AI Blog Generator
            </button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Article
            </h2>
          </div>

          <Link to={`/blog/${featuredPost.id}`}>
            <div className={`group rounded-3xl overflow-hidden border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-xl'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white`}>
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-500 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {featuredPost.title}
                  </h3>
                  
                  <p className={`text-lg mb-6 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {featuredPost.author}
                      </span>
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories Filter */}
      <section className={`py-12 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  index === 0
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-800/50 text-gray-300 border border-slate-700 hover:border-slate-600'
                      : 'bg-white/60 text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Latest Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <article className={`group rounded-2xl overflow-hidden border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-xl'
                }`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm">
                      <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/blog/edit/${post.id}`}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-white hover:bg-slate-700' 
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {post.author}
                        </span>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;