import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, BookOpen, ArrowRight, RefreshCw } from 'lucide-react';
import { BlogPost } from '../types';
import { blogPostsData } from '../data';

interface BlogsProps {
  onSelectBlog: (blogId: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Blogs({ onSelectBlog, onNavigate }: BlogsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Investment Tips', 'Tamil Nadu Real Estate News', 'Buying Guides', 'Legal Matters'];

  // Filter blog posts
  const filteredBlogs = selectedCategory === 'All'
    ? blogPostsData
    : blogPostsData.filter(post => post.category === selectedCategory);

  const featuredPost = blogPostsData.find(post => post.isFeatured) || blogPostsData[0];

  const categoryColors: Record<string, string> = {
    'Investment Tips': 'bg-emerald-100 text-emerald-800',
    'Tamil Nadu Real Estate News': 'bg-blue-100 text-blue-800',
    'Buying Guides': 'bg-amber-100 text-amber-800',
    'Legal Matters': 'bg-red-100 text-red-800'
  };

  const handleReadBlog = (blogId: string) => {
    onSelectBlog(blogId);
    onNavigate('blog-detail');
  };

  // Motion Grid variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 14 }
    }
  };

  return (
    <section id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">
          REAL ESTATE BLOG & LAND BUYING GUIDES &bull; PROPERTY DEVELOPERS TAMIL NADU
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">
          Real Estate Insights & Plots Guides
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
          Expert articles on CMDA approved plots for sale, residential land investment trends in Chennai & Tamil Nadu, and legal checklists from Aurum Properties.
        </p>
      </div>

      {/* A. FEATURED POST HERO BANNER */}
      {featuredPost && selectedCategory === 'All' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="blogs-featured-hero"
          className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch group"
        >
          {/* Left image with gradient cover (5 Cols) */}
          <div className="lg:col-span-5 min-h-[300px] relative overflow-hidden p-8 text-white flex flex-col justify-between">
            {featuredPost.imageUrl ? (
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.imageGradientFrom} ${featuredPost.imageGradientTo}`}></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10 pointer-events-none"></div>
            
            <span className="self-start bg-brand-gold text-brand-green text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider relative z-20 shadow-md">
              FEATURED ESSAY
            </span>

            <div className="relative z-20 space-y-2 pointer-events-none">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featuredPost.readingTime}
              </span>
              <p className="text-sm text-white/95 leading-relaxed font-sans font-light">
                Written by our corporate leadership to guide Tamil Nadu property investments.
              </p>
            </div>
          </div>

          {/* Right Text details (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${categoryColors[featuredPost.category]}`}>
                {featuredPost.category}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green tracking-tight">
                {featuredPost.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                {featuredPost.excerpt}
              </p>
            </div>

            {/* Author info & Read button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green text-brand-gold font-serif font-bold text-xs flex items-center justify-center border border-brand-gold/25">
                  {featuredPost.authorAvatar}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-green">{featuredPost.author}</h4>
                  <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">{featuredPost.authorTitle} &bull; {featuredPost.date}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="featured-blog-read-btn"
                onClick={() => handleReadBlog(featuredPost.id)}
                className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Read Article
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* B. CATEGORY FILTER TABS WITH DYNAMIC LAYOUT pill BACKGROUND */}
      <div className="flex items-center justify-start lg:justify-center overflow-x-auto gap-2.5 pb-4 border-b border-slate-100 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`blog-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full font-sans text-xs font-bold tracking-wide uppercase shrink-0 cursor-pointer relative transition-colors ${
                isSelected ? 'text-brand-gold' : 'text-slate-500 hover:text-brand-green'
              }`}
            >
              {/* Dynamic layout-ID slider pill background */}
              {isSelected && (
                <motion.div 
                  layoutId="activeBlogTabPill"
                  className="absolute inset-0 bg-brand-green rounded-full -z-10 shadow-md shadow-brand-green/10"
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* C. 8 BLOG POST CARDS IN GRID WITH STAGGERED MOTION */}
      <AnimatePresence mode="popLayout">
        {filteredBlogs.length > 0 ? (
          <motion.div 
            key="blog-grid-match"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
            id="blog-grid-container"
          >
            {filteredBlogs.map((post) => (
              <motion.div 
                key={post.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -6, borderColor: '#D4AF37' }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Cover top */}
                <div className="h-36 relative overflow-hidden p-5 flex flex-col justify-between">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.imageGradientFrom} ${post.imageGradientTo}`}></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent z-10 pointer-events-none"></div>
                  
                  <span className={`self-start text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm relative z-20 ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>

                  <span className="text-[10px] text-white/90 font-sans font-medium flex items-center gap-1 relative z-20">
                    <Clock className="w-3 h-3 text-brand-gold" /> {post.readingTime}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-sans">{post.date}</span>
                    <h4 
                      className="font-serif font-bold text-sm sm:text-base text-brand-green leading-snug line-clamp-2 hover:text-brand-gold-dark transition-colors cursor-pointer" 
                      onClick={() => handleReadBlog(post.id)}
                    >
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider font-sans">
                      By {post.author.split(' ')[0]}
                    </span>

                    <button
                      onClick={() => handleReadBlog(post.id)}
                      className="text-xs font-bold text-brand-gold-dark hover:text-brand-green transition-colors cursor-pointer flex items-center gap-0.5"
                    >
                      Read More &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="blog-grid-empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-sm mx-auto space-y-4 shadow-sm"
          >
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-brand-green">No Articles Found</h4>
            <p className="text-xs text-slate-500 font-sans">There are no matching articles under the "{selectedCategory}" filter currently.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="bg-brand-green text-brand-gold px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-1.5 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Show All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
