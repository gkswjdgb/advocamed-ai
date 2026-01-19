import React, { useState, useCallback } from 'react';
import { analyzeMedicalBill } from '../services/geminiService';
import { AnalysisResult, UserFinancials } from '../types';

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onLoading: (isLoading: boolean) => void;
  onBack: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onAnalysisComplete, onLoading, onBack }) => {
  const [error, setError] = useState<string | null>(null);
  const [income, setIncome] = useState<string>('');
  const [householdSize, setHouseholdSize] = useState<string>('1');
  const [showTips, setShowTips] = useState<boolean>(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
              
              const MAX_DIMENSION = 1500; // Increased slightly for better OCR readability
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
              
              // Validate dataURL format
              const base64Part = dataUrl.split(',')[1];
              if (base64Part) {
                  resolve(base64Part);
              } else {
                  reject(new Error("Failed to encode image."));
              }
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

    // UX: Handle PDF specifically to guide users
    if (file.type === 'application/pdf') {
        setError('⚠️ PDFs are not supported directly. Please take a SCREENSHOT of the PDF and upload the image.');
        return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    // Check type, but allow HEIC (some browsers might not report mime type correctly for heic)
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
      setError('Invalid format. Please upload a JPG, PNG, or HEIC image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Please upload an image smaller than 10MB.`);
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
      const cleanBase64Data = await processImage(file);
      
      try {
        const result = await analyzeMedicalBill(cleanBase64Data, 'image/jpeg', financials);
        onAnalysisComplete(result);
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : "An unknown error occurred.";
        console.error("Analysis Error:", errorMessage);
        setError(errorMessage || "Failed to analyze. Please try a clearer photo.");
        onLoading(false);
      }
    } catch (e) {
      console.error("Processing Error");
      setError('Error processing image. Please try again.');
      onLoading(false);
    }
  }, [onAnalysisComplete, onLoading, income, householdSize]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center animate-fade-in-up">
      
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm py-2 pr-4 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Home
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between animate-fade-in-down text-left">
            <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-red-700 text-sm font-medium leading-snug">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 p-1 ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Analyze Your Medical Bill</h2>
        <p className="text-gray-500 mb-6 text-sm md:text-base">
          Our AI reads CPT codes to find errors. <strong className="text-gray-700">We do not store your data.</strong>
        </p>

        <div className="mb-8">
            <button 
                onClick={() => setShowTips(!showTips)}
                className="text-primary text-sm font-bold flex items-center justify-center mx-auto hover:underline"
            >
                {showTips ? 'Hide Scanning Tips' : '📸 3 Tips for Best Results'}
            </button>
            
            {showTips && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left animate-fade-in-down">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-lg">💡</span>
                        <p className="text-xs text-gray-600 mt-1 font-semibold">Good Lighting</p>
                        <p className="text-[10px] text-gray-500">Avoid shadows or glare covering the numbers.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-lg">📄</span>
                        <p className="text-xs text-gray-600 mt-1 font-semibold">Flatten the Bill</p>
                        <p className="text-[10px] text-gray-500">Unfold completely so text lines are straight.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-lg">🚫</span>
                        <p className="text-xs text-gray-600 mt-1 font-semibold">No PDFs</p>
                        <p className="text-[10px] text-gray-500">Take a screenshot of digital PDFs first.</p>
                    </div>
                </div>
            )}
        </div>

        <div className="bg-blue-50 p-6 rounded-xl mb-8 text-left border border-blue-100">
            <h3 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Charity Care Calculator (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Annual Household Income ($)</label>
                    <input 
                        type="number" 
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow placeholder-blue-300"
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
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                    </select>
                </div>
            </div>
        </div>

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
                <div className="flex flex-col items-center justify-center px-4">
                     <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <p className="text-sm font-semibold text-gray-600">Upload Image</p>
                    <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP, HEIC</p>
                    <p className="text-[10px] text-red-400 font-medium mt-1">PDF? Please Screenshot it</p>
                </div>
                <input 
                    type="file" 
                    className="hidden" 
                    // Note: We intentionally exclude .pdf from accept to guide users, 
                    // but we also check file.type in JS for drag-and-drop or 'All Files' selection
                    accept="image/jpeg,image/png,image/webp,image/heic"
                    onChange={handleFileChange}
                />
            </label>
        </div>
      </div>
    </div>
  );
};
