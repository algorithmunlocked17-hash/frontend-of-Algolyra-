
import React from 'react';

interface AuthPageProps {
  mode: 'signup' | 'login';
  onBack: () => void;
  onSwitchMode: () => void;
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onBack, onSwitchMode, onAuthSuccess }) => {
  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-inter overflow-hidden">
      {/* Left Pane - Form */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-black p-8 md:p-16 flex flex-col justify-center relative">
        <div 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
             <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                <path d="M70,20 L30,60 L30,40 L50,20 L70,20 Z M30,80 L70,40 L70,60 L50,80 L30,80 Z" />
                <rect x="25" y="45" width="10" height="25" />
                <rect x="65" y="30" width="10" height="25" />
             </svg>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-gray-400 mb-10 text-lg">
            {isLogin ? 'Enter your credentials to access your account.' : 'Join thousands of creators growing their channels.'}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email address</label>
              <input 
                required
                type="email" 
                placeholder="name@work-email.com"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input 
                  required
                  type="password" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                  <i className="fa-solid fa-eye text-sm"></i>
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <input 
                    required
                    type="password" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                    <i className="fa-solid fa-eye text-sm"></i>
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-blue-600/20"
            >
              {isLogin ? 'Sign In' : 'Create Account'} <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>

            {isLogin && (
              <div className="text-center">
                <button type="button" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">Forgot password?</button>
              </div>
            )}

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={onSwitchMode} className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                  {isLogin ? 'Create one now' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Pane - Visual Preview */}
      <div className="hidden md:flex flex-1 relative bg-[#050505] p-16 items-center justify-center border-l border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative w-full max-w-lg z-10 flex flex-col items-center">
            <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[32px] p-10 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/50"></div>
                
                {isLogin ? (
                  /* Login Visual Preview: Analyze Competition */
                  <div className="space-y-8">
                    <div className="bg-black rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <span>Similar Roblox Channels</span>
                            <span>Sort: Similarity</span>
                        </div>
                        <div className="p-4 space-y-4">
                            {[
                                { name: 'Catfish Blox', subs: '6.4M Subscribers', match: '98% Match', seed: 'cat', color: 'bg-green-500/10 text-green-500' },
                                { name: 'AmyyRoblox', subs: '4.1M Subscribers', match: '95% Match', seed: 'amy', color: 'bg-green-500/10 text-green-500' },
                                { name: 'RealBacon', subs: '3.1M Subscribers', match: '92% Match', seed: 'bacon', color: 'bg-blue-500/10 text-blue-500' },
                            ].map((channel, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.seed}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10" alt="" />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold">{channel.name}</div>
                                        <div className="text-[10px] text-gray-500">{channel.subs}</div>
                                    </div>
                                    <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${channel.color}`}>
                                        {channel.match}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Analyze Competition</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Spy on top channels and replicate their success strategies.
                        </p>
                    </div>
                  </div>
                ) : (
                  /* Signup Visual Preview: Discover Viral Niches */
                  <>
                    <div className="bg-black rounded-2xl p-6 border border-white/10 mb-8 relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
                                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                            </div>
                            <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Trending niche found:</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                               <span className="text-blue-500">"</span>
                               Bodycam
                               <span className="text-blue-500">"</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Discover Viral Niches</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Access our database of high-CPM niches and find untapped opportunities instantly.
                        </p>
                    </div>
                  </>
                )}
            </div>
            
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
