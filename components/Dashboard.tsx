import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// YouTube API Key (Publicly used for search in this app)
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
  const [error, setError] = useState<string | null>(null);
  
  const [repos] = useState<Repository[]>([
    { id: '1', name: 'minecraft-parkour-v2', description: 'Tracking high-retention parkour hooks and story structures.', viralRank: 98, replications: 12, lastUpdated: '2h ago', status: 'public', tags: ['Gaming', 'Viral'] },
    { id: '2', name: 'documentary-style-investigations', description: 'Deep dive into the "SunnyV2" style growth patterns.', viralRank: 85, replications: 4, lastUpdated: '1d ago', status: 'private', tags: ['Documentary', 'CPM'] },
    { id: '3', name: 'ai-voiceover-narratives', description: 'Testing retention on ElevenLabs vs. Natural voices.', viralRank: 72, replications: 28, lastUpdated: '3d ago', status: 'public', tags: ['AI', 'Tech'] },
  ]);

  useEffect(() => {
    const win = window as any;
    if (win.lucide && typeof win.lucide.createIcons === 'function') {
      try {
        win.lucide.createIcons();
      } catch (e) {
        console.warn("Lucide icon generation failed", e);
      }
    }
  }, [channelData, isAnalyzing, activeNav]);

  const fetchChannelData = async (query: string): Promise<ChannelStats | null> => {
    try {
      if (!YT_API_KEY) throw new Error("Missing YouTube API Key");

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=1&key=${YT_API_KEY}`
      );
      
      const searchData = await searchRes.json();
      if (searchData.error) throw new Error(searchData.error.message);
      if (!searchData.items || searchData.items.length === 0) {
        setError("Channel not found.");
        return null;
      }

      const channelId = searchData.items[0].id.channelId;
      
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YT_API_KEY}`
      );
      const statsData = await statsRes.json();
      const channel = statsData.items[0];

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

      let aiInsightText = "Strategy focuses on high-retention narrative hooks and niche authority.";
      
      const apiKey = process.env.API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze this YouTube channel: ${channel.snippet.title}. Statistics: ${channel.statistics.subscriberCount} subs. Provide a professional, viral-strategy focused 1-sentence insight.`,
          });
          if (response.text) aiInsightText = response.text;
        } catch (aiErr) {
          console.warn("AI strategy failed:", aiErr);
        }
      }

      const totalViews = parseInt(channel.statistics.viewCount || "0");
      const videoCount = parseInt(channel.statistics.videoCount || "0");
      const subCount = parseInt(channel.statistics.subscriberCount || "0");

      return {
        name: channel.snippet.title,
        handle: channel.snippet.customUrl || `@${channel.snippet.title.toLowerCase().replace(/\s/g, '')}`,
        avatar: channel.snippet.thumbnails?.high?.url || "",
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
      setError(err.message || "An unexpected error occurred.");
      return null;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await fetchChannelData(searchQuery);
      if (data) setChannelData(data);
    } catch (crash: any) {
      setError("A critical error occurred.");
    } finally {
      setIsAnalyzing(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-[#eee] font-inter overflow-hidden">
      <aside className="w-[280px] bg-[#080808] flex flex-col border-r border-white/5 z-[60] overflow-y-auto shadow-2xl">
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
             <i data-lucide="zap" className="w-3.5 h-3.5 text-black"></i>
          </div>
          <span className="text-lg font-bold tracking-tight">Algolyra</span>
        </div>
        <nav className="flex-1 px-4 mt-8 space-y-10">
          <div className="space-y-2">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444]">Navigation</p>
            <button onClick={() => setActiveNav('Channels')} className={`w-full flex items-center gap-4 px-4 py-2.5 text-[12px] font-semibold rounded-xl sidebar-item ${activeNav === 'Channels' ? 'active text-white' : 'text-[#777]'}`}>
              <i data-lucide="search" className="w-4 h-4"></i> Channels
            </button>
            <button onClick={() => setActiveNav('Research Repos')} className={`w-full flex items-center gap-4 px-4 py-2.5 text-[12px] font-semibold rounded-xl sidebar-item ${activeNav === 'Research Repos' ? 'active text-white' : 'text-[#777]'}`}>
              <i data-lucide="git-branch" className="w-4 h-4"></i> Research Repos
            </button>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-2.5 text-[12px] font-semibold rounded-xl text-red-400 hover:bg-red-400/10">
            <i data-lucide="log-out" className="w-4 h-4"></i> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto bg-[#050505]">
        <div className="px-10 py-6 flex items-center gap-4 bg-[#050505]/60 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
          <form onSubmit={handleSearch} className="flex-1 relative max-w-3xl">
            <i data-lucide="search" className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels..." 
              className="w-full bg-[#0d0d0d] rounded-2xl pl-12 pr-6 py-3.5 text-[13px] border border-white/5 focus:border-blue-500/30 outline-none placeholder:text-[#222]" 
            />
          </form>
          <button onClick={handleSearch} className="bg-[#0062ff] w-12 h-12 rounded-2xl flex items-center justify-center">
            <i data-lucide="search" className="w-5 h-5 text-white"></i>
          </button>
        </div>

        <div className="p-10 max-w-[1500px] mx-auto w-full">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}
          {isAnalyzing ? (
            <div className="h-[500px] flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">Analyzing Database...</p>
            </div>
          ) : activeNav === 'Research Repos' ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {repos.map(repo => (
                 <div key={repo.id} className="glass-panel p-8 rounded-[32px] space-y-4">
                    <h3 className="text-lg font-bold">{repo.name}</h3>
                    <p className="text-sm text-gray-500">{repo.description}</p>
                    <div className="pt-4 border-t border-white/5 flex justify-between">
                       <span className="text-blue-500 font-bold text-xs">{repo.viralRank}% Viral</span>
                       <span className="text-gray-600 text-[10px] uppercase">{repo.status}</span>
                    </div>
                 </div>
               ))}
             </div>
          ) : channelData ? (
             <div className="space-y-10 animate-fade-in">
                <div className="glass-panel p-10 rounded-[40px] flex items-center gap-8">
                   <img src={channelData.avatar} className="w-20 h-20 rounded-full border border-white/10" alt="" />
                   <div>
                      <h2 className="text-3xl font-black">{channelData.name}</h2>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{channelData.handle}</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                   <div className="glass-panel p-8 rounded-[32px]">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Total Views</p>
                      <p className="text-3xl font-bold">{channelData.totalViews}</p>
                   </div>
                   <div className="glass-panel p-8 rounded-[32px]">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Subscribers</p>
                      <p className="text-3xl font-bold">{channelData.subscribers}</p>
                   </div>
                   <div className="glass-panel p-8 rounded-[32px]">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Avg Views</p>
                      <p className="text-3xl font-bold">{channelData.avgViewsPerVideo}</p>
                   </div>
                </div>
                <div className="glass-panel p-8 rounded-[32px] bg-blue-600/5 border-blue-500/20">
                   <p className="text-[10px] text-blue-500 uppercase font-bold mb-4">AI Strategy Insight</p>
                   <p className="text-lg italic font-medium">"{channelData.aiInsight}"</p>
                </div>
             </div>
          ) : (
             <div className="h-[400px] flex flex-col items-center justify-center opacity-20">
                <i data-lucide="search" className="w-20 h-20 mb-4"></i>
                <p className="font-bold uppercase tracking-widest">Search a channel to begin</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;