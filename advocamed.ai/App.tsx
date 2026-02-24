import React, { useState, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';

// Components
import { Hero } from './components/Hero';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent'; // Added Import
import SEO from './components/SEO';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService'; 
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

// Data
import { demoAnalysisResult } from './data/demoData';
import { AnalysisResult } from './types';

// Lazy Load Pages
const BlogPage = React.lazy(() => import('./pages/BlogList')); 
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const HospitalGuide = React.lazy(() => import('./pages/HospitalGuide'));
const HospitalDirectory = React.lazy(() => import('./pages/HospitalDirectory'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh] bg-background-light dark:bg-background-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Navigation Component to handle scrolling and active states
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    navigate('/?step=HERO');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
              <div className="w-8 h-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-2xl">health_and_safety</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">AdvocaMed</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => handleScrollToSection('how-it-works')} className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark bg-transparent border-none cursor-pointer">
                How it Works
              </button>
              <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                Latest News
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                About Us
              </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
               <button onClick={handleReset} className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">upload_file</span>
                  <span className="hidden sm:inline">Check a Bill</span>
                  <span className="sm:hidden">Check</span>
               </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') === 'RESULTS' ? 'RESULTS' : 'HERO';
  const location = useLocation();

  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [billImage, setBillImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle hash scrolling on load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const handleAnalysisComplete = (result: AnalysisResult, image: string) => {
    setAnalysisData(result);
    setBillImage(image);
    setIsLoading(false);
    setSearchParams({ step: 'RESULTS' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
        setAnalysisData(demoAnalysisResult);
        setBillImage(null); // No image for demo
        setIsLoading(false);
        setSearchParams({ step: 'RESULTS' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleBack = () => {
    setSearchParams({});
    setBillImage(null);
    setAnalysisData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {step !== 'RESULTS' && (
        <SEO 
          title="Decipher & Dispute Your Medical Bills with AI — HIPAA Compliant"
          description="Don't pay the sticker price. Our AI scans CPT codes for upcoding and unbundling errors instantly. Access verified Charity Care policies for 5,000+ US hospitals."
          canonical="/"
        />
      )}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/90 z-[60] flex flex-col items-center justify-center animate-fade-in-up">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
           <h2 className="text-2xl font-bold text-gray-800">Analyzing Your Bill...</h2>
           <p className="text-gray-600 mt-2 text-center max-w-md px-4">
            Our AI is cross-referencing CPT codes with Medicare standards and checking charity care eligibility.
           </p>
        </div>
      )}

      {step === 'HERO' && (
        <>
          <Hero 
            onAnalysisComplete={handleAnalysisComplete}
            onLoading={handleLoading}
            onDemo={handleDemo}
          />
          {/* Added SEOContent here: This is the 'Text Bomb' for crawlers */}
          <SEOContent />
        </>
      )}

      {step === 'RESULTS' && analysisData && (
        <AnalysisResultView 
          data={analysisData} 
          billImage={billImage}
          onReset={handleBack}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-display transition-colors duration-200">
          
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow flex flex-col" role="main">
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

          {/* Footer */}
          <footer className="bg-background-light dark:bg-background-dark py-12 border-t border-border-light dark:border-border-dark mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                        <Link to="/" className="flex items-center gap-2 text-text-main-light dark:text-text-main-dark opacity-80 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined">health_and_safety</span>
                            <span className="font-bold">AdvocaMed</span>
                        </Link>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">© {currentYear} AdvocaMed. All rights reserved.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/privacy-policy" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/contact-us" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">Support</Link>
                    </div>
                </div>
                
                {/* Data Power Attribution */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Data Powered by CMS.gov & IRS 501(r) Guidelines.
                    </p>
                </div>

                {/* Legal Disclaimer for YMYL */}
                <div className="mt-8 border-t border-border-light dark:border-border-dark pt-6">
                     <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-center max-w-4xl mx-auto">
                        <strong>DISCLAIMER:</strong> AdvocaMed.ai is an automated analysis tool designed for informational and educational purposes only. We are not a law firm, medical provider, or insurance entity. The "potential savings," "errors," and "charity care eligibility" detected by our AI are estimates based on national datasets (CMS) and public hospital policies. They do not constitute legal or medical advice. Results may vary based on your specific insurance plan and state laws. Always verify CPT codes and billing details with a certified professional or your healthcare provider before taking financial action.
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
