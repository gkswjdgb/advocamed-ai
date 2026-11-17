import React from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import { Helmet } from 'react-helmet-async';

// Priority Search Console Hospitals (Rank 8-11 -> Top 3 Internal Link Boost)
const TOP_SEARCHED_SLUGS = [
  'emory-healthcare',
  'nyu-langone-health',
  'northwestern-medicine',
  'johns-hopkins-medicine',
  'new-york-presbyterian',
  'mass-general-brigham',
  'vanderbilt-university-medical-center',
  'ucla-health',
  'cleveland-clinic',
  'piedmont-atlanta-hospital',
  'penn-medicine',
  'duke-university-health-system',
  'mayo-clinic',
  'osu-wexner-medical-center',
  'mount-sinai-health-system',
  'upmc-presbyterian',
  'stanford-health-care',
  'kaiser-permanente',
  'ucsf-health',
  'houston-methodist'
];

export const SEOContent: React.FC = () => {
  const priorityHospitals = TOP_SEARCHED_SLUGS
    .map(slug => hospitals.find(h => h.slug === slug))
    .filter(Boolean) as typeof hospitals;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AdvocaMed find medical billing errors without storing my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AdvocaMed uses stateless, in-memory AI processing to cross-reference your bill's 5-digit CPT and HCPCS codes against the national CMS Medicare Physician Fee Schedule. Your bill is encrypted via TLS 1.3 and permanently deleted from volatile memory immediately after analysis—we require no login and store 0 bytes on disk."
        }
      },
      {
        "@type": "Question",
        "name": "What is EHC, NYP, MGB, or JHM Financial Assistance (Charity Care)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hospitals often print health system billing acronyms on statements—such as EHC (Emory Healthcare), NYP (NewYork-Presbyterian), MGB (Mass General Brigham), UPHS (Penn Medicine), and JHM (Johns Hopkins Medicine). Under IRS Section 501(r), these non-profit systems must provide 100% Charity Care waivers to qualifying households earning between 200% and 400%+ of the Federal Poverty Level."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use Hospital Guest Pay or MyChart before checking Charity Care?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Before paying online via MyChart Guest Pay, always check your hospital's IRS Section 501(r) income threshold first. Once you pay by credit card, obtaining a retroactive refund is extremely difficult. You have at least 240 days from your first billing statement to submit a Financial Assistance Application."
        }
      },
      {
        "@type": "Question",
        "name": "Can I negotiate a hospital bill after health insurance pays?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Even if you have health insurance, you can apply for hospital Financial Assistance to waive your remaining deductible, coinsurance, or out-of-pocket balance, or offer a lump-sum settlement aligned with Medicare allowed amounts."
        }
      }
    ]
  };

  return (
    <section id="seo-content" className="bg-white dark:bg-surface-dark py-16 border-t border-border-light dark:border-border-dark mt-12">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            IRS Section 501(r) &amp; CMS Billing Knowledge Base
          </span>
          <h2 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl mt-2">
            Complete Guide to Medical Bill Relief &amp; Hospital Charity Care
          </h2>
          <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Understand federal hospital billing regulations, health insurance deductible waivers, and how to audit chargemaster markups before paying online.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12 text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
          <div className="prose dark:prose-invert">
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">warning</span>
              The Hospital &ldquo;Chargemaster&rdquo; &amp; Deductible Trap
            </h3>
            <p className="text-sm">
              US hospitals maintain internal master price lists (&ldquo;Chargemasters&rdquo;) that bill patients <strong>300% to 600% more</strong> than CMS Medicare or commercial health insurance allowed rates. Patients who are uninsured or facing high-deductible health plans (HDHPs) are routinely billed these inflated rates unless they demand an itemized CPT audit.
            </p>
          </div>

          <div className="prose dark:prose-invert">
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gavel</span>
              Federal Protections: IRS 501(r) &amp; No Surprises Act
            </h3>
            <p className="text-sm">
              Under <strong>IRS Section 501(r)</strong>, tax-exempt non-profit hospitals must maintain a written Financial Assistance Policy (FAP), give patients <strong>240 days</strong> from the first bill to apply, and freeze collection agency reporting while reviewing an application. Additionally, the <strong>No Surprises Act</strong> bans out-of-network balance billing for emergency services.
            </p>
          </div>
        </div>

        <div className="my-14 border-t border-border-light dark:border-border-dark"></div>

        {/* High-Authority Internal Link Hub for Top 20 Search Console Hospitals */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              2026 Verified Policy Guides
            </span>
            <h3 className="text-2xl font-extrabold text-text-main-light dark:text-text-main-dark mt-1">
              Most Searched Hospital Financial Assistance &amp; Charity Care Policies
            </h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 max-w-2xl mx-auto">
              Select your health system below to use our 10-second FPL forgiveness calculator, download the official 2026 Financial Assistance PDF, and get the direct billing aid phone number.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {priorityHospitals.map((hospital) => (
              <Link 
                key={hospital.slug} 
                to={`/hospital/${hospital.slug}`}
                className="p-3.5 bg-gray-50 dark:bg-gray-800/50 border border-border-light dark:border-border-dark rounded-xl hover:bg-primary/5 hover:border-primary/40 transition-all flex flex-col justify-between no-underline group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-surface-dark text-primary border border-primary/20">
                    {hospital.acronym || hospital.state}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    &le; {hospital.fpl_limit}% FPL Free
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                  {hospital.name} Charity Care
                </span>
                <span className="text-[11px] text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {hospital.city}, {hospital.state} • {hospital.phone}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/hospitals"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-primary-hover transition-colors shadow-sm no-underline"
            >
              Search All US Hospital Charity Care Policies
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Visible FAQ Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-border-light dark:border-border-dark">
          <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <h4 className="font-bold text-text-main-light dark:text-text-main-dark text-base sm:text-lg mb-2">{faq.name}</h4>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
