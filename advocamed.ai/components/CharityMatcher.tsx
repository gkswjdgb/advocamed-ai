import React, { useState, useEffect } from 'react';
import { UserFinancials, CharityEligibility } from '../types';

interface CharityMatcherProps {
  onCheck: (eligibility: CharityEligibility, financials: UserFinancials) => void;
  initialFinancials?: UserFinancials;
}

export const CharityMatcher: React.FC<CharityMatcherProps> = ({ onCheck, initialFinancials }) => {
  const [income, setIncome] = useState<string>('');
  const [household, setHousehold] = useState<number>(1);
  const currentYear = new Date().getFullYear();

  // Mock Federal Poverty Guidelines (Approximate recent data)
  const FPL_BASE = 15060;
  const FPL_PER_PERSON = 5380;

  useEffect(() => {
    if (initialFinancials) {
      setIncome(initialFinancials.annualIncome.toString());
      setHousehold(initialFinancials.householdSize);
      // Automatically trigger check if data is present
      checkEligibility(initialFinancials.annualIncome, initialFinancials.householdSize);
    }
  }, [initialFinancials]);

  const checkEligibility = (annualIncome: number, householdSize: number) => {
    const fpl = FPL_BASE + (FPL_PER_PERSON * (householdSize - 1));
    const percentageOfFPL = (annualIncome / fpl) * 100;

    let eligibility: CharityEligibility = {
      isEligible: false,
      estimatedDiscountPercentage: 0,
      programName: "Standard Financial Assistance",
      reasoning: "Income exceeds typical charity care thresholds (usually > 400% FPL)."
    };

    if (percentageOfFPL <= 200) {
      eligibility = {
        isEligible: true,
        estimatedDiscountPercentage: 100,
        programName: "Full Charity Care (Tier 1)",
        reasoning: `Your income ($${annualIncome}) is ${percentageOfFPL.toFixed(0)}% of the Federal Poverty Level. Under 501(r), non-profits typically waive 100% of costs for < 200% FPL.`
      };
    } else if (percentageOfFPL <= 400) {
      eligibility = {
        isEligible: true,
        estimatedDiscountPercentage: 50, // Simplified sliding scale
        programName: "Partial Financial Assistance (Tier 2)",
        reasoning: `Your income ($${annualIncome}) is ${percentageOfFPL.toFixed(0)}% of the FPL. You likely qualify for a sliding scale discount (partial forgiveness).`
      };
    }

    onCheck(eligibility, { annualIncome, householdSize });
  };

  const handleManualCheck = () => {
    const annualIncome = parseFloat(income);
    if (isNaN(annualIncome)) return;
    checkEligibility(annualIncome, household);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Charity Care Calculator</h3>
          <p className="text-sm text-gray-500">Based on Federal Poverty Guidelines ({currentYear}) & IRS 501(r).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Household Income ($)</label>
          <input 
            type="number" 
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="e.g. 45000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Household Size</label>
          <select 
            value={household}
            onChange={(e) => setHousehold(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      
      <button 
        onClick={handleManualCheck}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Check Eligibility
      </button>
    </div>
  );
};