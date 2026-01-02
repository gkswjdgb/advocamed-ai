
import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';

// Components
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent';
import SEO from './components/SEO';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop'; // Fixed import

// Pages
import BlogPage from './pages/BlogPage'; 
import BlogPost from './pages/BlogPost';
import HospitalGuide from './pages/HospitalGuide';
import HospitalDirectory from './pages/HospitalDirectory';
import ContactUs from './pages/ContactUs';

import { AnalysisResult } from './types';

// 1. Home Component: Handles Scan/Result state via URL Params
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') === 'UPLOAD' ? 'UPLOAD' : 
               searchParams.get('step') === 'RESULTS' ? 'RESULTS' : 'HERO';

  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = () => {
    setSearchParams({ step: 'UPLOAD' });
    // Scroll handled by ScrollToTop, but for in-page state changes, we might want smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisData(result);
    setSearchParams({ step: 'RESULTS' });
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBack = () => {
    setSearchParams({}); // Clear params to go back to HERO
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {step !== 'RESULTS' && (
        <SEO 
          title="Medical Bill Dispute Tool & Charity Care Finder"
          description="Stop overpaying for medical bills. AdvocaMed uses AI to find billing errors, upcoding, and unbundled charges instantly."
          canonical="/"
        />
      )}
      
      {step === 'HERO' && (
        <>
          <Hero onStart={handleStart} />
          <SEOContent />
        </>
      )}

      {step === 'UPLOAD' && !isLoading && (
        <UploadSection 
          onAnalysisComplete={handleAnalysisComplete} 
          onLoading={setIsLoading} 
          onBack={handleBack}
        />
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800">Analyzing Bill Structure...</h2>
          <p className="text-gray-500 mt-2 text-center max-w-md px-4">
            Our AI is cross-referencing CPT codes with Medicare standards and checking charity care eligibility.
          </p>
        </div>
      )}

      {step === 'RESULTS' && analysisData && (
        <AnalysisResultView data={analysisData} />
      )}
    </>
  );
};

// 2. Main App Structure
const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* Critical Fix: Ensures page starts at top on nav */}
        <div className="min-h-screen bg-gray-50 flex flex-col">
          
          {/* Navigation */}
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <Link to="/" className="flex items-center cursor-pointer z-50 active:scale-95 transition-transform">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    Advoca<span className="text-primary">Med</span>.ai
                  </span>
                </Link>
                <div className="flex items-center space-x-4 md:space-x-8">
                  <Link to="/hospitals" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors py-2">
                    Hospitals
                  </Link>
                  <Link to="/blog" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors py-2">
                    Blog
                  </Link>
                  <Link to="/contact-us" className="hidden md:block text-sm font-medium text-gray-500 hover:text-primary transition-colors py-2">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Routes */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/hospitals" element={<HospitalDirectory />} />
              <Route path="/hospital/:slug" element={<HospitalGuide />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-100 pb-8">
                <div className="text-center md:text-left">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Advoca<span className="text-primary">Med</span>.ai
                  </span>
                  <p className="text-xs text-gray-400 mt-2">Empowering patients through AI-driven medical bill analysis.</p>
                </div>
                <div className="flex justify-center space-x-6">
                  <Link to="/hospitals" className="text-gray-500 hover:text-gray-900 text-sm font-semibold p-2">Directory</Link>
                  <Link to="/blog" className="text-gray-500 hover:text-gray-900 text-sm font-semibold p-2">Guides</Link>
                  <Link to="/contact-us" className="text-gray-500 hover:text-gray-900 text-sm font-semibold p-2">Contact</Link>
                </div>
                <div className="flex justify-center md:justify-end space-x-4">
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-gray-600 text-xs p-2">Privacy</Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-xs text-gray-400">
                  &copy; {currentYear} AdvocaMed.ai. All rights reserved. 
                </p>
                <p className="text-center text-xs text-gray-400 mt-2 max-w-2xl mx-auto leading-relaxed">
                  <strong>DISCLAIMER:</strong> This tool is for informational purposes only. 
                  The AI-generated analysis does not constitute legal or medical advice.
                </p>
              </div>
            </div>
          </footer>

          <CookieBanner />

        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
