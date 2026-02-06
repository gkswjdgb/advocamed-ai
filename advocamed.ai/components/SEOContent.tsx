import React from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import { Helmet } from 'react-helmet-async';

export const SEOContent: React.FC = () => {
    const currentYear = new Date().getFullYear();

    // GEO Strategy: Feed specific Q&A to AI engines & Google Bots
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does AdvocaMed find billing errors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AdvocaMed uses AI to cross-reference your bill's CPT codes against national Medicare guidelines (CMS Physician Fee Schedule), automatically identifying 'Upcoding' (charging for a higher level of service) or 'Unbundling' errors."
          }
        },
        {
          "@type": "Question",
          "name": "Can I negotiate a hospital bill after insurance pays?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Even after insurance, you can negotiate your 'patient responsibility' portion (Co-pay, Deductible). Hospitals often accept 20-40% less if you offer a one-time lump sum payment."
          }
        },
        {
          "@type": "Question",
          "name": "What is the income limit for hospital charity care?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under IRS Section 501(r), non-profit hospitals must provide free care to patients earning under 200% of the Federal Poverty Level (approx. $30,000 for an individual in 2025). Some hospitals extend discounts up to 400% FPL."
          }
        },
        {
          "@type": "Question",
          "name": "Is this tool HIPAA compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AdvocaMed is designed with privacy first. We do not store your medical bills on our servers. The analysis is performed in real-time, and the data is discarded immediately after processing."
          }
        }
      ]
    };

    return (
        <section id="seo-content" className="bg-white dark:bg-surface-dark py-16 border-t border-border-light dark:border-border-dark mt-12">
            {/* Inject FAQ Schema for SEO/GEO */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">Patient Advocacy Knowledge Base</span>
                    <h2 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl mt-2">
                        Complete Guide to Fighting Medical Bills
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                        The US healthcare system is complex by design. This guide explains your federal rights, common billing scams, and how to use our AI tool to save money.
                    </p>
                </div>

                {/* Long-form content to satisfy "High Value Content" requirement */}
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16 text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    
                    {/* Article 1: The Problem */}
                    <div className="prose dark:prose-invert">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">warning</span>
                            The "Chargemaster" Trap
                        </h3>
                        <p className="text-sm">
                            Hospitals maintain a secret list of prices called a "Chargemaster." These prices are often <strong>300% to 500% higher</strong> than what Medicare or private insurance companies actually pay. If you are uninsured, out-of-network, or have a high-deductible plan, you are often billed these inflated sticker prices.
                        </p>
                        <p className="text-sm mt-2">
                            <strong>How We Help:</strong> AdvocaMed calculates the "Fair Market Price" based on CMS data, giving you the leverage to demand the same rates insurance companies get.
                        </p>
                    </div>

                    {/* Article 2: The Law */}
                    <div className="prose dark:prose-invert">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            Federal Protections (No Surprises Act)
                        </h3>
                        <p className="text-sm">
                            Effective January 1, 2022, the <strong>No Surprises Act</strong> protects patients from receiving surprise bills when receiving emergency care, non-emergency care from out-of-network providers at in-network facilities, and air ambulance services.
                        </p>
                        <p className="text-sm mt-2">
                            If you went to an in-network hospital but received a separate bill from an out-of-network anesthesiologist, <strong>do not pay it.</strong> Use our dispute generator to cite federal law.
                        </p>
                    </div>

                    {/* Article 3: Financial Aid */}
                    <div className="prose dark:prose-invert">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                            IRS 501(r) Charity Care
                        </h3>
                        <p className="text-sm">
                            Non-profit hospitals (which make up nearly 60% of US hospitals) <strong>must</strong> provide financial assistance to maintain their tax-exempt status. This is not a suggestion; it is IRS law.
                        </p>
                        <p className="text-sm mt-2">
                            If your household income is under 200% of the Federal Poverty Level (FPL), you likely qualify for <strong>100% bill forgiveness</strong>. Our tool automatically checks your eligibility against the hospital's specific policy 501(r) limits.
                        </p>
                    </div>

                    {/* Article 4: Coding Errors */}
                    <div className="prose dark:prose-invert">
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">code_off</span>
                            Common CPT Code Errors
                        </h3>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Upcoding (CPT 99285 vs 99283):</strong> Billing for a life-threatening emergency (Level 5) when you only had a minor issue (Level 3). This is the most common automated error we find.</li>
                            <li><strong>Unbundling:</strong> Charging separately for items that should be included in the room rate, like surgical kits, gloves, or Tylenol.</li>
                            <li><strong>Duplicate Billing:</strong> Being charged twice for the same test or medication due to clerical error.</li>
                        </ul>
                    </div>
                </div>

                <div className="my-16 border-t border-border-light dark:border-border-dark"></div>

                {/* FAQ Section Display (Visible text for Bots) */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-border-light dark:border-border-dark">
                    <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqSchema.mainEntity.map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                                <h4 className="font-bold text-text-main-light dark:text-text-main-dark text-lg mb-2">{faq.name}</h4>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* pSEO Internal Links - The "Spiderweb" Structure */}
                <div className="mt-16 pt-10">
                    <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-6 text-center">Find Financial Assistance by Hospital</h3>
                    <p className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-2xl mx-auto">
                        We have compiled verified financial aid policies for over 5,000 locations. Click your hospital below to see specific income limits and application deadlines.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {hospitals.slice(0, 20).map((hospital) => (
                            <Link 
                                key={hospital.slug} 
                                to={`/hospital/${hospital.slug}`}
                                className="px-3 py-1.5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors no-underline"
                            >
                                {hospital.name} Financial Aid
                            </Link>
                        ))}
                        <Link to="/hospitals" className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-text-main-light dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-700 no-underline flex items-center gap-1">
                            View All 5,000+ Hospitals <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
