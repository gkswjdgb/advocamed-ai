import React, { useState } from 'react';
import { AnalysisResult, CharityEligibility, UserFinancials } from '../types';
import { CharityMatcher } from './CharityMatcher';
import { AppealGenerator } from './AppealGenerator';

interface Props {
  data: AnalysisResult;
}

export const AnalysisResultView: React.FC<Props> = ({ data }) => {
  const [financials, setFinancials] = useState<UserFinancials | undefined>(data.userFinancials);
  const [charityStatus, setCharityStatus] = useState<CharityEligibility | undefined>(undefined);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const handleCharityCheck = (status: CharityEligibility, fin: UserFinancials) => {
    setCharityStatus(status);
    setFinancials(fin);
  };

  // Helper to determine border color based on flag
  const getFlagStyle = (flag: string) => {
    switch (flag) {
      case 'overcharged': return 'border-red-500 bg-red-50/10';
      case 'upcoding': return 'border-orange-500 bg-orange-50/10';
      case 'unbundling': return 'border-purple-500 bg-purple-50/10';
      case 'error': return 'border-red-600 bg-red-100/10';
      case 'ok': return 'border-green-500 bg-green-50/10';
      default: return 'border-gray-200';
    }
  };

  const getFlagLabel = (flag: string) => {
     switch (flag) {
      case 'overcharged': return '⚠️ Price Gouging';
      case 'upcoding': return '⚠️ Upcoding';
      case 'unbundling': return '⚠️ Unbundling';
      case 'error': return '⚠️ Error';
      case 'ok': return '✅ Fair Price';
      default: return 'Unknown';
    }
  }

  const getFlagColor = (flag: string) => {
     switch (flag) {
      case 'overcharged': return 'text-red-700 bg-red-100';
      case 'upcoding': return 'text-orange-700 bg-orange-100';
      case 'unbundling': return 'text-purple-700 bg-purple-100';
      case 'error': return 'text-red-800 bg-red-200';
      case 'ok': return 'text-green-700 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in-up">

      {/* 1. Hero Summary Card: Focus on Savings */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-10 transition-transform hover:scale-[1.01] duration-300">
        <div className="bg-[#111827] text-white p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Potential Savings Detected</h2>
          <p className="text-5xl md:text-6xl font-extrabold text-[#FF4F4F] drop-shadow-sm">
            {formatMoney(data.potentialSavings || 0)}
          </p>
          <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
             Based on {data.hospitalName}'s pricing vs. 2025 Medicare Allowable Rates & identified billing errors.
          </p>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 text-center divide-x divide-gray-100 bg-white">
          <div className="py-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Total Charged</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatMoney(data.totalCharged)}</p>
          </div>
          <div className="py-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Charity Eligible</p>
            <p className={`text-2xl font-bold mt-1 ${data.charityAnalysis?.likelyEligible ? 'text-green-600' : 'text-gray-400'}`}>
              {data.charityAnalysis?.likelyEligible ? 'Yes ✅' : 'Check Below'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Audit Details List */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Line Item Audit</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
            Source: {data.dataSourceCitation || 'CMS Fee Schedule 2025'}
        </span>
      </div>
      
      <div className="space-y-5 mb-12">
        {data.items.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-xl border-l-8 shadow-sm hover:shadow-md transition-shadow ${getFlagStyle(item.flag)}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getFlagColor(item.flag)}`}>
                        {getFlagLabel(item.flag)}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                        CPT: {item.code || 'N/A'}
                    </span>
                </div>
                <h4 className="font-bold text-lg text-gray-900 leading-tight">{item.description}</h4>
              </div>
              
              <div className="text-left md:text-right min-w-[120px]">
                <p className="text-xs text-gray-500 uppercase font-semibold">Charged</p>
                <p className="font-bold text-xl text-gray-900">{formatMoney(item.chargedAmount)}</p>
                {item.expectedAmount && (
                    <div className="mt-1">
                        <p className="text-[10px] text-gray-400 uppercase">Medicare Rate</p>
                        <p className="text-sm font-semibold text-green-600">{formatMoney(item.expectedAmount)}</p>
                    </div>
                )}
              </div>
            </div>
            
            {/* AI Reasoning */}
            {item.reason && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        <strong className="text-gray-900">Analysis:</strong> {item.reason}
                    </p>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Action Center */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Take Action</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Charity Care Checker */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-4">
                 <h4 className="text-lg font-bold text-gray-900 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">💰</span>
                    Financial Aid Eligibility
                 </h4>
                 <p className="text-sm text-gray-500 mt-1 ml-12">
                     Check if you qualify for 100% forgiveness under IRS 501(r).
                 </p>
             </div>
             <CharityMatcher 
                onCheck={handleCharityCheck} 
                initialFinancials={data.userFinancials} 
             />
             {charityStatus && (
                 <div className={`mt-4 p-4 rounded-xl border ${charityStatus.isEligible ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                     <p className={`font-bold ${charityStatus.isEligible ? 'text-green-800' : 'text-gray-700'}`}>
                         {charityStatus.isEligible ? 'Likely Eligible 🎉' : 'Eligibility Low'}
                     </p>
                     <p className="text-xs text-gray-600 mt-1">{charityStatus.reasoning}</p>
                 </div>
             )}
          </div>

          {/* Appeal Generator */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-4">
                 <h4 className="text-lg font-bold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">⚖️</span>
                    Generate Dispute Letter
                 </h4>
                 <p className="text-sm text-gray-500 mt-1 ml-12">
                     Create a legally-grounded appeal email citing the exact errors found above.
                 </p>
             </div>
             <AppealGenerator analysis={data} financials={financials} />
          </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-12 text-center text-xs text-gray-400 max-w-2xl mx-auto">
          AdvocaMed.ai provides informational analysis based on standard coding guidelines and 2025 CMS fee schedules. 
          This is not legal advice. Always verify with the hospital billing department.
      </div>

    </div>
  );
};
