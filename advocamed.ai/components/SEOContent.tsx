
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
                        Understanding Your Medical Bill Rights
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Knowledge is power. Learn how the US healthcare billing system works and how to protect your wallet.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                    {/* Article 1 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            What is the No Surprises Act?
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Effective from 2022, the <strong>No Surprises Act</strong> protects patients from receiving surprise medical bills from out-of-network providers at in-network facilities. If you received emergency care, you generally cannot be billed more than your in-network cost-sharing amount. AdvocaMed checks your bill for these violations automatically.
                        </p>
                    </div>

                    {/* Article 2 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            How Charity Care (IRS 501r) Works
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Under <strong>IRS Section 501(r)</strong>, non-profit hospitals in the US must provide financial assistance policies (FAPs). If your income is below a certain percentage of the Federal Poverty Level (FPL), typically 200%-400%, you may be legally entitled to a reduced bill or complete forgiveness, regardless of insurance status.
                        </p>
                    </div>

                    {/* Article 3 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Common Medical Billing Errors in {currentYear}
                        </h3>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Upcoding:</strong> Being billed for a more expensive service than what was performed.</li>
                            <li><strong>Unbundling:</strong> Separating charges that should be billed together under one code to increase cost.</li>
                            <li><strong>Duplicate Billing:</strong> Being charged twice for the same medication or procedure.</li>
                        </ul>
                    </div>

                    {/* Article 4 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Why You Need an Itemized Bill
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Never pay a summary bill that only says "Lab Services" or "Pharmacy". You have the right to request an <strong>itemized statement</strong> (or "superbill") which lists every specific CPT code. This is essential for detecting errors, as summary bills often hide overcharges. AdvocaMed reads these codes to find discrepancies.
                        </p>
                    </div>
                </div>

                {/* FAQ Section Display (Visible to User) */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        {faqSchema.mainEntity.map((faq, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                                <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.name}</h4>
                                <p className="text-gray-600 text-sm">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* pSEO Internal Links */}
                <div className="mt-16 border-t border-gray-100 pt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Hospital Financial Aid Guides</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {hospitals.map((hospital) => (
                            <Link 
                                key={hospital.slug} 
                                to={`/hospital/${hospital.slug}`}
                                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors no-underline"
                            >
                                {hospital.name} Financial Aid
                            </Link>
                        ))}
                        <span className="px-4 py-2 text-sm text-gray-400">and 5,000+ more...</span>
                    </div>
                </div>

                <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to lower your medical expenses?</h3>
                    <p className="mb-6">
                        Our AI analyzes thousands of billing codes and hospital policies instantly.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-gray-800"
                    >
                        Start Free Analysis
                    </button>
                </div>
            </div>
        </section>
    );
};
