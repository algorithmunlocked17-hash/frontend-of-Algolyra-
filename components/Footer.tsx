
import React from 'react';

interface FooterProps {
  onNavigateAuth: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateAuth }) => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-[#050505] reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Section */}
        <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Ready to take control <br />
                <span className="text-blue-500">of your channel?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of creators who trust Algolyra for accurate data, viral insights, and a seamless content workflow.
            </p>
            <button 
              onClick={onNavigateAuth}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xl transition-all hover:scale-105 shadow-2xl shadow-blue-600/20"
            >
                Start Growing Now <i className="fa-solid fa-bolt ml-2"></i>
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16 border-t border-white/5 pt-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1">
                   <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                      <path d="M70,20 L30,60 L30,40 L50,20 L70,20 Z M30,80 L70,40 L70,60 L50,80 L30,80 Z" />
                      <rect x="25" y="45" width="10" height="25" />
                      <rect x="65" y="30" width="10" height="25" />
                   </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">Algolyra</span>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed mb-6">
                Empowering the next generation of content creators with AI-driven research and high-performance tools.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                    <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <i className="fa-brands fa-discord"></i>
                </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Niche Finder</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Channel Tracker</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">AI Video Gen</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Price Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Creators Blog</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Video Academy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Affiliates</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            <div>© 2025 Algolyra. All rights reserved.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
                <span>Designed for Creators</span>
                <span>Powered by AI</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
