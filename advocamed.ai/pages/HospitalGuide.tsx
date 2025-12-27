import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Format slug to readable name (e.g., "mass-general-hospital" -> "Mass General Hospital")
  const hospitalName = slug 
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Hospital';

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEO 
        title={`${hospitalName} Financial Assistance & Billing Dispute Guide`}
        description={`Learn how to apply for charity care at ${hospitalName}, dispute billing errors, and find financial assistance policies under IRS 501(r).`}
        canonical={`/hospital/${slug}`}
      />
      
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4">
                    Updated for {currentYear}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Does <span className="text-primary">{hospitalName}</span> Owe You a Discount?
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Under federal law (IRS 501r), non-profit hospitals like {hospitalName} must provide financial assistance to eligible patients. Our AI analyzes your bill to find hidden discounts.
                </p>
                <div className="flex justify-center">
                    <Link to="/" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-primary hover:bg-primaryHover shadow-lg hover:shadow-xl transition-all">
                        Scan My {hospitalName} Bill
                    </Link>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-4 py-12 prose prose-lg prose-indigo text-gray-600">
            
            <h2 className="text-gray-900">How to Dispute a Bill from {hospitalName}</h2>
            <p>
                Received an unexpectedly high bill from <strong>{hospitalName}</strong>? You are not alone. Medical billing errors occur in nearly 80% of hospital bills. Before paying, you should:
            </p>
            <ul>
                <li><strong>Request an Itemized Bill:</strong> Do not pay the summary. Ask {hospitalName} billing department for a detailed statement with CPT codes.</li>
                <li><strong>Check for Upcoding:</strong> Ensure the service level (e.g., Level 5 Emergency vs. Level 3) matches your actual visit.</li>
                <li><strong>Verify In-Network Status:</strong> Under the No Surprises Act, out-of-network providers at {hospitalName} cannot balance bill you for emergency care.</li>
            </ul>

            <h2 className="text-gray-900">{hospitalName} Financial Assistance Policy (FAP)</h2>
            <p>
                As a hospital operating in the US, {hospitalName} is likely required to offer charity care. Eligibility is typically based on the Federal Poverty Guidelines (FPL).
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 not-prose my-8">
                <h3 className="font-bold text-blue-900 text-lg mb-2">Likely Eligibility Criteria</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center"><span className="mr-2">💰</span> <strong>Full Write-off:</strong> Income &lt; 200% FPL</li>
                    <li className="flex items-center"><span className="mr-2">📉</span> <strong>Partial Discount:</strong> Income 200% - 400% FPL</li>
                    <li className="flex items-center"><span className="mr-2">🏥</span> <strong>Catastrophic:</strong> Bill exceeds 10-25% of annual income</li>
                </ul>
            </div>

            <p>
                Many patients miss out on these discounts because the application process is complex. 
                <strong>AdvocaMed.ai</strong> can automatically detect if you qualify based on the data in your bill image.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center not-prose">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Audit Now</h3>
                <p className="text-gray-500 mb-6">Safe, secure, and free. No account required.</p>
                <Link to="/" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Upload {hospitalName} Bill
                </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
