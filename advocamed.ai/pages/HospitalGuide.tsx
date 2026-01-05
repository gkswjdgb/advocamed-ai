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
  const locationString = state ? `${city}, ${state}` : city;

  const seoTitle = `${hospitalName} Charity Care Application | ${locationString} Financial Assistance`;
  const seoDescription = `Apply for financial assistance at ${hospitalName} in ${locationString}. Learn about medical bill forgiveness options, check ${currentYear} income limits (${fplThreshold}% FPL), and find the charity care application.`;

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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
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
                    Official Guide ✅
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Financial Aid at <span className="text-primary">{hospitalName}</span>
                </h1>
                
                {/* Action Buttons: Unified Official Site Button */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    {hospitalData?.financial_aid_url && (
                      <a href={hospitalData.financial_aid_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95 group">
                        🌐 Visit Official Policy Site
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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
            <h2 className="text-gray-900">Charity Care Eligibility Criteria</h2>
            
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
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Application Window</p>
                        <p className="text-2xl font-black text-gray-900">{deadline} Days</p>
                        <p className="text-xs text-gray-500 mt-1">From the date of your first bill.</p>
                    </div>
                </div>
            </div>

            <h2 className="text-gray-900">How to Lower Your {hospitalName} Bill</h2>
            <p>
                As a non-profit facility, {hospitalName} is required under federal law (IRS Section 501(r)) to provide financial assistance to patients who meet income guidelines.
            </p>
            <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Visit the Official Website</h4>
                        <p className="text-sm">Click the button above to go directly to {hospitalName}'s financial assistance page. There, you will find the latest version of their application form and instructions.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Request an Itemized Bill</h4>
                        <p className="text-sm">Contact the billing department and ask for an itemized statement with CPT codes. Summary bills often hide errors that can be disputed.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Submit Your Application</h4>
                        <p className="text-sm">Gather your tax returns and pay stubs. Submit your completed application within the {deadline}-day window to ensure your case is reviewed before any collections activity.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
