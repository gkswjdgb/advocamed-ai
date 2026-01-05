import React from 'react';

export const Newsletter: React.FC = () => {
  // Use your existing Formspree ID
  const FORMSPREE_ID = "xpqzpbrz";
  // The URL of your medical bill dispute template (e.g., Google Docs or a PDF link)
  const TEMPLATE_REDIRECT_URL = "https://docs.google.com/document/d/1XyXnE7_T0v1Y-M_LpxT9fD8_vV9B3fFzGvN7tY7G7Z0/edit?usp=sharing";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Don't have a bill right now?</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
          Be prepared for emergencies. Get our <strong>"Medical Bill Dispute Template"</strong> sent to your inbox and saved for whenever you need it.
        </p>
        
        <form 
          action={`https://formspree.io/f/${FORMSPREE_ID}`} 
          method="POST" 
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10"
        >
          {/* Distinguish from regular contact form */}
          <input type="hidden" name="_subject" value="New Newsletter Subscriber - AdvocaMed" />
          {/* Redirect to template after submission */}
          <input type="hidden" name="_next" value={TEMPLATE_REDIRECT_URL} />
          
          <input 
            type="email" 
            name="email"
            placeholder="Enter your email" 
            className="flex-1 px-5 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-primary/20 transition-all border-none"
            required
          />
          <button type="submit" className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap">
            Get Template
          </button>
        </form>
        <p className="text-[10px] text-gray-500 mt-4 italic">By clicking "Get Template", you'll receive the dispute toolkit and periodic advocacy updates.</p>
      </div>
    </div>
  );
};
