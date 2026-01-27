import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { hospitals } from '../data/hospitals';
import { blogPosts } from '../data/blogPosts';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const hospitalData = hospitals.find(h => h.slug === slug);

  // Handle case where hospital is not found
  if (!hospitalData) {
    return (
      <>
         <SEO 
            title="Hospital Policy Database Search | AdvocaMed" 
            description="Search our database of hospital financial assistance policies."
         />
         <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-background-light dark:bg-background-dark py-16">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-border-light dark:border-border-dark max-w-md">
                <span className="text-4xl mb-4 block">🏥</span>
                <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Hospital Not Found</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
                    We couldn't find a dedicated policy page for <strong>"{slug}"</strong>. 
                    However, federal laws apply to almost all US hospitals.
                </p>
                <div className="flex flex-col gap-3">
                    <Link to="/?step=HERO" className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 rounded-xl transition-colors">
                        Scan Bill Instead
                    </Link>
                    <Link to="/hospitals" className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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

  // SEO: Select relevant blog posts for internal linking
  const relatedPosts = blogPosts.filter(p => 
    p.id.includes('charity') || p.id.includes('negotiation') || p.id.includes('dispute')
  ).slice(0, 3);

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
      
      <div className="bg-background-light dark:bg-background-dark min-h-screen animate-fade-in-up font-display">
        {/* Breadcrumb Visual Navigation */}
        <div className="bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-3 px-4 text-[10px] md:text-xs">
            <div className="max-w-4xl mx-auto text-text-secondary-light dark:text-text-secondary-dark flex items-center">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/hospitals" className="hover:text-primary">Hospitals</Link>
                <span className="mx-2">/</span>
                <span className="text-text-main-light dark:text-text-main-dark font-medium truncate">{hospitalName}</span>
            </div>
        </div>

        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-surface-dark dark:to-background-dark py-12 md:py-16 border-b border-border-light dark:border-border-dark">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold mb-4 uppercase tracking-widest">
                    Verified {currentYear} Policy Data 🛡️
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-text-main-light dark:text-text-main-dark mb-6 leading-tight">
                    {hospitalName}<br />
                    <span className="text-primary">Financial Assistance Guide</span>
                </h1>
                
                <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark mb-8 text-lg">
                    Do not ignore your bill. Learn how to apply for <strong>100% forgiveness</strong> if your income is under the {fplThreshold}% FPL limit at {hospitalName}.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    {/* PDF Download Button */}
                    {hospitalData?.application_url && (
                      <a href={hospitalData.application_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white text-base font-bold rounded-xl hover:bg-red-700 transition-all shadow-xl active:scale-95 group w-full sm:w-auto">
                         <span className="material-symbols-outlined mr-2">download</span>
                        Download Application PDF
                      </a>
                    )}
                    
                    {/* Official Site Button */}
                    {hospitalData?.financial_aid_url && (
                      <a href={hospitalData.financial_aid_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 group w-full sm:w-auto">
                        Official Website
                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                      </a>
                    )}
                    
                     <Link to="/?step=HERO" className="inline-flex items-center justify-center px-8 py-4 border border-border-light dark:border-border-dark text-base font-medium rounded-xl text-text-main-light dark:text-text-main-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm w-full sm:w-auto">
                        Analyze My Bill with AI
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
            
            {/* Quick Stats Grid */}
            <div className="bg-white dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm mb-12">
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-tighter">Policy Snapshot</span>
                    <span className="text-xs text-primary font-mono truncate ml-4">{policySource}</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold mb-1">Max Income for Discount</p>
                        <p className="text-3xl font-black text-text-main-light dark:text-text-main-dark">{fplThreshold}% FPL</p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                            Households earning less than {fplThreshold}% of the Federal Poverty Level likely qualify for a 100% write-off or significant discount.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold mb-1">Application Deadline</p>
                        <p className="text-3xl font-black text-text-main-light dark:text-text-main-dark">{deadline} Days</p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                            You have up to {deadline} days from the first billing statement to apply. Collections must pause during the application process.
                        </p>
                    </div>
                </div>
            </div>

            {/* Educational Content */}
            <article className="prose prose-lg prose-indigo text-text-secondary-light dark:text-text-secondary-dark mx-auto">
                <h2 className="text-text-main-light dark:text-text-main-dark font-bold">How to Negotiate Your Bill at {hospitalName}</h2>
                <p>
                    Receiving a large bill from <strong>{hospitalName}</strong> can be overwhelming. However, as a patient in {state}, you have specific rights. Most importantly, never pay the "sticker price" without checking for errors or aid eligibility.
                </p>
                <p>
                    Hospitals often use "Chargemaster" rates which are highly inflated. Insurance companies never pay these rates, and neither should you. Here is a proven strategy to lower your balance:
                </p>

                <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-8">1. Request an Itemized Statement</h3>
                <p>
                    The summary bill you received in the mail often hides errors. Call {hospitalName}'s billing department and ask for an <strong>"Itemized Statement with CPT Codes"</strong>. This document lists every pill, glove, and minute of service.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Check for <strong>duplicate charges</strong> (e.g., being billed twice for the same test).</li>
                    <li>Look for <strong>services you didn't receive</strong>.</li>
                    <li>Use the AdvocaMed AI scanner to detect "Upcoding" (billing for a higher severity level than documented).</li>
                </ul>

                <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-8">2. Check Your Charity Care Eligibility</h3>
                <p>
                    {hospitalName} adheres to a Financial Assistance Policy (FAP). Based on our data, if your household income is under <strong>{fplThreshold}% of the Federal Poverty Guidelines</strong>, you may owe nothing.
                </p>
                <p>
                    Even if you have insurance, you can still apply for Charity Care to cover your copays and deductibles. Many patients assume having insurance disqualifies them, but this is a myth.
                </p>

                <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-8">3. The "Lump Sum" Settlement</h3>
                <p>
                    If you do not qualify for Charity Care, you can still negotiate. Hospitals prioritize cash flow. Call the billing department and say:
                </p>
                <blockquote className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 italic text-text-main-light dark:text-text-main-dark my-4">
                    "I am reviewing my bill for account ending in [1234]. I am unable to pay the full $5,000 balance over time. However, I have access to $3,000 today. Would you accept this as payment in full?"
                </blockquote>
                <p>
                    Many hospitals, including {hospitalName}, may accept 20-40% off the total if you pay immediately, rather than risking the debt going to a collection agency where they might only get pennies on the dollar.
                </p>

                <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-10">Frequently Asked Questions</h2>
                
                <div className="space-y-6 mt-6 not-prose">
                    <div className="bg-white dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark">
                        <h4 className="font-bold text-text-main-light dark:text-text-main-dark">Can {hospitalName} send me to collections while I apply?</h4>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                            Generally, no. Under IRS Section 501(r) regulations for non-profit hospitals, they must pause "Extraordinary Collection Actions" (ECAs) once a financial assistance application is submitted. Make sure to submit your application via certified mail or get a confirmation number to prove it was received.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-5 rounded-lg border border-border-light dark:border-border-dark">
                        <h4 className="font-bold text-text-main-light dark:text-text-main-dark">What if my application is denied?</h4>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                            You have the right to appeal. Often, denials happen due to missing documents (like a missing pay stub). Read the denial letter carefully, supply the missing information, and resubmit. You can also write a "Letter of Hardship" explaining expenses that don't show up on a tax return, such as high rent or childcare costs in {state}.
                        </p>
                    </div>
                </div>

                {/* Internal Linking Strategy: Connect Hospital Page to Blog Posts */}
                <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark not-prose">
                    <h3 className="text-xl font-bold mb-6 text-text-main-light dark:text-text-main-dark">Related Advocacy Guides</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map(post => (
                            <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark hover:shadow-md transition-all">
                                <span className="text-xs font-bold text-primary uppercase">{post.category}</span>
                                <h4 className="font-bold text-sm mt-1 mb-2 group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">{post.title}</h4>
                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:underline">Read Guide &rarr;</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-12 bg-gray-900 text-white p-8 rounded-2xl text-center not-prose">
                    <h3 className="text-xl font-bold mb-2">Need help analyzing your {hospitalName} bill?</h3>
                    <p className="mb-6 text-gray-300 text-sm">Use our AI to find errors and generate an appeal letter in seconds.</p>
                    <Link to="/?step=HERO" className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-lg font-bold transition-colors w-full sm:w-auto">
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
