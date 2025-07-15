import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Reviews from './components/Reviews';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import PricingPage from './pages/PricingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const HomePage = () => (
    <>
      <Hero isDarkMode={isDarkMode} />
      <Features isDarkMode={isDarkMode} />
      <Reviews isDarkMode={isDarkMode} />
      <HowItWorks isDarkMode={isDarkMode} />
      <Pricing isDarkMode={isDarkMode} />
      <FAQ isDarkMode={isDarkMode} />
      <CTA isDarkMode={isDarkMode} />
    </>
  );

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900' : 'bg-white'
      }`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#1e293b' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
            },
          }}
        />
        
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/services" element={<Services isDarkMode={isDarkMode} />} />
          <Route path="/blog" element={<Blog isDarkMode={isDarkMode} />} />
          <Route path="/blog/:id" element={<BlogDetail isDarkMode={isDarkMode} />} />
          <Route path="/blog/create" element={<BlogCreate isDarkMode={isDarkMode} />} />
          <Route path="/blog/edit/:id" element={<BlogEdit isDarkMode={isDarkMode} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
          <Route path="/pricing" element={<PricingPage isDarkMode={isDarkMode} />} />
          <Route path="/how-it-works" element={<HowItWorksPage isDarkMode={isDarkMode} />} />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;