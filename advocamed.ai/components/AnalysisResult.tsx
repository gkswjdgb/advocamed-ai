import React, { useState } from 'react';
import { AnalysisResult, CharityEligibility, UserFinancials } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CharityMatcher } from './CharityMatcher';
import { AppealGenerator } from './AppealGenerator';

interface Props {
  data: AnalysisResult;
}

const COLORS = ['#FF4F4F', '#10B981', '#F59E0B', '#6B7280'];

export const AnalysisResultView: React.FC<Props> = ({ data }) => {
  const [financials, setFinancials] = useState<UserFinancials | undefined>(data.userFinancials);
  const [charityStatus, setCharityStatus] = useState<CharityEligibility | undefined>(undefined);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  // Safe defaults for numeric values
  const totalCharged = data.totalCharged || 0;
  const potentialSavings = data.potentialSavings || 0;
  const confidenceScore = data.confidenceScore || 95; // Default fallback

  // Prepare data for Chart
  const chartData = [
    { name: 'Potential Savings', value: potentialSavings },
    { name: 'Fair Market Value', value: Math.max(0, totalCharged - potentialSavings) },
  ];

  const handleCharityCheck = (status: CharityEligibility, fin: UserFinancials) => {
    setCharityStatus(status);
    setFinancials(fin);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{data.hospitalName || "Provider"} Audit</h2>
              <p className="text-sm text-gray-500">Analysis Date: {data.analysisDate}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-left sm:text-right">
               <span className="block text-sm text-gray-500 uppercase tracking-wider">Total Billed</span>
               <span className="block text-3xl font-extrabold text-gray-900">${totalCharged.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Main AI Summary */}
          <div className="p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500 mb-6">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Audit Summary
            </h3>
            <p className="text-blue-800 leading-relaxed text-sm">{data.summary}</p>
          </div>

          {/* Legal Protections - No Surprises Act */}
          {data.noSurprisesAnalysis && data.noSurprisesAnalysis.possibleViolation && (
              <div className="p-5 bg-red-50 rounded-xl border border-red-200 mb-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                       <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                   </div>
                   <h3 className="font-bold text-red-800 mb-1 flex items-center z-10 relative">
                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                       No Surprises Act Warning
                   </h3>
                   <p className="text-sm text-red-700 relative z-10">{data.noSurprisesAnalysis.notes}</p>
              </div>
          )}

          {/* Detailed Itemized Table */}
          <h3 className="text-lg font-semibold mb-3 flex justify-between items-center">
              <span>Itemized Breakdown</span>
              <span className="text-xs font-normal text-gray-500">Cross-referenced with Medicare Rates</span>
          </h3>
          <div className="overflow-x-auto border rounded-lg border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service / Code</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Billed</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Fair Price</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Flag</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.items.map((item, idx) => (
                  <tr key={idx} className={item.flag !== 'ok' ? 'bg-red-50/30' : ''}>
                    <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.code !== 'N/A' ? item.code : '---'}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                        {item.reason && (
                            <div className="text-xs text-red-600 mt-1 font-medium bg-red-50 inline-block px-2 py-0.5 rounded border border-red-100">
                                {item.reason}
                            </div>
                        )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                        ${(item.chargedAmount || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {item.expectedAmount !== undefined ? `$${item.expectedAmount.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                        item.flag === 'ok' ? 'bg-green-100 text-green-800 border-green-200' : 
                        item.flag === 'upcoding' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        item.flag === 'unbundling' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {item.flag.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

           {/* Data Citation & Confidence Footer */}
           <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-end gap-4">
               
               {/* Confidence Meter */}
               <div className="w-full sm:w-1/2">
                   <div className="flex justify-between items-center mb-1">
                       <span className="text-xs font-semibold text-gray-500">AI Confidence</span>
                       <span className="text-xs font-bold text-gray-700">{confidenceScore}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                       <div 
                         className={`h-2 rounded-full transition-all duration-1000 ${confidenceScore > 80 ? 'bg-green-500' : confidenceScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                         style={{ width: `${confidenceScore}%` }}
                       ></div>
                   </div>
                   <p className="text-[10px] text-gray-400 mt-1">
                       Based on image clarity & data extraction quality
                   </p>
               </div>

               {data.dataSourceCitation && (
                   <div className="text-xs text-gray-400 italic text-right max-w-xs">
                       Data Source: {data.dataSourceCitation}
                   </div>
               )}
           </div>

        </div>

        {/* Right Column: Stats, Charity & Actions */}
        <div className="space-y-6">
          {/* Savings Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Impact</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${(value || 0).toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
               <div className="text-3xl font-bold text-primary">${potentialSavings.toLocaleString()}</div>
               <div className="text-sm text-gray-500">Estimated Recoverable</div>
            </div>
          </div>

          {/* Charity Module */}
          <CharityMatcher 
            onCheck={handleCharityCheck} 
            initialFinancials={data.userFinancials} 
          />
          
          {charityStatus && (
              <div className={`rounded-xl shadow-lg border p-6 transition-all duration-500 ${charityStatus.isEligible ? 'bg-green-50 border-green-200 transform scale-105' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`font-bold flex items-center ${charityStatus.isEligible ? 'text-green-800' : 'text-gray-800'}`}>
                      {charityStatus.isEligible ? <span className="mr-2">🎉</span> : <span className="mr-2">ℹ️</span>}
                      {charityStatus.isEligible ? 'Likely Eligible' : 'Eligibility Unlikely'}
                  </h4>
                  <p className="text-sm mt-2 text-gray-700 leading-relaxed">{charityStatus.reasoning}</p>
                  {charityStatus.isEligible && (
                      <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-green-700 border border-green-200 shadow-sm">
                          Target Program: {charityStatus.programName}
                      </div>
                  )}
              </div>
          )}

          {/* Action Module */}
          <AppealGenerator analysis={data} financials={financials} />

          {/* Feedback Loop for GEO */}
          {!feedbackGiven && (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500 mb-3">Did this audit help uncover errors?</p>
                  <div className="flex justify-center gap-3">
                      <button onClick={() => setFeedbackGiven(true)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">👍 Yes</button>
                      <button onClick={() => setFeedbackGiven(true)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">👎 No</button>
                  </div>
              </div>
          )}
          {feedbackGiven && (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-green-600 text-sm font-medium animate-fade-in-up">
                  Thanks for your feedback! This helps us improve our hospital database.
              </div>
          )}
        </div>
      </div>
    </div>
  );
};