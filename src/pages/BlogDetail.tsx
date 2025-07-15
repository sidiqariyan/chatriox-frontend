import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react';

interface BlogDetailProps {
  isDarkMode: boolean;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ isDarkMode }) => {
  const { id } = useParams();

  // Mock blog post data - in real app, fetch based on ID
  const post = {
    id: 1,
    title: 'The Future of Email Marketing: AI-Powered Personalization',
    content: `
      <p>Email marketing has evolved dramatically over the past decade, but we're now standing at the threshold of its most significant transformation yet. Artificial Intelligence is revolutionizing how we approach email personalization, moving beyond simple name insertion to create truly individualized experiences for each subscriber.</p>

      <h2>The Current State of Email Personalization</h2>
      <p>Traditional email personalization has relied on basic demographic data and purchase history. While this approach has shown improvements over generic mass emails, it barely scratches the surface of what's possible with modern AI technology.</p>

      <p>Most marketers today use:</p>
      <ul>
        <li>Basic demographic segmentation</li>
        <li>Purchase history-based recommendations</li>
        <li>Geographic targeting</li>
        <li>Simple behavioral triggers</li>
      </ul>

      <h2>AI-Powered Personalization: The Game Changer</h2>
      <p>Artificial Intelligence takes personalization to an entirely new level by analyzing vast amounts of data points to predict individual preferences, optimal send times, and content preferences with unprecedented accuracy.</p>

      <h3>Key AI Capabilities in Email Marketing:</h3>
      <p><strong>Predictive Analytics:</strong> AI can predict which products a customer is most likely to purchase next, when they're most likely to make a purchase, and what type of content will resonate with them.</p>

      <p><strong>Dynamic Content Generation:</strong> Advanced AI systems can generate personalized subject lines, email copy, and even product descriptions tailored to individual recipients.</p>

      <p><strong>Optimal Send Time Prediction:</strong> Instead of sending emails at the same time to everyone, AI determines the optimal send time for each individual subscriber based on their past engagement patterns.</p>

      <h2>Real-World Implementation</h2>
      <p>Companies implementing AI-powered email personalization are seeing remarkable results:</p>

      <blockquote>
        "After implementing AI-driven personalization, our email open rates increased by 45% and click-through rates improved by 78%. The technology essentially created a personal shopping assistant for each of our 100,000+ subscribers." - Marketing Director at RetailCorp
      </blockquote>

      <h2>The Technology Behind the Magic</h2>
      <p>Modern AI email systems use machine learning algorithms that continuously learn from subscriber behavior. These systems analyze:</p>

      <ul>
        <li>Email engagement patterns (opens, clicks, time spent reading)</li>
        <li>Website browsing behavior</li>
        <li>Purchase history and preferences</li>
        <li>Social media interactions</li>
        <li>Seasonal and temporal patterns</li>
      </ul>

      <h2>Getting Started with AI Email Personalization</h2>
      <p>Implementing AI-powered email personalization doesn't have to be overwhelming. Here's a step-by-step approach:</p>

      <h3>1. Data Collection and Integration</h3>
      <p>Start by ensuring you're collecting comprehensive data about your subscribers. This includes not just email engagement data, but also website behavior, purchase history, and any other relevant touchpoints.</p>

      <h3>2. Choose the Right Platform</h3>
      <p>Select an email marketing platform that offers robust AI capabilities. Look for features like predictive analytics, dynamic content generation, and automated optimization.</p>

      <h3>3. Start Small and Scale</h3>
      <p>Begin with simple AI implementations like send time optimization and gradually move to more complex personalization features as you become comfortable with the technology.</p>

      <h2>The Future is Now</h2>
      <p>AI-powered email personalization isn't a distant future concept—it's available today and being used by forward-thinking companies to drive unprecedented engagement and revenue growth.</p>

      <p>As we look ahead, we can expect even more sophisticated AI capabilities, including real-time personalization that adapts content based on current events, weather, or even the recipient's mood as inferred from their recent digital behavior.</p>

      <p>The companies that embrace AI-powered email personalization today will have a significant competitive advantage tomorrow. The question isn't whether you should implement AI in your email marketing—it's how quickly you can get started.</p>
    `,
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    author: 'Sarah Chen',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Email Marketing',
    tags: ['AI', 'Personalization', 'Email Marketing', 'Automation', 'Machine Learning']
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'WhatsApp Business API: Complete Guide for 2024',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'Lead Generation Strategies That Actually Work',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Email Deliverability: Best Practices for 2024',
      image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      readTime: '7 min read'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Back Button */}
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog"
            className={`inline-flex items-center text-sm font-medium transition-colors hover:text-blue-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isDarkMode 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {post.category}
            </span>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.author}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            <button className={`p-3 rounded-full transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className={`prose prose-lg max-w-none mb-12 ${
          isDarkMode 
            ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-blockquote:text-gray-300 prose-blockquote:border-blue-500' 
            : 'prose-gray prose-headings:text-gray-900 prose-blockquote:border-blue-500'
        }`}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tags:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:scale-105 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className={`p-8 rounded-2xl border backdrop-blur-lg mb-12 ${
          isDarkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/50 border-gray-200'
        }`}>
          <div className="flex items-start space-x-4">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About {post.author}
              </h3>
              <p className={`leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sarah is a marketing technology expert with over 10 years of experience in email marketing and automation. She leads the content strategy at Chatriox and regularly speaks at marketing conferences worldwide.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                <article className={`group rounded-2xl overflow-hidden border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                    : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-xl'
                }`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm">
                      <BookOpen className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {relatedPost.readTime}
                      </span>
                    </div>
                    
                    <h3 className={`text-lg font-bold group-hover:text-blue-500 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {relatedPost.title}
                    </h3>
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

export default BlogDetail;