import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: December 27, 2025</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">AdvocaMed uses AI (Gemini 1.5 Flash) to analyze medical bills. We do not store your medical records or uploaded images on our servers. Analysis is performed in real-time and discarded immediately after.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Google AdSense & Cookies</h2>
      <p className="mb-4">We use Google AdSense to serve ads. Google uses cookies to serve ads based on your prior visits to our website or other websites.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Google Analytics</h2>
      <p className="mb-4">We use Google Analytics (G-NLMH7ERZZ3) to analyze traffic. This helps us improve our service for patients across the US.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. AI Analysis</h2>
      <p className="mb-4">Your data is processed via Google Gemini API. By using this tool, you agree to our processing of documents for the purpose of identifying billing errors.</p>
    </div>
  );
}
