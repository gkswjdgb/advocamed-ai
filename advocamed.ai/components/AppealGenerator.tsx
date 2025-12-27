import React, { useState } from 'react';
import { AnalysisResult, UserFinancials } from '../types';
import { generateAppealLetter } from '../services/geminiService';

interface AppealGeneratorProps {
  analysis: AnalysisResult;
  financials?: UserFinancials;
}

export const AppealGenerator: React.FC<AppealGeneratorProps> = ({ analysis, financials }) => {
  const [letter, setLetter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateAppealLetter(analysis, financials ? { income: financials.annualIncome, size: financials.householdSize } : undefined);
    setLetter(result);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Appeal Letter Generator</h3>
          <p className="text-sm text-gray-500">Create a formal dispute email based on identified errors.</p>
        </div>
      </div>

      {!generated ? (
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-secondary text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors flex justify-center items-center"
        >
          {loading ? (
             <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...</>
          ) : "Generate Professional Appeal Letter"}
        </button>
      ) : (
        <div className="space-y-4">
          <textarea 
            className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-primary focus:border-primary"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <div className="flex gap-4">
            <button 
              onClick={() => {navigator.clipboard.writeText(letter); alert('Copied to clipboard!');}}
              className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 border border-gray-300"
            >
              Copy to Clipboard
            </button>
            <button 
              onClick={() => setGenerated(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 underline"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};