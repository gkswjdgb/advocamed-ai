import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent';
import { BlogList } from './components/BlogList.tsx';
import { BlogPostView } from './components/BlogPostView.tsx';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import SEO from './components/SEO';
import { AppStep, AnalysisResult, BlogPost } from './types';
import { blogPosts } from './data/blogPosts';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.HERO);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const currentYear = new Date().getFullYear();

  // Handle URL Routing on Load & PopState
  useEffect(() => {
    const handleLocationChange = () => {
        const path = window.location.pathname;
        if (path.startsWith('/blog/')) {
            const slug = path.split('/blog/')[1];
            const post = blogPosts.find(p => p.id === slug);
            if (post) {
                setSelectedPost(post);
                setStep(AppStep.BLOG_POST);
            } else {
                setStep(AppStep.BLOG);
            }
        } else if (path === '/blog') {
            setStep(AppStep.BLOG);
        } else if (path === '/contact-us') {
            setStep(AppStep.CONTACT);
        } else if (path === '/privacy-policy') {
            setStep(AppStep.PRIVACY);
        } else {
            // Default home
            setStep(AppStep.HERO);
        }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (newStep: AppStep, url?: string) => {
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL without reload
    if (url) {
        window.history.pushState({}, '', url);
    } else {
        // Reset to home if no url provided for main steps
        if (newStep === AppStep.HERO) window.history.pushState({}, '', '/');
        if (newStep === AppStep.CONTACT) window.history.pushState({}, '', '/contact-us');
        if (newStep === AppStep.PRIVACY) window.history.pushState({}, '', '/privacy-policy');
    }
  };

  const navigateToPost = (post: BlogPost) => {
      setSelectedPost(post);
      navigateTo(AppStep.BLOG_POST, `/blog/${post.id}`);
  };

  const handleStart = () => {
    setStep(AppStep.UPLOAD);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisData(result);
    setStep(AppStep.RESULTS);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Global SEO Settings for the Main Page */}
        {step !== AppStep.BLOG_POST && (
             <SEO 
                title={step === AppStep.BLOG ? "Medical Billing Guides & Tips" : "Medical Bill Dispute Tool & Charity Care Finder"}
                description={step === AppStep.BLOG ? "Expert advice on lowering medical bills, understanding CPT codes, and applying for hospital financial assistance." : "Stop overpaying for medical bills. AdvocaMed uses AI to find billing errors, upcoding, and unbundled charges instantly."}
                canonical={step === AppStep.BLOG ? "/blog" : "/"}
            />
        )}

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center cursor-pointer" onClick={() => navigateTo(AppStep.HERO)}>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  Advoca<span className="text-primary">Med</span>.ai
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <button onClick={() => navigateTo(AppStep.BLOG, '/blog')} className={`text-sm font-medium ${step === AppStep.BLOG || step === AppStep.BLOG_POST ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}>
                  Blog
                </button>
                <button onClick={() => navigateTo(AppStep.CONTACT)} className={`text-sm font-medium ${step === AppStep.CONTACT ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-grow">
          {step === AppStep.HERO && (
            <>
              <Hero onStart={handleStart} />
              <SEOContent />
            </>
          )}

          {step === AppStep.UPLOAD && !isLoading && (
            <UploadSection onAnalysisComplete={handleAnalysisComplete} onLoading={handleLoading} />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[60vh]">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
               <h2 className="text-xl font-bold text-gray-800">Analyzing Bill Structure...</h2>
               <p className="text-gray-500 mt-2">Cross-referencing CPT codes with {currentYear} Medicare standards.</p>
            </div>
          )}

          {step === AppStep.RESULTS && analysisData && (
            <AnalysisResultView data={analysisData} />
          )}

          {step === AppStep.BLOG && (
             <BlogList onPostClick={navigateToPost} />
          )}

          {step === AppStep.BLOG_POST && selectedPost && (
             <BlogPostView 
                post={selectedPost} 
                onBack={() => navigateTo(AppStep.BLOG, '/blog')}
                onScanNow={handleStart} 
             />
          )}

          {step === AppStep.PRIVACY && <PrivacyPolicy />}
          {step === AppStep.CONTACT && <ContactUs />}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="flex space-x-6 mb-4">
                <button onClick={() => navigateTo(AppStep.BLOG, '/blog')} className="text-gray-500 hover:text-gray-900 text-sm">
                  Blog
                </button>
                <button onClick={() => navigateTo(AppStep.PRIVACY)} className="text-gray-500 hover:text-gray-900 text-sm">
                  Privacy Policy
                </button>
                <button onClick={() => navigateTo(AppStep.CONTACT)} className="text-gray-500 hover:text-gray-900 text-sm">
                  Contact Us
                </button>
              </div>
              <p className="text-center text-xs text-gray-400">
                &copy; {currentYear} AdvocaMed.ai. All rights reserved. 
              </p>
              <p className="text-center text-xs text-gray-400 mt-2 max-w-2xl mx-auto leading-relaxed">
                <strong>DISCLAIMER:</strong> This tool is for informational and educational purposes only. 
                The AI-generated analysis and letters do not constitute legal or medical advice. 
                Always consult with a qualified professional before making financial or legal decisions regarding your medical care.
                Results are estimates based on provided images.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;
