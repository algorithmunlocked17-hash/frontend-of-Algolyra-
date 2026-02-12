
import React from 'react';

interface HeroProps {
  onNavigateAuth: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateAuth }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden reveal">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <a 
          href="#" 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-10 group"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">New</span>
          <span className="text-sm font-medium text-gray-300">Terminated Channel Tracker Live</span>
          <i className="fa-solid fa-chevron-right text-[10px] text-gray-500 group-hover:translate-x-0.5 transition-transform"></i>
        </a>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          The Easiest Way to Research <br className="hidden md:block" />
          <span className="text-white">and Create Viral Videos</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          Discover trending niches, analyze winning channels, and create videos in seconds. 
          The ultimate toolkit for modern content creators.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button 
            onClick={onNavigateAuth}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20"
          >
            Try Algolyra Now
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Dashboard Mockup - Updated with style matching the provided image */}
        <div className="mt-20 relative w-full max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10 rounded-[40px]"></div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden group">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-[#050505] flex">
                {/* Sidebar Simulation */}
                <div className="hidden md:flex w-[18%] border-r border-white/5 flex-col p-4 gap-4">
                  <div className="h-4 w-12 bg-white/10 rounded mb-4"></div>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-6 w-full bg-white/5 rounded"></div>
                  ))}
                  <div className="mt-auto h-12 w-full bg-blue-600/10 rounded"></div>
                </div>
                {/* Main Content Simulation */}
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                    <div className="flex gap-2">
                       <div className="h-8 w-24 bg-white/5 rounded-lg border border-white/10"></div>
                       <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-[#0d0d0d] rounded-2xl border border-white/5 p-4">
                      <div className="h-2 w-12 bg-white/10 rounded mb-2"></div>
                      <div className="h-6 w-24 bg-white/20 rounded"></div>
                    </div>
                    <div className="h-32 bg-[#0d0d0d] rounded-2xl border border-white/5 p-4">
                      <div className="h-2 w-12 bg-white/10 rounded mb-2"></div>
                      <div className="h-6 w-24 bg-white/20 rounded"></div>
                    </div>
                    <div className="h-32 bg-[#0d0d0d] rounded-2xl border border-white/5 p-4">
                      <div className="h-2 w-12 bg-white/10 rounded mb-2"></div>
                      <div className="h-6 w-24 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  <div className="h-48 bg-[#0d0d0d] rounded-2xl border border-white/5 p-6 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 30, 60, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-600/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Overlaid Image for Final Polish */}
                <img 
                    src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=2070" 
                    alt="Algolyra Research Tool" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
