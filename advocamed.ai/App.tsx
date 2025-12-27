import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent';
import SEO from './components/SEO';
import PrivacyPolicy from './components/PrivacyPolicy';

// Pages
// Renamed BlogList to BlogPage to avoid conflicts with components/BlogList
import BlogPage from './pages/BlogPage'; 
import BlogPost from './pages/BlogPost';
import HospitalGuide from './pages/HospitalGuide';
import ContactUs from './pages/ContactUs';

import { AnalysisResult } from './types';

// 1. Home Component: Handles the Scan/Result state internally
const Home = () => {
  const [step, setStep] = useState<'HERO' | 'UPLOAD' | 'RESULTS'>('HERO');
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = () => {
    setStep('UPLOAD');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisData(result);
    setStep('RESULTS');
    setIsLoading(false);
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
        <UploadSection onAnalysisComplete={handleAnalysisComplete} onLoading={setIsLoading} />
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800">Analyzing Bill Structure...</h2>
          <p className="text-gray-500 mt-2">Cross-referencing CPT codes with Medicare standards.</p>
        </div>
      )}

      {step === 'RESULTS' && analysisData && (
        <AnalysisResultView data={analysisData} />
      )}
    </>
  );
};

// 2. Main App Structure with Routing
const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          
          {/* Navigation */}
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <Link to="/" className="flex items-center cursor-pointer">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    Advoca<span className="text-primary">Med</span>.ai
                  </span>
                </Link>
                <div className="flex items-center space-x-6">
                  <Link to="/blog" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                    Blog
                  </Link>
                  <Link to="/contact-us" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                    Contact Us
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
              <Route path="/hospital/:slug" element={<HospitalGuide />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center">
                <div className="flex space-x-6 mb-4">
                  <Link to="/blog" className="text-gray-500 hover:text-gray-900 text-sm">Blog</Link>
                  <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</Link>
                  <Link to="/contact-us" className="text-gray-500 hover:text-gray-900 text-sm">Contact Us</Link>
                </div>
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

        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
