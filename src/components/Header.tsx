import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import logoImg from '../assets/images/regenerated_image_1782481085246.webp';
import { preloadRoute } from '../lib/routePreloader';

interface HeaderProps {
  activeSection: string;
  onSearchChange?: (query: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenCallBack: () => void;
}

export default function Header({ activeSection, onSearchChange, onNavigate, onOpenCallBack }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'All Projects', id: 'projects' },
    { label: 'Build Assist', id: 'build-assist' },
    { label: 'Blogs', id: 'blogs' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          id="header-logo"
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <img 
            src={logoImg} 
            alt="AURUM Properties Logo" 
            className="h-14 sm:h-16 w-auto object-contain rounded-md border border-brand-gold/10 shadow group-hover:scale-[1.03] transition-transform duration-300"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}-btn`}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => preloadRoute(item.id)}
              onTouchStart={() => preloadRoute(item.id)}
              className={`font-sans text-sm font-medium tracking-wide transition-colors ${
                activeSection === item.id ||
                (item.id === 'projects' && activeSection === 'project-detail') ||
                (item.id === 'blogs' && activeSection === 'blog-detail')
                  ? 'text-brand-gold font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-brand-gold'
                  : 'text-brand-green hover:text-brand-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            id="header-cta-visit"
            onMouseEnter={() => preloadRoute('contact')}
            onTouchStart={() => preloadRoute('contact')}
            onClick={() => {
              onNavigate('contact');
              // Auto fill the reason dropdown with site visit
              setTimeout(() => {
                const reasonSelect = document.getElementById('contact-reason') as HTMLSelectElement;
                if (reasonSelect) {
                  reasonSelect.value = 'Site Visit Request';
                }
              }, 100);
            }}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase border border-brand-gold/30 hover:scale-105 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Schedule Site Visit
          </button>
        </div>

        {/* Mobile Hamburger Menu button */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            id="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-green hover:bg-brand-green/5 hover:text-brand-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="lg:hidden w-full glass-dropdown border-t border-brand-green/10 p-4 space-y-4 animate-in slide-in-from-top duration-300"
        >
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}-btn`}
                onMouseEnter={() => preloadRoute(item.id)}
                onTouchStart={() => preloadRoute(item.id)}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-green/5 text-brand-gold font-bold'
                    : 'text-brand-green hover:bg-brand-green/5 hover:text-brand-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-brand-green/10">
            <button
              id="mobile-header-cta"
              onMouseEnter={() => preloadRoute('contact')}
              onTouchStart={() => preloadRoute('contact')}
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const reasonSelect = document.getElementById('contact-reason') as HTMLSelectElement;
                  if (reasonSelect) {
                    reasonSelect.value = 'Site Visit Request';
                  }
                }, 100);
              }}
              className="w-full flex items-center justify-center gap-2 bg-brand-green text-brand-gold py-3.5 rounded-xl font-sans text-xs font-bold tracking-wider uppercase border border-brand-gold/30 hover:bg-brand-green-light"
            >
              <Calendar className="w-4 h-4" />
              Schedule Site Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
