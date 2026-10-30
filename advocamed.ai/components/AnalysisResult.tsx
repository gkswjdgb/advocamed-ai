import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { generateAppealLetter } from '../services/geminiService';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';

interface Props {
  data: AnalysisResult;
  billImage: string | null;
  onReset: () => void;
}

export const AnalysisResultView: React.FC<Props> = ({ data, billImage, onReset }) => {
  const [tone, setTone] = useState<string>('Formal & Firm');
  const [recipient, setRecipient] = useState<string>('billing@hospital.org');
  const [disputeLetter, setDisputeLetter] = useState<string>('Generating tailored dispute & charity care letter...');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  // Try to match the detected hospital name with our verified 501(r) hospital database
  const matchedHospital = React.useMemo(() => {
    if (!data.hospitalName) return null;
    const lower = data.hospitalName.toLowerCase();
    return hospitals.find(
      h =>
        lower.includes(h.name.toLowerCase().split(' ')[0]) ||
        h.name.toLowerCase().includes(lower)
    ) || null;
  }, [data.hospitalName]);

  // Auto-generate letter on mount, data change, or tone change
  React.useEffect(() => {
    let isMounted = true;
    const fetchLetter = async () => {
      setIsGenerating(true);
      const letter = await generateAppealLetter(data, data.userFinancials, tone);
      if (isMounted) {
        setDisputeLetter(letter);
        setIsGenerating(false);
      }
    };
    fetchLetter();
    return () => {
      isMounted = false;
    };
  }, [data, tone]);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const errorCount = data.items.filter(i => i.variance_level !== 'Normal').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(disputeLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const emailSubject = `Formal Billing Audit & IRS 501(r) Financial Assistance Inquiry - ${data.hospitalName || 'Account Review'}`;

  return (
    <div className="flex-1 flex flex-col items-center w-full py-8 px-4 md:px-10 animate-fade-in-up">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        
        {/* Top Banner: Zero Server Storage Guarantee */}
        <div className="w-full bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-start gap-4 z-10 w-full md:w-auto">
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-full shadow-sm text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-800">
              <span className="material-symbols-outlined">shield_lock</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                100% Stateless Privacy • Zero Server Storage
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed max-w-2xl">
                No login required. Your medical bill was analyzed in volatile memory (RAM) only and was <strong>never saved to any database or hard drive</strong>. Closing or refreshing this tab erases this session completely.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-base text-emerald-600">memory</span>
              <span>Server Disk Storage: <strong>0 Bytes</strong></span>
            </div>
            <button 
              onClick={onReset}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg transition-all shadow-sm text-sm font-bold whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">delete_forever</span>
              Clear Session Now
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col gap-6 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <span className="material-symbols-outlined text-sm">analytics</span>
                {data.hospitalName ? `Provider: ${data.hospitalName}` : 'CMS Medicare Benchmark Audit'}
              </div>
              <h1 className="text-text-main-light dark:text-text-main-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Medical Bill Audit &amp; Savings Plan
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal mt-1">
                {data.summary || 'Review detected pricing discrepancies below and send your customized negotiation or Charity Care request email.'}
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('dispute-assistant-box');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Jump to Ready-to-Send Email
            </button>
          </div>
          
          {/* 3 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-green-200 dark:border-green-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-green-500">savings</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Estimated Negotiable Savings</p>
              <p className="text-green-600 dark:text-green-400 tracking-tight text-4xl font-extrabold leading-tight">{formatMoney(data.potentialSavings || 0)}</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                <span>Compared to CMS Medicare benchmarks ({errorCount} flagged items)</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-primary">receipt_long</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Total Billed vs. Fair Target</p>
              <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-3xl font-extrabold leading-tight">
                {formatMoney(data.totalCharged || 0)}
                <span className="text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark block mt-1">
                  Fair Target Estimate: <strong className="text-primary">{formatMoney(Math.max(0, (data.totalCharged || 0) - (data.potentialSavings || 0)))}</strong>
                </span>
              </p>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-red-500">error</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Flagged Line Items</p>
              <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-4xl font-extrabold leading-tight">{errorCount}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                 {data.items.some(i => i.variance_level === 'Very High') && (
                    <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs rounded font-medium">Chargemaster Markup</span>
                 )}
                 {data.charityAnalysis?.likelyEligible && (
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded font-medium">501(r) Charity Care Candidate</span>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Split View: Bill Viewer & Findings */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[540px]">
           {/* Left: Bill Image Viewer */}
           <div className="lg:w-7/12 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden h-[500px] lg:h-auto">
             <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined">receipt_long</span>
                    {billImage ? 'Scanned Statement (Local Browser View Only)' : 'Itemized Line-Item Breakdown'}
                </h3>
                {billImage && (
                  <div className="flex gap-2">
                      <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors" title="Zoom In">
                          <span className="material-symbols-outlined text-lg">zoom_in</span>
                      </button>
                      <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors" title="Zoom Out">
                          <span className="material-symbols-outlined text-lg">zoom_out</span>
                      </button>
                  </div>
                )}
             </div>
             <div className="relative flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
                 {billImage ? (
                    <img 
                        src={billImage} 
                        alt="Scanned Bill" 
                        className="shadow-lg transition-transform duration-200 origin-top-left"
                        style={{ transform: `scale(${zoom})` }}
                    />
                 ) : (
                    <div className="w-full max-w-xl bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                      <h4 className="font-bold text-base text-text-main-light dark:text-text-main-dark mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">fact_check</span>
                        All Audited Line Items ({data.items.length})
                      </h4>
                      <div className="divide-y divide-border-light dark:divide-border-dark text-sm">
                        {data.items.map((item, idx) => (
                          <div key={idx} className="py-3 flex justify-between items-center gap-4">
                            <div>
                              <span className="font-semibold text-text-main-light dark:text-text-main-dark block">{item.description}</span>
                              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-mono">
                                CPT: {item.code && item.code !== 'null' ? item.code : 'Request Itemized Code'} • CMS Fair Est: {item.expectedAmount ? formatMoney(item.expectedAmount) : 'N/A'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-text-main-light dark:text-text-main-dark block">{formatMoney(item.chargedAmount)}</span>
                              <span className={`text-[11px] font-bold ${item.variance_level === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.variance_level === 'Normal' ? 'Fair Rate' : `${item.variance_level} Markup`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}
             </div>
           </div>

           {/* Right: Findings List */}
           <div className="lg:w-5/12 flex flex-col gap-4 overflow-y-auto max-h-[800px]">
              <h3 className="font-bold text-xl dark:text-white px-2">Actionable Audit Findings</h3>
              
              {data.items.map((item, idx) => {
                  if (item.variance_level === 'Normal') return null;
                  
                  const isVeryHigh = item.variance_level === 'Very High';
                  const borderColor = isVeryHigh ? 'border-l-red-500' : 'border-l-orange-500';
                  const textColor = isVeryHigh ? 'text-red-600' : 'text-orange-600';
                  const savings = item.expectedAmount ? item.chargedAmount - item.expectedAmount : 0;

                  return (
                    <div key={idx} className={`bg-white dark:bg-surface-dark p-5 rounded-lg border-l-4 ${borderColor} border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-text-main-light dark:text-text-main-dark pr-2">{item.description}</h4>
                            {savings > 0 && (
                              <span className={`${textColor} text-sm font-bold whitespace-nowrap`}>Save {formatMoney(savings)}</span>
                            )}
                        </div>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                            {item.flag_reason || "Price exceeds national CMS Medicare benchmark standards."}
                        </p>
                        {item.suggested_question && (
                          <div className="bg-gray-50 dark:bg-gray-800/70 p-2.5 rounded text-xs text-gray-700 dark:text-gray-300 mb-3">
                            <strong>Ask Billing:</strong> &ldquo;{item.suggested_question}&rdquo;
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
                            <span>Billed: <strong>{formatMoney(item.chargedAmount)}</strong> vs. Fair Est: <strong>{item.expectedAmount ? formatMoney(item.expectedAmount) : 'N/A'}</strong></span>
                            {item.code && item.code !== 'null' && (
                              <a 
                                  href={`https://www.google.com/search?q=CPT+code+${item.code}+CMS+medicare+fee+schedule`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-primary font-semibold hover:underline"
                              >
                                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                                  <span>Verify CPT {item.code}</span>
                              </a>
                            )}
                        </div>
                    </div>
                  );
              })}

              {data.charityAnalysis?.likelyEligible && (
                  <div className="bg-blue-50/70 dark:bg-blue-950/30 p-5 rounded-lg border-l-4 border-l-primary border border-blue-200 dark:border-blue-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-lg">volunteer_activism</span>
                          IRS 501(r) Charity Care Eligible
                        </h4>
                        <Link to={matchedHospital ? `/hospital/${matchedHospital.slug}` : "/hospitals"} className="text-primary text-xs font-bold hover:underline">
                          {matchedHospital ? `View ${matchedHospital.name} Policy →` : 'Find Hospital Policy →'}
                        </Link>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {data.charityAnalysis.reasoning}
                    </p>
                  </div>
              )}
           </div>
        </div>

        {/* Matched Hospital Policy / 3-Step Patient Action Bar (Replaces Deceptive Loan Ad) */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="material-symbols-outlined text-sm">policy</span>
              {matchedHospital ? `Matched Hospital Policy: ${matchedHospital.name}` : 'IRS Section 501(r) Patient Protection'}
            </span>
            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              {matchedHospital
                ? `${matchedHospital.name} waives bills for households up to ${matchedHospital.fpl_limit}% FPL • Billing Phone: ${matchedHospital.phone}`
                : 'Non-profit US hospitals must give you 240 days to apply for Financial Assistance and pause collections during review.'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Step 1: Send the dispute &amp; itemized CPT request email below. • Step 2: Ask for a 30-day collections hold. • Step 3: Submit the hospital&apos;s Charity Care PDF.
            </p>
          </div>
          <Link
            to={matchedHospital ? `/hospital/${matchedHospital.slug}` : '/hospitals'}
            className="shrink-0 bg-white dark:bg-primary text-primary dark:text-white border border-primary/30 dark:border-transparent px-6 py-3 rounded-xl font-bold text-sm hover:shadow-md transition-all text-center"
          >
            {matchedHospital ? `Open ${matchedHospital.name} Guide` : 'Search Hospital Charity Care Directory'}
          </Link>
        </div>

        {/* Dispute Assistant */}
        <div id="dispute-assistant-box" className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg overflow-hidden flex flex-col md:flex-row scroll-mt-20">
            {/* Control Panel */}
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 p-8 border-b md:border-b-0 md:border-r border-border-light dark:border-border-dark flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <span className="material-symbols-outlined">auto_fix_high</span>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">Negotiation &amp; Dispute Email Generator</h3>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
                        We generated a customized email citing your flagged CPT codes, CMS Medicare benchmarks, and IRS Section 501(r) financial assistance rights. You can edit the text directly before sending.
                    </p>
                    <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark mb-1">
                            Select Email Strategy / Tone
                          </label>
                          <select 
                              value={tone} 
                              onChange={(e) => setTone(e.target.value)}
                              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:border-primary focus:ring-primary dark:text-white p-2.5"
                          >
                              <option value="Formal & Firm">Formal &amp; Firm (CPT Audit + Hold)</option>
                              <option value="Financial Hardship & Charity Care Request">Financial Hardship &amp; 501(r) Charity Care Request</option>
                              <option value="Statutory & Regulatory (501r / No Surprises Act)">Statutory &amp; Regulatory (Cite Federal Law)</option>
                              <option value="Polite Inquiry">Polite Clarification &amp; Lump-Sum Offer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark mb-1">
                            Hospital Billing Email (Optional)
                          </label>
                          <input 
                              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:border-primary focus:ring-primary dark:text-white p-2.5" 
                              type="email" 
                              placeholder="e.g., patientfinancialservices@hospital.org"
                              value={recipient}
                              onChange={(e) => setRecipient(e.target.value)}
                          />
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-2.5">
                    <button 
                        onClick={handleCopy}
                        className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-lg shadow-md transition-all cursor-pointer ${
                          copied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-primary hover:bg-primary-hover text-white'
                        }`}
                    >
                        <span className="material-symbols-outlined">{copied ? 'check_circle' : 'content_copy'}</span>
                        {copied ? 'Copied to Clipboard!' : '1. Copy Email Text'}
                    </button>
                    <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(disputeLetter)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-text-main-light dark:text-text-main-dark border border-gray-300 dark:border-gray-600 font-bold py-3 px-4 rounded-lg transition-colors text-sm"
                    >
                        <span className="material-symbols-outlined text-red-500">mail</span>
                        Open Directly in Gmail (Web)
                    </a>
                    <a 
                        href={`mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(disputeLetter)}`}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary-light dark:text-text-secondary-dark font-semibold py-2.5 px-4 rounded-lg transition-colors text-xs"
                    >
                        <span className="material-symbols-outlined text-base">forward_to_inbox</span>
                        Open in Apple Mail / Outlook App
                    </a>
                </div>
            </div>

            {/* Letter Preview */}
            <div className="md:w-2/3 p-8 flex flex-col h-full min-h-[500px]">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">edit_document</span>
                      Editable Email Draft (Click text below to customize your Account #)
                    </span>
                    <span className="text-xs text-gray-400">Strategy: {tone}</span>
                </div>
                {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-gray-400">
                         <span className="material-symbols-outlined animate-spin text-4xl mb-2 text-primary">refresh</span>
                         <p className="text-sm font-medium">Drafting custom negotiation email ({tone})...</p>
                    </div>
                ) : (
                    <textarea
                        className="font-body text-gray-800 dark:text-gray-200 bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-sm leading-relaxed w-full flex-1 min-h-[380px] p-4 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y"
                        value={disputeLetter}
                        onChange={(e) => setDisputeLetter(e.target.value)}
                    />
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
