import { Link } from 'react-router-dom';
import { Home, Compass, PhoneCall, ArrowLeft } from 'lucide-react';
import SEOHead from './SEOHead';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-brand-cream/50 to-white">
      <SEOHead
        title="404 - Page Not Found | Aurum Properties"
        description="The page you are looking for could not be found. Explore Aurum Properties premium residential plots in Tamil Nadu."
      />
      <div className="max-w-xl w-full text-center space-y-8 bg-white border border-brand-gold/20 rounded-3xl p-8 sm:p-12 shadow-xl shadow-brand-green/5 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10"></div>

        <div className="space-y-3 relative z-10">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-brand-gold-dark uppercase bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full">
            Error 404 • Resource Not Found
          </span>
          <h1 className="font-serif text-6xl sm:text-7xl font-bold text-brand-green tracking-tight">
            404
          </h1>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or does not exist on Aurum Properties.
          </p>
        </div>

        {/* Action navigation buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Projects</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-brand-green text-slate-700 hover:text-brand-green px-5 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Popular Quick Links */}
        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2 relative z-10">
          <p className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Popular Destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-brand-green font-medium">
            <Link to="/about" className="hover:text-brand-gold hover:underline">About Company</Link>
            <span>•</span>
            <Link to="/projects/sre-nagar-extension-erode" className="hover:text-brand-gold hover:underline">SRE Nagar Erode</Link>
            <span>•</span>
            <Link to="/projects/avinashi" className="hover:text-brand-gold hover:underline">Avinashi Plots</Link>
            <span>•</span>
            <Link to="/blogs" className="hover:text-brand-gold hover:underline">Market Insights</Link>
            <span>•</span>
            <Link to="/build-assist" className="hover:text-brand-gold hover:underline">Build Assist</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
