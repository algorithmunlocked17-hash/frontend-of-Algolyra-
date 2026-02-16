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

  const navigateToSignup = () => setView('signup');
  const navigateToLogin = () => setView('login');
  const navigateToLanding = () => setView('landing');
  const navigateToDashboard = () => setView('dashboard');

  useEffect(() => {
    if (view !== 'landing') return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [view]);

  if (view === 'dashboard') {
    return <Dashboard onLogout={navigateToLanding} />;
  }

  if (view === 'signup' || view === 'login') {
    return (
      <AuthPage 
        mode={view} 
        onBack={navigateToLanding} 
        onAuthSuccess={navigateToDashboard}
        onSwitchMode={() => setView(view === 'signup' ? 'login' : 'signup')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar onNavigateSignup={navigateToSignup} onNavigateLogin={navigateToLogin} />
      <main>
        <Hero onNavigateAuth={navigateToSignup} />
        <div id="features">
           <FeatureSteps />
           <BentoFeatures />
        </div>
        <Testimonials />
        <div id="pricing">
          <Pricing onNavigateAuth={navigateToSignup} />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer onNavigateAuth={navigateToSignup} />
    </div>
  );
};

export default App;