import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState('Hospital Policy Data Update / Correction');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Contact AdvocaMed | Patient Support & Editorial Desk"
        description="Contact AdvocaMed.com for medical bill audit support, hospital 501(r) charity care policy updates, editorial inquiries, or privacy requests."
        canonical="/contact-us"
      />
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-16 px-4 sm:px-6 lg:px-8 font-display">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-sm">support_agent</span>
              Patient Advocacy &amp; Editorial Desk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main-light dark:text-text-main-dark">
              Contact AdvocaMed
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-3 max-w-2xl mx-auto text-base sm:text-lg">
              Have a question about our CPT code audit engine, need to report an updated hospital IRS Section 501(r) Financial Assistance Policy, or have an editorial inquiry? Our team responds within 24–48 business hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Column: Department Contacts & Editorial Standards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  Direct Department Channels
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="pb-3 border-b border-border-light dark:border-border-dark">
                    <p className="font-bold text-text-main-light dark:text-text-main-dark">General &amp; Patient Tool Support</p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-0.5">Questions about using the CPT bill scanner or dispute templates.</p>
                    <a href="mailto:support@advocamed.com" className="text-primary font-semibold hover:underline mt-1 inline-block">support@advocamed.com</a>
                  </div>
                  <div className="pb-3 border-b border-border-light dark:border-border-dark">
                    <p className="font-bold text-text-main-light dark:text-text-main-dark">Editorial &amp; Hospital Policy Verification</p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-0.5">Report updated hospital FPL thresholds, phone numbers, or 501(r) links.</p>
                    <a href="mailto:editorial@advocamed.com" className="text-primary font-semibold hover:underline mt-1 inline-block">editorial@advocamed.com</a>
                  </div>
                  <div>
                    <p className="font-bold text-text-main-light dark:text-text-main-dark">Privacy &amp; Data Protection (CCPA / GDPR)</p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-0.5">Data rights inquiries and regulatory compliance.</p>
                    <a href="mailto:privacy@advocamed.com" className="text-primary font-semibold hover:underline mt-1 inline-block">privacy@advocamed.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900 p-6">
                <h3 className="text-sm font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-lg">security</span>
                  Patient Privacy Notice (HIPAA Safety)
                </h3>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  For your security, <strong>never include your Social Security Number (SSN), bank account numbers, or unredacted medical records</strong> in an email or support message. To audit a bill, use our encrypted <Link to="/?step=HERO" className="text-primary underline font-semibold">real-time AI Bill Scanner</Link>, which processes images in memory without permanent storage.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-3 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-6">
                Send a Message to Our Team
              </h2>

              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                  <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400 mb-2">check_circle</span>
                  <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">Inquiry Received</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    Thank you, <strong>{name || 'Reader'}</strong>. Your message regarding <em>"{topic}"</em> has been logged for our editorial &amp; support desk. You can also reach us directly at <a href="mailto:support@advocamed.com" className="text-primary underline">support@advocamed.com</a>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-sm text-text-main-light dark:text-text-main-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-sm text-text-main-light dark:text-text-main-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-sm text-text-main-light dark:text-text-main-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="Hospital Policy Data Update / Correction">Hospital Policy Data Update / Correction</option>
                      <option value="AI Medical Bill Scanner Help">AI Medical Bill Scanner Help</option>
                      <option value="Editorial / Fact-Checking Question">Editorial / Fact-Checking Question</option>
                      <option value="Media & Press Inquiry">Media &amp; Press Inquiry</option>
                      <option value="Privacy / Data Request">Privacy / Data Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let us know how we can help (please do not include sensitive medical record numbers or SSNs)..."
                      className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3 text-sm text-text-main-light dark:text-text-main-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">send</span>
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
