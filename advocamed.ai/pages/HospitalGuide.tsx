
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { hospitals } from '../data/hospitals';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // 1. Find specific hospital data
  const hospitalData = hospitals.find(h => h.slug === slug);

  // 2. Fallback Logic
  const hospitalName = hospitalData 
    ? hospitalData.name 
    : slug 
      ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Hospital';

  const currentYear = new Date().getFullYear();
  const fplThreshold = hospitalData ? hospitalData.fpl_limit : 400;
  const deadline = hospitalData ? hospitalData.deadline_days : 240;

  return (
    <>
      <SEO 
        title={`${hospitalName} Financial Assistance & Billing Dispute Guide (${currentYear})`}
        description={`Learn how to apply for charity care at ${hospitalName}, dispute billing errors, and find financial assistance policies under IRS 501(r). Income limit: ${fplThreshold}% FPL.`}
        canonical={`/hospital/${slug}`}
      />
      
      <div className="bg-white min-h-screen animate-fade-in-up">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4 uppercase tracking-wider">
                    {hospitalData ? 'Verified Policy ✅' : 'IRS 501(r) Compliance Guide'}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Does <span className="text-primary">{hospitalName}</span> Owe You a Discount?
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    {hospitalData 
                        ? `According to their policy, ${hospitalName} offers financial assistance for households earning up to ${hospitalData.fpl_limit}% of the Federal Poverty Level.`
                        : `Under federal law (IRS 501r), non-profit hospitals like ${hospitalName} must provide financial assistance to eligible patients.`
                    }
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/?step=UPLOAD" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-primary hover:bg-primaryHover shadow-lg hover:shadow-xl transition-all">
                        Scan My {hospitalName} Bill
                    </Link>
                    {hospitalData?.financial_aid_url && (
                         <a href={hospitalData.financial_aid_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all">
                             Official Policy ↗
                         </a>
                    )}
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-4 py-12 prose prose-lg prose-indigo text-gray-600">
            
            <h2 className="text-gray-900">{hospitalName} Financial Assistance Policy</h2>
            <p>
                As a healthcare provider in the US, <strong>{hospitalName}</strong> maintains a Financial Assistance Policy (FAP). 
                {hospitalData?.policy_summary ? ` Specifically: ${hospitalData.policy_summary}` : ' This policy is mandated by IRS section 501(r).'}
            </p>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 not-prose my-8 shadow-sm">
                <h3 className="font-bold text-green-900 text-lg mb-3">Charity Eligibility Criteria ({currentYear})</h3>
                <ul className="space-y-3 text-sm text-green-800">
                    <li className="flex items-center">
                        <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs">1</span> 
                        <strong>Full Write-off (Free Care):</strong> Income up to {fplThreshold}% FPL
                    </li>
                    <li className="flex items-center">
                        <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs">2</span> 
                        <strong>Application Deadline:</strong> {deadline} days from the first billing statement.
                    </li>
                    <li className="flex items-center">
                        <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs">3</span> 
                        <strong>Asset Check:</strong> Some hospitals may check liquid assets, but many ignore retirement accounts.
                    </li>
                </ul>
            </div>

            <h2 className="text-gray-900">How to Dispute a Bill from {hospitalName}</h2>
            <p>
                Before paying the full amount to {hospitalName}, take these steps:
            </p>
            <ul>
                <li><strong>Ask for CPT Codes:</strong> Request an itemized statement listing all procedural codes.</li>
                <li><strong>Analyze Upcoding:</strong> Check if simple services were billed as complex ones.</li>
                <li><strong>No Surprises Act:</strong> Verify you weren't billed for out-of-network services at this facility.</li>
            </ul>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center not-prose">
                <div className="bg-secondary rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="text-2xl font-bold mb-2">Let AI Audit Your {hospitalName} Bill</h3>
                    <p className="text-gray-400 mb-6">We check for coding errors and 501(r) eligibility automatically.</p>
                    <Link to="/?step=UPLOAD" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primaryHover transition-colors w-full sm:w-auto">
                        Start Free Analysis
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
