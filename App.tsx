import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import FeatureSteps from './components/FeatureSteps.tsx';
import BentoFeatures from './components/BentoFeatures.tsx';
import Testimonials from './components/Testimonials.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import AuthPage from './components/AuthPage.tsx';
import Dashboard from './components/Dashboard.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'signup' | 'login' | 'dashboard'>('landing');

  useEffect(() => {
    if (view !== 'landing') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  if (view === 'signup' || view === 'login') {
    return (
      <AuthPage 
        mode={view} 
        onBack={() => setView('landing')} 
        onAuthSuccess={() => setView('dashboard')}
        onSwitchMode={() => setView(view === 'signup' ? 'login' : 'signup')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="bg-glow top-[-200px] left-1/2 -translate-x-1/2"></div>
      <Navbar onNavigateSignup={() => setView('signup')} onNavigateLogin={() => setView('login')} />
      <main>
        <Hero onNavigateAuth={() => setView('signup')} />
        <div id="features"><FeatureSteps /><BentoFeatures /></div>
        <Testimonials />
        <div id="pricing"><Pricing onNavigateAuth={() => setView('signup')} /></div>
        <div id="faq"><FAQ /></div>
      </main>
      <Footer onNavigateAuth={() => setView('signup')} />
    </div>
  );
};

export default App;