import React from 'react';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blogData';

interface BlogListProps {
  onPostClick: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onPostClick }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Patient Advocacy Blog</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Latest guides on medical billing, patient rights, and financial aid.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        {blogPosts.map((post) => (
          <div key={post.id} className="cursor-pointer group" onClick={() => onPostClick(post)}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readingTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                        {post.date}
                    </div>
                    <span className="text-primary font-medium text-sm flex items-center group-hover:underline">
                        Read Guide 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
