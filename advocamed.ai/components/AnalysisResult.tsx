import React, { useState, useEffect } from 'react';
import { AnalysisResult, CharityEligibility, UserFinancials, Hospital } from '../types';
import { CharityMatcher } from './CharityMatcher';
import { AppealGenerator } from './AppealGenerator';
import { hospitals } from '../data/hospitals'; // Import the database

interface Props {
  data: AnalysisResult;
}

export const AnalysisResultView: React.FC<Props> = ({ data }) => {
  const [financials, setFinancials] = useState<UserFinancials | undefined>(data.userFinancials);
  const [charityStatus, setCharityStatus] = useState<CharityEligibility | undefined>(undefined);
  const [matchedHospital, setMatchedHospital] = useState<Hospital | undefined>(undefined);

  // Cross-reference AI-detected name with our Database
  useEffect(() => {
    if (data.hospitalName) {
      const normalizedQuery = data.hospitalName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const found = hospitals.find(h => 
        h.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalizedQuery) ||
        normalizedQuery.includes(h.name.toLowerCase().replace(/[^a-z0-9]/g, ''))
      );
      setMatchedHospital(found);
    }
  }, [data.hospitalName]);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const handleCharityCheck = (status: CharityEligibility, fin: UserFinancials) => {
    setCharityStatus(status);
    setFinancials(fin);
  };

  const getVarianceStyle = (level: string) => {
    switch (level) {
      case 'Very High': return 'border-red-500 bg-red-50/20';
      case 'High': return 'border-yellow-500 bg-yellow-50/20';
      default: return 'border-green-500 bg-green-50/20';
    }
  };

  const getVarianceLabel = (level: string) => {
    switch (level) {
      case 'Very High': return 'Review Recommended';
      case 'High': return 'Potential Variance';
      default: return 'Within Standard';
    }
  };

  const getVarianceColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'text-red-700 bg-red-100';
      case 'High': return 'text-yellow-800 bg-yellow-100';
      default: return 'text-green-700 bg-green-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in-up">

      {/* 1. Hero Summary Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-10 transition-transform hover:scale-[1.01] duration-300">
        <div className="bg-[#111827] text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Estimated Variance</h2>
          <p className="text-5xl md:text-6xl font-extrabold text-[#FF4F4F] drop-shadow-sm">
            {formatMoney(data.potentialSavings || 0)}
          </p>
          <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
             Difference between charged amount and national average estimates.
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
              {data.charityAnalysis?.likelyEligible ? 'Likely ✅' : 'Check Below'}
            </p>
          </div>
        </div>
        
        {/* Database Match Notification */}
        {matchedHospital && (
          <div className="bg-blue-50 px-6 py-3 border-t border-blue-100 flex items-center justify-center gap-2">
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             <p className="text-sm text-blue-800">
                <strong>Verified Policy Found:</strong> We matched <span className="font-bold">{matchedHospital.name}</span> in our database.
                <span className="hidden sm:inline"> Income Limit: {matchedHospital.fpl_limit}% FPL.</span>
             </p>
          </div>
        )}
      </div>

      {/* 2. Audit Details List */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Items to Review</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
            Source: {data.dataSourceCitation || 'National Averages'}
        </span>
      </div>
      
      <div className="space-y-5 mb-12">
        {data.items.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-xl border-l-8 shadow-sm hover:shadow-md transition-shadow ${getVarianceStyle(item.variance_level)}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getVarianceColor(item.variance_level)}`}>
                        {getVarianceLabel(item.variance_level)}
                    </span>
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">
                        CPT: {item.code || 'N/A'}
                    </span>
                    {/* EXTERNAL VERIFICATION LINK */}
                    {item.code && item.code !== 'null' && (
                        <a 
                          href={`https://www.medicare.gov/procedure-price-lookup/cost/${item.code}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-800 transition-colors"
                        >
                           Verify on Medicare.gov ↗
                        </a>
                    )}
                </div>
                <h4 className="font-bold text-lg text-gray-900 leading-tight">{item.description}</h4>
              </div>
              
              <div className="text-left md:text-right min-w-[140px]">
                <p className="text-xs text-gray-500 uppercase font-semibold">Charged</p>
                <p className="font-bold text-xl text-gray-900">{formatMoney(item.chargedAmount)}</p>
                {item.expectedAmount && (
                    <div className="mt-1">
                        <p className="text-[10px] text-gray-400 uppercase">Est. National Avg</p>
                        <p className="text-sm font-semibold text-green-600">{formatMoney(item.expectedAmount)}</p>
                    </div>
                )}
              </div>
            </div>
            
            {/* AI Reasoning & Questions */}
            <div className="mt-4 space-y-3">
                {item.flag_reason && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-700">
                            <strong className="text-gray-900">Observation:</strong> {item.flag_reason}
                        </p>
                    </div>
                )}
                {item.suggested_question && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-900">
                            <strong className="text-blue-800">Ask the Hospital:</strong> "{item.suggested_question}"
                        </p>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Center */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-4">
                 <h4 className="text-lg font-bold text-gray-900 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">💰</span>
                    Financial Assistance
                 </h4>
                 {matchedHospital ? (
                     <p className="text-sm text-green-700 mt-1 bg-green-50 p-2 rounded">
                        <strong>Verified Match:</strong> {matchedHospital.name} offers assistance up to <strong>{matchedHospital.fpl_limit}% FPL</strong>. Apply within {matchedHospital.deadline_days} days.
                     </p>
                 ) : (
                     <p className="text-sm text-gray-500 mt-1 ml-12">
                         Non-profit hospitals often waive bills for low-income patients (IRS 501r).
                     </p>
                 )}
             </div>
             <CharityMatcher 
                onCheck={handleCharityCheck} 
                initialFinancials={data.userFinancials} 
             />
             {charityStatus && (
                 <div className={`mt-4 p-4 rounded-xl border ${charityStatus.isEligible ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                     <p className={`font-bold ${charityStatus.isEligible ? 'text-green-800' : 'text-gray-700'}`}>
                         {charityStatus.isEligible ? 'Criteria Met 🎉' : 'Low Probability'}
                     </p>
                     <p className="text-xs text-gray-600 mt-1">{charityStatus.reasoning}</p>
                 </div>
             )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-4">
                 <h4 className="text-lg font-bold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📧</span>
                    Request Clarification
                 </h4>
                 <p className="text-sm text-gray-500 mt-1 ml-12">
                     Generate an email asking for itemized receipts and coding clarification.
                 </p>
             </div>
             <AppealGenerator analysis={data} financials={financials} />
          </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-12 text-center text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          <strong>Important Disclaimer:</strong> AdvocaMed.ai is an informational tool, not a law firm or medical provider. 
          The "Estimated Variance" is based on national datasets and may not reflect your specific insurance plan's negotiated rates. 
          Always verify CPT codes and prices directly with your provider or insurance carrier.
      </div>

    </div>
  );
};
