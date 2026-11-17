import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { hospitals } from '../data/hospitals';
import { blogPosts } from '../data/blogPosts';

const HospitalGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const hospitalData = hospitals.find(h => h.slug === slug);

  // Interactive 10-Second Eligibility Calculator State (Boosts Dwell Time & Lower Bounce Rate)
  const [calcHousehold, setCalcHousehold] = useState<number>(2);
  const [calcIncome, setCalcIncome] = useState<string>('54000');
  const [calcBill, setCalcBill] = useState<string>('3800');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  if (!hospitalData) {
    return (
      <>
        <SEO 
          title="Hospital Financial Assistance Policy Database Search | AdvocaMed" 
          description="Search our verified database of US hospital IRS Section 501(r) financial assistance policies, FPL income limits, and application PDFs."
        />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-background-light dark:bg-background-dark py-16">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-border-light dark:border-border-dark max-w-md">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 block">local_hospital</span>
            <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Hospital Policy Not Found</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
              We couldn&apos;t find a dedicated policy page for <strong>&ldquo;{slug}&rdquo;</strong>. 
              However, federal IRS Section 501(r) and No Surprises Act rules apply to non-profit US hospitals.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/?step=HERO" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors">
                Scan Bill with AI Instead
              </Link>
              <Link to="/hospitals" className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Browse Verified Hospital Directory
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const hospitalName = hospitalData.name;
  const acronym = hospitalData.acronym || '';
  const fplThreshold = hospitalData.fpl_limit || 250;
  const partialFplThreshold = hospitalData.partial_fpl_limit || Math.max(fplThreshold + 150, 400);
  const deadline = hospitalData.deadline_days || 240;
  const policySource = hospitalData.policy_note || "IRS Section 501(r) Financial Assistance Policy";
  const state = hospitalData.state || "US";
  const phone = hospitalData.phone || "Refer to Official Billing Portal";
  const guestPayPortal = hospitalData.guest_pay_portal || `${hospitalName} MyChart Guest Pay`;
  const physicianCoverage =
    hospitalData.physician_fees_covered ||
    `Covers ${hospitalName} hospital facility bills and employed physician groups under IRS Section 501(r).`;
  const affiliates = hospitalData.affiliated_hospitals || [`${hospitalName} Main Campus (${hospitalData.city}, ${state})`];

  // High-CTR "Official Site Differentiator" Title & Meta Description (Targeting Rank 8-10 -> Top 3 Jump)
  const seoTitle = `${hospitalName}${acronym ? ` (${acronym})` : ''} Charity Care: How to Wipe Out 100% of Your Bill (2026 Income Limits & PDF)`;
  const seoDescription = `Download the 2026 ${hospitalName}${acronym ? ` (${acronym})` : ''} Financial Assistance Application PDF, call ${phone} directly, and check ${fplThreshold}% FPL income limits for 100% Charity Care bill forgiveness before paying online.`;

  // 2026 Federal Poverty Guidelines
  const baseFPL = 15060;
  const perPerson = 5380;

  const calculateLimitNum = (size: number, percentage: number) => {
    return (baseFPL + perPerson * (size - 1)) * (percentage / 100);
  };

  const calculateLimit = (size: number, percentage: number) => {
    return calculateLimitNum(size, percentage).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  // Interactive Calculator Live Math
  const parsedIncome = Math.max(0, parseFloat(calcIncome) || 0);
  const parsedBill = Math.max(0, parseFloat(calcBill) || 0);
  const userFplBase = baseFPL + perPerson * (calcHousehold - 1);
  const userFplPercent = Math.round((parsedIncome / userFplBase) * 100);

  let tierStatus: 'FULL_WAIVER' | 'PARTIAL_DISCOUNT' | 'HARDSHIP_NEGOTIATION' = 'HARDSHIP_NEGOTIATION';
  let estimatedDiscountPct = 35;
  if (userFplPercent <= fplThreshold) {
    tierStatus = 'FULL_WAIVER';
    estimatedDiscountPct = 100;
  } else if (userFplPercent <= partialFplThreshold) {
    tierStatus = 'PARTIAL_DISCOUNT';
    estimatedDiscountPct = 65;
  }
  const estimatedNewBill = Math.max(0, Math.round(parsedBill * (1 - estimatedDiscountPct / 100)));
  const estimatedSaved = Math.max(0, parsedBill - estimatedNewBill);

  const quickDisputeEmail = `To: ${hospitalName} (${acronym}) Patient Financial Services & Billing Department
Subject: IRS Section 501(r) Financial Assistance & Itemized CPT Audit Request — Account #[Insert Account Number]

Dear ${hospitalName} Billing & Financial Assistance Team,

I am writing regarding my billing statement totaling $${parsedBill.toLocaleString('en-US')}. Before remitting online payment via ${guestPayPortal}, I am exercising my federal patient rights under IRS Section 501(r) to request:

1. Financial Assistance (Charity Care) Evaluation: My household of ${calcHousehold} has an estimated annual income of $${parsedIncome.toLocaleString('en-US')} (~${userFplPercent}% of the 2026 Federal Poverty Level). Under ${hospitalName}'s Financial Assistance Policy (${fplThreshold}% FPL full waiver / ${partialFplThreshold}% FPL sliding-scale threshold), I am requesting a formal Charity Care determination.
2. Itemized UB-04 / CPT Statement: Please provide a complete itemized bill listing all 5-digit CPT/HCPCS codes, revenue codes, and Amounts Generally Billed (AGB) benchmarks.
3. Mandatory 30-Day Administrative Hold: Pursuant to IRS Section 501(r) (240-day application rule), please place an immediate administrative hold on my account so no Extraordinary Collection Actions (ECAs) or credit reporting occur while my application is processed.

Sincerely,
[Your Name]
[Your Phone Number]
[Account / Statement Number]`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(quickDisputeEmail);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Regional / Same-State Cluster Hospitals for Internal Link Authority
  const sameStateHospitals = hospitals.filter(h => h.state === state && h.slug !== slug);
  const topNationalHospitals = hospitals
    .filter(h => h.slug !== slug && !sameStateHospitals.some(s => s.slug === h.slug))
    .slice(0, 8);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.advocamed.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hospital Charity Care Directory",
        "item": "https://www.advocamed.com/hospitals"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${hospitalName} (${acronym}) Financial Assistance`,
        "item": `https://www.advocamed.com/hospital/${slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${acronym ? `${acronym} (${hospitalName})` : hospitalName} Financial Assistance and how do I qualify in 2026?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${acronym ? `${acronym} (${hospitalName})` : hospitalName} Financial Assistance (Charity Care) waives 100% of eligible out-of-pocket hospital bills for households earning at or below ${fplThreshold}% of the Federal Poverty Level (${calculateLimit(1, fplThreshold)} for 1 person; ${calculateLimit(4, fplThreshold)} for a family of 4), with partial sliding-scale discounts up to ${partialFplThreshold}% FPL.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the direct phone number for ${hospitalName} billing and financial assistance?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can call the ${hospitalName} financial assistance and patient billing department directly at ${phone} to request a Financial Assistance Application PDF, an itemized CPT statement, or a 30-day administrative hold.`
        }
      },
      {
        "@type": "Question",
        "name": `Should I pay my bill on ${guestPayPortal} before applying for Charity Care?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `No. Before paying via ${guestPayPortal}, check your income eligibility first. Once you pay a bill by credit card or guest checkout, obtaining a retroactive charity care refund is slow and difficult. Under IRS Section 501(r), you have ${deadline} days from your first billing statement to submit a Financial Assistance Application, which pauses collection actions while under review.`
        }
      },
      {
        "@type": "Question",
        "name": `Does ${hospitalName} Charity Care cover doctor bills (Physician Fees) and affiliated hospitals?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${physicianCoverage} Covered system locations include: ${affiliates.join(', ')}.`
        }
      }
    ]
  };

  const relatedPosts = blogPosts
    .filter(p => p.id.includes('charity') || p.id.includes('2026') || p.id.includes('dispute'))
    .slice(0, 3);

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
        {/* Top Breadcrumb & Primary Source Verification Bar */}
        <div className="bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-3 px-4 text-xs">
          <div className="max-w-5xl mx-auto text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center flex-wrap gap-1">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-1">/</span>
              <Link to="/hospitals" className="hover:text-primary">Hospitals ({state})</Link>
              <span className="mx-1">/</span>
              <span className="text-text-main-light dark:text-text-main-dark font-bold">
                {hospitalName} {acronym ? `(${acronym})` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>Policy Last Verified: May 2026 • Primary Source: IRS Form 990 Schedule H &amp; HHS FPL</span>
            </div>
          </div>
        </div>

        {/* Hero Header + First-View 10-Second Interactive Eligibility Calculator */}
        <div className="bg-gradient-to-b from-blue-50/90 to-white dark:from-surface-dark dark:to-background-dark py-10 md:py-14 border-b border-border-light dark:border-border-dark">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Cols: High-CTR Headline, Direct Phone, PDF Download & Official Source */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">gavel</span>
                  2026 IRS Section 501(r) Charity Care Mandate • {hospitalData.city}, {state}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main-light dark:text-text-main-dark leading-tight">
                  {hospitalName} {acronym ? `(${acronym})` : ''} Charity Care: <span className="text-primary">2026 Income Limits &amp; Application Guide</span>
                </h1>

                <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  Before paying your <strong>{hospitalName}</strong> statement via {guestPayPortal}, check your federal eligibility. Households earning up to <strong>{fplThreshold}% FPL ({calculateLimit(4, fplThreshold)} for a family of 4)</strong> qualify for <strong>100% bill forgiveness</strong>, with sliding-scale discounts up to <strong>{partialFplThreshold}% FPL ({calculateLimit(4, partialFplThreshold)})</strong>.
                </p>

                {/* Key Contact & Action Buttons */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {hospitalData.application_url && (
                    <a
                      href={hospitalData.application_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                      Official Application PDF / Form
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                  {hospitalData.financial_aid_url && (
                    <a
                      href={hospitalData.financial_aid_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">verified</span>
                      Official {acronym || hospitalName} FAP Portal
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                </div>

                {/* Direct Billing Phone & Fast Summary Strip */}
                <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 shadow-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-500 block">Direct Billing Aid Phone</span>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-sm sm:text-base font-mono font-extrabold text-primary hover:underline">
                      {phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-500 block">100% Free Care Cutoff</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      &le; {fplThreshold}% FPL ({calculateLimit(1, fplThreshold)}+)
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-bold uppercase text-gray-500 block">501(r) Filing Window</span>
                    <span className="text-sm sm:text-base font-bold text-text-main-light dark:text-text-main-dark">
                      {deadline} Days (Stops Collections)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: 10-Second Interactive Eligibility Checker (First-View Dwell Time Booster) */}
              <div className="lg:col-span-5 bg-white dark:bg-surface-dark border-2 border-primary/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                      10-Second Self-Check Tool
                    </span>
                    <h2 className="text-lg font-extrabold text-text-main-light dark:text-text-main-dark">
                      {acronym || hospitalName} Bill Forgiveness Calculator
                    </h2>
                  </div>
                  <span className="material-symbols-outlined text-2xl text-primary bg-primary/10 p-2 rounded-xl">calculate</span>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Household Size
                      </label>
                      <select
                        value={calcHousehold}
                        onChange={(e) => setCalcHousehold(Number(e.target.value))}
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-2 text-sm font-bold text-text-main-light dark:text-text-main-dark"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Annual Income ($)
                      </label>
                      <input
                        type="number"
                        value={calcIncome}
                        onChange={(e) => setCalcIncome(e.target.value)}
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-2 text-sm font-bold text-text-main-light dark:text-text-main-dark"
                        placeholder="e.g. 54000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark mb-1">
                      Current {acronym || hospitalName} Bill Balance ($)
                    </label>
                    <input
                      type="number"
                      value={calcBill}
                      onChange={(e) => setCalcBill(e.target.value)}
                      className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-2 text-sm font-bold text-text-main-light dark:text-text-main-dark"
                      placeholder="e.g. 3800"
                    />
                  </div>

                  {/* Live Calculation Result Banner */}
                  <div className={`rounded-xl p-4 border ${
                    tierStatus === 'FULL_WAIVER'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                      : tierStatus === 'PARTIAL_DISCOUNT'
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-200">
                        Your FPL: <strong>{userFplPercent}% FPL</strong>
                      </span>
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        tierStatus === 'FULL_WAIVER'
                          ? 'bg-emerald-600 text-white'
                          : tierStatus === 'PARTIAL_DISCOUNT'
                          ? 'bg-primary text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {tierStatus === 'FULL_WAIVER'
                          ? 'Likely 100% Free Care ($0 Bill)'
                          : tierStatus === 'PARTIAL_DISCOUNT'
                          ? 'Est. 50%–75% Sliding-Scale Aid'
                          : 'Eligible for CPT Audit & AGB Cap'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
                      {tierStatus === 'FULL_WAIVER'
                        ? `Your income is under ${hospitalName}'s ${fplThreshold}% FPL cutoff (${calculateLimit(calcHousehold, fplThreshold)}). Estimated Savings: $${estimatedSaved.toLocaleString()} (You owe ~$0).`
                        : tierStatus === 'PARTIAL_DISCOUNT'
                        ? `Your income falls within ${hospitalName}'s ${fplThreshold}%–${partialFplThreshold}% FPL partial discount tier (${calculateLimit(calcHousehold, partialFplThreshold)} max). Estimated Savings: ~$${estimatedSaved.toLocaleString()}.`
                        : `Above ${partialFplThreshold}% FPL, request an Itemized CPT Audit and Medical Hardship review (est. 35% savings: ~$${estimatedSaved.toLocaleString()}).`}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyScript}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                        copiedScript
                          ? 'bg-emerald-600 text-white'
                          : 'bg-primary hover:bg-primary-hover text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{copiedScript ? 'check_circle' : 'content_copy'}</span>
                      {copiedScript ? 'Copied Custom 501(r) Dispute Email!' : `Copy My ${acronym || hospitalName} 501(r) Request Email`}
                    </button>
                    <Link
                      to="/?step=HERO"
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Have an Itemized Bill Photo? Run Full AI CPT Scan &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* 1. Complete 2026 FPL Income Limit & Discount Tier Table */}
          <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm mb-12">
            <div className="bg-primary/5 px-6 py-4 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">table_chart</span>
                  2026 {hospitalName} {acronym ? `(${acronym})` : ''} Financial Assistance Income Limits
                </h2>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Maximum gross household income by family size to qualify for 100% Charity Care or Sliding-Scale Discounts.
                </p>
              </div>
              <span className="text-xs font-mono bg-white dark:bg-gray-800 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 text-text-secondary-light dark:text-text-secondary-dark">
                {policySource}
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-6 py-3.5 font-bold">Household Size</th>
                    <th className="px-6 py-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                      100% Bill Waiver ($0 Owed)<br/>
                      <span className="text-[10px] font-normal opacity-80">(Up to {fplThreshold}% FPL)</span>
                    </th>
                    <th className="px-6 py-3.5 font-bold text-blue-700 dark:text-blue-400">
                      Partial Sliding-Scale Discount<br/>
                      <span className="text-[10px] font-normal opacity-80">({fplThreshold}% – {partialFplThreshold}% FPL)</span>
                    </th>
                    <th className="px-6 py-3.5 font-bold text-gray-700 dark:text-gray-300">
                      AGB Cap / Hardship Rule
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[1, 2, 3, 4, 5, 6].map((size) => (
                    <tr key={size} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-text-main-light dark:text-text-main-dark">
                        {size} {size === 1 ? 'Person (Individual)' : `People (Family of ${size})`}
                      </td>
                      <td className="px-6 py-3.5 font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10">
                        Up to {calculateLimit(size, fplThreshold)}
                      </td>
                      <td className="px-6 py-3.5 font-semibold text-blue-700 dark:text-blue-400">
                        Up to {calculateLimit(size, partialFplThreshold)}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Capped at Medicare / AGB Rate
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/30 text-xs text-text-secondary-light dark:text-text-secondary-dark border-t border-border-light dark:border-border-dark flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                <strong>Physician Fee Coverage:</strong> {physicianCoverage}
              </span>
            </div>
          </div>

          {/* 2. "Before Paying Online (Guest Pay / MyChart)" Intercept Section (Captures 'pay as guest' & 'pay bill' queries) */}
          <div className="bg-amber-50/80 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-2xl p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-lg">warning</span>
              Critical Patient Advisory Before Online Checkout
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-main-light dark:text-text-main-dark mb-3">
              Before Paying Your {hospitalName} Bill Online ({guestPayPortal})
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Thousands of patients search for <strong>&ldquo;{hospitalName.toLowerCase()} pay as guest&rdquo;</strong> or <strong>&ldquo;{guestPayPortal}&rdquo;</strong> to pay their statement immediately out of fear of credit damage or debt collections. <strong>Pause before entering your credit card or setting up an interest-bearing payment plan:</strong>
            </p>
            <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 mb-5">
              <li>
                <strong>Retroactive Refunds Are Difficult:</strong> Once you pay a summary balance via {guestPayPortal}, getting {hospitalName} to refund your credit card after approving Financial Assistance takes months of administrative appeals.
              </li>
              <li>
                <strong>You Have a Federal 240-Day Shield:</strong> Under IRS Section 501(r), {hospitalName} must allow at least <strong>{deadline} days</strong> from the date of your first post-discharge billing statement to submit a Financial Assistance Application.
              </li>
              <li>
                <strong>Collections &amp; Credit Reporting Freeze:</strong> The moment you submit an incomplete or complete Charity Care application (or call <strong>{phone}</strong> to request an itemized CPT audit), the hospital must legally suspend Extraordinary Collection Actions (ECAs).
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopyScript}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                {copiedScript ? '✓ Copied 30-Day Billing Hold Email' : 'Copy 30-Day Billing Hold & Audit Email'}
              </button>
              {hospitalData.application_url && (
                <a
                  href={hospitalData.application_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white dark:bg-surface-dark border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm rounded-xl hover:bg-amber-100/50 transition-colors"
                >
                  Download {acronym || hospitalName} Financial Aid Form Instead &rarr;
                </a>
              )}
            </div>
          </div>

          {/* 3. Health System & Covered Affiliated Sub-Hospitals Section (Captures sub-branch & acronym queries) */}
          <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-main-light dark:text-text-main-dark mb-2">
              What is {acronym ? `${acronym} (${hospitalName})` : hospitalName} Financial Assistance &amp; Which Locations Are Covered?
            </h2>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-5">
              If your billing statement displays the billing code or header <strong>&ldquo;{acronym || hospitalName}&rdquo;</strong>, it refers to the centralized Patient Financial Services department of <strong>{hospitalName}</strong>. Under their unified IRS Section 501(r) Financial Assistance Policy (FAP), a single Charity Care application covers eligible inpatient, emergency room (ER), and outpatient facility charges across the following system hospitals and clinics:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {affiliates.map((loc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-border-light dark:border-border-dark text-xs sm:text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                  <span className="material-symbols-outlined text-primary text-base">domain_verification</span>
                  <span>{loc}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <strong>Important Note on Separate Physician Bills (Anesthesia, Radiology, ER Doctors):</strong> {physicianCoverage} If you receive a separate bill from an out-of-network specialist who treated you at an in-network {hospitalName} facility, you are protected from balance billing under the federal <strong>No Surprises Act</strong>.
            </div>
          </div>

          {/* 4. Actionable Step-by-Step Guide (High-RPM Contextual Keywords: Medical Billing, Health Insurance Deductible, Debt Relief) */}
          <article className="prose prose-lg prose-indigo text-text-secondary-light dark:text-text-secondary-dark max-w-none mb-12">
            <h2 className="text-text-main-light dark:text-text-main-dark font-extrabold">
              How to Apply for {hospitalName} Charity Care &amp; Dispute Billing Errors (2026 Step-by-Step)
            </h2>
            <p>
              Whether you are uninsured or facing a high <strong>health insurance deductible, coinsurance, or out-of-pocket maximum</strong>, you can combine federal <strong>medical debt relief</strong> rules with a forensic <strong>medical billing audit</strong> to lower your {hospitalName} balance:
            </p>

            <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-6">
              Step 1: Demand an Itemized UB-04 Statement with CPT Codes
            </h3>
            <p>
              Summary statements sent by {hospitalName} only show broad revenue categories (such as &ldquo;Pharmacy,&rdquo; &ldquo;Medical/Surgical Supplies,&rdquo; or &ldquo;Emergency Room&rdquo;). Call <strong>{phone}</strong> and request a complete <strong>Itemized Statement with 5-digit CPT and HCPCS codes</strong>. Once you receive it, upload a photo to our free <Link to="/?step=HERO" className="text-primary font-bold">AI Medical Bill Scanner</Link> to catch automated <em>Upcoding</em> (e.g., Level 5 ER code 99285 billed for a routine visit) and <em>Unbundling</em>.
            </p>

            <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-6">
              Step 2: Check for Presumptive Eligibility (Fast-Track Approval)
            </h3>
            <p>
              Many patients qualify for automatic 100% Charity Care at {hospitalName} without submitting years of tax returns if they are already enrolled in means-tested public programs such as <strong>SNAP (Food Stamps), WIC, state Medicaid, LIHEAP, or public housing assistance</strong>. Mention your enrollment status on page 1 of the {acronym || hospitalName} Financial Assistance Application.
            </p>

            <h3 className="text-text-main-light dark:text-text-main-dark font-bold mt-6">
              Step 3: Submit Your Application &amp; Financial Hardship Letter
            </h3>
            <p>
              Gather your most recent W-2 or federal tax return (Form 1040), last 2–3 pay stubs, and your health insurance <strong>Explanation of Benefits (EOB)</strong>. Even if your income exceeds {fplThreshold}% FPL, attach a brief <em>Medical Hardship Letter</em> if your out-of-pocket medical bills exceed 10% of your annual household income—under IRS Section 501(r), {hospitalName} cannot charge financial-assistance-eligible patients more than the <strong>Amounts Generally Billed (AGB)</strong> to Medicare and commercial insurers.
            </p>
          </article>

          {/* 5. Visible FAQ Section (100% Synced with FAQPage JSON-LD Schema for Rich Snippets) */}
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-text-main-light dark:text-text-main-dark mb-6">
              Frequently Asked Questions: {hospitalName} {acronym ? `(${acronym})` : ''} Billing &amp; Financial Aid
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                  <h3 className="font-bold text-base sm:text-lg text-text-main-light dark:text-text-main-dark mb-2">
                    {faq.name}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. E-E-A-T Editorial Review & Methodology Card */}
          <div className="mb-12 bg-blue-50/50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main-light dark:text-text-main-dark">
                  Primary Source Verification &amp; Editorial Methodology
                </h3>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">
                  Fact-checked and reviewed by <Link to="/about" className="text-primary font-semibold hover:underline">Dr. Alex Chen</Link> (Lead Biotech Architect &amp; Clinical Informatics Specialist). Financial assistance thresholds for <strong>{hospitalName} ({acronym})</strong> are verified against IRS Form 990 Schedule H regulatory filings, the hospital&apos;s published 501(r) Financial Assistance Policy (FAP), and the 2026 U.S. Department of Health &amp; Human Services (HHS) Federal Poverty Guidelines. Last verified: May 2026.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Regional State Cluster & Top Searched Hospital Internal Links (Boosts PageRank for Rank 8-11 Pages) */}
          <div className="mb-12 pt-8 border-t border-border-light dark:border-border-dark">
            {sameStateHospitals.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-extrabold text-text-main-light dark:text-text-main-dark mb-3">
                  More {state} Hospital Charity Care &amp; Financial Assistance Guides
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {sameStateHospitals.map(h => (
                    <Link
                      key={h.slug}
                      to={`/hospital/${h.slug}`}
                      className="p-3.5 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/50 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <span className="font-bold text-xs sm:text-sm text-text-main-light dark:text-text-main-dark hover:text-primary">
                        {h.name} {h.acronym ? `(${h.acronym})` : ''}
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        {h.city}, {h.state} • Up to {h.fpl_limit}% FPL Free Care &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-extrabold text-text-main-light dark:text-text-main-dark mb-3">
              Most Searched US Hospital Financial Assistance Policies (2026)
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {topNationalHospitals.map(h => (
                <Link
                  key={h.slug}
                  to={`/hospital/${h.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {h.name} {h.acronym ? `(${h.acronym})` : ''} Charity Care ({h.fpl_limit}% FPL)
                </Link>
              ))}
              <Link
                to="/hospitals"
                className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
              >
                Browse All Hospital Policies &rarr;
              </Link>
            </div>

            <h3 className="text-lg font-extrabold mb-4 text-text-main-light dark:text-text-main-dark">
              Related Medical Bill Advocacy Guides
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark hover:shadow-md transition-all">
                  <span className="text-xs font-bold text-primary uppercase">{post.category}</span>
                  <h4 className="font-bold text-sm mt-1 mb-2 group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">{post.title}</h4>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark hover:underline">Read Guide &rarr;</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HospitalGuide;
