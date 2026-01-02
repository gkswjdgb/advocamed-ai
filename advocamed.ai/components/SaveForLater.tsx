import React, { useState, useEffect } from 'react';

export const SaveForLater: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simple check for mobile devices to provide honest instructions
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleBookmark = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 5000);
  };

  return (
    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto shadow-sm animate-fade-in-up">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Don't have a bill right now?</h4>
          <p className="text-xs text-gray-600 mt-1">
            Medical emergencies happen unexpectedly. Save this tool now to protect your wallet later.
          </p>
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={handleBookmark}
          className="whitespace-nowrap px-4 py-2 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2 active:scale-95 transform"
        >
          <span>⭐ Bookmark for Later</span>
        </button>

        {/* Tooltip for Instruction - Conditional logic for honesty */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl z-50 text-center">
            {isMobile ? (
               <p>Tap your browser menu <span className="text-gray-400">(⋮ or share)</span> and select <span className="font-bold text-yellow-400">"Add to Bookmarks"</span> or "Add to Home Screen".</p>
            ) : (
               <p>Press <span className="font-bold text-yellow-400">Ctrl + D</span> (or Cmd + D on Mac) to save instantly.</p>
            )}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};
