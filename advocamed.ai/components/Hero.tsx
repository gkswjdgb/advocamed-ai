import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm font-medium text-gray-600">Updated for {new Date().getFullYear()} Regulations</span>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Medical Billing,</span>
              <span className="block text-primary">Simplified & Fair.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Don't fight the system alone. AdvocaMed uses AI to analyze your hospital bills, find billing errors, and automatically generate appeal letters to save you money.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStart}
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primaryHover shadow-lg hover:shadow-xl transition-all duration-200 md:py-4 md:text-lg md:px-10"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Scan Your Bill
                </button>
                <button
                    onClick={() => document.getElementById('seo-content')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                    Learn How It Works
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                <span className="font-semibold text-gray-500">100% Private.</span> No data stored. Free to use.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                {/* Background Blobs */}
                <div className="absolute top-0 -left-4 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                
                {/* Dashboard Card - Glassmorphism */}
                <div className="relative block w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl border border-white/50 overflow-hidden transform transition-all hover:scale-[1.02] duration-500">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Analysis Complete</div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Stat Row */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Charged</p>
                                <p className="text-xl font-bold text-gray-800">$12,450.00</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-primary font-semibold">Potential Savings</p>
                                <p className="text-2xl font-extrabold text-primary">-$4,200.00</p>
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">!</div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Duplicate Charge</p>
                                        <p className="text-xs text-gray-500">CPT 99285 found twice</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-red-600">Dispute</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-green-500 shadow-sm">✓</div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Charity Eligible</p>
                                        <p className="text-xs text-gray-500">Income &lt; 200% FPL</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-green-600">Apply</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-primary w-2/3"></div>
                             </div>
                             <p className="text-right text-xs text-gray-400 mt-1">AI Confidence: 98%</p>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements for depth */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 animate-float">
                    <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                         </div>
                         <div>
                             <p className="text-sm font-bold text-gray-800">Appeal Ready</p>
                             <p className="text-xs text-gray-500">Draft generated in 2s</p>
                         </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};