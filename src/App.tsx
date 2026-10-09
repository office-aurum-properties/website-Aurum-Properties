import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SEOHead from './components/SEOHead';
import { sanitizeInput, sanitizePhone, submitNetlifyForm } from './lib/utils';
import { initIdleRoutePrefetch, preloadRoute } from './lib/routePreloader';

// Code-split route components for fast initial bundle and loading
const About = lazy(() => import('./components/About'));
const ProjectsListing = lazy(() => import('./components/ProjectsListing'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const BuildAssist = lazy(() => import('./components/BuildAssist'));
const Blogs = lazy(() => import('./components/Blogs'));
const BlogDetail = lazy(() => import('./components/BlogDetail'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const LegalDocs = lazy(() => import('./components/LegalDocs'));
const NotFound = lazy(() => import('./components/NotFound'));

// Ultra-fast top loading indicator (prevents layout shifts while providing instant visual feedback)
function RouteLoadingFallback() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-brand-green/10 pointer-events-none" role="progressbar" aria-label="Loading page">
      <div className="h-full bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold animate-pulse w-full" />
    </div>
  );
}

// Ultra-crisp Page Wrapper: Instant rendering with smooth 120ms fade
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Wrapper to handle dynamic path parameter for Project Details
function ProjectDetailRouteWrapper({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <ProjectDetail 
      projectId={id || ''}
      onBack={() => navigate('/projects')}
      onNavigate={onNavigate}
    />
  );
}

// Wrapper to handle dynamic path parameter for Blog Details
function BlogDetailRouteWrapper({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <BlogDetail 
      blogId={id || ''}
      onBack={() => navigate('/blogs')}
      onSelectBlog={(blogId) => navigate(`/blogs/${blogId}`)}
      onNavigate={onNavigate}
    />
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected details state fallback
  const [selectedProjectId, setSelectedProjectId] = useState('avinashi');
  const [selectedBlogId, setSelectedBlogId] = useState('right-time-to-buy-2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroFilters, setHeroFilters] = useState<{ city?: string; budget?: string; type?: string } | undefined>(undefined);

  // Call back modal state
  const [callBackModalOpen, setCallBackModalOpen] = useState(false);
  const [callBackName, setCallBackName] = useState('');
  const [callBackPhone, setCallBackPhone] = useState('');
  const [callBackError, setCallBackError] = useState('');
  const [callBackStatus, setCallBackStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Background idle prefetching for ultra-fast instantaneous navigation
  useEffect(() => {
    const cancelPrefetch = initIdleRoutePrefetch();
    return cancelPrefetch;
  }, []);

  // Meta Pixel SPA Route Change Tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'PageView');
    }
  }, [location.pathname]);

  // Compute activeSection from route pathname
  let activeSection = 'home';
  if (location.pathname === '/about') {
    activeSection = 'about';
  } else if (location.pathname === '/projects') {
    activeSection = 'projects';
  } else if (location.pathname.startsWith('/projects/')) {
    activeSection = 'project-detail';
  } else if (location.pathname === '/build-assist') {
    activeSection = 'build-assist';
  } else if (location.pathname === '/blogs') {
    activeSection = 'blogs';
  } else if (location.pathname.startsWith('/blogs/')) {
    activeSection = 'blog-detail';
  } else if (location.pathname === '/contact') {
    activeSection = 'contact';
  } else if (location.pathname === '/privacy') {
    activeSection = 'privacy';
  } else if (location.pathname === '/terms') {
    activeSection = 'terms';
  }

  // Handle high-level menu & button click routing
  const handleNavigate = (sectionId: string) => {
    preloadRoute(sectionId);
    if (sectionId === 'home') {
      navigate('/');
    } else if (sectionId === 'about') {
      navigate('/about');
    } else if (sectionId === 'projects') {
      navigate('/projects');
    } else if (sectionId === 'build-assist') {
      navigate('/build-assist');
    } else if (sectionId === 'blogs') {
      navigate('/blogs');
    } else if (sectionId === 'contact') {
      navigate('/contact');
    } else if (sectionId === 'privacy') {
      navigate('/privacy');
    } else if (sectionId === 'terms') {
      navigate('/terms');
    } else if (sectionId === 'project-detail') {
      navigate(`/projects/${selectedProjectId}`);
    } else if (sectionId === 'blog-detail') {
      navigate(`/blogs/${selectedBlogId}`);
    }
    window.scrollTo(0, 0);
  };

  // Callback modal validations with input sanitization
  const handleCallBackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallBackError('');

    const cleanName = sanitizeInput(callBackName);
    const cleanPhone = sanitizePhone(callBackPhone);

    if (!cleanName) {
      setCallBackError('Please enter your name');
      return;
    }

    if (cleanPhone.length !== 10) {
      setCallBackError('Please enter a valid 10-digit phone number');
      return;
    }

    setCallBackStatus('sending');
    await submitNetlifyForm('callback-request', {
      name: cleanName,
      phone: cleanPhone,
    });
    setCallBackStatus('success');

    // Trigger pre-filled callback request draft
    const emailTo = "info.aurumproperties@gmail.com";
    const subject = encodeURIComponent(`[Urgent Callback Request] ${cleanName}`);
    const body = encodeURIComponent(
      `Dear Aurum Properties Team,\n\n` +
      `I am requesting an immediate callback from your sales team regarding your premium plot layout offerings.\n\n` +
      `My details are as follows:\n` +
      `- Client Name: ${cleanName}\n` +
      `- Contact Phone: ${cleanPhone}\n\n` +
      `Please call me back as soon as possible.\n\n` +
      `Best regards,\n` +
      `${cleanName}`
    );

    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    setCallBackName('');
    setCallBackPhone('');
    
    setTimeout(() => {
      setCallBackModalOpen(false);
      setCallBackStatus('idle');
    }, 2500);
  };

  const handleHeroFilterTrigger = (filters: { city?: string; budget?: string; type?: string }) => {
    setHeroFilters(filters);
    navigate('/projects');
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    navigate(`/projects/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id);
    navigate(`/blogs/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    const cleanQuery = sanitizeInput(query);
    setSearchQuery(cleanQuery);
    if (cleanQuery && location.pathname !== '/projects') {
      navigate('/projects');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative selection:bg-brand-gold/30 selection:text-brand-green">
      <SEOHead />
      
      {/* 1. STICKY HEADER */}
      <Header 
        activeSection={activeSection}
        onSearchChange={handleSearchChange}
        onNavigate={handleNavigate}
        onOpenCallBack={() => setCallBackModalOpen(true)}
      />

      {/* 2. MAIN CORE LAYOUT SYSTEM WITH ROUTING */}
      <main className="flex-grow pb-16">
        <Suspense fallback={<RouteLoadingFallback />}>
          <div key={location.pathname} className="w-full">
            <Routes location={location}>
              <Route path="/" element={
                <PageWrapper>
                  <Home 
                    onSelectProject={handleSelectProject} 
                    onNavigate={handleNavigate} 
                    onFilterTrigger={handleHeroFilterTrigger}
                  />
                </PageWrapper>
              } />
              
              <Route path="/about" element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              } />

              <Route path="/team" element={<Navigate to="/about" replace />} />

              <Route path="/projects" element={
                <PageWrapper>
                  <ProjectsListing 
                    onSelectProject={handleSelectProject} 
                    onNavigate={handleNavigate}
                    externalSearchQuery={searchQuery}
                    initialFilters={heroFilters}
                  />
                </PageWrapper>
              } />

              <Route path="/projects/:id" element={
                <PageWrapper>
                  <ProjectDetailRouteWrapper onNavigate={handleNavigate} />
                </PageWrapper>
              } />

              <Route path="/build-assist" element={
                <PageWrapper>
                  <BuildAssist />
                </PageWrapper>
              } />

              <Route path="/blogs" element={
                <PageWrapper>
                  <Blogs 
                    onSelectBlog={handleSelectBlog}
                    onNavigate={handleNavigate}
                  />
                </PageWrapper>
              } />

              <Route path="/blogs/:id" element={
                <PageWrapper>
                  <BlogDetailRouteWrapper onNavigate={handleNavigate} />
                </PageWrapper>
              } />

              <Route path="/contact" element={
                <PageWrapper>
                  <ContactSection />
                </PageWrapper>
              } />

              <Route path="/privacy" element={
                <PageWrapper>
                  <LegalDocs mode="privacy" />
                </PageWrapper>
              } />

              <Route path="/terms" element={
                <PageWrapper>
                  <LegalDocs mode="terms" />
                </PageWrapper>
              } />

              <Route path="*" element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              } />
            </Routes>
          </div>
      </Suspense>
    </main>

      {/* 3. FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. FIXED FLOATING ELEMENTS */}
      
      {/* WhatsApp pulse button */}
      <a 
        href="https://wa.me/917397395529?text=Hello%20Aurum%20Properties%2C%20I%20am%20interested%20in%20your%20properties%20and%20plots.%20Please%20share%20more%20details." 
        target="_blank" 
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 pulse-whatsapp hover:bg-[#1ebd59] cursor-pointer group"
        title="Chat on WhatsApp (+91 7397395529)"
        aria-label="Chat with Aurum Properties on WhatsApp at 7397395529"
      >
        <svg className="w-8 h-8 fill-current drop-shadow-sm group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
        </svg>
        {/* Subtle tooltip for desktop hover */}
        <span className="hidden sm:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-[11px] font-sans font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none items-center gap-1.5 animate-in fade-in duration-200">
          Chat on WhatsApp
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </span>
      </a>

      {/* Call Back Modal */}
      {callBackModalOpen && (
        <div 
          id="callback-modal"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setCallBackModalOpen(false)}></div>
          
          {/* Modal Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 max-w-sm w-full relative z-10 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-serif text-lg font-bold text-brand-green">Request A Call Back</h4>
              <button 
                onClick={() => setCallBackModalOpen(false)}
                className="text-slate-400 hover:text-brand-green font-bold text-lg p-1.5 focus:outline-none"
              >
                ×
              </button>
            </div>

            <form 
              name="callback-request"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleCallBackSubmit} 
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="callback-request" />
              <p className="hidden" aria-hidden="true">
                <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
              </p>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Your Name*</label>
                <input
                  type="text"
                  name="name"
                  value={callBackName}
                  onChange={(e) => setCallBackName(e.target.value)}
                  placeholder="Sundar S"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Mobile Number*</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={callBackPhone}
                  onChange={(e) => setCallBackPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-brand-green focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              {callBackError && <p className="text-red-400 text-[10px] font-sans">{callBackError}</p>}

              <button
                type="submit"
                disabled={callBackStatus === 'sending'}
                className="w-full bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
              >
                {callBackStatus === 'sending' ? 'Sending...' : callBackStatus === 'success' ? '✓ We\'ll call you soon!' : 'Request Call'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
