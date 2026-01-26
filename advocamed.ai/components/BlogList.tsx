import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export const BlogList: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl">Patient Advocacy Blog</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-text-secondary-light dark:text-text-secondary-dark sm:mt-4">
          Latest guides on medical billing, patient rights, and financial aid.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col h-full bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-all">
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
               {post.imageUrl ? (
                 <img 
                   src={post.imageUrl} 
                   alt={post.title} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   loading="lazy"
                 />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <span className="material-symbols-outlined text-5xl">article</span>
                 </div>
               )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{post.readingTime}</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light dark:border-border-dark">
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {post.date}
                  </span>
                  <span className="text-primary font-bold text-sm flex items-center group-hover:underline">
                      Read Guide 
                      <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
