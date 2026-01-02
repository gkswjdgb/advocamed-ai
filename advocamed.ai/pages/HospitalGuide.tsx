import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async'; // Import Helmet for JSON-LD injection
import { hospitals } from '../data/hospitals';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // 1. Find specific hospital data
  const hospitalData = hospitals.find(h => h.slug === slug);

  // 2. Fallback Logic for Hospital Name
  const hospitalName = hospitalData 
    ? hospitalData.name 
    : slug 
      ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Hospital';

  const currentYear = new Date().getFullYear();
  const fplThreshold = hospitalData ? hospitalData.fpl_limit : 200;
  const deadline = hospitalData ? hospitalData.deadline_days : 240;
  const policySource = hospitalData?.policy_note || "Standard Federal Guidelines (IRS 501r)";
  const city = hospitalData?.city || "US";
  const state = hospitalData?.state || "";
  const locationString = state ? `${city}, ${state}` : city;

  // Dynamic SEO Title & Description with targeted keywords
  const seoTitle = `${hospitalName} Charity Care Application | ${locationString} Financial Aid`;
  const seoDescription = `Apply for charity care at ${hospitalName} in ${locationString}. Learn how to get medical bill forgiveness, check ${currentYear} income limits (${fplThreshold}% FPL), and find the financial aid application.`;

  // 3. Breadcrumb Structured Data (New SEO Feature)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.advocamed.com"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Hospital Directory",
      "item": "https://www.advocamed.com/hospitals"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": hospitalName,
      "item": `https://www.advocamed.com/hospital/${slug}`
    }]
  };

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`/hospital/${slug}`}
      />
      {/* Inject Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="bg-white min-h-screen animate-fade-in-up">
        {/* Breadcrumb Visual Navigation */}
        <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
            <div className="max-w-4xl mx-auto text-xs text-gray-500 flex items-center">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/hospitals" className="hover:text-primary">Hospitals</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{hospitalName}</span>
            </div>
        </div>

        {/* Header Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold mb-4 uppercase tracking-widest">
                    {hospitalData?.policy_note?.includes('National') ? 'Verified Policy ✅' : 'Public Database Record'}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Financial Aid at <span className="text-primary">{hospitalName}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    {locationString} • Non-profit status compliance guide for {currentYear}.
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
            
            <h2 className="text-gray-900">Charity Care Eligibility Criteria</h2>
            
            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm not-prose my-8">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Policy Benchmark</span>
                    <span className="text-xs text-primary font-mono">{policySource}</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Income Limit (100% Free)</p>
                        <p className="text-2xl font-black text-gray-900">{fplThreshold}% FPL</p>
                        <p className="text-xs text-gray-500 mt-1">Households below this threshold pay $0.</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Application Window</p>
                        <p className="text-2xl font-black text-gray-900">{deadline} Days</p>
                        <p className="text-xs text-gray-500 mt-1">From the date of your first bill.</p>
                    </div>
                </div>
                {hospitalData?.policy_note?.includes('Standard') && (
                    <div className="bg-yellow-50 p-4 border-t border-yellow-100">
                        <p className="text-[10px] text-yellow-800 leading-tight">
                            <strong>⚠️ Verification Recommended:</strong> This location uses our fallback federal compliance model. 
                            Specific income limits for <strong>{hospitalName}</strong> may vary based on local Board of Directors approval.
                        </p>
                    </div>
                )}
            </div>

            <h2 className="text-gray-900">3 Steps to Lower Your {hospitalName} Bill</h2>
            <p>
                Under IRS Section 501(r), {hospitalName} is required to offer financial assistance if you are underinsured or low-income.
            </p>
            <ol>
                <li><strong>Request an Itemized Bill:</strong> Ask the billing office at {locationString} for a list with CPT codes.</li>
                <li><strong>Verify Coding Accuracy:</strong> Check for duplicate charges or "upcoding" where simple services are billed as complex.</li>
                <li><strong>Submit a FAP Application:</strong> Download the Financial Assistance Policy (FAP) and apply before the {deadline}-day deadline.</li>
            </ol>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center not-prose">
                <div className="bg-secondary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                    <h3 className="text-2xl font-bold mb-2">Let AI Audit Your Bill</h3>
                    <p className="text-gray-400 mb-6 text-sm">We'll cross-reference {hospitalName}'s policy with your bill automatically.</p>
                    <Link to="/?step=UPLOAD" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primaryHover transition-transform hover:scale-105">
                        Start Free Analysis Now
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
