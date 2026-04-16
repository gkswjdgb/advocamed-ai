import React from 'react';
import SEO from '../components/SEO';

export default function ContactUs() {
  return (
    <>
      <SEO 
        title="Contact AdvocaMed"
        description="Get in touch with the AdvocaMed team for support regarding your medical bill analysis."
        canonical="/contact-us"
      />
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-16 px-4">
        <div className="max-w-lg mx-auto bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">Contact Us</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 mb-8">Have questions about your medical bill analysis? We're here to help.</p>
            
            <a 
              href="mailto:hello@advocamed.ai"
              className="inline-flex items-center justify-center w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined mr-2">mail</span>
              Send us an Email
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
            *We typically respond within 48 business hours.
          </p>
        </div>
      </div>
    </>
  );
}
