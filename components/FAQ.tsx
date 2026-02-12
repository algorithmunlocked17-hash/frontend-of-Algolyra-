
import React, { useState } from 'react';

const faqs = [
  { q: 'What is Algolyra?', a: 'Algolyra is an all-in-one research and creation tool designed for YouTube creators to find trending niches, analyze competitors, and generate viral content using AI.' },
  { q: 'How does the Niche Finder work?', a: 'The Niche Finder tracks thousands of channels to identify breakout patterns and low-competition topics that are currently blowing up in the YouTube algorithm.' },
  { q: 'Do you support both Shorts and Longform?', a: 'Yes! Algolyra provides data and optimization tools specifically tailored for both vertical Shorts content and traditional widescreen longform videos.' },
  { q: 'Can I cancel my subscription?', a: 'Of course. You can cancel at any time through your dashboard. No hidden fees or long-term contracts required.' },
  { q: 'How do credits and limits work?', a: 'Each plan comes with a set amount of monthly credits for video generation and image tools. Core research features like Niche Finder are unlimited on all paid plans.' },
  { q: 'Is the data real-time?', a: 'Yes, our systems crawl and analyze YouTube metrics 24/7 to provide you with the most up-to-date trending information possible.' }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 reveal">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Your Questions, Answered</h2>
        <p className="text-gray-400">Everything you need to know about Algolyra.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <i className={`fa-solid fa-plus transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}></i>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
