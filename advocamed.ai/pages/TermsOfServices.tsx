import React from 'react';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEO 
        title="Terms of Service & Disclaimer"
        description="Terms of Service and Medical Disclaimer for AdvocaMed.ai."
        canonical="/terms"
      />
      <div className="max-w-4xl mx-auto p-8 text-gray-800 pt-24 min-h-screen animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-500">Last Updated: December 28, 2025</p>
        
        <div className="prose prose-indigo max-w-none text-gray-700">
          <h2 className="text-xl font-bold mt-8 mb-4">1. Medical & Legal Disclaimer (Critical)</h2>
          <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-sm mb-6">
            <p className="font-bold text-red-900 mb-2">Not Professional Advice</p>
            <p className="text-red-800">
              AdvocaMed.ai is an informational tool powered by Artificial Intelligence. We are <strong>not</strong> a law firm, medical provider, or insurance agency. 
              The analysis provided by this tool, including potential savings and CPT code interpretations, is for educational purposes only and should not be considered legal or medical advice.
              Always consult with a certified medical coder or patient advocate before making financial decisions.
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Data Privacy & Processing</h2>
          <p>
            We use AI to process images in real-time. We do not permanently store your uploaded medical bills on our servers. However, you acknowledge that no transmission of data over the internet is 100% secure. You agree to use the tool at your own risk.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall AdvocaMed.ai or its owners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AdvocaMed.ai's website.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Governing Law</h2>
          <p>
            Any claim relating to AdvocaMed.ai's website shall be governed by the laws of the State of Delaware without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
