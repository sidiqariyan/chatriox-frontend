import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Save, 
  Eye, 
  Upload, 
  Image, 
  Link, 
  Bold, 
  Italic, 
  List, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  Hash,
  Calendar,
  User,
  Tag,
  Globe,
  ArrowLeft,
  Sparkles,
  Wand2,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogCreateProps {
  isDarkMode: boolean;
}

const BlogCreate: React.FC<BlogCreateProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: '',
    tags: '',
    status: 'draft',
    publishDate: '',
    metaTitle: '',
    metaDescription: '',
    author: 'Admin'
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSettings, setAiSettings] = useState({
    targetLength: 2000,
    focusKeyword: '',
    includeKeywordResearch: true,
    seoOptimization: 'high',
    contentType: 'comprehensive-guide',
    targetAudience: 'business-professionals'
  });
  const [keywordResearch, setKeywordResearch] = useState(null);
  const [isResearchingKeywords, setIsResearchingKeywords] = useState(false);

  // WordPress-like editor modules
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'code-block'
  ];

  const categories = [
    'Email Marketing',
    'WhatsApp Marketing', 
    'Lead Generation',
    'Automation',
    'Analytics',
    'Compliance',
    'Case Studies',
    'Tutorials',
    'Industry News'
  ];

  const performKeywordResearch = async (topic) => {
    setIsResearchingKeywords(true);
    try {
      // Simulate keyword research API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockKeywordData = {
        primaryKeyword: {
          keyword: `${topic.toLowerCase()} strategies`,
          volume: 8900,
          difficulty: 35,
          cpc: 2.45
        },
        relatedKeywords: [
          { keyword: `${topic.toLowerCase()} tips`, volume: 5400, difficulty: 28, cpc: 1.89 },
          { keyword: `best ${topic.toLowerCase()} practices`, volume: 3200, difficulty: 42, cpc: 3.12 },
          { keyword: `${topic.toLowerCase()} guide 2024`, volume: 2100, difficulty: 25, cpc: 2.67 },
          { keyword: `${topic.toLowerCase()} automation`, volume: 4600, difficulty: 38, cpc: 4.23 },
          { keyword: `${topic.toLowerCase()} tools`, volume: 6700, difficulty: 45, cpc: 3.78 }
        ],
        longTailKeywords: [
          `how to improve ${topic.toLowerCase()}`,
          `${topic.toLowerCase()} for small business`,
          `${topic.toLowerCase()} best practices 2024`,
          `advanced ${topic.toLowerCase()} techniques`,
          `${topic.toLowerCase()} ROI optimization`
        ]
      };
      
      setKeywordResearch(mockKeywordData);
      setAiSettings(prev => ({
        ...prev,
        focusKeyword: mockKeywordData.primaryKeyword.keyword
      }));
      
      return mockKeywordData;
    } catch (error) {
      toast.error('Failed to research keywords');
      return null;
    } finally {
      setIsResearchingKeywords(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setBlogData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      const imageUrl = URL.createObjectURL(file);
      setBlogData(prev => ({
        ...prev,
        featuredImage: imageUrl
      }));
      toast.success('Featured image uploaded successfully!');
    }
  };

  const generateAIBlog = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a topic for AI blog generation');
      return;
    }

    setIsAIGenerating(true);
    
    try {
      // First, perform keyword research if enabled
      let keywords = keywordResearch;
      if (aiSettings.includeKeywordResearch && !keywords) {
        keywords = await performKeywordResearch(aiPrompt);
      }
      
      // Simulate AI blog generation (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const primaryKeyword = keywords?.primaryKeyword?.keyword || aiPrompt.toLowerCase();
      const relatedKeywords = keywords?.relatedKeywords || [];
      
      const aiGeneratedContent = {
        title: `The Complete ${aiPrompt} Guide: ${keywords?.primaryKeyword?.keyword || 'Advanced Strategies'} for 2024`,
        excerpt: `Master ${primaryKeyword} with our comprehensive guide. Discover proven strategies, tools, and techniques that drive real results for businesses of all sizes.`,
        content: `
          <h2>Introduction to ${aiPrompt}</h2>
          <p>In today's competitive digital landscape, mastering <strong>${primaryKeyword}</strong> is essential for business success. This comprehensive guide will walk you through everything you need to know about ${aiPrompt.toLowerCase()}, from fundamental concepts to advanced implementation strategies.</p>
          
          <p>Whether you're a beginner looking to understand the basics or an experienced professional seeking to optimize your approach, this guide covers all aspects of ${primaryKeyword} with actionable insights and real-world examples.</p>
          
          <h2>Understanding ${aiPrompt}: The Foundation</h2>
          <p>Before diving into advanced strategies, it's crucial to understand what makes ${aiPrompt.toLowerCase()} effective. The key lies in understanding your audience, leveraging the right tools, and implementing data-driven approaches that deliver measurable results.</p>
          
          <h3>Core Components of Successful ${aiPrompt}</h3>
          <p>Effective ${primaryKeyword} requires a strategic approach that encompasses several key elements:</p>
          
          <ul>
            <li><strong>Strategic Planning:</strong> Developing a comprehensive roadmap aligned with business objectives</li>
            <li><strong>Audience Analysis:</strong> Understanding your target market's needs, preferences, and behaviors</li>
            <li><strong>Technology Integration:</strong> Leveraging modern tools and platforms for maximum efficiency</li>
            <li><strong>Performance Measurement:</strong> Implementing robust analytics to track success and identify improvement areas</li>
            <li><strong>Continuous Optimization:</strong> Regularly refining strategies based on data and market changes</li>
          </ul>
          
          <h2>Advanced ${aiPrompt} Strategies for 2024</h2>
          <p>The landscape of ${aiPrompt.toLowerCase()} continues to evolve rapidly. Here are the most effective strategies that industry leaders are implementing:</p>
          
          <h3>1. Data-Driven Decision Making</h3>
          <p>Modern ${primaryKeyword} relies heavily on data analytics to drive decisions. By leveraging advanced analytics tools, businesses can gain deeper insights into customer behavior, campaign performance, and market trends.</p>
          
          <p>Key metrics to focus on include conversion rates, customer lifetime value, engagement rates, and return on investment. These metrics provide a clear picture of what's working and what needs improvement in your ${aiPrompt.toLowerCase()} strategy.</p>
          
          <h3>2. Personalization at Scale</h3>
          <p>Personalization has become a cornerstone of effective ${primaryKeyword}. By tailoring content, messaging, and experiences to individual preferences, businesses can significantly improve engagement and conversion rates.</p>
          
          <blockquote>
            "Personalization is not just about using someone's name in an email. It's about delivering the right message, to the right person, at the right time, through the right channel." - Industry Expert
          </blockquote>
          
          <h3>3. Automation and AI Integration</h3>
          <p>Artificial intelligence and automation are revolutionizing ${aiPrompt.toLowerCase()}. From chatbots and predictive analytics to automated campaign optimization, AI tools are helping businesses achieve better results with less manual effort.</p>
          
          <h2>Tools and Technologies for ${aiPrompt}</h2>
          <p>Success in ${primaryKeyword} requires the right technology stack. Here are the essential tools every professional should consider:</p>
          
          <h3>Analytics and Tracking Tools</h3>
          <ul>
            <li>Google Analytics 4 for comprehensive website analytics</li>
            <li>Hotjar for user behavior analysis</li>
            <li>SEMrush or Ahrefs for SEO and keyword research</li>
            <li>Social media analytics platforms</li>
          </ul>
          
          <h3>Automation Platforms</h3>
          <ul>
            <li>Marketing automation tools for email campaigns</li>
            <li>CRM systems for customer relationship management</li>
            <li>Social media scheduling tools</li>
            <li>Workflow automation platforms</li>
          </ul>
          
          <h2>Best Practices for ${aiPrompt} Implementation</h2>
          <p>Implementing effective ${primaryKeyword} requires following proven best practices that have been tested across various industries and business sizes.</p>
          
          <h3>Planning and Strategy Development</h3>
          <p>Start with a clear understanding of your goals and objectives. Define what success looks like for your ${aiPrompt.toLowerCase()} efforts and establish key performance indicators (KPIs) that align with your business objectives.</p>
          
          <h3>Content Creation and Optimization</h3>
          <p>Create high-quality, valuable content that resonates with your target audience. Focus on solving real problems and providing actionable insights that your audience can implement immediately.</p>
          
          <h3>Testing and Optimization</h3>
          <p>Continuous testing is crucial for ${primaryKeyword} success. Implement A/B testing for different elements of your campaigns, from subject lines and call-to-action buttons to landing page designs and content formats.</p>
          
          <h2>Measuring Success in ${aiPrompt}</h2>
          <p>Effective measurement is essential for understanding the impact of your ${primaryKeyword} efforts. Key metrics to track include:</p>
          
          <ul>
            <li><strong>Conversion Rate:</strong> The percentage of visitors who complete desired actions</li>
            <li><strong>Customer Acquisition Cost (CAC):</strong> The cost of acquiring a new customer</li>
            <li><strong>Return on Investment (ROI):</strong> The financial return generated from your efforts</li>
            <li><strong>Engagement Metrics:</strong> Time on page, bounce rate, social shares</li>
            <li><strong>Customer Lifetime Value (CLV):</strong> The total value a customer brings over their relationship with your business</li>
          </ul>
          
          <h2>Common Challenges and Solutions</h2>
          <p>Every ${aiPrompt.toLowerCase()} professional faces challenges. Here are the most common obstacles and proven solutions:</p>
          
          <h3>Challenge 1: Limited Resources</h3>
          <p>Many businesses struggle with limited budgets and team resources. The solution lies in prioritizing high-impact activities and leveraging automation tools to maximize efficiency.</p>
          
          <h3>Challenge 2: Keeping Up with Changes</h3>
          <p>The ${aiPrompt.toLowerCase()} landscape evolves rapidly. Stay current by following industry publications, attending webinars, and participating in professional communities.</p>
          
          <h3>Challenge 3: Proving ROI</h3>
          <p>Demonstrating the value of ${primaryKeyword} efforts can be challenging. Implement robust tracking systems and focus on metrics that directly tie to business outcomes.</p>
          
          <h2>Future Trends in ${aiPrompt}</h2>
          <p>Looking ahead, several trends will shape the future of ${primaryKeyword}:</p>
          
          <ul>
            <li>Increased use of artificial intelligence and machine learning</li>
            <li>Greater emphasis on privacy and data protection</li>
            <li>Rise of voice search and conversational interfaces</li>
            <li>Integration of augmented and virtual reality experiences</li>
            <li>Focus on sustainability and social responsibility</li>
          </ul>
          
          <h2>Getting Started: Your Action Plan</h2>
          <p>Ready to implement ${primaryKeyword} in your business? Follow this step-by-step action plan:</p>
          
          <ol>
            <li><strong>Assess Your Current State:</strong> Evaluate your existing ${aiPrompt.toLowerCase()} efforts and identify gaps</li>
            <li><strong>Set Clear Goals:</strong> Define specific, measurable objectives for your ${primaryKeyword} strategy</li>
            <li><strong>Choose Your Tools:</strong> Select the right technology stack based on your needs and budget</li>
            <li><strong>Create Your Content Plan:</strong> Develop a content calendar that aligns with your audience's interests</li>
            <li><strong>Implement Tracking:</strong> Set up analytics and measurement systems from day one</li>
            <li><strong>Launch and Test:</strong> Start with small campaigns and gradually scale based on results</li>
            <li><strong>Optimize Continuously:</strong> Use data to refine and improve your approach over time</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>Mastering ${primaryKeyword} requires dedication, continuous learning, and a willingness to adapt to changing market conditions. By following the strategies and best practices outlined in this guide, you'll be well-equipped to achieve success in your ${aiPrompt.toLowerCase()} efforts.</p>
          
          <p>Remember that ${primaryKeyword} is not a one-time effort but an ongoing process of optimization and refinement. Stay committed to testing, learning, and improving, and you'll see significant results over time.</p>
          
          <p>Start implementing these strategies today, and watch as your ${aiPrompt.toLowerCase()} efforts drive meaningful growth for your business. The key to success lies in taking action and remaining consistent in your efforts.</p>
        `,
        tags: keywords ? [
          primaryKeyword,
          ...relatedKeywords.slice(0, 3).map(k => k.keyword),
          ...keywords.longTailKeywords.slice(0, 2)
        ].join(', ') : `${aiPrompt.toLowerCase()}, marketing automation, digital marketing, growth strategies, 2024 trends`,
        category: 'Tutorials',
        metaTitle: `${primaryKeyword} Guide 2024 | Complete ${aiPrompt} Strategies`,
        metaDescription: `Master ${primaryKeyword} with our comprehensive 2024 guide. Discover proven strategies, tools, and techniques for ${aiPrompt.toLowerCase()} success.`,
        featuredImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
      };

      setBlogData(prev => ({
        ...prev,
        ...aiGeneratedContent
      }));

      toast.success('AI blog generated successfully!');
      setAiPrompt('');
    } catch (error) {
      toast.error('Failed to generate AI blog. Please try again.');
    } finally {
      setIsAIGenerating(false);
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!blogData.title.trim()) {
      toast.error('Please enter a blog title');
      return;
    }

    if (!blogData.content.trim()) {
      toast.error('Please add some content to your blog');
      return;
    }

    // In a real app, save to database
    setBlogData(prev => ({ ...prev, status }));
    toast.success(`Blog ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    
    if (status === 'published') {
      navigate('/blog');
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-lg sticky top-0 z-50 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {isPreview ? 'Preview Blog' : 'Create New Blog'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreview}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
              
              <button
                onClick={() => handleSave('published')}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              {/* AI Blog Generator */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <div className="flex items-center mb-6">
                  <Wand2 className={`w-6 h-6 mr-3 ${
                    isDarkMode ? 'text-violet-400' : 'text-violet-600'
                  }`} />
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Advanced AI Blog Generator
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {/* Topic Input */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Blog Topic *
                    </label>
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Email Marketing Strategies, Lead Generation, WhatsApp Automation"
                      className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  {/* AI Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Content Length
                      </label>
                      <select
                        value={aiSettings.targetLength}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, targetLength: parseInt(e.target.value) }))}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value={1000}>Short (1,000 words)</option>
                        <option value={2000}>Medium (2,000 words)</option>
                        <option value={3000}>Long (3,000 words)</option>
                        <option value={4000}>Comprehensive (4,000+ words)</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        SEO Optimization
                      </label>
                      <select
                        value={aiSettings.seoOptimization}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, seoOptimization: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="basic">Basic SEO</option>
                        <option value="high">High SEO Focus</option>
                        <option value="advanced">Advanced SEO</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Content Type
                      </label>
                      <select
                        value={aiSettings.contentType}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, contentType: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="how-to-guide">How-to Guide</option>
                        <option value="comprehensive-guide">Comprehensive Guide</option>
                        <option value="listicle">Listicle</option>
                        <option value="case-study">Case Study</option>
                        <option value="comparison">Comparison</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Target Audience
                      </label>
                      <select
                        value={aiSettings.targetAudience}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, targetAudience: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="beginners">Beginners</option>
                        <option value="business-professionals">Business Professionals</option>
                        <option value="marketers">Marketers</option>
                        <option value="entrepreneurs">Entrepreneurs</option>
                        <option value="technical-users">Technical Users</option>
                      </select>
                    </div>
                  </div>

                  {/* Keyword Research Toggle */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="keywordResearch"
                      checked={aiSettings.includeKeywordResearch}
                      onChange={(e) => setAiSettings(prev => ({ ...prev, includeKeywordResearch: e.target.checked }))}
                      className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                    />
                    <label htmlFor="keywordResearch" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Include keyword research and SEO optimization
                    </label>
                  </div>

                  {/* Keyword Research Button */}
                  {aiSettings.includeKeywordResearch && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => performKeywordResearch(aiPrompt)}
                        disabled={isResearchingKeywords || !aiPrompt.trim()}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50"
                      >
                        {isResearchingKeywords ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Researching...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Research Keywords
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Keyword Research Results */}
                  {keywordResearch && (
                    <div className={`p-4 rounded-xl border ${
                      isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h4 className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Keyword Research Results
                      </h4>
                      
                      <div className="space-y-4">
                        {/* Primary Keyword */}
                        <div className={`p-3 rounded-lg ${
                          isDarkMode ? 'bg-slate-800/50' : 'bg-white'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              Primary Keyword
                            </span>
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                              Recommended
                            </span>
                          </div>
                          <div className={`text-lg font-bold text-violet-500 mb-2`}>
                            {keywordResearch.primaryKeyword.keyword}
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Volume
                              </span>
                              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {keywordResearch.primaryKeyword.volume.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Difficulty
                              </span>
                              <span className={`font-semibold ${
                                keywordResearch.primaryKeyword.difficulty < 30 ? 'text-green-500' :
                                keywordResearch.primaryKeyword.difficulty < 50 ? 'text-yellow-500' : 'text-red-500'
                              }`}>
                                {keywordResearch.primaryKeyword.difficulty}
                              </span>
                            </div>
                            <div>
                              <span className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                CPC
                              </span>
                              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                ${keywordResearch.primaryKeyword.cpc}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Related Keywords */}
                        <div>
                          <h5 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Related Keywords
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {keywordResearch.relatedKeywords.slice(0, 4).map((keyword, index) => (
                              <div key={index} className={`p-2 rounded text-sm ${
                                isDarkMode ? 'bg-slate-800/50' : 'bg-white'
                              }`}>
                                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {keyword.keyword}
                                </div>
                                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Vol: {keyword.volume.toLocaleString()} | Diff: {keyword.difficulty}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="flex space-x-4">
                    <button
                      onClick={generateAIBlog}
                      disabled={isAIGenerating || !aiPrompt.trim()}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50"
                    >
                      {isAIGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating {aiSettings.targetLength} word blog...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate SEO Blog ({aiSettings.targetLength} words)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <input
                  type="text"
                  value={blogData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your blog title..."
                  className={`w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-gray-400 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                />
              </div>

              {/* Featured Image */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Featured Image
                  </h3>
                  <button
                    onClick={handleImageUpload}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </button>
                </div>
                
                {blogData.featuredImage ? (
                  <div className="relative">
                    <img
                      src={blogData.featuredImage}
                      alt="Featured"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setBlogData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDarkMode ? 'border-slate-600' : 'border-gray-300'
                  }`}>
                    <Image className={`w-12 h-12 mx-auto mb-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Click "Upload Image" to add a featured image
                    </p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Content Editor */}
              <div className={`rounded-2xl border backdrop-blur-lg overflow-hidden ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-200">
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Content Editor
                  </h3>
                </div>
                
                <div className="p-4">
                  <ReactQuill
                    theme="snow"
                    value={blogData.content}
                    onChange={(content) => handleInputChange('content', content)}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your blog content..."
                    style={{
                      height: '400px',
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Publish Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Status
                    </label>
                    <select
                      value={blogData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      value={blogData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Author
                    </label>
                    <input
                      type="text"
                      value={blogData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Categories & Tags */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Categories & Tags
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Category
                    </label>
                    <select
                      value={blogData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tags (comma separated)
                    </label>
                    <textarea
                      value={blogData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="email marketing, automation, leads"
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className={`p-6 rounded-2xl border backdrop-blur-lg ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  SEO Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={blogData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={blogData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Meta Description
                    </label>
                    <textarea
                      value={blogData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Excerpt
                    </label>
                    <textarea
                      value={blogData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <article className={`p-8 rounded-2xl border backdrop-blur-lg ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white/50 border-gray-200'
            }`}>
              {blogData.featuredImage && (
                <img
                  src={blogData.featuredImage}
                  alt={blogData.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              
              <div className="flex items-center space-x-4 mb-6">
                {blogData.category && (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isDarkMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {blogData.category}
                  </span>
                )}
                <div className="flex items-center space-x-2 text-sm">
                  <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {blogData.author}
                  </span>
                </div>
              </div>

              <h1 className={`text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {blogData.title || 'Blog Title'}
              </h1>

              {blogData.excerpt && (
                <p className={`text-xl mb-8 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {blogData.excerpt}
                </p>
              )}

              <div 
                className={`prose prose-lg max-w-none ${
                  isDarkMode 
                    ? 'prose-invert prose-headings:text-white prose-p:text-gray-300' 
                    : 'prose-gray'
                }`}
                dangerouslySetInnerHTML={{ __html: blogData.content || '<p>Start writing your content...</p>' }}
              />

              {blogData.tags && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {blogData.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-slate-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCreate;