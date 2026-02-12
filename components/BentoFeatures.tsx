
import React from 'react';

const features = [
  { icon: 'fa-video', title: 'Viral Videos', desc: 'Track breakout videos in real-time and uncover the patterns behind their success.' },
  { icon: 'fa-magnifying-glass', title: 'Find Channel', desc: 'Instantly analyze screenshots to find the channel behind the content.' },
  { icon: 'fa-users', title: 'Similar Channels', desc: 'Discover competitors and analyze their growth strategies.' },
  { icon: 'fa-chart-line', title: 'Channel Trends', desc: 'Monitor daily performance metrics and spot emerging trends.' },
  { icon: 'fa-keyboard', title: 'YouTube Scraper', desc: 'Extract transcripts, tags, and SEO data in seconds.' },
  { icon: 'fa-image', title: 'Image Generation', desc: 'Create high-quality thumbnails with AI tools.' },
  { icon: 'fa-film', title: 'Video Generation', desc: 'Generate video content from scripts to streamline production.' },
  { icon: 'fa-microphone', title: 'Voice Generation', desc: 'Produce lifelike voiceovers using our integrated studio.' },
];

const BentoFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">One Platform, <span className="text-blue-500">Endless Possibilities</span></h2>
          <p className="text-gray-400">From research to production, Algolyra handles every step of your creative workflow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:bg-white/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white text-blue-500 transition-all">
                <i className={`fa-solid ${f.icon} text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Big Feature Block */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600/20 to-transparent border border-white/10 p-10 h-[400px] flex flex-col justify-end">
                <div className="absolute top-10 left-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">Deep Research</span>
                    <h3 className="text-3xl font-bold mt-2">Uncover Hidden Niches</h3>
                </div>
                <p className="text-gray-400 max-w-sm">Stop guessing. Use advanced filters and AI-driven keyword suggestions to find low-competition, high-demand opportunities instantly.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {['Advanced Logic', 'Keyword Analysis', 'Trend Tracking'].map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-bl from-purple-600/10 to-transparent border border-white/10 p-10 h-[400px] flex flex-col justify-end">
                <div className="absolute top-10 left-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">Video Generation</span>
                    <h3 className="text-3xl font-bold mt-2">Create Cinematic Content</h3>
                </div>
                <p className="text-gray-400 max-w-sm">Generate stunning, consistent videos. Use our Image Generator to create perfect reference styles, then bring them to life with AI.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {['Sora 2 Integration', 'Reference Support', 'Unlimited Watermark Free'].map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
