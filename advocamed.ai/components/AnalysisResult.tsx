import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { generateAppealLetter } from '../services/geminiService';

interface Props {
  data: AnalysisResult;
  billImage: string | null;
  onReset: () => void;
}

export const AnalysisResultView: React.FC<Props> = ({ data, billImage, onReset }) => {
  const [tone, setTone] = useState<string>('Formal & Firm');
  const [recipient, setRecipient] = useState<string>('billing@hospital.com');
  const [disputeLetter, setDisputeLetter] = useState<string>('Generating preview...');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  // Auto-generate letter on mount or data change
  React.useEffect(() => {
    const fetchLetter = async () => {
        setIsGenerating(true);
        const letter = await generateAppealLetter(data, data.userFinancials);
        setDisputeLetter(letter);
        setIsGenerating(false);
    };
    fetchLetter();
  }, [data]);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const errorCount = data.items.filter(i => i.variance_level !== 'Normal').length;

  return (
    <div className="flex-1 flex flex-col items-center w-full py-8 px-4 md:px-10 animate-fade-in-up">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        
        {/* Top Banner: No Data Stored */}
        <div className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400 dark:bg-slate-500"></div>
          <div className="flex items-start gap-4 z-10 w-full md:w-auto">
            <div className="p-2.5 bg-white dark:bg-slate-700 rounded-full shadow-sm text-slate-700 dark:text-slate-200 shrink-0 border border-slate-100 dark:border-slate-600">
              <span className="material-symbols-outlined">visibility_off</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                No Data Stored
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-xl">
                Your privacy is our priority. We do not store your bills or personal information on our servers.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-base text-amber-500 animate-pulse">timer</span>
              <span>Auto-Destruct: <span className="font-bold text-slate-800 dark:text-slate-200">24:00</span></span>
            </div>
            <button 
                onClick={onReset}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg transition-all shadow-sm hover:shadow text-sm font-bold whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">delete_forever</span>
              Clear All Data & Close
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col gap-8 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-text-main-light dark:text-text-main-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Analysis Results</h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal mt-2">Review your potential savings and take action.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800">
              <span className="material-symbols-outlined text-green-600 text-lg">lock</span>
              <span className="text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wide">HIPAA Compliant & Secure</span>
            </div>
          </div>
          
          {/* 3 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-green-200 dark:border-green-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-green-500">savings</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Potential Savings</p>
              <p className="text-green-600 dark:text-green-400 tracking-tight text-4xl font-extrabold leading-tight">{formatMoney(data.potentialSavings || 0)}</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                <span>Found in {errorCount} items</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-primary">verified</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Confidence Score</p>
              <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-4xl font-extrabold leading-tight">
                {data.confidenceScore ? (data.confidenceScore > 80 ? 'High' : 'Medium') : 'N/A'}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-4">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${data.confidenceScore || 0}%` }}></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-red-500">error</span>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold uppercase tracking-wider">Errors Detected</p>
              <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-4xl font-extrabold leading-tight">{errorCount}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                 {data.items.some(i => i.variance_level === 'Very High') && (
                    <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs rounded font-medium">Overcharge</span>
                 )}
                 {data.items.some(i => i.flag_reason?.toLowerCase().includes('duplicate')) && (
                    <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-xs rounded font-medium">Duplicate</span>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Split View: Bill Viewer & Findings */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[600px]">
           {/* Left: Bill Image Viewer */}
           <div className="lg:w-7/12 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden h-[600px] lg:h-auto">
             <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined">receipt_long</span>
                    Scanned Document
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">zoom_in</span>
                    </button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">zoom_out</span>
                    </button>
                </div>
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
                    <div className="text-gray-400 flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                        <p className="text-xs mt-2">No Image Preview Available</p>
                    </div>
                 )}
             </div>
           </div>

           {/* Right: Findings List */}
           <div className="lg:w-5/12 flex flex-col gap-4 overflow-y-auto max-h-[800px]">
              <h3 className="font-bold text-xl dark:text-white px-2">Analysis Findings</h3>
              
              {data.items.map((item, idx) => {
                  if (item.variance_level === 'Normal') return null; // Only show flagged items in this prioritized view
                  
                  const isVeryHigh = item.variance_level === 'Very High';
                  const borderColor = isVeryHigh ? 'border-l-red-500' : 'border-l-orange-500';
                  const textColor = isVeryHigh ? 'text-red-600' : 'text-orange-600';
                  const savings = item.expectedAmount ? item.chargedAmount - item.expectedAmount : 0;

                  return (
                    <div key={idx} className={`bg-white dark:bg-surface-dark p-5 rounded-lg border-l-4 ${borderColor} border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-text-main-light dark:text-text-main-dark pr-2">{item.description}</h4>
                            <span className={`${textColor} text-sm font-bold whitespace-nowrap`}>Save {formatMoney(savings)}</span>
                        </div>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                            {item.flag_reason || "Price exceeds national average standards."}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            <span>Verify CPT {item.code || 'N/A'}</span>
                        </div>
                    </div>
                  );
              })}

              {data.charityAnalysis?.likelyEligible && (
                  <div className="bg-white dark:bg-surface-dark p-5 rounded-lg border-l-4 border-l-blue-500 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-text-main-light dark:text-text-main-dark">Charity Care Eligible</h4>
                        <span className="text-green-600 text-sm font-bold">Apply Now</span>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                        {data.charityAnalysis.reasoning}
                    </p>
                  </div>
              )}
           </div>
        </div>

        {/* Ad Placeholder */}
        <div className="w-full flex flex-col items-center gap-1 my-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Advertisement</span>
            <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-lg flex items-center justify-between px-6 md:px-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                <div className="flex flex-col z-10">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Sponsored</span>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">0% Interest Medical Loans Approved in Minutes</h4>
                </div>
                <button className="z-10 bg-white dark:bg-blue-600 text-blue-700 dark:text-white border border-blue-200 dark:border-transparent px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg transition-all">Check Eligibility</button>
            </div>
        </div>

        {/* Dispute Assistant */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-lg overflow-hidden flex flex-col md:flex-row">
            {/* Control Panel */}
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 p-8 border-b md:border-b-0 md:border-r border-border-light dark:border-border-dark flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <span className="material-symbols-outlined">auto_fix_high</span>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">Dispute Assistant</h3>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
                        AdvocaMed has generated a formal dispute letter referencing specific billing codes and federal guidelines.
                    </p>
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark">Tone</label>
                        <select 
                            value={tone} 
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:border-primary focus:ring-primary dark:text-white p-2"
                        >
                            <option>Formal & Firm</option>
                            <option>Polite Inquiry</option>
                            <option>Legal Threat</option>
                        </select>
                        <label className="block text-xs font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark mt-4">Recipient</label>
                        <input 
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:border-primary focus:ring-primary dark:text-white p-2" 
                            type="text" 
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <button 
                        onClick={() => {navigator.clipboard.writeText(disputeLetter); alert('Copied!');}}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors"
                    >
                        <span className="material-symbols-outlined">content_copy</span>
                        Copy Email to Clipboard
                    </button>
                    <a 
                        href={`mailto:${recipient}?subject=Billing Dispute&body=${encodeURIComponent(disputeLetter)}`}
                        className="w-full mt-3 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-text-main-light dark:text-text-main-dark border border-gray-300 dark:border-gray-600 font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">mail</span>
                        Open in Gmail
                    </a>
                </div>
            </div>

            {/* Letter Preview */}
            <div className="md:w-2/3 p-8 flex flex-col h-full min-h-[500px]">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Preview</span>
                    <span className="text-xs text-gray-400">Last updated: Just now</span>
                </div>
                {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                         <span className="material-symbols-outlined animate-spin text-4xl mb-2">refresh</span>
                         <p>Writing highly effective dispute letter...</p>
                    </div>
                ) : (
                    <div 
                        className="font-body text-gray-800 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap flex-1 outline-none p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" 
                        contentEditable={true}
                    >
                        {disputeLetter}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};
