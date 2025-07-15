import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  performKeywordResearch, 
  generateHumanContent, 
  generateSEOMetadata, 
  generateHashtags,
  type KeywordData,
  type ContentConfig 
} from '../lib/aiContentGenerator';
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
  Search,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Settings,
  FileText
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
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  
  // AI Generator State
  const [aiTopic, setAiTopic] = useState('');
  const [keywordResearch, setKeywordResearch] = useState<KeywordData[]>([]);
  const [isResearchingKeywords, setIsResearchingKeywords] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [contentConfig, setContentConfig] = useState<ContentConfig>({
    topic: '',
    targetLength: 2000,
    contentType: 'guide',
    audience: 'general',
    tone: 'professional',
    includePersonalExperience: true,
    includeStatistics: true,
    includeExamples: true
  });
  const [showKeywordResults, setShowKeywordResults] = useState(false);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

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

  const handleSave = (status: 'draft' | 'published') => {
    if (!blogData.title.trim()) {
      toast.error('Please enter a blog title');
      return;
    }

    if (!blogData.content.trim()) {
      toast.error('Please add some content to your blog');
      return;
    }

    // Save to localStorage for demo
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const newBlog = {
      ...blogData,
      id: Date.now(),
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    
    setBlogData(prev => ({ ...prev, status }));
    toast.success(`Blog ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    
    if (status === 'published') {
      navigate('/blog');
    }
  };

  // AI Content Generation Functions
  const handleKeywordResearch = async () => {
    if (!aiTopic.trim()) {
      toast.error('Please enter a topic for keyword research');
      return;
    }

    setIsResearchingKeywords(true);
    try {
      const keywords = await performKeywordResearch(aiTopic);
      setKeywordResearch(keywords);
      setContentConfig(prev => ({ ...prev, topic: aiTopic }));
      setShowKeywordResults(true);
      toast.success(`Found ${keywords.length} relevant keywords!`);
    } catch (error) {
      toast.error('Failed to research keywords. Please try again.');
    } finally {
      setIsResearchingKeywords(false);
    }
  };

  const handleGenerateContent = async () => {
    if (keywordResearch.length === 0) {
      toast.error('Please perform keyword research first');
      return;
    }

    setIsGeneratingContent(true);
    try {
      // Generate human-like content
      const content = await generateHumanContent(contentConfig, keywordResearch);
      
      // Generate SEO metadata
      const seoData = generateSEOMetadata(contentConfig.topic, keywordResearch);
      
      // Generate hashtags
      const hashtags = generateHashtags(keywordResearch);
      setGeneratedHashtags(hashtags);
      
      // Update blog data
      setBlogData(prev => ({
        ...prev,
        title: seoData.metaTitle,
        content: content,
        metaTitle: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        slug: seoData.slug,
        tags: seoData.tags,
        excerpt: seoData.metaDescription,
        category: 'AI Generated'
      }));
      
      setShowAIGenerator(false);
      toast.success(`Generated ${contentConfig.targetLength}+ word SEO-optimized content!`);
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-500';
    if (difficulty <= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 30) return 'Easy';
    if (difficulty <= 60) return 'Medium';
    return 'Hard';
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
                onClick={() => setShowAIGenerator(true)}
                className="group flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Advanced AI Generator
              </button>
              
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
        {/* AI Blog Generator Modal */}
        {showAIGenerator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700' 
                : 'bg-white/90 border-gray-200'
            }`}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Advanced AI Blog Generator
                      </h2>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Create undetectable, human-like content that ranks
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIGenerator(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white hover:bg-slate-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    ×
                  </button>
                </div>

                {/* Step 1: Keyword Research */}
                {!showKeywordResults && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
                        <Search className="w-4 h-4 mr-2 text-blue-400" />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          Step 1: Keyword Research & Analysis
                        </span>
                      </div>
                      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Find High-Volume, Low-Competition Keywords
                      </h3>
                    </div>

                    <div>
                      <label className={`block text-lg font-medium mb-3 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Enter Your Blog Topic
                      </label>
                      <input
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="e.g., Email Marketing Automation for Small Business"
                        className={`w-full px-6 py-4 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg ${
                          isDarkMode 
                            ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' 
                            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <button
                      onClick={handleKeywordResearch}
                      disabled={isResearchingKeywords || !aiTopic.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isResearchingKeywords ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          Researching Keywords...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-3" />
                          Research Keywords & Analyze Competition
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Step 2: Keyword Results & Content Configuration */}
                {showKeywordResults && (
                  <div className="space-y-8">
                    {/* Keyword Research Results */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Top 5 Keywords Found
                        </h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Easy</span>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Medium</span>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Hard</span>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        {keywordResearch.slice(0, 5).map((keyword, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border backdrop-blur-lg ${
                              isDarkMode 
                                ? 'bg-slate-700/30 border-slate-600' 
                                : 'bg-white/30 border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {index + 1}. {keyword.keyword}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)} bg-current bg-opacity-20`}>
                                    {getDifficultyLabel(keyword.difficulty)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6 text-sm">
                                <div className="text-center">
                                  <div className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {keyword.volume.toLocaleString()}
                                  </div>
                                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Volume
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className={`font-bold ${getDifficultyColor(keyword.difficulty)}`}>
                                    {keyword.difficulty}
                                  </div>
                                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Difficulty
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    ${keyword.cpc}
                                  </div>
                                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    CPC
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Configuration */}
                    <div className={`p-6 rounded-xl border backdrop-blur-lg ${
                      isDarkMode 
                        ? 'bg-slate-700/30 border-slate-600' 
                        : 'bg-white/30 border-gray-300'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Content Configuration
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Content Length
                          </label>
                          <select 
                            value={contentConfig.targetLength}
                            onChange={(e) => setContentConfig(prev => ({ ...prev, targetLength: parseInt(e.target.value) }))}
                            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg ${
                              isDarkMode 
                                ? 'bg-slate-700/50 border-slate-600 text-white' 
                                : 'bg-white/50 border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value={1000}>1,000 words</option>
                            <option value={1500}>1,500 words</option>
                            <option value={2000}>2,000 words</option>
                            <option value={2500}>2,500 words</option>
                            <option value={3000}>3,000 words</option>
                            <option value={4000}>4,000+ words</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Content Type
                          </label>
                          <select 
                            value={contentConfig.contentType}
                            onChange={(e) => setContentConfig(prev => ({ ...prev, contentType: e.target.value as any }))}
                            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg ${
                              isDarkMode 
                                ? 'bg-slate-700/50 border-slate-600 text-white' 
                                : 'bg-white/50 border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="guide">Comprehensive Guide</option>
                            <option value="how-to">How-to Tutorial</option>
                            <option value="listicle">List Article</option>
                            <option value="case-study">Case Study</option>
                            <option value="review">Review Article</option>
                            <option value="comparison">Comparison Post</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Target Audience
                          </label>
                          <select 
                            value={contentConfig.audience}
                            onChange={(e) => setContentConfig(prev => ({ ...prev, audience: e.target.value as any }))}
                            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg ${
                              isDarkMode 
                                ? 'bg-slate-700/50 border-slate-600 text-white' 
                                : 'bg-white/50 border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="general">General Audience</option>
                            <option value="beginner">Beginners</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="expert">Experts</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Writing Tone
                          </label>
                          <select 
                            value={contentConfig.tone}
                            onChange={(e) => setContentConfig(prev => ({ ...prev, tone: e.target.value as any }))}
                            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg ${
                              isDarkMode 
                                ? 'bg-slate-700/50 border-slate-600 text-white' 
                                : 'bg-white/50 border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="professional">Professional</option>
                            <option value="conversational">Conversational</option>
                            <option value="authoritative">Authoritative</option>
                            <option value="friendly">Friendly</option>
                            <option value="casual">Casual</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Human-like Content Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contentConfig.includePersonalExperience}
                              onChange={(e) => setContentConfig(prev => ({ ...prev, includePersonalExperience: e.target.checked }))}
                              className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                            />
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Personal Experience
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contentConfig.includeStatistics}
                              onChange={(e) => setContentConfig(prev => ({ ...prev, includeStatistics: e.target.checked }))}
                              className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                            />
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Statistics & Data
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contentConfig.includeExamples}
                              onChange={(e) => setContentConfig(prev => ({ ...prev, includeExamples: e.target.checked }))}
                              className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                            />
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Real Examples
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowKeywordResults(false)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Back to Research
                      </button>
                      
                      <button
                        onClick={handleGenerateContent}
                        disabled={isGeneratingContent}
                        className="flex-1 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isGeneratingContent ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                            Generating Human-like Content...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-3" />
                            Generate {contentConfig.targetLength}+ Word Content
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!isPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
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
                    {generatedHashtags.length > 0 && (
                      <div className="mt-3">
                        <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Generated Hashtags:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {generatedHashtags.slice(0, 8).map((hashtag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                                isDarkMode 
                                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                              onClick={() => {
                                const currentTags = blogData.tags ? blogData.tags.split(',').map(t => t.trim()) : [];
                                const newTag = hashtag.replace('#', '');
                                if (!currentTags.includes(newTag)) {
                                  handleInputChange('tags', [...currentTags, newTag].join(', '));
                                }
                              }}
                            >
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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