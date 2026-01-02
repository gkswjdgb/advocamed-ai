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
      <div className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Hospital Policy Database</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Search over 5,000 US hospitals to find their charity care policies, income limits, and how to apply for forgiveness.
            </p>

            {/* Search Bar Component */}
            <div className="max-w-xl mx-auto relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20 sm:text-sm shadow-sm transition-all"
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
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-gray-500">
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
                      className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex justify-between items-center active:scale-[0.99]"
                    >
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                            {hospital.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                             <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold text-gray-600 mr-2 flex-shrink-0">{hospital.state}</span>
                             <span className="truncate">{hospital.city}</span>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right flex-shrink-0 pl-2">
                         <span className={`text-xs font-bold px-2 py-1 rounded-full ${hospital.fpl_limit ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {hospital.fpl_limit ? `Up to ${hospital.fpl_limit}% FPL` : 'Verify Policy'}
                         </span>
                      </div>
                    </Link>
                 ))
             ) : (
                 <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-gray-300">
                     <p className="text-gray-600 text-lg font-medium">Hospital not in our current directory?</p>
                     <p className="text-gray-500 text-sm mt-2 mb-6 max-w-md mx-auto">
                        We are adding new hospitals daily. Even if it's not listed here, our AI can still analyze your bill and find errors.
                     </p>
                     <Link 
                        to="/?step=UPLOAD"
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
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                      Show More Hospitals ({filteredHospitals.length - displayedHospitals.length} remaining)
                  </button>
              </div>
          )}

          <div className="mt-16 bg-secondary text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Don't see your hospital?</h3>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Our AI works with ANY hospital bill in the US, regardless of our directory listing.
            </p>
            <Link 
              to="/?step=UPLOAD" 
              className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg"
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
