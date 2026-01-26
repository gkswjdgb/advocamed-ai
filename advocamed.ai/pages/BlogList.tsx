import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogList: React.FC = () => {
  return (
    <>
      <SEO 
        title="Medical Billing Guides & Tips"
        description="Expert advice on lowering medical bills, understanding CPT codes, and applying for hospital financial assistance."
        canonical="/blog"
      />
      <div className="bg-background-light dark:bg-background-dark min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl">Patient Advocacy Blog</h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-text-secondary-light dark:text-text-secondary-dark sm:mt-4">
              Latest guides on medical billing, patient rights, and financial aid.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group block h-full animate-fade-in-up">
                <div className="bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col hover:border-primary/50">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {post.category}
                        </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{post.readingTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-base text-text-secondary-light dark:text-text-secondary-dark line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            {post.date}
                        </div>
                        <span className="text-primary font-medium text-sm flex items-center group-hover:underline">
                            Read Guide 
                            <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
