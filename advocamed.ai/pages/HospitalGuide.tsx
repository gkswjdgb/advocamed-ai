import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { hospitals } from '../data/hospitals';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const hospitalData = hospitals.find(h => h.slug === slug);

  // QA FIX: Handle case where hospital is not found in the JSON database
  if (!hospitalData) {
    return (
      <>
         <SEO 
            title="Hospital Policy Database Search | AdvocaMed" 
            description="Search our database of hospital financial assistance policies."
         />
         <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50 py-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
                <span className="text-4xl mb-4 block">🏥</span>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Hospital Not Found</h1>
                <p className="text-gray-500 mb-6 text-sm">
                    We couldn't find a dedicated policy page for <strong>"{slug}"</strong>. 
                    However, federal laws apply to almost all US hospitals.
                </p>
                <div className="flex flex-col gap-3">
                    <Link to="/?step=UPLOAD" className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 rounded-xl transition-colors">
                        Scan Bill Instead
                    </Link>
                    <Link to="/hospitals" className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                        Browse Directory
                    </Link>
                </div>
            </div>
         </div>
      </>
    );
  }

  // If found, proceed with normal rendering
  const hospitalName = hospitalData.name;
  const currentYear = new Date().getFullYear();
  const fplThreshold = hospitalData.fpl_limit || 200; // Default fallback
  const deadline = hospitalData.deadline_days || 240;
  const policySource = hospitalData.policy_note || "Standard Federal Guidelines (IRS 501r)";
  const state = hospitalData.state || "your state";
  
  // SEO STRATEGY: High-CTR Titles using "Forgiveness" and "100% Free" keywords
  const seoTitle = `Get 100% Bill Forgiveness at ${hospitalName}: ${currentYear} Income Limits`;
  const seoDescription = `Don't pay your ${hospitalName} bill yet. If you earn less than ${fplThreshold}% of the poverty line, you likely qualify for $0 bills. Check your eligibility instantly.`;

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

  // UPDATED FAQ SCHEMA for Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Does ${hospitalName} offer charity care?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes. ${hospitalName} provides 100% bill forgiveness for patients with a household income up to ${fplThreshold}% of the Federal Poverty Level.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the deadline to apply for financial assistance at ${hospitalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You generally have up to ${deadline} days from the date of the first billing statement to apply for financial assistance. We recommend applying immediately to pause collections.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I apply for financial aid at ${hospitalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You must complete the 501(r) financial assistance application form and submit it with proof of income (pay stubs, tax returns).`
        }
      }
    ]
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

        <div className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold mb-4 uppercase tracking-widest">
                    Verified {currentYear} Policy Data 🛡️
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {hospitalName}<br />
                    <span className="text-primary">Financial Assistance Guide</span>
                </h1>
                
                <p className="max-w-2xl mx-auto text-gray-500 mb-8 text-lg">
                    Do not ignore your bill. Learn how to apply for <strong>100% forgiveness</strong> if your income is under the {fplThreshold}% FPL limit at {hospitalName}.
                </p>

                {/* QA IMPROVEMENT: Show MULTIPLE options if available (PDF AND Website), not just one */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    {/* 1. PDF Download Button (High Value) */}
                    {hospitalData?.application_url && (
                      <a href={hospitalData.application_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white text-base font-bold rounded-xl hover:bg-red-700 transition-all shadow-xl active:scale-95 group w-full sm:w-auto">
                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Download Application PDF
                      </a>
                    )}
                    
                    {/* 2. Official Site Button (Backup & Research) - Now shows even if PDF exists */}
                    {hospitalData?.financial_aid_url && (
                      <a href={hospitalData.financial_aid_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 group w-full sm:w-auto">
                        Official Website
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    )}
                    
                     <Link to="/?step=UPLOAD" className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
                        Analyze My Bill with AI
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
            
            {/* 1. Quick Stats Grid */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-12">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Policy Snapshot</span>
                    <span className="text-xs text-primary font-mono truncate ml-4">{policySource}</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Max Income for Discount</p>
                        <p className="text-3xl font-black text-gray-900">{fplThreshold}% FPL</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Households earning less than {fplThreshold}% of the Federal Poverty Level likely qualify for a 100% write-off or significant discount.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Application Deadline</p>
                        <p className="text-3xl font-black text-gray-900">{deadline} Days</p>
                        <p className="text-sm text-gray-600 mt-2">
                            You have up to {deadline} days from the first billing statement to apply. Collections must pause during the application process.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Educational Content (High Value Text for AdSense) */}
            <article className="prose prose-lg prose-indigo text-gray-600 mx-auto">
                <h2 className="text-gray-900 font-bold">How to Negotiate Your Bill at {hospitalName}</h2>
                <p>
                    Receiving a large bill from <strong>{hospitalName}</strong> can be overwhelming. However, as a patient in {state}, you have specific rights. Most importantly, never pay the "sticker price" without checking for errors or aid eligibility.
                </p>
                <p>
                    Hospitals often use "Chargemaster" rates which are highly inflated. Insurance companies never pay these rates, and neither should you. Here is a proven strategy to lower your balance:
                </p>

                <h3 className="text-gray-800 font-bold mt-8">1. Request an Itemized Statement</h3>
                <p>
                    The summary bill you received in the mail often hides errors. Call {hospitalName}'s billing department and ask for an <strong>"Itemized Statement with CPT Codes"</strong>. This document lists every pill, glove, and minute of service.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Check for <strong>duplicate charges</strong> (e.g., being billed twice for the same test).</li>
                    <li>Look for <strong>services you didn't receive</strong>.</li>
                    <li>Use the AdvocaMed AI scanner to detect "Upcoding" (billing for a higher severity level than documented).</li>
                </ul>

                <h3 className="text-gray-800 font-bold mt-8">2. Check Your Charity Care Eligibility</h3>
                <p>
                    {hospitalName} adheres to a Financial Assistance Policy (FAP). Based on our data, if your household income is under <strong>{fplThreshold}% of the Federal Poverty Guidelines</strong>, you may owe nothing.
                </p>
                <p>
                    Even if you have insurance, you can still apply for Charity Care to cover your copays and deductibles. Many patients assume having insurance disqualifies them, but this is a myth.
                </p>

                <h3 className="text-gray-800 font-bold mt-8">3. The "Lump Sum" Settlement</h3>
                <p>
                    If you do not qualify for Charity Care, you can still negotiate. Hospitals prioritize cash flow. Call the billing department and say:
                </p>
                <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 italic text-gray-800 my-4">
                    "I am reviewing my bill for account ending in [1234]. I am unable to pay the full $5,000 balance over time. However, I have access to $3,000 today. Would you accept this as payment in full?"
                </blockquote>
                <p>
                    Many hospitals, including {hospitalName}, may accept 20-40% off the total if you pay immediately, rather than risking the debt going to a collection agency where they might only get pennies on the dollar.
                </p>

                <h2 className="text-gray-900 font-bold mt-10">Frequently Asked Questions</h2>
                
                <div className="space-y-6 mt-6 not-prose">
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-900">Can {hospitalName} send me to collections while I apply?</h4>
                        <p className="text-sm text-gray-600 mt-2">
                            Generally, no. Under IRS Section 501(r) regulations for non-profit hospitals, they must pause "Extraordinary Collection Actions" (ECAs) once a financial assistance application is submitted. Make sure to submit your application via certified mail or get a confirmation number to prove it was received.
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-900">What if my application is denied?</h4>
                        <p className="text-sm text-gray-600 mt-2">
                            You have the right to appeal. Often, denials happen due to missing documents (like a missing pay stub). Read the denial letter carefully, supply the missing information, and resubmit. You can also write a "Letter of Hardship" explaining expenses that don't show up on a tax return, such as high rent or childcare costs in {state}.
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-gray-900 text-white p-8 rounded-2xl text-center not-prose">
                    <h3 className="text-xl font-bold mb-2">Need help analyzing your {hospitalName} bill?</h3>
                    <p className="mb-6 text-gray-300 text-sm">Use our AI to find errors and generate an appeal letter in seconds.</p>
                    <Link to="/?step=UPLOAD" className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-lg font-bold transition-colors w-full sm:w-auto">
                        Start Free Analysis
                    </Link>
                </div>
            </article>
        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
