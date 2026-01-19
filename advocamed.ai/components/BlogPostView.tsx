import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import SEO from './SEO';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onScanNow: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack, onScanNow }) => {
  // Handle in-content button clicks
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.getAttribute('onclick')?.includes('window.scrollTo')) {
            e.preventDefault();
            onScanNow();
        }
    };
    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, [onScanNow]);

  return (
    <div className="bg-white">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        canonical={`/blog/${post.id}`} 
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Articles
        </button>

        <article className="prose prose-lg prose-indigo mx-auto text-gray-600">
          <div className="text-center mb-10 border-b border-gray-100 pb-8">
             <div className="flex justify-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.category}
                </span>
             </div>
             <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">{post.title}</h1>
             <time className="text-gray-400 text-sm block">{post.date} • {post.readingTime}</time>
          </div>

          {/* Render the HTML content safely */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* E-E-A-T Trust Signal: Author Box */}
          <div className="mt-12 not-prose">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-gray-200 shrink-0">
                      👨‍⚕️
                  </div>
                  <div>
                      <p className="font-bold text-gray-900 text-sm">Reviewed by the AdvocaMed Team</p>
                      <p className="text-xs text-gray-500 mt-1">
                          Our guides are updated weekly based on the latest 2025 CMS regulations, IRS 501(r) guidelines, and consumer protection laws (No Surprises Act).
                      </p>
                  </div>
              </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                    <h3 className="font-bold text-white text-lg">Have a bill like this?</h3>
                    <p className="text-sm text-gray-300">Scan it now to find errors or apply for aid.</p>
                </div>
                <button 
                    onClick={onScanNow}
                    className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg whitespace-nowrap"
                >
                    Start Free Analysis
                </button>
             </div>
          </div>
        </article>
      </div>
    </div>
  );
};
