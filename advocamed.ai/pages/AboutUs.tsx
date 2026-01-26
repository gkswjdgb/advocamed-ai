import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <>
      <SEO 
        title="About AdvocaMed - Our Mission & Editorial Standards"
        description="We are dedicated to ending the medical debt crisis in America through AI transparency. Learn about our editorial standards and data sources."
        canonical="/about"
      />
      <div className="bg-background-light dark:bg-background-dark py-16 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in-up font-display">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark sm:text-4xl mb-8">
                Democratizing Medical Billing Transparency
            </h1>
            
            <div className="prose prose-lg prose-indigo text-text-secondary-light dark:text-text-secondary-dark">
                <p>
                    Medical debt is the leading cause of bankruptcy in the United States. At <strong>AdvocaMed</strong>, we believe that understanding your healthcare costs shouldn't require a medical degree.
                </p>
                <p>
                    Hospitals operate with complex "Chargemasters" and obscure coding systems that leave patients confused and vulnerable to overcharges. Our mission is to level the playing field using technology.
                </p>

                <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-8 mb-4">How Our Technology Works</h2>
                <p>
                    We leverage advanced Computer Vision and Large Language Models (LLMs) to instantly audit medical bills. By digitizing paper statements and cross-referencing CPT codes against national Medicare datasets, we identify:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li><strong>Upcoding Violations:</strong> When a provider bills for a higher level of service than performed.</li>
                    <li><strong>Unbundling:</strong> When inclusive procedures are separated into multiple charges.</li>
                    <li><strong>Price Variances:</strong> Charges that exceed 300% of the regional median.</li>
                </ul>

                <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-8 mb-4">Editorial Standards & Data Accuracy</h2>
                <p>
                    Given the sensitive nature of healthcare finance, we adhere to strict accuracy standards:
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900 my-6">
                    <ul className="list-disc pl-5 space-y-2 text-blue-900 dark:text-blue-300 text-base">
                        <li><strong>Data Sources:</strong> Our pricing benchmarks are derived from the <strong>CMS Physician Fee Schedule</strong> and <strong>Hospital Price Transparency</strong> machine-readable files.</li>
                        <li><strong>Policy Verification:</strong> Our hospital charity care database is manually verified against 501(r) financial assistance policies and updated quarterly.</li>
                        <li><strong>No Medical Advice:</strong> We strictly limit our analysis to <em>administrative billing data</em>. We do not offer medical diagnosis or treatment advice.</li>
                        <li><strong>Human Review:</strong> Our content guides are reviewed for alignment with current laws, including the <em>No Surprises Act</em> and <em>Affordable Care Act</em>.</li>
                    </ul>
                </div>

                <h2 className="text-text-main-light dark:text-text-main-dark font-bold mt-8 mb-4">Why We Focus on Charity Care</h2>
                <p>
                    Federal law (IRS Section 501r) requires non-profit hospitals to provide financial assistance to low-income patients. However, these policies are often hidden deep within hospital websites.
                </p>
                <p>
                    We have built one of the largest structured databases of hospital financial assistance policies in the US, making it easy for patients to find out if they qualify for bill forgiveness instantly.
                </p>

                <div className="bg-gray-100 dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-8 not-prose">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Our Commitment to Privacy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your medical data belongs to you. We process bills in real-time and do not sell your personal health information to advertisers or data brokers.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                    <Link to="/contact-us" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Contact Support
                    </Link>
                    <Link to="/?step=HERO" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryHover transition-colors">
                        Try the Tool
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
