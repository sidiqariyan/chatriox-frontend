import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Save, 
  Eye, 
  Upload, 
  Image, 
  ArrowLeft,
  Trash2,
  Globe,
  User
} from 'lucide-react';

interface BlogEditProps {
  isDarkMode: boolean;
}

const BlogEdit: React.FC<BlogEditProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Load existing blog data (simulate API call)
    const loadBlogData = async () => {
      try {
        // In a real app, fetch from API using the ID
        const mockBlogData = {
          title: 'The Future of Email Marketing: AI-Powered Personalization',
          slug: 'future-email-marketing-ai-personalization',
          excerpt: 'Discover how artificial intelligence is revolutionizing email marketing with unprecedented personalization capabilities.',
          content: `
            <h2>Introduction</h2>
            <p>Email marketing has evolved dramatically over the past decade, but we're now standing at the threshold of its most significant transformation yet.</p>
            
            <h2>The Current State of Email Personalization</h2>
            <p>Traditional email personalization has relied on basic demographic data and purchase history.</p>
            
            <h2>AI-Powered Personalization: The Game Changer</h2>
            <p>Artificial Intelligence takes personalization to an entirely new level by analyzing vast amounts of data points.</p>
          `,
          featuredImage: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
          category: 'Email Marketing',
          tags: 'AI, personalization, email marketing, automation',
          status: 'published',
          publishDate: '2024-01-15T10:00',
          metaTitle: 'AI Email Marketing Guide 2024 | Chatriox',
          metaDescription: 'Learn how AI is transforming email marketing with advanced personalization techniques.',
          author: 'Sarah Chen'
        };

        setBlogData(mockBlogData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load blog data');
        navigate('/blog');
      }
    };

    loadBlogData();
  }, [id, navigate]);

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
      const imageUrl = URL.createObjectURL(file);
      setBlogData(prev => ({
        ...prev,
        featuredImage: imageUrl
      }));
      console.log('Featured image updated successfully!');
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!blogData.title.trim()) {
      console.error('Please enter a blog title');
      return;
    }

    if (!blogData.content.trim()) {
      console.error('Please add some content to your blog');
      return;
    }

    // Update in localStorage for demo
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const updatedBlogs = blogs.map((blog: any) => 
      blog.id === parseInt(id!) 
        ? { ...blog, ...blogData, status, updatedAt: new Date().toISOString() }
        : blog
    );
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    
    setBlogData(prev => ({ ...prev, status }));
    console.log(`Blog ${status === 'draft' ? 'saved as draft' : 'updated and published'} successfully!`);
    
    if (status === 'published') {
      navigate('/blog');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      // Delete from localStorage for demo
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const filteredBlogs = blogs.filter((blog: any) => blog.id !== parseInt(id!));
      localStorage.setItem('blogs', JSON.stringify(filteredBlogs));
      
      console.log('Blog post deleted successfully');
      navigate('/blog');
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500"></div>
      </div>
    );
  }

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
                {isPreview ? 'Preview Blog' : 'Edit Blog'}
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
                onClick={handleDelete}
                className="flex items-center px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
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
                Update & Publish
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
                    Change Image
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
                      Click "Change Image" to update the featured image
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

            {/* Sidebar - Same as BlogCreate */}
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
          /* Preview Mode - Same as BlogCreate */
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

export default BlogEdit;