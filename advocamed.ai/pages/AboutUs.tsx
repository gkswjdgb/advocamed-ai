import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <>
      <SEO 
        title="About AdvocaMed | Bridging the Gap in Healthcare Data"
        description="Learn how AdvocaMed translates complex medical data into actionable intelligence for patients and professionals. Led by biotech experts."
        canonical="/about"
      />
      <div className="bg-background-light dark:bg-background-dark py-16 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in-up font-display">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark sm:text-5xl mb-6">
                Bridging the Gap Between Complex Medical Data and Patient Action
            </h1>
            
            <div className="prose prose-lg prose-blue dark:prose-invert text-text-secondary-light dark:text-text-secondary-dark w-full max-w-none">
                <p className="lead text-xl border-l-4 border-primary pl-4 mb-10">
                    AdvocaMed.ai was founded on a singular premise: <strong>healthcare data is asymmetric</strong>. Our purpose is to serve as the critical infrastructure that translates dense, codified medical and financial terminology into actionable intelligence for both patients and healthcare professionals.
                </p>

                <div className="grid md:grid-cols-2 gap-10 my-10">
                    <div>
                        <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-0 border-b pb-2">The Medical Data Asymmetry</h2>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            Modern medicine is driven by specialized codes—CPT, ICD-10, HCPCS, and DRGs. While these systems are necessary for clinical tracking, they create an impenetrable wall for patients trying to audit their own care. We realized that solving the medical debt crisis wasn't just a legal issue; it was a fundamental data translation problem.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-0 border-b pb-2">Our Engineering Approach</h2>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            By leveraging specialized Large Language Models (LLMs) and computer vision, we map unstructured physical documents (bills, EOBs) directly to structured federal databases (CMS Physician Fee Schedules and IRS 501(r) compliance documentation). This creates a verifiable audit trail that identifies upcoding and unbundling in seconds.
                        </p>
                    </div>
                </div>

                {/* Author Profile */}
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 my-12 flex flex-col md:flex-row gap-8 items-start not-prose">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 border-4 border-white dark:border-gray-800 shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-blue-600 dark:text-blue-300">science</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dr. Alex Chen</h3>
                        <p className="text-primary font-medium text-sm mb-4">Founder & Lead Biotech Architect</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                            With over 15 years bridging the gap between biotechnology and clinical informatics, Dr. Chen's expertise lies in structuring unstructured healthcare data. Having witnessed how algorithmic billing has outpaced patient advocacy, Dr. Chen spearheaded the AdvocaMed underlying architecture, ensuring that our models rigorously map to evidence-based medical coding standards rather than relying on generative guesswork.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-0 leading-relaxed text-sm italic">
                            "Data opacity in healthcare isn't an accident; it's a feature of legacy systems. Our goal is to extract the truth from the noise, providing patients with the forensic tools traditionally reserved for insurance auditors."
                        </p>
                    </div>
                </div>

                <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-8 mb-4">Editorial Standards & Data Accuracy</h2>
                <p>
                    Given the sensitive nature of healthcare finance, our architecture adheres to absolute rigor:
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900 my-6">
                    <ul className="list-disc pl-5 space-y-2 text-blue-900 dark:text-blue-300 text-base">
                        <li><strong>Standardized Baselines:</strong> Our pricing benchmarks are derived strictly from the <strong>CMS Physician Fee Schedule</strong> and <strong>Hospital Price Transparency</strong> machine-readable arrays.</li>
                        <li><strong>Regulatory Verification:</strong> Our hospital charity care database cross-references individual hospital Financial Assistance Policies (FAP) and IRS 501(r) regulatory filings.</li>
                        <li><strong>Algorithmic Integrity:</strong> AdvocaMed employs rule-based guards to prevent AI hallucination; we only report coding errors that match established CMS "National Correct Coding Initiative" (NCCI) definitions.</li>
                    </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                    <Link to="/contact-us" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Contact Our Team
                    </Link>
                    <Link to="/?step=HERO" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryHover transition-colors shadow-sm relative overflow-hidden group">
                        <span className="relative z-10">Access the AI Audit Engine</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
