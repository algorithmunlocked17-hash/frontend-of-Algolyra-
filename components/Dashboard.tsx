import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const YT_API_KEY = 'AIzaSyChKs9YVJCtuQ8uAAytFTllka_2P1akbxA';

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError('');

    try {
      const sRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(search)}&maxResults=1&key=${YT_API_KEY}`);
      const sData = await sRes.json();
      if (!sData.items?.[0]) throw new Error("Channel not found");

      const cid = sData.items[0].id.channelId;
      const cRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${cid}&key=${YT_API_KEY}`);
      const cData = await cRes.json();
      const channel = cData.items[0];

      let insight = "Analyzing growth patterns...";
      if (process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const res = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide a 1-sentence viral strategy for: ${channel.snippet.title} (${channel.statistics.subscriberCount} subs).`,
        });
        insight = res.text || insight;
      }

      setData({
        title: channel.snippet.title,
        subs: parseInt(channel.statistics.subscriberCount).toLocaleString(),
        views: parseInt(channel.statistics.viewCount).toLocaleString(),
        videos: channel.statistics.videoCount,
        thumbnail: channel.snippet.thumbnails.high.url,
        insight
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-inter">
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><i className="fas fa-zap text-sm text-white"></i></div>
          Algolyra
        </div>
        <nav className="flex-1 flex flex-col gap-4">
          <button className="flex items-center gap-4 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-semibold"><i className="fas fa-search"></i> Channels</button>
          <button className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors"><i className="fas fa-layer-group"></i> Research</button>
        </nav>
        <button onClick={onLogout} className="text-red-500 font-semibold px-4 py-3 hover:bg-red-500/10 rounded-xl transition-all">Logout</button>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#050505]">
        <div className="sticky top-0 p-8 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-50">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"></i>
              <input 
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Paste channel URL or name..." 
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:border-blue-500/50 outline-none transition-all"
              />
            </div>
            <button className="bg-blue-600 px-8 rounded-2xl font-bold hover:bg-blue-700 transition-all">Analyze</button>
          </form>
        </div>

        <div className="p-10 max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50 animate-pulse">
               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
               <p className="font-bold tracking-widest text-xs uppercase">Connecting to Database...</p>
            </div>
          ) : data ? (
            <div className="space-y-8">
              <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[40px] flex items-center gap-8">
                <img src={data.thumbnail} className="w-24 h-24 rounded-full border-2 border-white/10" />
                <div>
                  <h1 className="text-4xl font-black mb-1">{data.title}</h1>
                  <p className="text-blue-500 font-bold text-sm tracking-widest uppercase">Verified Channel Profile</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { l: "Subscribers", v: data.subs },
                  { l: "Total Views", v: data.views },
                  { l: "Total Videos", v: data.videos }
                ].map((s, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">{s.l}</p>
                    <p className="text-3xl font-black">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-3xl italic text-lg leading-relaxed">
                <span className="text-blue-500 font-bold not-italic block mb-2 text-xs uppercase tracking-widest">AI Strategy Insight</span>
                "{data.insight}"
              </div>
            </div>
          ) : (
            <div className="py-20 text-center opacity-20">
               <i className="fas fa-chart-line text-6xl mb-6"></i>
               <p className="text-xl font-bold tracking-widest uppercase">Enter a channel to start deep analysis</p>
            </div>
          )}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;