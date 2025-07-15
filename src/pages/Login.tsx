import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// import { authHelpers } from '../lib/supabase';
import toast from 'react-hot-toast';

interface LoginProps {
  isDarkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) throw error;
      
      if (data.user) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // const handleSocialLogin = async (provider: 'google' | 'twitter' | 'github' | 'linkedin') => {
  //   try {
  //     setLoading(true);
  //     let result;
      
  //     switch (provider) {
  //       case 'google':
  //         result = await authHelpers.signInWithGoogle();
  //         break;
  //       case 'twitter':
  //         result = await authHelpers.signInWithTwitter();
  //         break;
  //       case 'github':
  //         result = await authHelpers.signInWithGitHub();
  //         break;
  //       case 'linkedin':
  //         result = await authHelpers.signInWithLinkedIn();
  //         break;
  //     }
      
  //     if (result.error) throw result.error;
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleForgotPassword = async () => {
  //   if (!formData.email) {
  //     toast.error('Please enter your email address first');
  //     return;
  //   }
    
  //   try {
  //     const { error } = await authHelpers.resetPassword(formData.email);
  //     if (error) throw error;
  //     toast.success('Password reset email sent!');
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
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
          <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-gradient-to-r from-violet-400 to-purple-500'
          }`} />
          <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-25 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
          }`} style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome Back
          </h1>
          <p className={`text-lg mt-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sign in to your Chatriox account
          </p>
        </div>

        {/* Login Form */}
        <div className={`p-8 rounded-3xl border backdrop-blur-xl ${
          isDarkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/60 border-gray-200'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={`ml-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Remember me
                </span>
              </label>
              <Link
                // onClick={handleForgotPassword}
                className={`text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <div className={`w-full border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-300'
                }`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${
                  isDarkMode ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-500'
                }`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                // onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700' 
                    : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-white'
                }`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                // onClick={() => handleSocialLogin('twitter')}
                disabled={loading}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700' 
                    : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-white'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
            </div>
            
            {/* Additional Social Options */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                // onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700' 
                    : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-white'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
              <button
                type="button"
                // onClick={() => handleSocialLogin('linkedin')}
                disabled={loading}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700' 
                    : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-white'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className={`font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs ${
            isDarkMode 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-green-100 text-green-600'
          }`}>
            <Shield className="w-4 h-4 mr-2" />
            Your data is protected with enterprise-grade security
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;