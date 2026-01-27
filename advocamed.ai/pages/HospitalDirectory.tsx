import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import SEO from '../components/SEO';

const HospitalDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(50);

  // 1. Efficient Filtering for 5,000+ items
  const filteredHospitals = useMemo(() => {
    if (!searchQuery) return hospitals;
    
    const query = searchQuery.toLowerCase();
    return hospitals.filter(h => 
      h.name.toLowerCase().includes(query) || 
      h.city.toLowerCase().includes(query) ||
      h.state.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // 2. Pagination / Limit logic
  const displayedHospitals = filteredHospitals.slice(0, limit);
  const hasMore = displayedHospitals.length < filteredHospitals.length;

  const handleShowMore = () => {
    setLimit(prev => prev + 50);
  };

  return (
    <>
      <SEO 
        title="Search 5,000+ Hospital Financial Aid Policies | AdvocaMed" 
        description="Find verified charity care policies, income limits (FPL), and billing contacts for over 5,000 US hospitals. Don't pay full price."
        canonical="/hospitals"
      />
      <div className="bg-background-light dark:bg-background-dark min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main-light dark:text-text-main-dark mb-4">Hospital Policy Database</h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-8">
              Search over 5,000 US hospitals to find their charity care policies, income limits, and how to apply for forgiveness.
            </p>

            {/* Search Bar Component */}
            <div className="max-w-xl mx-auto relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-12 py-4 border border-border-light dark:border-border-dark rounded-full leading-5 bg-white dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20 sm:text-sm shadow-sm transition-all"
                    placeholder="Search by Hospital Name, City, or State..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setLimit(50); // Reset limit on new search
                    }}
                />
                {searchQuery && (
                    <button 
                        onClick={() => {
                            setSearchQuery('');
                            setLimit(50);
                        }}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                )}
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Found <strong>{filteredHospitals.length}</strong> hospitals
            </span>
          </div>

          {/* List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {displayedHospitals.length > 0 ? (
                 displayedHospitals.map((hospital) => (
                    <Link 
                      key={hospital.id} 
                      to={`/hospital/${hospital.slug}`}
                      className="group bg-white dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex justify-between items-center active:scale-[0.99]"
                    >
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors truncate">
                            {hospital.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                             <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs font-semibold text-gray-600 dark:text-gray-300 mr-2 flex-shrink-0">{hospital.state}</span>
                             <span className="truncate">{hospital.city}</span>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right flex-shrink-0 pl-2">
                         <span className={`text-xs font-bold px-2 py-1 rounded-full ${hospital.fpl_limit ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            {hospital.fpl_limit ? `Up to ${hospital.fpl_limit}% FPL` : 'Verify Policy'}
                         </span>
                      </div>
                    </Link>
                 ))
             ) : (
                 <div className="col-span-full py-16 text-center bg-white dark:bg-surface-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
                     <p className="text-text-main-light dark:text-text-main-dark text-lg font-medium">Hospital not in our current directory?</p>
                     <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-2 mb-6 max-w-md mx-auto">
                        We are adding new hospitals daily. Even if it's not listed here, our AI can still analyze your bill and find errors.
                     </p>
                     <Link 
                        to="/?step=HERO"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primaryHover"
                     >
                        Scan Bill Instead
                     </Link>
                 </div>
             )}
          </div>

          {/* Load More Button */}
          {hasMore && (
              <div className="mt-10 text-center">
                  <button 
                    onClick={handleShowMore}
                    className="inline-flex items-center px-6 py-3 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-md text-text-main-light dark:text-text-main-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                      Show More Hospitals ({filteredHospitals.length - displayedHospitals.length} remaining)
                  </button>
              </div>
          )}

          <div className="mt-16 bg-white dark:bg-surface-dark border border-primary/20 rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-text-main-light dark:text-text-main-dark">Don't see your hospital?</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-lg mx-auto">
              Our AI works with ANY hospital bill in the US, regardless of our directory listing.
            </p>
            <Link 
              to="/?step=HERO" 
              className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg"
            >
              Scan Any Bill Now
            </Link>
          </div>

          {/* SEO Content Block: FAQ for ranking high-intent keywords */}
          <div className="mt-20 pt-10 border-t border-border-light dark:border-border-dark">
              <h2 className="text-2xl font-bold mb-6 text-text-main-light dark:text-text-main-dark text-center">Frequently Asked Questions about Hospital Financial Aid</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-2">Are all hospitals required to provide charity care?</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          Not all, but non-profit hospitals (which make up nearly 60% of US hospitals) are required by IRS Section 501(r) to have a Financial Assistance Policy (FAP). Even for-profit hospitals often have charity programs to write off tax liabilities.
                      </p>
                  </div>
                  <div>
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-2">What income qualifies for 100% forgiveness?</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          It varies by hospital policy, but generally, if your household income is below 200% of the Federal Poverty Level (approx. $30,000 for an individual in 2025), you will likely qualify for free care.
                      </p>
                  </div>
                  <div>
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-2">Can I apply after the bill goes to collections?</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          Yes. Under federal law, you usually have 240 days from the first billing statement to apply. Once you submit an application, the hospital must recall the debt from collections while they review your case.
                      </p>
                  </div>
                  <div>
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-2">Does financial assistance cover copays?</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          Often, yes. Financial assistance can be used as a "secondary insurance" to cover high deductibles and copays that your primary insurance didn't cover, provided you meet the income requirements.
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDirectory;
