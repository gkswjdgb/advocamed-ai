import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogList: React.FC = () => {
  return (
    <>
      <SEO 
        title="Patient Advocacy Knowledge Hub | Medical Billing Guides"
        description="Browse our complete library of guides on fighting medical bills, understanding health insurance, and applying for financial assistance."
        canonical="/blog"
      />
      <div className="bg-background-light dark:bg-background-dark min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-display">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Resource Center</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main-light dark:text-text-main-dark mb-6 tracking-tight">
              Master Your Medical Bills
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              Expert advice, legal rights, and step-by-step guides to help you stop overpaying for healthcare.
            </p>
          </div>

          {/* Main Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Blog Posts */}
            <div className="lg:col-span-2 grid gap-8 md:grid-cols-2">
              {blogPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`} 
                  className="group flex flex-col h-full bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                     {post.imageUrl ? (
                       <img 
                         src={post.imageUrl} 
                         alt={post.title} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         loading="lazy"
                       />
                     ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100">
                          <span className="material-symbols-outlined text-6xl opacity-50">article</span>
                       </div>
                     )}
                     <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 text-primary shadow-sm backdrop-blur-sm">
                          {post.category}
                        </span>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:underline decoration-2 underline-offset-4">
                        Read Full Article 
                        <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* CTA Widget: Dispute Template */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border-2 border-primary/10 shadow-lg sticky top-24">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 mb-6 mx-auto transform -rotate-3">
                        <span className="material-symbols-outlined text-4xl">gavel</span>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-text-main-light dark:text-text-main-dark mb-2">
                        Fight Back Today
                    </h3>
                    <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
                        Download our battle-tested <strong>Medical Bill Dispute Letter</strong> template. It's 100% free and works for upcoding errors.
                    </p>
                    <Link to="/blog/medical-bill-dispute-letter-template-2026" className="block w-full bg-primary hover:bg-primary-hover text-white text-center font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                        Download Free Template
                    </Link>
                    <p className="text-[10px] text-center text-gray-400 mt-4">
                        *Updated for 2026 Regulations
                    </p>
                </div>

                {/* Secondary Widget: Upload Bill */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Have a confusing bill?</h3>
                    <p className="text-gray-300 text-sm mb-6">
                        Our AI can scan it for errors in seconds. No account required.
                    </p>
                    <Link to="/?step=HERO" className="block w-full bg-white text-gray-900 text-center font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                        Scan Bill Now
                    </Link>
                </div>

            </div>

          </div>

          {/* Newsletter / CTA */}
          <div className="mt-20 bg-blue-600 dark:bg-blue-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 max-w-2xl mx-auto">
                <span className="material-symbols-outlined text-5xl mb-4">mail</span>
                <h2 className="text-3xl font-bold mb-4">Stay Informed, Save Money</h2>
                <p className="text-blue-100 mb-8 text-lg">
                    Join 15,000+ patients getting weekly tips on fighting medical debt and understanding insurance loopholes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact-us" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                        Contact Us
                    </Link>
                    <Link to="/?step=HERO" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-900 transition-colors shadow-lg border border-blue-500">
                        Analyze a Bill Now
                    </Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogList;
