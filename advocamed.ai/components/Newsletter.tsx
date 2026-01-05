import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Don't have a bill right now?</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
          Medical emergencies happen unexpectedly. Join 5,000+ patients and get our <strong>"Medical Bill Dispute Template"</strong> sent to your inbox for free.
        </p>
        
        <form action="https://formspree.io/f/xpqzpbrz" method="POST" className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
          <input 
            type="email" 
            name="email"
            placeholder="Enter your email address" 
            className="flex-1 px-5 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-primary/20 transition-all border-none"
            required
          />
          <button type="submit" className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Get My Template
          </button>
        </form>
        <p className="text-[10px] text-gray-500 mt-4 italic">No spam. Only patient advocacy resources.</p>
      </div>
    </div>
  );
};
