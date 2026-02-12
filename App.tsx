
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureSteps from './components/FeatureSteps';
import BentoFeatures from './components/BentoFeatures';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'signup' | 'login'>('landing');

  const navigateToSignup = () => setView('signup');
  const navigateToLogin = () => setView('login');
  const navigateToLanding = () => setView('landing');

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

  if (view === 'signup' || view === 'login') {
    return (
      <AuthPage 
        mode={view} 
        onBack={navigateToLanding} 
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
