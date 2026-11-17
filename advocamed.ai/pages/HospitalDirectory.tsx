import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { hospitals } from '../data/hospitals';
import SEO from '../components/SEO';

// Top 16 High-Impression Search Console Priority Hospitals (Targeting Rank 8-10.7 -> Top 3 Jump)
const PRIORITY_HOSPITAL_SLUGS = [
  'emory-healthcare',
  'nyu-langone-health',
  'northwestern-medicine',
  'johns-hopkins-medicine',
  'new-york-presbyterian',
  'mass-general-brigham',
  'vanderbilt-university-medical-center',
  'ucla-health',
  'cleveland-clinic',
  'piedmont-atlanta-hospital',
  'penn-medicine',
  'duke-university-health-system',
  'mayo-clinic',
  'osu-wexner-medical-center',
  'mount-sinai-health-system',
  'upmc-presbyterian'
];

const STATE_CLUSTERS = [
  { code: 'ALL', label: 'All US Systems' },
  { code: 'GA', label: 'Georgia (Emory & Piedmont)' },
  { code: 'NY', label: 'New York (NYP, NYU, Mt Sinai)' },
  { code: 'PA', label: 'Pennsylvania (Penn, UPMC, CHOP)' },
  { code: 'CA', label: 'California (UCLA, UCSF, Stanford)' },
  { code: 'MA', label: 'Massachusetts (MGB, Boston)' },
  { code: 'OH', label: 'Ohio (Cleveland Clinic, OSU)' },
  { code: 'MD', label: 'Maryland (Johns Hopkins)' },
  { code: 'IL', label: 'Illinois (Northwestern, Rush)' },
  { code: 'NC', label: 'North Carolina (Duke, UNC)' },
  { code: 'TN', label: 'Tennessee (Vanderbilt)' },
  { code: 'TX', label: 'Texas (Houston Methodist, UTSW)' }
];

const HospitalDirectory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [limit, setLimit] = useState(50);

  const priorityHospitals = useMemo(
    () =>
      PRIORITY_HOSPITAL_SLUGS.map(slug => hospitals.find(h => h.slug === slug)).filter(
        Boolean
      ) as typeof hospitals,
    []
  );

  // Filter by search query (Name, Acronym, City, State, Affiliated Sub-Hospitals) and State Cluster
  const filteredHospitals = useMemo(() => {
    return hospitals.filter(h => {
      const matchesState = selectedState === 'ALL' || h.state === selectedState;
      if (!matchesState) return false;
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      const matchesBasic =
        h.name.toLowerCase().includes(query) ||
        (h.acronym && h.acronym.toLowerCase().includes(query)) ||
        h.city.toLowerCase().includes(query) ||
        h.state.toLowerCase().includes(query);

      const matchesAffiliate =
        h.affiliated_hospitals &&
        h.affiliated_hospitals.some(aff => aff.toLowerCase().includes(query));

      return matchesBasic || matchesAffiliate;
    });
  }, [searchQuery, selectedState]);

  const displayedHospitals = filteredHospitals.slice(0, limit);
  const hasMore = displayedHospitals.length < filteredHospitals.length;

  return (
    <>
      <SEO 
        title="2026 Hospital Financial Assistance & Charity Care Directory (FPL Limits & PDFs)" 
        description="Search verified IRS Section 501(r) Charity Care policies, 2026 FPL income limits, application PDFs, and direct billing phone numbers for top US hospital systems."
        canonical="/hospitals"
      />
      <div className="bg-background-light dark:bg-background-dark min-h-screen py-12 px-4 font-display">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>2026 IRS Form 990 Schedule H &amp; HHS Poverty Guidelines Verified</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main-light dark:text-text-main-dark mb-3">
              US Hospital Charity Care &amp; Financial Assistance Directory
            </h1>
            <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-8">
              Search by hospital name, billing statement acronym (e.g., <strong>EHC, NYP, MGB, JHM, UPHS</strong>), city, or state to check 2026 FPL income cutoffs for 100% bill forgiveness.
            </p>

            {/* Search Bar Component */}
            <div className="max-w-xl mx-auto relative group mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-12 py-4 border border-border-light dark:border-border-dark rounded-full leading-5 bg-white dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20 sm:text-sm shadow-sm transition-all"
                placeholder="Search by Hospital Name, Acronym (EHC, NYP, JHM), or City..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setLimit(50);
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

            {/* State / Regional Cluster Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {STATE_CLUSTERS.map(cluster => (
                <button
                  key={cluster.code}
                  type="button"
                  onClick={() => setSelectedState(cluster.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedState === cluster.code
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cluster.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority High-Volume Hospital Hub (Concentrates Internal Link Authority on Top 16 Systems) */}
          {!searchQuery && selectedState === 'ALL' && (
            <div className="mb-12 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                    High-Demand 2026 Policies
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main-light dark:text-text-main-dark">
                    Most Searched Major Health Systems (Direct PDF &amp; Phone Guides)
                  </h2>
                </div>
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Includes sub-hospital affiliates &amp; 10-second calculators
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {priorityHospitals.map(h => (
                  <Link
                    key={h.slug}
                    to={`/hospital/${h.slug}`}
                    className="bg-white dark:bg-surface-dark p-3.5 rounded-xl border border-border-light dark:border-border-dark hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {h.acronym || h.state}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {h.fpl_limit}% FPL Free
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-text-main-light dark:text-text-main-dark line-clamp-1">
                        {h.name}
                      </h3>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-text-secondary-light dark:text-text-secondary-dark">
                      <span>{h.city}, {h.state}</span>
                      <span className="text-primary font-bold">Check Eligibility &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Showing <strong>{displayedHospitals.length}</strong> verified health systems {selectedState !== 'ALL' ? `in ${selectedState}` : ''}
            </span>
          </div>

          {/* Hospital Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedHospitals.length > 0 ? (
              displayedHospitals.map((hospital) => (
                <Link 
                  key={hospital.id} 
                  to={`/hospital/${hospital.slug}`}
                  className="group bg-white dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex justify-between items-center active:scale-[0.99]"
                >
                  <div className="overflow-hidden pr-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors truncate">
                        {hospital.name}
                      </h3>
                      {hospital.acronym && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-primary flex-shrink-0">
                          {hospital.acronym}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark gap-2">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">
                        {hospital.city}, {hospital.state}
                      </span>
                      {hospital.phone && (
                        <span className="font-mono truncate">📞 {hospital.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 block">
                      100% Free &le; {hospital.fpl_limit}% FPL
                    </span>
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-1 block">
                      Partial up to {hospital.partial_fpl_limit || 400}% FPL
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white dark:bg-surface-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
                <p className="text-text-main-light dark:text-text-main-dark text-lg font-bold">Hospital not listed in this filter?</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-2 mb-6 max-w-md mx-auto">
                  Federal IRS Section 501(r) rules apply to all non-profit US hospitals. Upload your bill to our AI scanner to audit CPT codes and generate a dispute letter for any provider.
                </p>
                <Link 
                  to="/?step=HERO"
                  className="inline-flex items-center px-6 py-3 text-sm font-bold rounded-xl shadow-sm text-white bg-primary hover:bg-primary-hover"
                >
                  Scan Any Hospital Bill Now
                </Link>
              </div>
            )}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button 
                onClick={() => setLimit(prev => prev + 50)}
                className="inline-flex items-center px-6 py-3 border border-border-light dark:border-border-dark shadow-sm text-sm font-bold rounded-xl text-text-main-light dark:text-text-main-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Show More Hospitals ({filteredHospitals.length - displayedHospitals.length} remaining)
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default HospitalDirectory;
