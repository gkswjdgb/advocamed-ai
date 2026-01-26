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
    const result = await generateAppealLetter(analysis, financials);
    setLetter(result);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="mt-4">
      {!generated ? (
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-secondary text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors flex justify-center items-center shadow-md font-medium"
        >
          {loading ? (
             <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Writing Email Draft...</>
          ) : "Generate Inquiry Email"}
        </button>
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          <textarea 
            className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-primary focus:border-primary bg-gray-50"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <div className="flex gap-4">
            <button 
              onClick={() => {navigator.clipboard.writeText(letter); alert('Copied to clipboard!');}}
              className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-sm transition-colors"
            >
              Copy Text
            </button>
            <button 
              onClick={() => setGenerated(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 underline"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
