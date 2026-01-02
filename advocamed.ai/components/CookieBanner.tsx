import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 text-white p-4 z-[100] border-t border-gray-700 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-300 text-center sm:text-left">
          <p>
            🍪 <strong>Privacy & Cookies:</strong> We use cookies to analyze traffic and show personalized ads. 
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Residents of CA, CO, CT, VA, UT, OR, TX, MT, DE, IA, NE, NH, NJ, IN, KY, MN, TN, MD, and RI have specific rights regarding the "sale" or "sharing" of data.
            <br />
            See our <Link to="/privacy-policy" className="underline text-white hover:text-primary">Privacy Policy</Link> for opt-out details.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
            <button 
                onClick={accept} 
                className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-colors whitespace-nowrap"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
}
