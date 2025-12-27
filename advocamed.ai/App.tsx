import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResultView } from './components/AnalysisResult';
import { SEOContent } from './components/SEOContent';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import { AppStep, AnalysisResult } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.HERO);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const handleStart = () => {
    setStep(AppStep.UPLOAD);
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

  const navigateTo = (newStep: AppStep) => {
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo(AppStep.HERO)}>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                Advoca<span className="text-primary">Med</span>.ai
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigateTo(AppStep.CONTACT)} className="text-gray-500 hover:text-gray-900 text-sm font-medium">
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

        {step === AppStep.PRIVACY && <PrivacyPolicy />}
        {step === AppStep.CONTACT && <ContactUs />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-6 mb-4">
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
  );
};

export default App;
