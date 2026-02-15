
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// YouTube API Key
const YT_API_KEY: string = 'AIzaSyChKs9YVJCtuQ8uAAytFTllka_2P1akbxA';

interface DashboardProps {
  onLogout: () => void;
}

interface VideoData {
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

interface Repository {
  id: string;
  name: string;
  description: string;
  viralRank: number;
  replications: number;
  lastUpdated: string;
  status: 'public' | 'private';
  tags: string[];
}

interface ChannelStats {
  name: string;
  handle: string;
  avatar: string;
  totalViews: string;
  subscribers: string;
  videoCount: string;
  avgViewsPerVideo: string;
  daysSinceStart: string;
  language: string;
  realtime24h: string;
  realtime48h: string;
  aiInsight: string;
  recentVideos: VideoData[];
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState('Channels');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [channelData, setChannelData] = useState<ChannelStats | null>(null);
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock Repositories
  const [repos, setRepos] = useState<Repository[]>([
    { id: '1', name: 'minecraft-parkour-v2', description: 'Tracking high-retention parkour hooks and story structures.', viralRank: 98, replications: 12, lastUpdated: '2h ago', status: 'public', tags: ['Gaming', 'Viral'] },
    { id: '2', name: 'documentary-style-investigations', description: 'Deep dive into the "SunnyV2" style growth patterns.', viralRank: 85, replications: 4, lastUpdated: '1d ago', status: 'private', tags: ['Documentary', 'CPM'] },
    { id: '3', name: 'ai-voiceover-narratives', description: 'Testing retention on ElevenLabs vs. Natural voices.', viralRank: 72, replications: 28, lastUpdated: '3d ago', status: 'public', tags: ['AI', 'Tech'] },
  ]);

  useEffect(() => {
    // Safety check for Lucide library
    const win = window as any;
    if (win.lucide && typeof win.lucide.createIcons === 'function') {
      try {
        win.lucide.createIcons();
      } catch (e) {
        console.warn("Lucide icon generation failed", e);
      }
    }
  }, [channelData, isAnalyzing, activeNav, showRepoModal]);

