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
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">Have questions about your medical bill analysis? We're here to help.</p>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg inline-block text-left">
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Email Support:</strong> hello@advocamed.ai
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Mailing Address:</strong><br/>
                    AdvocaMed Legal Compliance Dept.<br/>
                    548 Market St, PMB 72855<br/>
                    San Francisco, CA 94104
                </p>
            </div>
          </div>

          <form action="https://formspree.io/f/xpqzpbrz" method="POST" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                Your email
              </label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                Your message
              </label>
              <textarea 
                name="message" 
                required
                rows={5}
                placeholder="How can we assist you today?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-xl shadow-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
            *We typically respond within 48 business hours.
          </p>
        </div>
      </div>
    </>
  );
}
