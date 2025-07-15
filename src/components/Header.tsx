import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/80 border-slate-800' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Chatriox
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`hover:text-blue-500 transition-colors ${
              isActive('/') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Home
            </Link>
            <Link to="/about" className={`hover:text-blue-500 transition-colors ${
              isActive('/about') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              About
            </Link>
            <Link to="/services" className={`hover:text-blue-500 transition-colors ${
              isActive('/services') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Services
            </Link>
            <Link to="/pricing" className={`hover:text-blue-500 transition-colors ${
              isActive('/pricing') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Pricing
            </Link>
            <Link to="/how-it-works" className={`hover:text-blue-500 transition-colors ${
              isActive('/how-it-works') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              How it Works
            </Link>
            <Link to="/blog" className={`hover:text-blue-500 transition-colors ${
              isActive('/blog') 
                ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Blog
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/login" className={`hidden md:block px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              Log In
            </Link>
            
            <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
              Sign Up
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isDarkMode ? 'border-slate-800' : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={`hover:text-blue-500 transition-colors ${
                isActive('/') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Home
              </Link>
              <Link to="/about" className={`hover:text-blue-500 transition-colors ${
                isActive('/about') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                About
              </Link>
              <Link to="/services" className={`hover:text-blue-500 transition-colors ${
                isActive('/services') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Services
              </Link>
              <Link to="/pricing" className={`hover:text-blue-500 transition-colors ${
                isActive('/pricing') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Pricing
              </Link>
              <Link to="/how-it-works" className={`hover:text-blue-500 transition-colors ${
                isActive('/how-it-works') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                How it Works
              </Link>
              <Link to="/blog" className={`hover:text-blue-500 transition-colors ${
                isActive('/blog') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Blog
              </Link>
              <Link to="/login" className={`hover:text-blue-500 transition-colors ${
                isActive('/login') 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Log In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;