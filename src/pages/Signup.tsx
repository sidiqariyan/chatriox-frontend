import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Building, Phone, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { authHelpers, dbHelpers } from '../lib/supabase';
import toast from 'react-hot-toast';

interface SignupProps {
  isDarkMode: boolean;
}

const Signup: React.FC<SignupProps> = ({ isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Information
    companyName: '',
    jobTitle: '',
    industry: '',
    companySize: '',
    phone: '',
    website: '',
    
    // Step 3: Marketing Preferences
    primaryGoal: '',
    currentTools: [],
    monthlyEmailVolume: '',
    budget: '',
    
    // Step 4: Account Setup
    agreeToTerms: false,
    subscribeToUpdates: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 4) {
      // Validate current step
      if (currentStep === 1) {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          toast.error('Please fill in all required fields');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }
      }
      
      if (currentStep === 2) {
        if (!formData.companyName || !formData.jobTitle || !formData.industry || !formData.companySize) {
          toast.error('Please fill in all required fields');
          return;
        }
      }
      
      if (currentStep === 3) {
        if (!formData.primaryGoal || !formData.monthlyEmailVolume || !formData.budget) {
          toast.error('Please fill in all required fields');
          return;
        }
      }
      
      setCurrentStep(currentStep + 1);
    } else {
      // Final signup
      if (!formData.agreeToTerms) {
        toast.error('Please agree to the Terms of Service and Privacy Policy');
        return;
      }
      
      await handleFinalSignup();
    }
  };

  const handleFinalSignup = async () => {
    setLoading(true);
    
    try {
      // Prepare user metadata
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        full_name: `${formData.firstName} ${formData.lastName}`,
        company_name: formData.companyName,
        job_title: formData.jobTitle,
        industry: formData.industry,
        company_size: formData.companySize,
        phone: formData.phone,
        website: formData.website,
        primary_goal: formData.primaryGoal,
        current_tools: formData.currentTools,
        monthly_email_volume: formData.monthlyEmailVolume,
        budget: formData.budget,
        subscribe_to_updates: formData.subscribeToUpdates
      };

      const { data, error } = await signUp(formData.email, formData.password, userData);
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile in database
        await dbHelpers.createUserProfile(data.user.id, userData);
        
        toast.success('Account created! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'currentTools') {
        setFormData({
          ...formData,
          currentTools: checked 
            ? [...formData.currentTools, value]
            : formData.currentTools.filter(tool => tool !== value)
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'twitter' | 'github' | 'linkedin') => {
    try {
      setLoading(true);
      let result;
      
      switch (provider) {
        case 'google':
          result = await authHelpers.signInWithGoogle();
          break;
        case 'twitter':
          result = await authHelpers.signInWithTwitter();
          break;
        case 'github':
          result = await authHelpers.signInWithGitHub();
          break;
        case 'linkedin':
          result = await authHelpers.signInWithLinkedIn();
          break;
      }
      
      if (result.error) throw result.error;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Real Estate', 'Manufacturing', 'Consulting', 'Marketing Agency', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-1000 employees', '1000+ employees'
  ];

  const marketingTools = [
    'Mailchimp', 'HubSpot', 'Salesforce', 'Constant Contact', 
    'Campaign Monitor', 'ActiveCampaign', 'ConvertKit', 'None'
  ];

  const emailVolumes = [
    'Less than 1,000/month', '1,000-5,000/month', '5,000-25,000/month',
    '25,000-100,000/month', 'More than 100,000/month'
  ];

  const budgets = [
    'Less than $100/month', '$100-$500/month', '$500-$1,000/month',
    '$1,000-$5,000/month', 'More than $5,000/month'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h2>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Let's start with your basic information
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            First Name *
          </label>
          <div className="relative">
            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                  : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="John"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Email Address *
        </label>
        <div className="relative">
          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Password *
        </label>
        <div className="relative">
          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full pl-12 pr-12 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full pl-12 pr-12 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Business Information
        </h2>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Tell us about your business
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Company Name *
        </label>
        <div className="relative">
          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Your Company Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Marketing Manager"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone Number
          </label>
          <div className="relative">
            <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                  : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Website
        </label>
        <div className="relative">
          <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Industry *
        </label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-white' 
              : 'bg-white/50 border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select your industry</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Company Size *
        </label>
        <select
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-white' 
              : 'bg-white/50 border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select company size</option>
          {companySizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Marketing Preferences
        </h2>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Help us customize your experience
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Primary Goal *
        </label>
        <select
          name="primaryGoal"
          value={formData.primaryGoal}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-white' 
              : 'bg-white/50 border-gray-300 text-gray-900'
          }`}
        >
          <option value="">What's your primary goal?</option>
          <option value="lead-generation">Lead Generation</option>
          <option value="email-marketing">Email Marketing</option>
          <option value="whatsapp-marketing">WhatsApp Marketing</option>
          <option value="email-verification">Email Verification</option>
          <option value="all-features">Use All Features</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Current Marketing Tools
        </label>
        <div className="grid grid-cols-2 gap-3">
          {marketingTools.map(tool => (
            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="currentTools"
                value={tool}
                checked={formData.currentTools.includes(tool)}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {tool}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Monthly Email Volume *
        </label>
        <select
          name="monthlyEmailVolume"
          value={formData.monthlyEmailVolume}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-white' 
              : 'bg-white/50 border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select email volume</option>
          {emailVolumes.map(volume => (
            <option key={volume} value={volume}>{volume}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Budget Range *
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-white' 
              : 'bg-white/50 border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select budget range</option>
          {budgets.map(budget => (
            <option key={budget} value={budget}>{budget}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Account Setup
        </h2>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Final step to create your account
        </p>
      </div>

      <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-gray-300'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Account Summary
        </h3>
        <div className="space-y-2 text-sm">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <span className="font-medium">Company:</span> {formData.companyName}
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <span className="font-medium">Industry:</span> {formData.industry}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
          />
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I agree to the{' '}
            <Link to="/privacy-policy" className="text-blue-500 hover:text-blue-400">
              Terms of Service and Privacy Policy
            </Link>
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="subscribeToUpdates"
            checked={formData.subscribeToUpdates}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
          />
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subscribe to product updates and marketing emails
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="w-full max-w-md">
        <div className={`backdrop-blur-lg rounded-2xl shadow-2xl p-8 border ${
          isDarkMode 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Step {currentStep} of 4
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {Math.round((currentStep / 4) * 100)}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
                  currentStep === 1 ? 'ml-auto' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 4 ? 'Create Account' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {currentStep === 1 && (
            <>
              <div className="mt-8">
                <div className={`flex items-center my-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className={`flex-1 h-px ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`} />
                  <span className="px-4 text-sm">Or continue with</span>
                  <div className={`flex-1 h-px ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('google')}
                    disabled={loading}
                    className={`flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'border-slate-600 bg-slate-700/50 text-white hover:bg-slate-600/50'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialSignup('twitter')}
                    disabled={loading}
                    className={`flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'border-slate-600 bg-slate-700/50 text-white hover:bg-slate-600/50'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>

              <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;