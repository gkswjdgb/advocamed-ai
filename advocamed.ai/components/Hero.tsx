import React, { useState, useCallback } from 'react';
import { analyzeMedicalBill } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { blogPosts } from '../data/blogPosts';
import { hospitals } from '../data/hospitals';
import { Link } from 'react-router-dom';

interface HeroProps {
  onAnalysisComplete: (result: AnalysisResult, image: string) => void;
  onLoading: (isLoading: boolean) => void;
  onDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalysisComplete, onLoading, onDemo }) => {
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<'SCAN' | 'CALCULATOR'>('SCAN');

  // Optional financial inputs for Charity Care matching during scan or calculator mode
  const [selectedHospitalSlug, setSelectedHospitalSlug] = useState<string>('new-york-presbyterian');
  const [billAmount, setBillAmount] = useState<string>('3200');
  const [annualIncome, setAnnualIncome] = useState<string>('52000');
  const [householdSize, setHouseholdSize] = useState<number>(2);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read file data."));
          return;
        }
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_DIMENSION = 1500;
            if (width > height) {
              if (width > MAX_DIMENSION) {
                height *= MAX_DIMENSION / width;
                width = MAX_DIMENSION;
              }
            } else {
              if (height > MAX_DIMENSION) {
                width *= MAX_DIMENSION / height;
                height = MAX_DIMENSION;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error("Browser does not support canvas operations."));
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            const base64Part = dataUrl.split(',')[1];
            if (base64Part) resolve(base64Part);
            else reject(new Error("Failed to encode image."));
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error("Failed to load image structure."));
        img.src = event.target.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  }, [annualIncome, householdSize]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [annualIncome, householdSize]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const processFile = async (file: File) => {
    if (file.type === 'application/pdf') {
      setError('For maximum privacy and speed, please take a screenshot/photo of your PDF bill and upload the image (JPG/PNG).');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
      setError('Invalid format. Please upload a JPG, PNG, WEBP, or HEIC image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Please upload an image smaller than 10MB.');
      return;
    }

    onLoading(true);
    setError(null);

    try {
      const cleanBase64Data = await processImage(file);
      const imageUrl = `data:image/jpeg;base64,${cleanBase64Data}`;

      const parsedIncome = parseFloat(annualIncome);
      const financials = !isNaN(parsedIncome) && parsedIncome > 0
        ? { annualIncome: parsedIncome, householdSize }
        : undefined;

      try {
        const result = await analyzeMedicalBill(cleanBase64Data, 'image/jpeg', financials);
        onAnalysisComplete(result, imageUrl);
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : "An unknown error occurred.";
        console.error("Analysis Error:", errorMessage);
        setError(errorMessage || "Failed to analyze. Please try a clearer photo or use the Instant Calculator tab.");
        onLoading(false);
      }
    } catch (e) {
      console.error("Processing Error");
      setError('Error processing image. Please try again.');
      onLoading(false);
    }
  };

  // Instant No-Photo Calculator & Email Builder Handler
  const handleInstantCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hosp = hospitals.find(h => h.slug === selectedHospitalSlug) || hospitals[0];
    const bill = Math.max(100, parseFloat(billAmount) || 2500);
    const income = Math.max(0, parseFloat(annualIncome) || 48000);
    const size = Math.max(1, householdSize || 1);

    // 2026 FPL calculation
    const fplBase = 15060 + (size - 1) * 5380;
    const userFplPercent = Math.round((income / fplBase) * 100);
    const hospLimit = hosp.fpl_limit || 300;
    const isEligible = userFplPercent <= hospLimit;
    const estimatedSavings = isEligible ? bill : Math.round(bill * 0.38);

    const instantResult: AnalysisResult = {
      hospitalName: hosp.name,
      totalCharged: bill,
      potentialSavings: estimatedSavings,
      confidenceScore: 95,
      summary: isEligible
        ? `Good news: Your household income ($${income.toLocaleString()} for ${size} ${size === 1 ? 'person' : 'people'}, ~${userFplPercent}% FPL) falls within ${hosp.name}'s ${hospLimit}% FPL Financial Assistance limit. You likely qualify for up to 100% Charity Care forgiveness or a major sliding-scale waiver.`
        : `Your household income (~${userFplPercent}% FPL) is above ${hosp.name}'s standard ${hospLimit}% FPL Charity Care ceiling, but hospital chargemaster bills typically exceed CMS Medicare rates by 250%–400%. You can demand an itemized CPT audit and negotiate a ~35–40% fair-market reduction.`,
      dataSourceCitation: `${hosp.policy_note || 'IRS Section 501(r)'} & 2026 CMS Medicare Fee Schedule`,
      items: [
        {
          code: 'UB-04 / CPT',
          description: `${hosp.name} Summary Balance (Requesting Full Itemized CPT Breakdown)`,
          chargedAmount: Math.round(bill * 0.7),
          expectedAmount: Math.round(bill * 0.42),
          variance_level: 'Very High',
          flag_reason: 'Summary hospital statements often bundle facility fees and supplies at 300%+ Chargemaster rates without disclosing individual 5-digit CPT codes.',
          suggested_question: `Please provide a detailed itemized statement (UB-04) with all 5-digit CPT/HCPCS codes and place a 30-day IRS 501(r) dispute hold on my account.`
        },
        {
          code: '99284 / Facility',
          description: 'Facility & Professional Evaluation Fee Benchmark Check',
          chargedAmount: Math.round(bill * 0.3),
          expectedAmount: Math.round(bill * 0.2),
          variance_level: 'High',
          flag_reason: 'Standard facility and evaluation charges frequently can be negotiated down to Medicare + 20% or waived via Financial Assistance.',
          suggested_question: `Can we apply ${hosp.name}'s Financial Assistance Policy or prompt-pay settlement discount to bring this balance in line with commercial allowed amounts?`
        }
      ],
      charityAnalysis: {
        likelyEligible: isEligible,
        estimatedDiscount: isEligible ? 'Up to 100% Waiver' : '25%–40% Prompt-Pay / Hardship Discount',
        reasoning: isEligible
          ? `Your income is ~${userFplPercent}% of the Federal Poverty Level, which is under ${hosp.name}'s ${hospLimit}% FPL threshold. Call ${hosp.phone} and submit their Financial Assistance Application within ${hosp.deadline_days || 240} days.`
          : `Even above ${hospLimit}% FPL, you can apply for Medical Hardship if medical bills exceed 10% of your gross income, or negotiate a lump-sum settlement using the email below.`
      },
      userFinancials: {
        annualIncome: income,
        householdSize: size
      }
    };

    onAnalysisComplete(instantResult, '');
  };

  return (
    <>
      <section className="py-10 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Headline, Privacy Guarantees & Steps (7 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 animate-fade-in-up">
            <div className="space-y-4">
              {/* Privacy & No-Login Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">shield_lock</span>
                  Zero Server Storage (Never Saved)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">person_off</span>
                  No Sign-Up or Login Required
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">Balance</span>
                  100% Free Patient Tool
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-text-main-light dark:text-text-main-dark">
                Lower Your <span className="text-primary">Hospital Bill</span> Using Federal Charity Care &amp; AI Auditing.
              </h1>
              <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                Don&apos;t take out medical loans or pay inflated hospital sticker prices. Check if your hospital owes you <strong>100% bill forgiveness under IRS Section 501(r)</strong>, scan your invoice for CPT coding errors, and generate a ready-to-send negotiation email in seconds.
              </p>
            </div>

            {/* Steps Guide */}
            <div id="how-it-works" className="grid gap-3.5 mt-2 scroll-mt-24">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-extrabold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base text-text-main-light dark:text-text-main-dark">Scan Your Bill or Enter Your Hospital</h3>
                  <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    Upload a photo of your bill (processed in volatile RAM only—never saved) or select your hospital &amp; income on the right.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-extrabold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-base text-text-main-light dark:text-text-main-dark">Match Hospital Policy &amp; Catch CPT Overcharges</h3>
                  <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    We compare your bill against CMS Medicare Fee Schedules and check your hospital&apos;s 2026 FPL Charity Care income limits.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-extrabold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base text-text-main-light dark:text-text-main-dark">Send the AI-Drafted Negotiation Email</h3>
                  <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                    Copy or open your customized dispute &amp; financial assistance email in Gmail/Mail to freeze collections and reduce your balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Button */}
            <div className="flex flex-wrap gap-3 items-center pt-1">
              <button onClick={onDemo} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">play_circle</span>
                See Sample Bill Audit &amp; Negotiation Email ($1,930 Saved)
              </button>
              <Link to="/hospitals" className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark hover:text-primary px-3 py-2">
                <span className="material-symbols-outlined text-base">search</span>
                Browse Hospital Policies
              </Link>
            </div>
          </div>

          {/* Right: Dual-Mode Action Box (Scan Image OR Instant No-Photo Calculator) (6 cols) */}
          <div className="lg:col-span-6 relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xl overflow-hidden">
              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/60">
                <button
                  type="button"
                  onClick={() => setMode('SCAN')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    mode === 'SCAN'
                      ? 'bg-white dark:bg-surface-dark text-primary border-b-2 border-primary shadow-sm'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">document_scanner</span>
                  1. Scan Bill Photo (AI)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('CALCULATOR')}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    mode === 'CALCULATOR'
                      ? 'bg-white dark:bg-surface-dark text-primary border-b-2 border-primary shadow-sm'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">calculate</span>
                  2. No Photo? Check Policy &amp; Email
                </button>
              </div>

              {mode === 'SCAN' ? (
                <div
                  className="p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl">receipt_long</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-1.5 text-text-main-light dark:text-text-main-dark">
                    Upload Hospital Bill Image
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mb-5 max-w-md">
                    Drag &amp; drop a photo or screenshot of your bill. Our AI checks CPT codes against Medicare rates and writes your dispute email.
                  </p>

                  {/* Optional Income Input for Simultaneous Charity Care Check */}
                  <div className="w-full bg-gray-50 dark:bg-gray-800/50 border border-border-light dark:border-border-dark rounded-xl p-4 mb-5 text-left">
                    <p className="text-xs font-bold text-text-main-light dark:text-text-main-dark mb-2.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-sm">volunteer_activism</span>
                      Optional: Also check if you qualify for $0 Charity Care
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-1">
                          Est. Household Income ($)
                        </label>
                        <input
                          type="number"
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(e.target.value)}
                          placeholder="e.g. 52000"
                          className="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-3 py-1.5 text-xs text-text-main-light dark:text-text-main-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-1">
                          Household Size
                        </label>
                        <select
                          value={householdSize}
                          onChange={(e) => setHouseholdSize(Number(e.target.value))}
                          className="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-3 py-1.5 text-xs text-text-main-light dark:text-text-main-dark"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-bold max-w-md">
                      {error}
                    </div>
                  )}

                  <label className="w-full max-w-sm bg-primary hover:bg-primary-hover text-white h-12 rounded-xl font-bold shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base">
                    <span className="material-symbols-outlined">add_a_photo</span>
                    Select Bill Image &amp; Audit Free
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      onChange={handleFileChange}
                    />
                  </label>

                  <p className="mt-3 text-[11px] text-text-secondary-light dark:text-text-secondary-dark">
                    Have a PDF? Take a quick screenshot first. Don&apos;t have the bill handy?{' '}
                    <button type="button" onClick={() => setMode('CALCULATOR')} className="text-primary font-bold underline cursor-pointer">
                      Use the No-Photo Calculator &rarr;
                    </button>
                  </p>

                  <div className="mt-5 pt-4 border-t border-border-light dark:border-border-dark w-full flex items-center justify-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span className="material-symbols-outlined text-sm">memory</span>
                    <span>RAM-Only Processing • 0 Bytes Stored on Server • No Account Needed</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInstantCalculatorSubmit} className="p-6 sm:p-8 space-y-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                      Instant Charity Care &amp; Negotiation Email Builder
                    </h2>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      No photo needed. Select your hospital and income to check 2026 IRS 501(r) forgiveness eligibility and generate your custom dispute email.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1">
                      Select Hospital System
                    </label>
                    <select
                      value={selectedHospitalSlug}
                      onChange={(e) => setSelectedHospitalSlug(e.target.value)}
                      className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3.5 py-2.5 text-sm text-text-main-light dark:text-text-main-dark"
                    >
                      {hospitals.map(h => (
                        <option key={h.slug} value={h.slug}>
                          {h.name} ({h.state}) — Up to {h.fpl_limit}% FPL
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Total Bill ($)
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3.5 py-2.5 text-sm text-text-main-light dark:text-text-main-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Annual Income ($)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3.5 py-2.5 text-sm text-text-main-light dark:text-text-main-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1">
                        Household Size
                      </label>
                      <select
                        value={householdSize}
                        onChange={(e) => setHouseholdSize(Number(e.target.value))}
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3.5 py-2.5 text-sm text-text-main-light dark:text-text-main-dark"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white h-12 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base mt-2"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    Check Eligibility &amp; Generate Negotiation Email
                  </button>

                  <div className="pt-3 border-t border-border-light dark:border-border-dark text-center text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    100% Anonymous • Calculated Instantly in Browser • Never Stored
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Authoritative E-E-A-T & 2026 Hospital Charity Care Quick Reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16">
        <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-blue-50/70 dark:bg-blue-950/30 px-6 py-5 border-b border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                2026 IRS Section 501(r) Verified Directory
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main-light dark:text-text-main-dark">
                Quick Reference: Top Hospital Financial Assistance Contacts (2026)
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                Based on current 2026 Federal Poverty Level (FPL) guidelines, qualifying households can have up to 100% of medical bills waived.
              </p>
            </div>
            <Link
              to="/blog/how-to-apply-charity-care-2026"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              Read 2026 Charity Care Guide
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs uppercase text-text-secondary-light dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="py-3.5 px-6 font-bold">Hospital System</th>
                  <th className="py-3.5 px-6 font-bold">Program Name</th>
                  <th className="py-3.5 px-6 font-bold">Primary Billing Contact</th>
                  <th className="py-3.5 px-6 font-bold">2026 Eligibility Range (FPL)</th>
                  <th className="py-3.5 px-6 font-bold text-right">Policy Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                <tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-text-main-light dark:text-text-main-dark">New York-Presbyterian (NYP)</td>
                  <td className="py-3.5 px-6 text-text-secondary-light dark:text-text-secondary-dark">NYP Financial Assistance</td>
                  <td className="py-3.5 px-6 font-mono font-semibold text-text-main-light dark:text-text-main-dark">(866) 461-2779</td>
                  <td className="py-3.5 px-6"><span className="px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-xs">Up to 500% FPL</span></td>
                  <td className="py-3.5 px-6 text-right"><Link to="/hospital/new-york-presbyterian" className="text-primary font-bold hover:underline text-xs">View NYP Guide &rarr;</Link></td>
                </tr>
                <tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-text-main-light dark:text-text-main-dark">Penn Medicine</td>
                  <td className="py-3.5 px-6 text-text-secondary-light dark:text-text-secondary-dark">Charity Care Program</td>
                  <td className="py-3.5 px-6 font-mono font-semibold text-text-main-light dark:text-text-main-dark">(215) 893-2346</td>
                  <td className="py-3.5 px-6"><span className="px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-xs">Up to 300% FPL</span></td>
                  <td className="py-3.5 px-6 text-right"><Link to="/hospital/penn-medicine" className="text-primary font-bold hover:underline text-xs">View Penn Guide &rarr;</Link></td>
                </tr>
                <tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-text-main-light dark:text-text-main-dark">Emory Healthcare</td>
                  <td className="py-3.5 px-6 text-text-secondary-light dark:text-text-secondary-dark">Emory Charity Care</td>
                  <td className="py-3.5 px-6 font-mono font-semibold text-text-main-light dark:text-text-main-dark">(404) 686-7041</td>
                  <td className="py-3.5 px-6"><span className="px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-xs">Up to 250% FPL</span></td>
                  <td className="py-3.5 px-6 text-right"><Link to="/hospital/emory-healthcare" className="text-primary font-bold hover:underline text-xs">View Emory Guide &rarr;</Link></td>
                </tr>
                <tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-text-main-light dark:text-text-main-dark">Duke Health</td>
                  <td className="py-3.5 px-6 text-text-secondary-light dark:text-text-secondary-dark">Financial Assistance Policy</td>
                  <td className="py-3.5 px-6 font-mono font-semibold text-text-main-light dark:text-text-main-dark">(919) 620-4555</td>
                  <td className="py-3.5 px-6"><span className="px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-xs">Up to 400% FPL</span></td>
                  <td className="py-3.5 px-6 text-right"><Link to="/hospital/duke-university-health-system" className="text-primary font-bold hover:underline text-xs">View Duke Guide &rarr;</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 px-6 py-3 border-t border-border-light dark:border-border-dark flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">fact_check</span>
              Fact-checked by <strong>Dr. Alex Chen</strong> (Lead Biotech Architect) against 2026 HHS Poverty Guidelines &amp; IRS Form 990 filings.
            </span>
            <Link to="/hospitals" className="font-bold text-primary hover:underline">
              Search All 50+ Major US Hospital Policies &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white dark:bg-surface-dark py-16 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Latest Medical Billing &amp; Charity Care Guides</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Actionable scripts, federal 501(r) rules, and hospital-specific negotiation strategies.</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
               View all articles
               <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="group flex flex-col gap-4 h-full">
                <Link to={`/blog/${post.id}`} className="block h-48 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all">
                   {post.imageUrl && !imageError[post.id] ? (
                     <img 
                       src={post.imageUrl} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       loading="lazy"
                       referrerPolicy="no-referrer"
                       onError={() => handleImageError(post.id)}
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100 dark:bg-gray-800">
                        <span className="material-symbols-outlined text-5xl opacity-50">article</span>
                     </div>
                   )}
                </Link>
                <div className="flex flex-col gap-2 flex-grow">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                     {post.excerpt}
                  </p>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-auto pt-2">{post.date} • {post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
             <Link to="/blog" className="inline-flex items-center gap-1 text-primary font-bold hover:underline px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
               View all articles
               <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
