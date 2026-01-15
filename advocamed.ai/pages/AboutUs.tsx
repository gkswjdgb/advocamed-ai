import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <>
      <SEO 
        title="About AdvocaMed - Our Mission"
        description="We are dedicated to ending the medical debt crisis in America through AI transparency and patient education."
        canonical="/about"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 pt-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Democratizing Medical Billing Transparency
            </h1>
            
            <div className="prose prose-lg prose-indigo text-gray-500">
                <p>
                    Medical debt is the leading cause of bankruptcy in the United States. At <strong>AdvocaMed</strong>, we believe that understanding your healthcare costs shouldn't require a medical degree.
                </p>
                <p>
                    Hospitals operate with complex "Chargemasters" and obscure coding systems that leave patients confused and vulnerable to overcharges. Our mission is to level the playing field.
                </p>

                <h2 className="text-gray-900">How Our Technology Works</h2>
                <p>
                    We leverage advanced Computer Vision and Large Language Models (LLMs) to instantly audit medical bills. By digitizing paper statements and cross-referencing CPT codes against national Medicare datasets, we identify:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Upcoding Violations:</strong> When a provider bills for a higher level of service than performed.</li>
                    <li><strong>Unbundling:</strong> When inclusive procedures are separated into multiple charges.</li>
                    <li><strong>Price Variances:</strong> Charges that exceed 300% of the regional median.</li>
                </ul>

                <h2 className="text-gray-900">Why We Focus on Charity Care</h2>
                <p>
                    Federal law (IRS Section 501r) requires non-profit hospitals to provide financial assistance to low-income patients. However, these policies are often hidden deep within hospital websites.
                </p>
                <p>
                    We have built one of the largest structured databases of hospital financial assistance policies in the US, making it easy for patients to find out if they qualify for bill forgiveness instantly.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8 not-prose">
                    <h3 className="font-bold text-gray-900 mb-2">Our Commitment to Privacy</h3>
                    <p className="text-sm">
                        Your medical data belongs to you. We process bills in real-time and do not sell your personal health information to advertisers or data brokers.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                    <Link to="/contact-us" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Contact Support
                    </Link>
                    <Link to="/?step=UPLOAD" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryHover">
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
