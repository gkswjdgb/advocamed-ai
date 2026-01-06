import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { hospitals } from '../data/hospitals';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const hospitalData = hospitals.find(h => h.slug === slug);

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
  
  // SEO STRATEGY: Target "Eligibility", "Income Limit", "Bill Forgiveness" - No fake PDF/Phone promises
  const seoTitle = `${hospitalName} Financial Assistance & Charity Care Eligibility (${currentYear})`;
  const seoDescription = `Check if you qualify for bill forgiveness at ${hospitalName}. View ${currentYear} income limits (${fplThreshold}% FPL) and apply for financial aid to lower your medical bill.`;

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

  // FAQ Schema: Purely informational, no fake contact info
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `What is the income limit for charity care at ${hospitalName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Patients with a household income up to ${fplThreshold}% of the Federal Poverty Level typically qualify for free or discounted care at ${hospitalName} under their ${policySource}.`
      }
    }, {
      "@type": "Question",
      "name": `How many days do I have to apply for financial aid at ${hospitalName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Under federal regulations for non-profit hospitals, you generally have up to ${deadline} days from the date of your first billing statement to submit a financial assistance application.`
      }
    }, {
      "@type": "Question",
      "name": `Does ${hospitalName} forgive medical bills?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ${hospitalName} is required to have a Financial Assistance Policy (FAP). Eligible low-income patients can receive full or partial bill forgiveness.`
      }
    }]
  };

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`/hospital/${slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="bg-white min-h-screen animate-fade-in-up">
        {/* Breadcrumb Visual Navigation */}
        <div className="bg-gray-50 border-b border-gray-100 py-3 px-4 text-[10px] md:text-xs">
            <div className="max-w-4xl mx-auto text-gray-500 flex items-center">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/hospitals" className="hover:text-primary">Hospitals</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium truncate">{hospitalName}</span>
            </div>
        </div>

        <div className="bg-gradient-to-b from-blue-50 to-white py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold mb-4 uppercase tracking-widest">
                    Official {currentYear} Guide ✅
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {hospitalName}<br />
                    <span className="text-primary">Financial Assistance Program</span>
                </h1>
                
                {/* Action Buttons: Link to Official Site Only */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    {hospitalData?.financial_aid_url && (
                      <a href={hospitalData.financial_aid_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95 group">
                        🔗 Visit Official Financial Aid Page
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/?step=UPLOAD" className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
                        Analyze My {hospitalName} Bill with AI
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12 prose prose-lg prose-indigo text-gray-600">
            <h2 className="text-gray-900">Charity Care Income Limits ({currentYear})</h2>
            <p>
                To qualify for bill forgiveness at {hospitalName}, your household income must typically fall below the following thresholds based on the <strong>{fplThreshold}% Federal Poverty Level (FPL)</strong> guideline.
            </p>
            
            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm not-prose my-8">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Policy Benchmark</span>
                    <span className="text-xs text-primary font-mono truncate ml-4">{policySource}</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Income Limit (100% Free)</p>
                        <p className="text-2xl font-black text-gray-900">{fplThreshold}% FPL</p>
                        <p className="text-xs text-gray-500 mt-1">Households below this threshold pay $0.</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Application Deadline</p>
                        <p className="text-2xl font-black text-gray-900">{deadline} Days</p>
                        <p className="text-xs text-gray-500 mt-1">From the date of your first post-discharge bill.</p>
                    </div>
                </div>
            </div>

            <h2 className="text-gray-900">Step-by-Step Application Process</h2>
            <p>
                As a non-profit facility, {hospitalName} is required under federal law (IRS Section 501(r)) to provide financial assistance. Follow these steps to stop collections and lower your bill.
            </p>
            <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Find the Policy</h4>
                        <p className="text-sm">Click the button above to visit the official {hospitalName} financial assistance page. Look for terms like "FAP Application" or "Plain Language Summary".</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Gather Proof of Income</h4>
                        <p className="text-sm">You will need your most recent tax return (Form 1040), last 3 months of pay stubs, or a Social Security award letter.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Submit Application</h4>
                        <p className="text-sm">Submit your completed application to the billing department address listed on the form. Always keep a copy for your records.</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Need help with codes?</h3>
                <p className="text-sm text-blue-800 mb-4">
                    If your application is denied or you suspect billing errors (upcoding), use our AI tool to audit your itemized bill.
                </p>
                <Link to="/?step=UPLOAD" className="text-sm font-bold text-blue-600 hover:underline">
                    Scan Bill for Errors &rarr;
                </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
