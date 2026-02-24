import React, { useState, useCallback } from 'react';
import { analyzeMedicalBill } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { blogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';

interface HeroProps {
  onAnalysisComplete: (result: AnalysisResult, image: string) => void;
  onLoading: (isLoading: boolean) => void;
  onDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalysisComplete, onLoading, onDemo }) => {
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) {
            reject(new Error("Failed to read file data."));
            return;
        }
        const img = new Image();
        img.onload = () => {
          try {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              // Resize logic for optimal AI processing (max 1500px)
              const MAX_DIMENSION = 1500; 
              if (width > height) {
                if (width > MAX_DIMENSION) {
                  height *= MAX_DIMENSION / width;
                  width = MAX_DIMENSION;
                }
              } else {
                if (height > MAX_DIMENSION) {
                  width *= MAX_DIMENSION / height;
                  height = MAX_DIMENSION;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                reject(new Error("Browser does not support canvas operations."));
                return;
              }
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              const base64Part = dataUrl.split(',')[1];
              if (base64Part) resolve(base64Part);
              else reject(new Error("Failed to encode image."));
          } catch (err) {
              reject(err);
          }
        };
        img.onerror = () => reject(new Error("Failed to load image structure."));
        img.src = event.target.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const processFile = async (file: File) => {
    // 1. PDF Check
    if (file.type === 'application/pdf') {
        setError('⚠️ PDFs are not supported directly. Please take a SCREENSHOT of the PDF and upload the image.');
        return;
    }

    // 2. Format Check
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
      setError('Invalid format. Please upload a JPG, PNG, or HEIC image.');
      return;
    }

    // 3. Size Check
    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Please upload an image smaller than 10MB.`);
      return;
    }

    onLoading(true);
    setError(null);

    try {
      const cleanBase64Data = await processImage(file);
      // Construct Data URI for display
      const imageUrl = `data:image/jpeg;base64,${cleanBase64Data}`;
      
      try {
        const result = await analyzeMedicalBill(cleanBase64Data, 'image/jpeg');
        onAnalysisComplete(result, imageUrl);
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : "An unknown error occurred.";
        console.error("Analysis Error:", errorMessage);
        setError(errorMessage || "Failed to analyze. Please try a clearer photo.");
        onLoading(false);
      }
    } catch (e) {
      console.error("Processing Error");
      setError('Error processing image. Please try again.');
      onLoading(false);
    }
  };

  return (
    <>
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Headline & Steps */}
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold w-fit">
                <span className="material-symbols-outlined text-base">verified_user</span>
                Privacy First • No Account Required
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-text-main-light dark:text-text-main-dark">
                Decipher & Dispute Your <span className="text-primary">Medical Bills</span> with AI — HIPAA Compliant.
              </h1>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-lg leading-relaxed">
                Don't pay the sticker price. Our AI scans CPT codes for upcoding and unbundling errors instantly. Access verified Charity Care policies for 5,000+ US hospitals.
              </p>
            </div>

            {/* Steps Guide - ID added for scroll anchor */}
            <div id="how-it-works" className="grid gap-4 mt-4 scroll-mt-24">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">1. Upload Bill</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Securely submit your PDF (Screenshot) or Image. Data is encrypted.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">2. AI Analysis</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Engine checks CPT codes & detects pricing errors.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">3. Save Money</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Get a generated negotiation script & error report.</p>
                </div>
              </div>
            </div>

            {/* Demo Button for Trust - Made more prominent */}
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <button onClick={onDemo} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all">
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  See Demo Analysis
                </button>
            </div>
          </div>

          {/* Right: Upload Zone */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Background Decoration */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-300/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div 
              className="relative bg-white dark:bg-surface-dark p-8 lg:p-12 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[500px] shadow-lg"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="w-24 h-24 mb-6 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-5xl">description</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">Upload Bill Here</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xs mx-auto">
                Drag & Drop your Image here, or browse from your computer.
              </p>

              {/* Error Message */}
              {error && (
                 <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-bold max-w-sm">
                    {error}
                 </div>
              )}

              <label className="w-full max-w-[280px] bg-primary hover:bg-primary-hover text-white h-12 rounded-lg font-bold shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined">add_circle</span>
                Scan My Bill Now (Free)
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png,image/webp,image/heic"
                    onChange={handleFileChange}
                />
              </label>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-80">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>AES-256 Encryption • Auto-deletion after 24h</span>
              </div>
              
               <div className="mt-2 text-[10px] text-red-400 font-medium">
                  PDF? Please take a Screenshot
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sponsored Ad Placeholder */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-16">
        <div className="w-full h-[120px] bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase tracking-wider mb-2 z-10">Sponsored</p>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5 skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
          {/* Simulating Ad Content - Replace with Google AdSense Unit <ins> tag in production */}
          <div className="flex items-center gap-4 opacity-50 z-10">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white dark:bg-surface-dark py-16 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Latest Medical Billing News</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Stay informed about healthcare costs and patient rights.</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
               View all articles
               <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="group flex flex-col gap-4 h-full">
                <Link to={`/blog/${post.id}`} className="block h-48 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all">
                   {post.imageUrl && !imageError[post.id] ? (
                     <img 
                       src={post.imageUrl} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       loading="lazy"
                       referrerPolicy="no-referrer"
                       onError={() => handleImageError(post.id)}
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100 dark:bg-gray-800">
                        <span className="material-symbols-outlined text-5xl opacity-50">article</span>
                     </div>
                   )}
                </Link>
                <div className="flex flex-col gap-2 flex-grow">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                     {post.excerpt}
                  </p>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-auto pt-2">{post.date} • {post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
             <Link to="/blog" className="inline-flex items-center gap-1 text-primary font-bold hover:underline px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
               View all articles
               <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
