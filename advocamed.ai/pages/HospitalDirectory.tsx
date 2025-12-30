
import React from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import SEO from '../components/SEO';

const HospitalDirectory: React.FC = () => {
  // Sort hospitals by name
  const sortedHospitals = [...hospitals].sort((a, b) => a.name.localeCompare(b.name));

  // Group by state (optional, but looks professional)
  const grouped = sortedHospitals.reduce((acc, hospital) => {
    const state = hospital.state || 'Other';
    if (!acc[state]) acc[state] = [];
    acc[state].push(hospital);
    return acc;
  }, {} as Record<string, typeof hospitals>);

  return (
    <>
      <SEO 
        title="Hospital Financial Assistance Directory" 
        description="Browse our comprehensive directory of hospital financial aid policies and charity care eligibility across the United States."
        canonical="/hospitals"
      />
      <div className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Hospital Financial Aid Directory</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a hospital below to view their specific charity care policies, income limits, and how to dispute billing errors.
            </p>
          </div>

          <div className="grid gap-8">
            {Object.entries(grouped).map(([state, list]) => (
              <div key={state} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3 text-sm">
                    {state}
                  </span>
                  Hospitals in {state}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((hospital) => (
                    <Link 
                      key={hospital.slug} 
                      to={`/hospital/${hospital.slug}`}
                      className="group p-4 rounded-xl border border-gray-50 hover:border-primary/20 hover:bg-red-50/30 transition-all"
                    >
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                        {hospital.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{hospital.city}, {hospital.state}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-secondary text-white rounded-2xl p-10 text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Don't see your hospital?</h3>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Our AI can analyze bills from any hospital in the US, even if they aren't in this directory yet.
            </p>
            <Link 
              to="/?step=UPLOAD" 
              className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105"
            >
              Scan Any Bill Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDirectory;
