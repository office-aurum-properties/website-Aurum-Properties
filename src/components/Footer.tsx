import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Check, Send } from 'lucide-react';
import logoImg from '../assets/images/regenerated_image_1782481085246.webp';
import { submitNetlifyForm } from '../lib/utils';
import { preloadRoute } from '../lib/routePreloader';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubscribed(true);
    await submitNetlifyForm('newsletter-subscribe', { email });
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-brand-green text-white pt-16 pb-8 border-t-4 border-brand-gold relative overflow-hidden" id="footer-section">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Bio */}
          <div className="space-y-6 lg:col-span-1">
            <div className="cursor-pointer group block" onClick={() => onNavigate('home')}>
              <img 
                src={logoImg} 
                alt="AURUM Properties Logo" 
                className="w-full max-w-[340px] md:max-w-[360px] h-auto object-contain rounded-xl border-2 border-brand-gold/30 shadow-2xl shadow-black/40 group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed w-[377px] max-w-full">
              Aurum Properties is Tamil Nadu's most trusted premium real estate developer. Over the past 15 years, we have transformed over 500 acres of prime land into high-appreciating, fully-approved DTCP gated community plot layouts.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6 md:pl-8">
            <h4 className="text-brand-gold font-serif text-lg font-bold tracking-wide relative after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm">
              {[
                { label: 'Home', target: 'home' },
                { label: 'About Us', target: 'about' },
                { label: 'Project Listing', target: 'projects' },
                { label: 'Build Assist Program', target: 'build-assist' },
                { label: 'Industry Insights (Blogs)', target: 'blogs' },
                { label: 'Contact Us', target: 'contact' },
                { label: 'Privacy Policy', target: 'privacy' },
                { label: 'Terms & Conditions', target: 'terms' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    onMouseEnter={() => preloadRoute(link.target)}
                    onTouchStart={() => preloadRoute(link.target)}
                    className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Approvals */}
          <div className="space-y-6">
            <h4 className="text-brand-gold font-serif text-lg font-bold tracking-wide relative after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-brand-gold">
              Corporate Office
            </h4>
            <ul className="space-y-4 font-sans text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/T78zws5bpzYaTCeq8" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-gold transition-colors"
                >
                  No. 626, MKN Road, Alandhur, Guindy, Chennai – 600 032, Tamil Nadu, India.
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="tel:+917397395529" className="hover:text-brand-gold transition-colors">
                    +91 7397395529
                  </a>
                  <a 
                    href="https://wa.me/917397395529?text=Hello%20Aurum%20Properties%2C%20I%20would%20like%20to%20inquire%20about%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 hover:text-white hover:bg-emerald-800 border border-emerald-500/30 text-[10px] font-bold tracking-wide transition-colors"
                    title="Direct WhatsApp Chat"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a href="mailto:info.aurumproperties@gmail.com" className="hover:text-brand-gold transition-colors">
                  info.aurumproperties@gmail.com
                </a>
              </li>
              <li className="pt-2 border-t border-white/10 text-[11px] leading-relaxed text-white/60">
                <div className="flex items-center gap-1.5 text-brand-gold font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  RERA REGISTERED
                </div>
                <span>Reg. No: TN/01/2024/XXXX | DTCP Approved Plot Enclaves Only. Buyer verification recommended at rera.tn.gov.in.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-6">
            <h4 className="text-brand-gold font-serif text-lg font-bold tracking-wide relative after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-brand-gold">
              Newsletter & Updates
            </h4>

            {/* Newsletter form */}
            <div className="space-y-3">
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Subscribe to receive our latest plot release alerts, CMDA project launches, and weekly real estate investment insights.
              </p>
              <form 
                name="newsletter-subscribe"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubscribe} 
                className="flex flex-col gap-2"
              >
                <input type="hidden" name="form-name" value="newsletter-subscribe" />
                <p className="hidden" aria-hidden="true">
                  <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
                </p>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/25 focus:border-brand-gold rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-brand-gold hover:bg-brand-gold-dark text-brand-green px-3 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-red-300 text-[11px] font-sans">{error}</p>}
                {subscribed && (
                  <p className="text-green-300 text-[11px] font-sans flex items-center gap-1.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" /> Thank you for subscribing!
                  </p>
                )}
              </form>

              {/* Social Icons */}
              <div className="pt-2">
                <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-white/60 mb-2.5">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61594271248415" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:bg-white/10 hover:border-brand-gold hover:scale-110 transition-all duration-300" 
                    aria-label="Facebook"
                    title="Aurum Properties on Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/_aurum_properties/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:bg-white/10 hover:border-brand-gold hover:scale-110 transition-all duration-300" 
                    aria-label="Instagram"
                    title="Aurum Properties on Instagram (@_aurum_properties)"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:bg-white/10 hover:border-brand-gold hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:bg-white/10 hover:border-brand-gold hover:scale-110 transition-all duration-300" aria-label="YouTube">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.556a3.003 3.003 0 00-2.11 2.107C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 002.11 2.107C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords & Popular Searches Matrix */}
        <div className="pt-8 pb-4 border-b border-white/10 text-left">
          <h5 className="text-[11px] font-sans font-bold uppercase tracking-wider text-brand-gold mb-3">
            Popular Searches & Real Estate Locations in Tamil Nadu
          </h5>
          <div className="flex flex-wrap gap-2 text-[11px] font-sans text-white/70">
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Plots for sale in chennai
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Plots for sale in coimbatore
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Residential plots for sale
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Low budget land for sale in chennai
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Gated community villa plots for sale
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              DTCP approved plots for sale in chennai
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Best real estate companies in chennai
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Best real estate companies in tamil nadu
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Property developers Tamil Nadu
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Low budget land for sale
            </button>
            <button onClick={() => onNavigate('build-assist')} className="hover:text-brand-gold transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
              Villa construction in Chennai & TN
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-white/50 font-sans border-t border-white/5">
          <p>© 2026 Aurum Properties. All Rights Reserved. | RERA: TN/01/2024/XXXX | DTCP & CMDA Approved Plot Developments in Tamil Nadu</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-brand-gold transition-colors">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
