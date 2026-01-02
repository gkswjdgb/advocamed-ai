import React from 'react';
import SEO from './SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Privacy Policy & US State Rights"
        description="Privacy Policy for AdvocaMed.ai, including compliance with US State Privacy Laws (CCPA, CPA, VCDPA, and others)."
        canonical="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto p-8 text-gray-800 pt-24 min-h-screen animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-sm text-gray-500">Last Updated: December 28, 2025</p>
        
        <div className="prose prose-indigo max-w-none text-gray-700">
          <p>
            At AdvocaMed.ai, we prioritize your privacy. This policy outlines how we handle data, use cookies, and comply with evolving US State regulations regarding data transparency and consumer rights.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect & AI Processing</h2>
          <p>
            AdvocaMed uses <strong>Google Gemini AI</strong> to analyze medical bills. 
          </p>
          <ul className="list-disc pl-5">
            <li><strong>No Persistent Storage:</strong> Images uploaded for analysis are processed in real-time and are not permanently stored on our servers.</li>
            <li><strong>Data Usage:</strong> By using this tool, you agree to the processing of your documents solely for identifying billing errors.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. Google AdSense & Cookies</h2>
          <p>
            We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.
            You may opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. Analytics</h2>
          <p>
            We use Google Analytics (G-NLMH7ERZZ3) to analyze traffic and improve our service. This data is aggregated and anonymized.
          </p>

          <hr className="my-8 border-gray-200" />

          <h2 className="text-xl font-bold mt-8 mb-4">4. Compliance with US State Privacy Laws</h2>
          <p>
            In accordance with recent legislative updates (2025-2026), we recognize and support the privacy rights of residents in the following states:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-4 text-sm">
            <h4 className="font-bold text-gray-900 mb-2">Effective Dates & Provisions:</h4>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Delaware & Oregon (Effective Nov 17, 2025):</strong> We honor Global Privacy Control (GPC) signals. If a GPC signal is detected, we engage Restricted Data Processing (RDP) mode automatically to limit data use.</li>
                <li><strong>Tennessee & Minnesota (Effective July 1, 2025):</strong> We comply with the Consumer Data Protection Acts of these states.</li>
                <li><strong>Maryland (Effective Oct 1, 2025):</strong> Compliance with the Maryland Online Data Privacy Act.</li>
                <li><strong>Indiana, Kentucky, Rhode Island (Effective Jan 1, 2026):</strong> We are fully compliant with the data transparency and consumer control regulations mandated by these states.</li>
            </ul>
          </div>

          <h3 className="font-bold mt-4">Your Rights</h3>
          <p>Residents of these states, along with CA (CCPA), CO, CT, VA, UT, MT, TX, NJ, IA, NE, and NH, have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Opt-out</strong> of the "sale" or "sharing" of personal data for targeted advertising.</li>
            <li><strong>Access</strong> the personal data we hold about you.</li>
            <li><strong>Delete</strong> your personal data.</li>
            <li><strong>Correct</strong> inaccuracies in your personal data.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Global Privacy Control (GPC) Signal</h2>
          <p>
            AdvocaMed.ai recognizes the <strong>Global Privacy Control (GPC)</strong> signal. If your browser broadcasts a GPC signal, we treat this as a valid request to opt-out of the sale and sharing of personal information for targeted advertising. No further action is required on your part.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you wish to exercise your privacy rights, please contact us via our <a href="/contact-us">Contact Page</a>.
          </p>
        </div>
      </div>
    </>
  );
}
