
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
      <div className="bg-[#0a0a0a] rounded-[48px] p-12 md:p-20 border border-white/5 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -z-10"></div>
        
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Trusted by <span className="text-blue-500">Creators Worldwide</span></h2>
            
            <div className="relative">
                <i className="fa-solid fa-quote-left text-4xl text-white/5 absolute -top-8 -left-8"></i>
                <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                    "Algolyra completely changed how I research. I found a gap in the Minecraft niche and hit 100K views in my first week. It feels like cheating."
                </p>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-600/50 overflow-hidden bg-white flex items-center justify-center p-1">
                        <img 
                            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=minesrv" 
                            className="w-full h-full object-contain" 
                            alt="Alex K. Profile" 
                        />
                    </div>
                    <div>
                        <div className="font-bold text-lg">Alex K.</div>
                        <div className="text-blue-500 text-sm font-bold">Gaming Creator (150K+ Subs)</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
