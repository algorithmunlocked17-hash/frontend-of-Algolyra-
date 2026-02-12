
import React, { useState } from 'react';

interface PricingProps {
  onNavigateAuth: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigateAuth }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? 19 : 25,
      desc: 'Perfect for new creators starting their journey.',
      features: [
        'Unlimited access to Niche Finder',
        'Unlimited Access to Image Generator',
        'Unlimited Access to Voice Generator',
        '5 Screenshot Finder Credits',
        '95 Credits for Video Generation',
        'Discord and Email support'
      ]
    },
    {
      name: 'Professional',
      price: isAnnual ? 35 : 45,
      desc: 'Ideal for growing channels seeking deeper insights.',
      popular: true,
      features: [
        'Unlimited access to Niche Finder',
        'Unlimited Access to Image Generator',
        'Unlimited Access to Voice Generator',
        'Unlimited Screenshot Finder Credits',
        '175 Credits for Video Generation',
        'Priority Discord and Email support'
      ]
    },
    {
      name: 'Ultimate',
      price: isAnnual ? 65 : 80,
      desc: 'The complete toolkit for professional studios.',
      features: [
        'Unlimited access to Niche Finder',
        'Unlimited Access to Image Generator',
        'Unlimited Access to Voice Generator',
        'Unlimited Screenshot Finder Credits',
        '300 Credits for Video Generation',
        'Priority Discord and Email support'
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#050505] reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, <span className="text-blue-500">Transparent Pricing</span></h2>
          <p className="text-gray-400 mb-10">Choose the plan that fits your content creation goals.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'text-white font-bold' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 rounded-full bg-white/10 p-1 flex items-center transition-all"
            >
              <div className={`w-5 h-5 rounded-full bg-blue-600 transition-all ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white font-bold' : 'text-gray-500'}`}>
              Annual <span className="text-blue-500 font-bold ml-1">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[40px] border flex flex-col ${plan.popular ? 'bg-[#0a0a0a] border-blue-600/50 shadow-2xl shadow-blue-600/10' : 'bg-[#0a0a0a] border-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$</span>
                  <span className="text-6xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/mo</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.desc}</p>
              </div>

              <button 
                onClick={onNavigateAuth}
                className={`w-full py-4 rounded-2xl font-bold mb-10 transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
              >
                {plan.name === 'Starter' ? 'Get started' : 'Choose Plan'}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-blue-500 mt-1 text-sm"></i>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown Box */}
        <div className="mt-20 p-8 rounded-[32px] bg-white/5 border border-white/10">
            <h4 className="text-xl font-bold mb-8 text-center">Complete Credit Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <div className="text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-video text-blue-500"></i> Video Generation
                    </div>
                    <div className="text-xs text-gray-500">Sora 2 & Pro Models</div>
                    <div className="text-xs font-medium text-white pt-2">Starter: 95 credits</div>
                    <div className="text-xs font-medium text-white">Professional: 175 credits</div>
                </div>
                <div className="space-y-2">
                    <div className="text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-image text-purple-500"></i> Image Generation
                    </div>
                    <div className="text-xs text-gray-500">High Resolution Models</div>
                    <div className="text-xs font-medium text-white pt-2">Free within daily limit</div>
                    <div className="text-xs font-medium text-white">Ultimate: Unlimited</div>
                </div>
                <div className="space-y-2">
                    <div className="text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-ghost text-red-500"></i> Watermark Removal
                    </div>
                    <div className="text-xs text-gray-500">Clean Video Output</div>
                    <div className="text-xs font-medium text-white pt-2">Professional: All clean</div>
                    <div className="text-xs font-medium text-white">Ultimate: Priority removal</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
