
import React, { useState, useEffect } from 'react';

const niches = [
  "Minecraft Parkour",
  "Roblox Rants",
  "Bodycam Horrors",
  "Pickpocketing Fails",
  "Ranking Everything",
  "Documentary Style"
];

const FeatureSteps: React.FC = () => {
  const [activeNicheIndex, setActiveNicheIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNicheIndex((prev) => (prev + 1) % niches.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Control your <span className="text-blue-500">content strategy</span>
        </h2>
        <p className="text-gray-400 text-lg">Understand how top creators grow and what you can do about it.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-6">1</div>
          <h3 className="text-2xl font-bold mb-3">Find Trending Channels</h3>
          <p className="text-gray-400 mb-8">Track specific niches to discover when channels start blowing up and identify winning patterns.</p>
          
          {/* Visual Simulation */}
          <div className="bg-black/40 rounded-2xl p-6 border border-white/10 mt-auto min-h-[160px] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="h-2 w-24 bg-white/10 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Trending niche found:</div>
              <div className="flex items-center gap-1 text-lg font-bold">
                <span className="text-blue-500 text-2xl font-serif">"</span>
                <div className="relative h-8 overflow-hidden w-full">
                  <div 
                    className="flex flex-col transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${activeNicheIndex * 32}px)` }}
                  >
                    {niches.map((niche, idx) => (
                      <div key={idx} className="h-8 leading-8">{niche}</div>
                    ))}
                  </div>
                </div>
                <span className="text-blue-500 text-2xl font-serif">"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-6">2</div>
          <h3 className="text-2xl font-bold mb-3">Analyze Competition</h3>
          <p className="text-gray-400 mb-8">Instantly find similar channels and uncover the strategies working in your niche.</p>
          
          <div className="bg-black/40 rounded-2xl p-4 border border-white/10 mt-auto space-y-4">
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
              <span>Similar Channels</span>
              <span>Sort: Similarity</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Catfish Blox', subs: '6.4M', match: '98%', seed: 'cat' },
                { name: 'AmyyRoblox', subs: '4.1M', match: '95%', seed: 'amy' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.seed}`} className="w-8 h-8 rounded-full bg-blue-900/20" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{c.name}</div>
                    <div className="text-[10px] text-gray-500">{c.subs} Subscribers</div>
                  </div>
                  <div className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{c.match} Match</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-6">3</div>
          <h3 className="text-2xl font-bold mb-3">Create Content</h3>
          <p className="text-gray-400 mb-8">Use our video creation tools to produce optimized, high-retention videos in seconds.</p>
          <div className="bg-black/40 rounded-2xl p-6 border border-white/10 mt-auto flex items-center justify-center">
             <div className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
                <i className="fa-solid fa-wand-magic-sparkles text-3xl text-white/20 group-hover:text-blue-500 transition-colors"></i>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSteps;
