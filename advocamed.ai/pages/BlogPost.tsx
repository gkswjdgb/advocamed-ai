import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  // Handle in-content action clicks to direct to home for scanning
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const actionBtn = target.closest('[data-action]');
        
        if (actionBtn) {
            const action = actionBtn.getAttribute('data-action');
            if (action === 'scan') {
                e.preventDefault();
                // Clear URL and navigate home with the upload step
                navigate('/?step=HERO');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center bg-background-light dark:bg-background-dark min-h-screen">
        <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Article not found</h2>
        <Link to="/blog" className="text-primary hover:underline mt-4 block">Return to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://www.advocamed.com/og-image.png",
    "author": {
      "@type": "Organization",
      "name": "AdvocaMed AI Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AdvocaMed",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.advocamed.com/favicon.svg"
      }
    },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.advocamed.com/blog/${post.id}`
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        canonical={`/blog/${post.id}`} 
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/blog"
          className="mb-8 flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          Back to Articles
        </Link>

        <article className="prose prose-lg prose-indigo mx-auto text-text-secondary-light dark:text-text-secondary-dark">
          <div className="text-center mb-10 border-b border-border-light dark:border-border-dark pb-8">
             <div className="flex justify-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {post.category}
                </span>
             </div>
             <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl mb-4">{post.title}</h1>
             <time className="text-gray-400 text-sm block">{post.date} • {post.readingTime}</time>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
             <div className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div>
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Have a bill like this?</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Scan it now to find errors or apply for aid.</p>
                </div>
                <button 
                    onClick={() => navigate('/?step=HERO')}
                    className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-sm whitespace-nowrap"
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

export default BlogPost;
