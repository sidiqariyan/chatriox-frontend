import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  isDarkMode: boolean;
}

const FAQ: React.FC<FAQProps> = ({ isDarkMode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does WhatsApp Bulk Sender work?',
      answer: 'Our WhatsApp Bulk Sender integrates with WhatsApp Business API to send messages to your contacts in compliance with WhatsApp\'s terms of service. You can schedule messages, personalize content, and track delivery status.'
    },
    {
      question: 'Is email verification included?',
      answer: 'Yes, email verification is included in all our plans. Our system checks email addresses in real-time to ensure high deliverability rates and reduce bounce rates, protecting your sender reputation.'
    },
    {
      question: 'Can I export leads from the scraper?',
      answer: 'Absolutely! You can export leads in various formats including CSV, Excel, and JSON. Our lead scraper also integrates directly with popular CRM systems for seamless workflow integration.'
    },
    {
      question: 'Do you offer API access?',
      answer: 'Yes, we provide comprehensive API access for all our tools. This allows you to integrate Chatriox functionality into your existing systems and create custom workflows that fit your business needs.'
    },
    {
      question: 'What are the compliance features?',
      answer: 'We take compliance seriously. Our platform includes GDPR compliance tools, unsubscribe management, bounce handling, and respects all major email service provider guidelines and WhatsApp Business policies.'
    },
    {
      question: 'How accurate is the lead scraper?',
      answer: 'Our lead scraper uses advanced AI algorithms to achieve 95%+ accuracy rates. It validates contact information in real-time and provides detailed lead scoring to help you focus on the most promising prospects.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-24 ${
      isDarkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently Asked
            <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to know about our platform and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl backdrop-blur-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 focus:outline-none transition-colors ${
                  isDarkMode ? 'hover:bg-slate-800/80' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-semibold pr-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className={`w-5 h-5 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;