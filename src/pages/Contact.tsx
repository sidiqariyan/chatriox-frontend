import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Globe } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@chatriox.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Tech Street, San Francisco, CA 94105',
      description: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 8am - 6pm PST',
      description: 'Weekend support available'
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat'
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      action: 'Call Now'
    },
    {
      icon: Globe,
      title: 'Help Center',
      description: 'Browse our comprehensive documentation',
      action: 'Visit Help Center'
    }
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
            Contact <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white' 
                        : 'bg-white/50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700' 
                        : 'bg-white/50 border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {info.title}
                        </h3>
                        <p className={`font-medium mb-1 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {info.details}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Options */}
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Need Immediate Help?
              </h3>
              
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600' 
                        : 'bg-white/50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center`}>
                          <option.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {option.title}
                          </h4>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isDarkMode 
                          ? 'text-blue-400 hover:bg-slate-700' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}>
                        {option.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
              Visit Our Office
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Located in the heart of San Francisco's tech district
            </p>
          </div>

          <div className={`rounded-3xl overflow-hidden border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <div className="h-96 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                <p className="text-lg opacity-90">123 Tech Street, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;