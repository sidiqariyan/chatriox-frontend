import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  isDarkMode: boolean;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isDarkMode }) => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: `
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes:</p>
        <ul>
          <li>Account information (name, email address, password)</li>
          <li>Profile information (company name, job title, phone number)</li>
          <li>Payment information (processed securely through third-party providers)</li>
          <li>Communication data (messages, support tickets, feedback)</li>
          <li>Usage data (how you interact with our platform)</li>
        </ul>
      `
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments, questions, and customer service requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, investigate, and prevent fraudulent transactions</li>
        </ul>
      `
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: `
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
        <ul>
          <li>With your explicit consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and safety</li>
          <li>With service providers who assist in our operations</li>
          <li>In connection with a merger, acquisition, or sale of assets</li>
        </ul>
      `
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `
        <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication measures</li>
          <li>Employee training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
      `
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: `
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul>
          <li>Right to access your personal data</li>
          <li>Right to rectify inaccurate information</li>
          <li>Right to erase your personal data</li>
          <li>Right to restrict processing</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
        </ul>
      `
    },
    {
      icon: Mail,
      title: 'Contact Information',
      content: `
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
        <ul>
          <li>Email: privacy@chatriox.com</li>
          <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
          <li>Phone: +1 (555) 123-4567</li>
        </ul>
      `
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
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-violet-500 to-purple-600' 
              : 'bg-gradient-to-r from-violet-500 to-purple-600'
          }`}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-black mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Privacy <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Policy</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 15, 2024
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-2xl border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Introduction
            </h2>
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              At Chatriox, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our marketing automation platform and related services.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/50 border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {section.title}
                    </h3>
                    
                    <div className={`prose prose-lg max-w-none ${
                      isDarkMode 
                        ? 'prose-invert prose-p:text-gray-300 prose-li:text-gray-300' 
                        : 'prose-gray'
                    }`}>
                      <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR Compliance */}
      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-2xl border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              GDPR Compliance
            </h2>
            
            <p className={`text-lg mb-6 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We are committed to complying with the General Data Protection Regulation (GDPR) and other applicable data protection laws. If you are a resident of the European Economic Area (EEA), you have additional rights under GDPR.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <h4 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Legal Basis for Processing
                </h4>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  We process your personal data based on legitimate interests, contractual necessity, legal compliance, and your consent where required.
                </p>
              </div>

              <div className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <h4 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Data Retention
                </h4>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Policy Updates
          </h2>
          
          <p className={`text-lg mb-8 leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <button className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            Contact Privacy Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;