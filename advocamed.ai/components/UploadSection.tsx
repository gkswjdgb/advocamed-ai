import React, { useState, useCallback } from 'react';
import { analyzeMedicalBill } from '../services/geminiService';
import { AnalysisResult, UserFinancials } from '../types';

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onLoading: (isLoading: boolean) => void;
  onBack: () => void; // New prop for back navigation
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onAnalysisComplete, onLoading, onBack }) => {
  const [error, setError] = useState<string | null>(null);
  const [income, setIncome] = useState<string>('');
  const [householdSize, setHouseholdSize] = useState<string>('1');

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG).');
      return;
    }

    onLoading(true);
    setError(null);

    let financials: UserFinancials | undefined = undefined;
    if (income) {
        financials = {
            annualIncome: parseFloat(income),
            householdSize: parseInt(householdSize) || 1
        };
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        
        try {
            const result = await analyzeMedicalBill(base64Data, file.type, financials);
            onAnalysisComplete(result);
        } catch (apiError: any) {
            console.error(apiError);
            setError(apiError.message || "Failed to call the Gemini API. Please try again.");
            onLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setError('Error reading file.');
      onLoading(false);
    }
  }, [onAnalysisComplete, onLoading, income, householdSize]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center animate-fade-in-up">
      
      {/* Back Button - Expanded touch target */}
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm py-2 pr-4 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Home
        </button>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between animate-fade-in-down">
            <div className="flex items-center text-left">
                <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Analyze Your Medical Bill</h2>
        <p className="text-gray-500 mb-8 text-sm md:text-base">
          Upload a clear photo of your bill. Sensitive info is not stored.
        </p>

        {/* Financial Context Inputs */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8 text-left border border-blue-100">
            <h3 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Optional: Charity Care Check
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Annual Household Income ($)</label>
                    <input 
                        type="number" 
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
                        placeholder="e.g. 45000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Household Size</label>
                    <select 
                        value={householdSize}
                        onChange={(e) => setHouseholdSize(e.target.value)}
                        className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
                    >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
                We use this to check for mandatory IRS 501(r) discounts.
            </p>
        </div>

        {/* Dual Actions for Mobile - Improved styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label className="flex-1 flex flex-col items-center justify-center h-40 sm:h-48 border-2 border-primary border-dashed rounded-xl cursor-pointer bg-red-50/50 hover:bg-red-50 transition-all active:scale-95 group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center z-10">
                    <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:shadow-md transition-shadow">
                         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <p className="text-sm font-bold text-gray-800">Take Photo</p>
                    <p className="text-xs text-gray-500">Scan Receipt</p>
                </div>
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                />
            </label>

            <label className="flex-1 flex flex-col items-center justify-center h-40 sm:h-48 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all active:scale-95 group">
                <div className="flex flex-col items-center justify-center">
                     <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <p className="text-sm font-semibold text-gray-600">Upload File</p>
                    <p className="text-xs text-gray-400">Select from Gallery</p>
                </div>
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>
        </div>
      </div>
    </div>
  );
};
