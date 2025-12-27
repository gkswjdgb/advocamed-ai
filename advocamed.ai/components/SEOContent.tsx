import React from 'react';

export const SEOContent: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <section id="seo-content" className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-red text-gray-600">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Understanding Your Medical Bill Rights
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Knowledge is power. Learn how the US healthcare billing system works and how to protect your wallet.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                    {/* Article 1 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            What is the No Surprises Act?
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Effective from 2022, the <strong>No Surprises Act</strong> protects patients from receiving surprise medical bills from out-of-network providers at in-network facilities. If you received emergency care, you generally cannot be billed more than your in-network cost-sharing amount. AdvocaMed checks your bill for these violations automatically.
                        </p>
                    </div>

                    {/* Article 2 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            How Charity Care (IRS 501r) Works
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Under <strong>IRS Section 501(r)</strong>, non-profit hospitals in the US must provide financial assistance policies (FAPs). If your income is below a certain percentage of the Federal Poverty Level (FPL), typically 200%-400%, you may be legally entitled to a reduced bill or complete forgiveness, regardless of insurance status.
                        </p>
                    </div>

                    {/* Article 3 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Common Medical Billing Errors in {currentYear}
                        </h3>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Upcoding:</strong> Being billed for a more expensive service than what was performed.</li>
                            <li><strong>Unbundling:</strong> Separating charges that should be billed together under one code to increase cost.</li>
                            <li><strong>Duplicate Billing:</strong> Being charged twice for the same medication or procedure.</li>
                        </ul>
                    </div>

                    {/* Article 4 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Why You Need an Itemized Bill
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Never pay a summary bill that only says "Lab Services" or "Pharmacy". You have the right to request an <strong>itemized statement</strong> (or "superbill") which lists every specific CPT code. This is essential for detecting errors, as summary bills often hide overcharges. AdvocaMed reads these codes to find discrepancies.
                        </p>
                    </div>
                </div>

                <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to lower your medical expenses?</h3>
                    <p className="mb-6">
                        Our AI analyzes thousands of billing codes and hospital policies instantly.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-gray-800"
                    >
                        Start Free Analysis
                    </button>
                </div>
            </div>
        </section>
    );
};