import React, { useState, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';

// Components
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent';
import SEO from './components/SEO';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService'; 
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

// Data
import { demoAnalysisResult } from './data/demoData';
import { AnalysisResult } from './types';
import { hospitals } from './data/hospitals';

// Lazy Load Pages to reduce initial JavaScript bundle size (Fixes "Reduce unused JavaScript")
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const HospitalGuide = React.lazy(() => import('./pages/HospitalGuide'));
const HospitalDirectory = React.lazy(() => import('./pages/HospitalDirectory'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') === 'UPLOAD' ? 'UPLOAD' : 
               searchParams.get('step') === 'RESULTS' ? 'RESULTS' : 'HERO';

  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = () => {
    setSearchParams({ step: 'UPLOAD' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
        setAnalysisData(demoAnalysisResult);
        setSearchParams({ step: 'RESULTS' });
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisData(result);
    setSearchParams({ step: 'RESULTS' });
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBack = () => {
    setSearchParams({});
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
      
      {step === 'HERO' && !isLoading && (
        <>
          <Hero onStart={handleStart} onDemo={handleDemo} />
          <SEOContent />
        </>
      )}

      {(step === 'HERO' && isLoading) && (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800">Analyzing Demo Bill...</h2>
          <p className="text-gray-600 mt-2 text-center max-w-md px-4">
            Simulating AI audit for NYU Langone Health...
          </p>
        </div>
      )}

      {step === 'UPLOAD' && !isLoading && (
        <UploadSection 
          onAnalysisComplete={handleAnalysisComplete} 
          onLoading={setIsLoading} 
          onBack={handleBack}
        />
      )}

      {(step === 'UPLOAD' && isLoading) && (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800">Analyzing Bill Structure...</h2>
          <p className="text-gray-600 mt-2 text-center max-w-md px-4">
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

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const featuredHospitals = hospitals.slice(0, 6);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <Link to="/" className="flex items-center cursor-pointer z-50 active:scale-95 transition-transform" aria-label="AdvocaMed Home">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    Advoca<span className="text-primary">Med</span>.ai
                  </span>
                </Link>
                <div className="flex items-center space-x-4 md:space-x-8">
                  <Link to="/hospitals" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
                    Hospitals
                  </Link>
                  <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
                    Blog
                  </Link>
                  <Link to="/about" className="hidden md:block text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
                    About
                  </Link>
                  <Link to="/contact-us" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Added role="main" for Accessibility */}
          <main className="flex-grow" role="main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/hospitals" element={<HospitalDirectory />} />
                <Route path="/hospital/:slug" element={<HospitalGuide />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <footer className="bg-white border-t border-gray-200 mt-auto pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-100">
                <div className="col-span-1 md:col-span-1">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Advoca<span className="text-primary">Med</span>.ai
                  </span>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    AI-powered medical bill analysis platform. We help you fight billing errors and apply for charity care under IRS 501(r).
                  </p>
                </div>
                
                <div>
                    <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">Platform</h3>
                    <ul className="space-y-2">
                        <li><Link to="/hospitals" className="text-gray-500 hover:text-primary text-sm">Hospital Directory</Link></li>
                        <li><Link to="/blog" className="text-gray-500 hover:text-primary text-sm">Dispute Guides</Link></li>
                        <li><Link to="/?step=UPLOAD" className="text-gray-500 hover:text-primary text-sm">Free Bill Scan</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">Policies</h3>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="text-gray-500 hover:text-primary text-sm">About Us</Link></li>
                        <li><Link to="/contact-us" className="text-gray-500 hover:text-primary text-sm">Contact Us</Link></li>
                        <li><Link to="/privacy-policy" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="text-gray-500 hover:text-primary text-sm">Terms of Service</Link></li>
                    </ul>
                </div>

                <div>
                   <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">Featured</h3>
                    <ul className="space-y-2">
                        {featuredHospitals.slice(0,4).map(h => (
                            <li key={h.id}>
                                <Link to={`/hospital/${h.slug}`} className="text-gray-500 hover:text-primary text-sm truncate block">
                                    {h.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              {/* CRITICAL: Explicit Disclaimer for AdSense/YMYL Compliance */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 text-left">
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                      <strong>DISCLAIMER:</strong> AdvocaMed.ai is an automated analysis tool designed for informational and educational purposes only. We are not a law firm, medical provider, or insurance entity. The "potential savings," "errors," and "charity care eligibility" detected by our AI are estimates based on national datasets (CMS) and public hospital policies. They do not constitute legal or medical advice. Results may vary based on your specific insurance plan and state laws. Always verify CPT codes and billing details with a certified professional or your healthcare provider before taking financial action. Use of this service is subject to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
                  </p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-xs text-gray-400">
                  &copy; {currentYear} AdvocaMed.ai. All rights reserved. 
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
