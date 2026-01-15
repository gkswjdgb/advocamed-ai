import React from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import { Helmet } from 'react-helmet-async';

export const SEOContent: React.FC = () => {
    const currentYear = new Date().getFullYear();

    // GEO Strategy: Feed specific Q&A to AI engines
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does AdvocaMed find billing errors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AdvocaMed uses AI to cross-reference your bill's CPT codes against national Medicare guidelines and identifying upcoding (charging for a higher level of service) or unbundling errors automatically."
          }
        },
        {
          "@type": "Question",
          "name": "Can I negotiate a hospital bill after insurance pays?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Even after insurance, you can negotiate your 'patient responsibility' portion. Hospitals often accept 20-40% less if you offer a one-time lump sum payment."
          }
        },
        {
          "@type": "Question",
          "name": "What is the income limit for hospital charity care?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under IRS 501(r), most non-profit hospitals must provide free care to patients earning under 200% of the Federal Poverty Level (approx. $30,000 for an individual in 2025)."
          }
        },
        {
          "@type": "Question",
          "name": "Is this tool HIPAA compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AdvocaMed is designed with privacy first. We do not store your medical bills on our servers. The analysis is performed instantly, and the data is discarded immediately after processing."
          }
        }
      ]
    };

    return (
        <section id="seo-content" className="bg-white py-16 border-t border-gray-100">
            {/* Inject FAQ Schema for SEO/GEO */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-red text-gray-600">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Complete Guide to Medical Bill Advocacy
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        The US healthcare system is complex. AdvocaMed empowers you with the data you need to fight back against unfair charges.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                    {/* Article 1 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            The "Chargemaster" Problem
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Hospitals have a list of prices for every procedure called a "Chargemaster". These prices are often 3-5 times higher than what Medicare or insurance companies actually pay. If you are uninsured or out-of-network, you are often billed these inflated rates. AdvocaMed helps you identify the "Fair Market Price" so you can negotiate a realistic settlement.
                        </p>
                    </div>

                    {/* Article 2 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Federal Protections: No Surprises Act
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Effective from 2022, the <strong>No Surprises Act</strong> protects patients from receiving surprise medical bills from out-of-network providers at in-network facilities. If you go to an in-network hospital for surgery, the anesthesiologist cannot secretly bill you at an out-of-network rate. Our tool scans for these potential violations.
                        </p>
                    </div>

                    {/* Article 3 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            How Charity Care (IRS 501r) Works
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Under <strong>IRS Section 501(r)</strong>, non-profit hospitals in the US must provide financial assistance policies (FAPs). If your income is below a certain percentage of the Federal Poverty Level (FPL), typically 200%-400%, you may be legally entitled to a reduced bill or complete forgiveness, regardless of insurance status.
                        </p>
                    </div>

                    {/* Article 4 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Common Medical Billing Errors
                        </h3>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Upcoding:</strong> Being billed for a more expensive service than what was performed (e.g., Level 5 ER visit for a sore throat).</li>
                            <li><strong>Unbundling:</strong> Separating charges that should be billed together under one code (e.g., surgical tray) to increase cost.</li>
                            <li><strong>Duplicate Billing:</strong> Being charged twice for the same medication or procedure due to clerical error.</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-12 border-gray-200" />

                {/* FAQ Section Display (Visible to User) */}
                <div className="bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        {faqSchema.mainEntity.map((faq, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.name}</h4>
                                <p className="text-gray-600 text-sm">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* pSEO Internal Links - Condensed for cleaner UI */}
                <div className="mt-16 pt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Financial Aid by Hospital</h3>
                    <p className="text-center text-sm text-gray-500 mb-6">Browse our directory of 5,000+ US hospitals to find specific charity care policies.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {hospitals.slice(0, 15).map((hospital) => (
                            <Link 
                                key={hospital.slug} 
                                to={`/hospital/${hospital.slug}`}
                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors no-underline"
                            >
                                {hospital.name}
                            </Link>
                        ))}
                        <Link to="/hospitals" className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-200 no-underline">
                            View All Hospitals &rarr;
                        </Link>
                    </div>
                </div>

                <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white not-prose">
                    <h3 className="text-2xl font-bold mb-4">Start Your Savings Journey</h3>
                    <p className="mb-6 text-gray-300">
                        Don't let medical debt ruin your financial future. Use our free AI auditor today.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100"
                    >
                        Start Free Analysis
                    </button>
                </div>
            </div>
        </section>
    );
};
