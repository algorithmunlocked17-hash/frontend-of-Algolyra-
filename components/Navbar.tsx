
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigateSignup: () => void;
  onNavigateLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateSignup, onNavigateLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5">
               <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                  <path d="M70,20 L30,60 L30,40 L50,20 L70,20 Z M30,80 L70,40 L70,60 L50,80 L30,80 Z" />
                  <rect x="25" y="45" width="10" height="25" />
                  <rect x="65" y="30" width="10" height="25" />
               </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Algolyra</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Feedback</a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Affiliates</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={onNavigateLogin} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Login</button>
            <button 
              onClick={onNavigateSignup}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ clipPath: isMobileMenuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Features</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Pricing</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-white">Affiliates</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-white">FAQs</a>
          <div className="w-full pt-8 flex flex-col gap-4">
            <button onClick={() => { setIsMobileMenuOpen(false); onNavigateLogin(); }} className="w-full py-4 rounded-2xl bg-white/10 text-white font-semibold">Login</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onNavigateSignup(); }} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
