import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Download, BookOpen, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';
import { blogPostsData } from '../data';
import { sanitizeInput, sanitizePhone, submitNetlifyForm } from '../lib/utils';

interface BlogDetailProps {
  blogId: string;
  onBack: () => void;
  onSelectBlog: (blogId: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function BlogDetail({ blogId, onBack, onSelectBlog, onNavigate }: BlogDetailProps) {
  const post = blogPostsData.find(p => p.id === blogId) || blogPostsData[0];

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideEmail, setGuideEmail] = useState('');
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(leadName);
    const cleanPhone = sanitizePhone(leadPhone);

    if (!cleanName || cleanPhone.length !== 10) {
      alert('Please enter a valid name and 10-digit mobile number');
      return;
    }
    setLeadSubmitted(true);

    await submitNetlifyForm('blog-lead-consultation', {
      name: cleanName,
      phone: cleanPhone,
      articleTitle: post.title,
    });

    const emailTo = "info.aurumproperties@gmail.com";
    const subject = encodeURIComponent(`[Blog Lead Capture] Inquiry from ${cleanName}`);
    const body = encodeURIComponent(
      `Dear Aurum Properties Team,\n\n` +
      `A reader of your essay "${post.title}" has submitted their contact details for a free consultation:\n\n` +
      `- Reader Name: ${cleanName}\n` +
      `- Reader Phone: ${cleanPhone}\n` +
      `- Read Article: ${post.title}\n\n` +
      `Please contact them immediately regarding their real estate interests.\n\n` +
      `Best regards,\n` +
      `${cleanName}`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    setLeadName('');
    setLeadPhone('');
    setTimeout(() => {
      setLeadSubmitted(false);
    }, 4000);
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitizeInput(guideEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    setGuideSubmitted(true);

    await submitNetlifyForm('blog-guide-download', {
      email: cleanEmail,
    });

    const emailTo = "info.aurumproperties@gmail.com";
    const subject = encodeURIComponent(`[Ebook Request] Free Investment Guide - ${cleanEmail}`);
    const body = encodeURIComponent(
      `Dear Aurum Properties Team,\n\n` +
      `A user has requested a free copy of the "Tamil Nadu Real Estate Smart Buyer Guide 2025" through the portal:\n\n` +
      `- Requestor Email: ${cleanEmail}\n\n` +
      `Please send the buyer guide PDF copy to this address as requested.\n\n` +
      `Best regards,\n` +
      `Aurum Portal System`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    setGuideEmail('');
    setTimeout(() => {
      setGuideSubmitted(false);
      setShowGuideModal(false);
    }, 3000);
  };

  const trendingPosts = blogPostsData.filter(p => p.id !== blogId).slice(0, 5);

  const handleTrendingClick = (id: string) => {
    onSelectBlog(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="blog-detail" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back button link */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-gold-dark tracking-wide uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-gold" />
          Back to Blogs
        </button>

        <span className="text-xs text-slate-500 font-sans">
          Home / Blogs / <span className="font-semibold text-brand-green">{post.category}</span>
        </span>
      </div>

      {/* Main Grid: 70% Left | 30% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: ARTICLE CONTENT (8 Cols) */}
        <article className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          
          {/* Article Header info */}
          <div className="space-y-4">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-brand-green/5 text-brand-green px-3 py-1 rounded-full">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-green leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {/* Author details */}
            <div className="flex items-center gap-4 border-y border-slate-100 py-4 text-xs font-sans">
              <div className="w-10 h-10 rounded-full bg-brand-green text-brand-gold font-serif font-bold flex items-center justify-center border border-brand-gold/25">
                {post.authorAvatar}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-brand-green">{post.author}</h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{post.authorTitle}</p>
              </div>
              <div className="text-right space-y-1 text-slate-400">
                <span className="block font-semibold uppercase tracking-wide flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" /> {post.date}
                </span>
                <span className="block font-medium flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" /> {post.readingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image with Gradient Overlay */}
          <div className="h-64 sm:h-96 rounded-2xl relative overflow-hidden p-8 flex items-center justify-center text-center">
            {post.imageUrl ? (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${post.imageGradientFrom} ${post.imageGradientTo}`}></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative z-20 text-white space-y-1.5 max-w-md pointer-events-none">
              <span className="text-[10px] font-extrabold text-brand-gold tracking-widest uppercase font-sans">SPECIAL REPORT</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold leading-normal text-white">{post.title}</h3>
            </div>
          </div>

          {/* Core Body content */}
          <div className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
            
            {post.paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:font-black first-letter:text-brand-green first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {p}
              </p>
            ))}

            {/* Inline blockquote */}
            <div className="border-l-4 border-brand-gold bg-[#F8FAF9] p-6 rounded-r-2xl shadow-inner my-8">
              <p className="font-serif text-sm sm:text-base italic text-brand-green leading-relaxed">
                "Tamil Nadu land investments remain the absolute gold standard for families desiring a secure, physical estate. Unlike other variables, well-vetted land yields consistent value and doesn't rust, crack, or age."
              </p>
              <span className="block text-[10px] font-bold text-brand-gold-dark uppercase tracking-widest mt-2 font-sans">
                — Real Estate Board of Advisors, Tamil Nadu
              </span>
            </div>

            {/* Numbered list of 5 investment tips */}
            <div className="space-y-4 my-8">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green">Top 5 Golden Rules for Plot Investors in Tamil Nadu</h3>
              
              <ol className="space-y-3.5 list-none pl-0">
                {[
                  { num: "01", title: "Always Insist on Certified Layout Approval", text: "Ensure the enclave has a clear approval stamped by CMDA or DTCP. Unapproved layouts do not qualify for banking loans or building permits." },
                  { num: "02", title: "Verify RERA Status Independently", text: "Search the official rera.tn.gov.in portal to match layouts, boundaries, and registered owner declarations to ensure complete regulatory compliance." },
                  { num: "03", title: "Request 30-Year Encumbrance Certificates", text: "A clean EC proves there are no outstanding mortgages or minor legal claims on your physical land, securing your complete ownership transfer." },
                  { num: "04", title: "Study Surrounding Road Infrastructures", text: "Appreciation is heavily bound to national highways and bypass corridors. High-width internal tar roads inside the gated community are vital." },
                  { num: "05", title: "Secure Continuous Ground Water Source", text: "Before finalizing, check nearby waterbodies. Gated layouts with deep rainwater recharge mechanisms enjoy perpetual sweet groundwater tables." }
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    whileHover={{ scale: 1.01, borderColor: '#D4AF37' }}
                    className="flex gap-4 items-start bg-[#F8FAF9] p-4 rounded-xl border border-slate-100 cursor-pointer transition-colors"
                  >
                    <span className="font-serif text-lg font-black text-brand-gold-dark shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-green">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">{item.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Data table of city-wise appreciation */}
            <div className="space-y-4 my-8">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green">City-wise Plot Price Appreciation Index (Average % YoY)</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                A historical look at the average compound price growth of DTCP approved gated layouts across key corridors.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans bg-white">
                  <thead>
                    <tr className="bg-brand-green text-white font-sans text-[11px] font-extrabold uppercase tracking-wider">
                      <th className="p-4">Investment Corridor (City)</th>
                      <th className="p-4">2023 Appreciation</th>
                      <th className="p-4">2024 Appreciation</th>
                      <th className="p-4">2025 Appreciation (Est)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-green">Chennai (Guduvanchery & Tambaram Corridor)</td>
                      <td className="p-4 text-slate-500">+14.2%</td>
                      <td className="p-4 text-slate-500">+16.5%</td>
                      <td className="p-4 text-brand-gold-dark font-semibold">+18.2%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-green">Coimbatore (Saravanampatti & Kovaipudur IT Corridor)</td>
                      <td className="p-4 text-slate-500">+15.8%</td>
                      <td className="p-4 text-slate-500">+19.4%</td>
                      <td className="p-4 text-brand-gold-dark font-semibold">+22.1%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-green">Hosur (Kelamangalam Suburban Corridor)</td>
                      <td className="p-4 text-slate-500">+11.5%</td>
                      <td className="p-4 text-slate-500">+13.8%</td>
                      <td className="p-4 text-brand-gold-dark font-semibold">+15.4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </article>

        {/* RIGHT COLUMN: SIDEBAR DETAILS (4 Cols) */}
        <div className="lg:col-span-4 space-y-8 sticky top-28 z-20">
          
          {/* A. FREE GUIDE DOWNLOAD CTA */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-brand-green">Free Real Estate Buying Guide</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Get our exclusive handbook: "Navigating TN Land Registries, Patta, & RERA Approvals".
              </p>
            </div>

            <button
              onClick={() => setShowGuideModal(true)}
              className="w-full flex items-center justify-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              Download Free Handbook
            </button>
          </div>

          {/* B. TALK TO AN EXPERT FORM */}
          <div className="bg-brand-green text-white p-6 rounded-2xl border border-white/10 shadow-xl space-y-5">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <h4 className="font-serif text-lg font-bold text-brand-gold">Consult Land Experts</h4>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Connect with our certified investment advisors for custom plot recommendations.
              </p>
            </div>

            <form 
              name="blog-lead-consultation"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleLeadSubmit} 
              className="space-y-3"
            >
              <input type="hidden" name="form-name" value="blog-lead-consultation" />
              <p className="hidden" aria-hidden="true">
                <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
              </p>
              <input type="hidden" name="articleTitle" value={post.title} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-gold"
              />
              <input
                type="tel"
                name="phone"
                placeholder="10-Digit Phone"
                maxLength={10}
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-brand-gold"
              />
              
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {leadSubmitted ? 'Connecting...' : 'Request Callback'}
              </button>

              {leadSubmitted && (
                <p className="text-green-300 text-[10px] text-center font-sans mt-2 animate-pulse">
                  ✓ Success! Our Advisor will phone you within 2 hours.
                </p>
              )}
            </form>
          </div>

          {/* C. TRENDING POSTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-serif text-base font-bold text-brand-green border-b border-slate-100 pb-3">
              Trending Articles
            </h4>

            <div className="space-y-3.5">
              {trendingPosts.map((trend) => (
                <div 
                  key={trend.id}
                  onClick={() => handleTrendingClick(trend.id)}
                  className="flex gap-3 cursor-pointer group select-none hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${trend.imageGradientFrom} ${trend.imageGradientTo} shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="space-y-1">
                    <h5 className="font-sans font-bold text-xs text-brand-green group-hover:text-brand-gold leading-snug line-clamp-2 transition-colors">
                      {trend.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-sans block">{trend.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Guide Download Modal */}
      <AnimatePresence>
        {showGuideModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowGuideModal(false)}></div>
            
            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 max-w-md w-full relative z-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-green/5 text-brand-green rounded-full flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-brand-green" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-brand-green">Download Buying Guide</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Provide your email address to instantly download our complete regulatory land handbook.
                </p>
              </div>

              <form 
                name="blog-guide-download"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleGuideSubmit} 
                className="space-y-3 text-left"
              >
                <input type="hidden" name="form-name" value="blog-guide-download" />
                <p className="hidden" aria-hidden="true">
                  <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
                </p>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Your Corporate Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={guideEmail}
                    onChange={(e) => setGuideEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-brand-green placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {guideSubmitted ? 'Preparing PDF...' : 'Download Handbook Now'}
                </button>
              </form>

              {guideSubmitted && (
                <p className="text-green-600 text-xs font-bold font-sans flex items-center justify-center gap-1.5 animate-pulse">
                  ✓ Handbook sent! Please check your email inbox.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