  const fetchChannelData = async (query: string): Promise<ChannelStats | null> => {
    try {
      if (!YT_API_KEY || YT_API_KEY === '') {
        throw new Error("Missing YouTube API Configuration");
      }

      // 1. Find Channel ID
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=1&key=${YT_API_KEY}`
      );
      
      if (!searchRes.ok) {
        const errData = await searchRes.json();
        throw new Error(errData.error?.message || "YouTube search failed");
      }
      
      const searchData = await searchRes.json();
      if (!searchData.items || searchData.items.length === 0) {
        setError("Channel not found. Please try the exact name or handle.");
        return null;
      }

      const channelId = searchData.items[0].id.channelId;
      
      // 2. Get Statistics
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YT_API_KEY}`
      );
      if (!statsRes.ok) throw new Error("Failed to fetch channel statistics");
      const statsData = await statsRes.json();
      if (!statsData.items || statsData.items.length === 0) return null;
      const channel = statsData.items[0];

      // 3. Get Recent Videos
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=6&key=${YT_API_KEY}`
      );
      const videosData = await videosRes.json();
      const videos: VideoData[] = (videosData.items || []).map((v: any) => ({
        title: v.snippet?.title || "Untitled Video",
        thumbnail: v.snippet?.thumbnails?.high?.url || v.snippet?.thumbnails?.default?.url || "",
        publishedAt: v.snippet?.publishedAt || "",
        videoId: v.id?.videoId || ""
      }));

      // 4. AI Insight (Gemini)
      let aiInsightText = "Strategy focuses on high-retention narrative hooks and niche authority.";
      
      // Use globalThis.process to safely check for API_KEY without ReferenceError
      const envKey = (globalThis as any).process?.env?.API_KEY;
      
      if (envKey) {
        try {
          const ai = new GoogleGenAI({ apiKey: envKey });
          const prompt = `Analyze this YouTube channel: ${channel.snippet.title}. Statistics: ${channel.statistics.subscriberCount} subs. Provide a professional, viral-strategy focused 1-sentence insight.`;
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
          });
          if (response.text) aiInsightText = response.text;
        } catch (aiErr) {
          console.warn("AI strategy failed, using fallback:", aiErr);
        }
      }

      const totalViews = parseInt(channel.statistics.viewCount || "0");
      const videoCount = parseInt(channel.statistics.videoCount || "0");
      const subCount = parseInt(channel.statistics.subscriberCount || "0");

      return {
        name: channel.snippet.title,
        handle: channel.snippet.customUrl || `@${channel.snippet.title.toLowerCase().replace(/\s/g, '')}`,
        avatar: channel.snippet.thumbnails?.high?.url || channel.snippet.thumbnails?.default?.url || "",
        totalViews: totalViews.toLocaleString(),
        subscribers: subCount.toLocaleString(),
        videoCount: videoCount.toLocaleString(),
        avgViewsPerVideo: Math.floor(totalViews / (videoCount || 1)).toLocaleString(),
        daysSinceStart: "69d", 
        language: "English",
        realtime24h: "+" + Math.floor(totalViews / 100).toLocaleString(),
        realtime48h: "+" + Math.floor(totalViews / 50).toLocaleString(),
        aiInsight: aiInsightText,
        recentVideos: videos
      };
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "An unexpected error occurred while fetching data.");
      return null;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setActiveNav('Channels'); 
    
    try {
      const data = await fetchChannelData(searchQuery);
      if (data) {
        setChannelData(data);
      }
    } catch (crash: any) {
      console.error("Critical Search Failure:", crash);
      setError("A critical error occurred. Please refresh and try again.");
    } finally {
      // Guaranteed state reset to prevent black screen lock
      setIsAnalyzing(false);
      setSearchQuery('');
    }
  };

  const navGroups = [
    {
      title: 'Navigation',
      items: [
        { id: 'Channels', icon: 'search', hasChevron: true },
        { id: 'Research Repos', icon: 'git-branch' },
        { id: 'Saved Channels', icon: 'bookmark' },
        { id: 'Channel Trends', icon: 'trending-up' },
      ]
    },
    {
      title: 'Workspaces',
      items: [
        { id: 'Active Repositories', icon: 'folder' },
        { id: 'Commit History', icon: 'history' },
        { id: 'Push to Hub', icon: 'upload-cloud' },
      ]
    },
    {
      title: 'Creation Tools',
      items: [
        { id: 'Image Generation', icon: 'image' },
        { id: 'Video Generation', icon: 'video' },
        { id: 'YouTube Scraper', icon: 'layout' },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'Logout', icon: 'log-out', onClick: onLogout, color: 'text-red-400' },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-[#eee] font-inter overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-[#080808] flex flex-col border-r border-white/5 z-[60] overflow-y-auto shadow-2xl">
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
             <i data-lucide="zap" className="w-3.5 h-3.5 text-black"></i>
          </div>
          <span className="text-lg font-bold tracking-tight">Algolyra</span>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-12 pb-12">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <div className="px-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444]">{group.title}</p>
              </div>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.onClick ? item.onClick() : setActiveNav(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-2.5 text-[12px] font-semibold rounded-xl sidebar-item shine-border glass-panel transition-all duration-300 group ${activeNav === item.id ? 'active bg-blue-600/10 text-white' : 'text-[#777] hover:text-[#aaa]'}`}
                  >
                    <i data-lucide={item.icon as any} className={`w-4 h-4 transition-colors ${activeNav === item.id ? 'text-blue-500' : 'group-hover:text-blue-400'}`}></i>
                    <span>{item.id}</span>
                    {item.hasChevron && <i data-lucide="chevron-down" className="ml-auto w-3.5 h-3.5 opacity-20"></i>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#050505] relative">
        <div className="px-10 py-6 flex items-center gap-4 bg-[#050505]/60 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
          <form onSubmit={handleSearch} className="flex-1 relative max-w-3xl">
            <i data-lucide="search" className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels..." 
              className="w-full bg-[#0d0d0d] rounded-2xl pl-12 pr-6 py-3.5 text-[13px] border border-white/5 focus:border-blue-500/30 outline-none transition-all placeholder:text-[#222] font-medium" 
            />
          </form>
          <div className="flex gap-3">
             <button onClick={() => setShowRepoModal(true)} className="bg-white/5 hover:bg-white/10 px-5 rounded-2xl flex items-center gap-2 border border-white/10 text-[12px] font-bold transition-all">
                <i data-lucide="plus" className="w-4 h-4 text-blue-500"></i> New Repo
             </button>
             <button onClick={handleSearch} className="bg-[#0062ff] w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,98,255,0.2)] hover:scale-105 transition-all">
                <i data-lucide="search" className="w-5 h-5 text-white"></i>
             </button>
          </div>
        </div>

        {/* ERROR MESSAGE BAR */}
        {error && (
          <div className="mx-10 mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <i data-lucide="alert-circle" className="w-5 h-5"></i>
              <span className="text-[13px] font-medium">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="hover:text-white transition-colors">
              <i data-lucide="x" className="w-4 h-4"></i>
            </button>
          </div>
        )}

        <div className="p-10 max-w-[1500px] mx-auto w-full space-y-12">
          {activeNav === 'Research Repos' ? (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-3xl font-black tracking-tight">Active Repositories</h2>
                   <p className="text-gray-500 mt-1">Manage and push your research strategies to the cloud.</p>
                </div>
                <div className="flex gap-2">
                   <button className="bg-white/5 p-3 rounded-xl border border-white/5"><i data-lucide="filter" className="w-4 h-4"></i></button>
                   <button className="bg-white/5 p-3 rounded-xl border border-white/5"><i data-lucide="grid" className="w-4 h-4"></i></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo) => (
                  <div key={repo.id} className="glass-panel shine-border rounded-[32px] p-8 space-y-6 group hover:border-blue-500/30 transition-all duration-500">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-12 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center justify-center">
                          <i data-lucide="git-fork" className="w-6 h-6 text-blue-500"></i>
                       </div>
                       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${repo.status === 'public' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'}`}>
                          {repo.status}
                       </span>
                    </div>
                    <div>
                       <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                       <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{repo.description}</p>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[#444] uppercase tracking-wider">Viral Potential</span>
                          <span className="text-blue-500">{repo.viralRank}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${repo.viralRank}%` }}></div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <div className="flex items-center gap-4 text-[10px] font-bold text-[#666]">
                          <span className="flex items-center gap-1.5"><i data-lucide="star" className="w-3 h-3"></i> {repo.viralRank}</span>
                          <span className="flex items-center gap-1.5"><i data-lucide="git-branch" className="w-3 h-3"></i> {repo.replications}</span>
                       </div>
                       <span className="text-[10px] text-[#444]">Updated {repo.lastUpdated}</span>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => setShowRepoModal(true)}
                  className="rounded-[32px] border-2 border-dashed border-white/5 hover:border-blue-500/30 flex flex-col items-center justify-center p-8 space-y-4 text-[#333] hover:text-blue-500 transition-all group"
                >
                   <i data-lucide="plus-circle" className="w-12 h-12 group-hover:scale-110 transition-transform"></i>
                   <span className="text-sm font-bold uppercase tracking-widest">Initialize New Repo</span>
                </button>
              </div>
            </div>
          ) : isAnalyzing ? (
            <div className="h-[550px] flex flex-col items-center justify-center gap-8 animate-fade-in">
               <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-[5px] border-blue-600/10 rounded-full"></div>
                  <div className="absolute inset-0 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
               </div>
               <p className="text-blue-500 font-black tracking-[0.4em] uppercase text-[11px] animate-pulse">Syncing Cloud Intelligence</p>
            </div>
          ) : !channelData ? (
             <div className="h-[550px] flex flex-col items-center justify-center text-center space-y-8 opacity-20">
                <i data-lucide="git-pull-request" className="w-24 h-24 text-white"></i>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black tracking-tight">Syncing Hubs</h2>
                  <p className="text-sm font-medium">Enter a channel handle to fetch real-time creator metrics.</p>
                </div>
             </div>
          ) : (
            <>
              {/* ANALYTICS CARD */}
              <div className="glass-panel shine-border rounded-[40px] p-12 space-y-16 shadow-2xl border-white/5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <img src={channelData.avatar} className="w-24 h-24 rounded-full border-2 border-white/10 p-1 bg-[#111] object-cover" alt="" />
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tight">{channelData.name}</h2>
                      <p className="text-[12px] font-black text-[#555] uppercase tracking-[0.2em]">{channelData.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-blue-600/10 text-blue-500 px-5 py-2.5 rounded-2xl border border-blue-500/20 font-bold text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                       <i data-lucide="upload-cloud" className="w-4 h-4"></i> Push to Hub
                    </button>
                    <button className="w-12 h-12 rounded-2xl hover:bg-white/5 flex items-center justify-center transition-colors">
                      <i data-lucide="more-vertical" className="w-6 h-6 text-[#333]"></i>
                    </button>
                  </div>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                   <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#444] flex items-center gap-3">
                        <i data-lucide="eye" className="w-5 h-5 text-blue-500"></i> Avg. Views
                      </p>
                      <p className="text-[42px] font-bold tracking-tighter text-white">{channelData.avgViewsPerVideo}</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#444] flex items-center gap-3">
                        <i data-lucide="bar-chart-2" className="w-5 h-5 text-emerald-500"></i> Total Views
                      </p>
                      <p className="text-[42px] font-bold tracking-tighter text-white">{channelData.totalViews}</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#444] flex items-center gap-3">
                        <i data-lucide="users" className="w-5 h-5 text-purple-500"></i> Subscribers
                      </p>
                      <p className="text-[42px] font-bold tracking-tighter text-white">{channelData.subscribers}</p>
                   </div>
                </div>

                {/* AI INSIGHT */}
                <div className="bg-blue-600/5 border border-blue-500/10 rounded-[32px] p-10 flex items-start gap-10 relative group overflow-hidden shine-border">
                   <div className="bg-blue-600/15 p-4 rounded-[20px] border border-blue-500/20 shadow-2xl">
                      <i data-lucide="sparkles" className="w-8 h-8 text-blue-500"></i>
                   </div>
                   <div className="space-y-3 relative z-10 flex-1">
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">AI Strategic Intelligence</p>
                      <p className="text-[17px] font-bold text-white/95 leading-relaxed italic max-w-5xl">
                        "{channelData.aiInsight}"
                      </p>
                   </div>
                </div>
              </div>

              {/* RECENT CONTENT */}
              <section className="space-y-12 pt-16">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                       <i data-lucide="play-circle" className="text-blue-500"></i> Recent Uploads
                    </h2>
                    <button className="text-[11px] font-black text-blue-500 tracking-[0.3em] uppercase">Deep Audit ↗</button>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {channelData.recentVideos.map((video, i) => (
                       <div key={i} className="group cursor-pointer" onClick={() => window.open(`https://youtube.com/watch?v=${video.videoId}`, '_blank')}>
                          <div className="glass-panel shine-border aspect-[9/16] rounded-[24px] mb-5 relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(0,98,255,0.2)] transition-all duration-700">
                             <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" alt="" />
                             <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                                <p className="text-[12px] font-bold text-white line-clamp-2 leading-snug">{video.title}</p>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* NEW REPO MODAL */}
      {showRepoModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowRepoModal(false)}></div>
            <div className="glass-panel shine-border w-full max-w-xl rounded-[40px] p-12 relative animate-fade-in shadow-[0_0_100px_rgba(0,98,255,0.2)]">
               <div className="flex justify-between items-start mb-10">
                  <div>
                     <h3 className="text-3xl font-black tracking-tight">Create Repository</h3>
                     <p className="text-gray-500 mt-2">Initialize a new research workspace.</p>
                  </div>
                  <button onClick={() => setShowRepoModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                     <i data-lucide="x" className="w-6 h-6"></i>
                  </button>
               </div>
               
               <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setShowRepoModal(false); }}>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#444]">Repository Name</label>
                     <input type="text" placeholder="e.g. survival-series-research" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-blue-500/50 transition-all text-sm" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#444]">Description</label>
                     <textarea placeholder="Strategy goals and target niches..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-blue-500/50 transition-all h-32 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <button type="button" className="bg-white/5 p-5 rounded-2xl border border-white/10 font-bold flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
                        <i data-lucide="lock" className="w-5 h-5 text-blue-500"></i> Private
                     </button>
                     <button type="button" className="bg-blue-600 p-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 text-xs uppercase tracking-widest">
                        <i data-lucide="globe" className="w-5 h-5 text-blue-500"></i> Public
                     </button>
                  </div>
                  <button type="submit" className="w-full bg-white text-black p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all">
                     Initialize Hub
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default Dashboard;
