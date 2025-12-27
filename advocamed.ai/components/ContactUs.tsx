import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 pt-24">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2">Have questions about your medical bill analysis? We're here to help.</p>
        </div>

        {/* Formspree connected form */}
        <form action="https://formspree.io/f/xpqzpbrz" method="POST" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your email
            </label>
            <input 
              type="email" 
              name="email" 
              required
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your message
            </label>
            <textarea 
              name="message" 
              required
              rows={5}
              placeholder="How can we assist you today?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FF4F4F] hover:bg-[#E04343] text-white font-bold py-4 rounded-xl shadow-lg transition-colors"
          >
            Send Message
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          *We typically respond within 48 business hours.
        </p>
      </div>
    </div>
  );
}
