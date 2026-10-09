import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Trees, 
  Users, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  Compass, 
  Building,
  Building2 
} from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data';
import ScrollStrokeExperience from './ScrollStrokeExperience';
import IsometricStatsSection from './IsometricStatsSection';

import guduvancheryImg from '../assets/images/guduvanchery_plots_1782481597171.webp';
import FlyingBird from './FlyingBird';
import { preloadRoute } from '../lib/routePreloader';

interface HomeProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (sectionId: string) => void;
  onFilterTrigger: (filters: { city?: string; budget?: string; type?: string }) => void;
}

// Regional hub definitions for Tamil Nadu investment map
const regionalHubs = [
  {
    id: 'chennai',
    name: 'Chennai',
    tamilName: 'சென்னை',
    x: 375,
    y: 110,
    enclaves: 3,
    startPrice: '₹15L',
    growthFactor: 'NH Outer Ring Road & major IT corridor extension hubs',
    description: 'Chennai’s southern corridors are experiencing unprecedented real estate growth. Our CMDA/DTCP layouts are placed in hyper-appreciating suburbs like Guduvanchery and Tambaram West, ensuring rapid valuation climbs.',
    accentColor: 'from-emerald-500 to-teal-600',
    metrics: { appreciation: '18% YoY', water: 'Sweet groundwater', road: '40ft & 30ft Blacktop' }
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    tamilName: 'கோயம்புத்தூர்',
    x: 95,
    y: 280,
    enclaves: 2,
    startPrice: '₹22L',
    growthFactor: 'Saravanampatti IT expressway & Western Ghats valleys',
    description: 'Often called the "Manchester of South India", Coimbatore balances pristine weather with explosive technical growth. Gated enclaves in Saravanampatti and Kovaipudur offer breathtaking views and world-class utilities.',
    accentColor: 'from-teal-500 to-cyan-600',
    metrics: { appreciation: '22% YoY', water: 'Siruvani sweet water', road: 'Fully gated wide roads' }
  },
  {
    id: 'hosur',
    name: 'Hosur',
    tamilName: 'ஓசூர்',
    x: 135,
    y: 90,
    enclaves: 2,
    startPrice: '₹28L',
    growthFactor: 'Highland cool microclimates & Bangalore border proximity',
    description: 'Boasting a refreshingly cool year-round climate, Hosur is Southern Bangalore’s premium residential counter-point. Our fully-managed luxury agricultural farmlands and villa layouts feature drip irrigation.',
    accentColor: 'from-amber-500 to-orange-600',
    metrics: { appreciation: '15% YoY', water: 'Drip system equipped', road: 'Rustic pine layouts' }
  },
  {
    id: 'madurai',
    name: 'Madurai',
    tamilName: 'மதுரை',
    x: 210,
    y: 395,
    enclaves: 2,
    startPrice: '₹12L',
    growthFactor: 'Arapalayam/Othakadai ring corridors & industrial highway',
    description: 'Madurai is a powerful commercial gate in Southern Tamil Nadu. Our eco-centric layouts in Othakadai feature high-performance solar power street arrays and dense Miyawaki mini-forest layouts for natural cooling.',
    accentColor: 'from-purple-500 to-indigo-600',
    metrics: { appreciation: '12% YoY', water: 'Integrated harvesting', road: 'Solar-grid enabled' }
  },
  {
    id: 'erode',
    name: 'Erode',
    tamilName: 'ஈரோடு',
    x: 175,
    y: 250,
    enclaves: 1,
    startPrice: '₹18L',
    growthFactor: 'Muthampalayam Perundurai Corridor, Ring Road & Texvalley',
    description: 'A thriving textile and industrial capital in Western Tamil Nadu. Our DTCP & RERA approved SRE Nagar Extension in Muthampalayam offers 40ft & 30ft blacktop roads, sweet groundwater, and up to 90% bank loan sanction with <5 KM access to schools, hospitals, and transit.',
    accentColor: 'from-emerald-500 to-amber-600',
    metrics: { appreciation: '16% YoY', water: 'Sweet groundwater', road: '40ft & 30ft Blacktop' }
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    tamilName: 'தஞ்சாவூர்',
    x: 295,
    y: 310,
    enclaves: 1,
    startPrice: '₹18L',
    growthFactor: 'Delta heritage waterways & tranquil sweet groundwater tables',
    description: 'Perfect for retired professionals and heritage villa designers, Aurum Lake View offers peaceful waterfront living directly looking over a beautifully restored fresh water lake in cultural Thanjavur.',
    accentColor: 'from-blue-500 to-slate-600',
    metrics: { appreciation: '14% YoY', water: 'Waterfront sweet supply', road: 'Theme-styled stone paths' }
  }
];

// Helper Component for Count-up stats animation
function AnimatedNumber({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let frameId: number;
    
    if (elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const start = 0;
            const end = value;
            const duration = 2000;
            const startTime = performance.now();

            const updateNumber = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress); // Exponential ease out
              const current = Math.floor(ease * (end - start) + start);
              setDisplayValue(current);

              if (progress < 1) {
                frameId = requestAnimationFrame(updateNumber);
              } else {
                setDisplayValue(end);
              }
            };

            frameId = requestAnimationFrame(updateNumber);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <span ref={elementRef}>{displayValue.toLocaleString()}{suffix}</span>;
}

export default function Home({ onSelectProject, onNavigate, onFilterTrigger }: HomeProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Hero filter states
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // Active hub state for interactive map
  const [activeHub, setActiveHub] = useState(regionalHubs[0]);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        if (carouselRef.current.scrollLeft >= maxScroll - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleHeroSearch = () => {
    onFilterTrigger({
      city: selectedCity || undefined,
      budget: selectedBudget || undefined,
      type: selectedType || undefined
    });
    onNavigate('projects');
  };

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleMapHubSelect = (hub: typeof regionalHubs[0]) => {
    onFilterTrigger({ city: hub.name });
    onNavigate('projects');
  };

  const carouselProjects = projectsData.filter(p => p.status !== 'Upcoming');

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <div id="home-section" className="space-y-24 bg-slate-50/50 overflow-hidden">
      {/* Decorative Realistic Flying Bird (Scroll-triggered diagonal flight) */}
      <FlyingBird />
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#072418] text-white"
        id="home"
      >
        {/* Real Estate Green Land Plot Background with dark overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src={guduvancheryImg}
            alt="Premium Green Land Plots" 
            className="w-full h-full object-cover opacity-25 object-center mix-blend-multiply filter brightness-[0.7] contrast-[1.05]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/85 to-brand-green/95"></div>
        </div>

        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>

        {/* Ambient background glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-gold/5 blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
          
          {/* Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="max-w-4xl space-y-4 mb-10"
          >
            <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/25 text-brand-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              MOST TRUSTED REAL ESTATE DEVELOPER
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              Premium Residential Plots <br className="hidden sm:inline" />
              in <span className="text-brand-gold relative inline-block">
                Tamil Nadu
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-gold/30 rounded-full"></span>
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/85 max-w-3xl mx-auto font-light leading-relaxed">
              DTCP & CMDA Approved &bull; RERA Registered &bull; 10,000+ Happy Families <br />
              Explore residential plots for sale, gated community villa plots, and low budget land for sale with clear titles by Aurum Properties.
            </p>
          </motion.div>

          {/* Hero Filter Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 }}
            id="hero-filter-widget"
            className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full p-4 sm:p-2 border border-white/20 shadow-2xl mb-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-slate-800"
          >
            {/* Select Location */}
            <div className="flex-1 px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/15 flex flex-col items-start">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/60 mb-1">Select City</label>
              <select 
                id="hero-filter-city"
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent font-sans font-semibold text-xs sm:text-sm text-white focus:outline-none cursor-pointer [&>option]:text-slate-800"
              >
                <option value="">All Locations</option>
                <option value="Erode">Erode</option>
                <option value="Avinashi">Avinashi</option>
                <option value="Tenkasi">Tenkasi</option>
              </select>
            </div>

            {/* Select Property Type */}
            <div className="flex-1 px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/15 flex flex-col items-start">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/60 mb-1">Property Type</label>
              <select 
                id="hero-filter-type"
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent font-sans font-semibold text-xs sm:text-sm text-white focus:outline-none cursor-pointer [&>option]:text-slate-800"
              >
                <option value="">Any Type</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Villa Plot">Villa Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
              </select>
            </div>

            {/* Select Budget */}
            <div className="flex-1 px-4 py-2 sm:py-0 flex flex-col items-start">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/60 mb-1">Budget Range</label>
              <select 
                id="hero-filter-budget"
                value={selectedBudget} 
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-transparent font-sans font-semibold text-xs sm:text-sm text-white focus:outline-none cursor-pointer [&>option]:text-slate-800"
              >
                <option value="">Any Budget</option>
                <option value="15L">Below ₹15L</option>
                <option value="25L">₹15L - ₹30L</option>
                <option value="50L">₹30L - ₹50L</option>
                <option value="1Cr">Above ₹50L</option>
              </select>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              id="hero-filter-submit"
              onMouseEnter={() => preloadRoute('projects')}
              onTouchStart={() => preloadRoute('projects')}
              onClick={handleHeroSearch}
              className="bg-brand-gold hover:bg-white text-brand-green hover:text-brand-green-light px-8 py-4 sm:py-3.5 rounded-xl sm:rounded-full font-sans text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 shadow-lg shrink-0 cursor-pointer"
            >
              Search Properties
            </motion.button>
          </motion.div>

          {/* Aurum Trust & Value Proposition Strip */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            id="hero-quote"
            className="w-full max-w-3xl border-l-4 border-brand-gold bg-brand-green/40 backdrop-blur-md p-5 rounded-r-2xl shadow-xl text-left border border-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] tracking-widest text-brand-gold font-sans font-bold uppercase mb-1">
                  OUR INVESTMENT PROMISE
                </span>
                <p className="font-serif text-sm sm:text-base font-semibold leading-snug text-white">
                  Transforming High-Growth Land into Secure Generational Wealth
                </p>
                <p className="text-xs text-emerald-100/85 font-sans mt-1">
                  100% Clear Titles &bull; DTCP & CMDA Approved &bull; Ready for Immediate Registration
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wide uppercase">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  RERA Verified
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating glassmorphic cards */}
          <div className="hidden md:flex items-center justify-center gap-8 mt-16 w-full max-w-4xl">
            {[
              { label: "500+ Acres", sub: "Developed Across TN", icon: Trees },
              { label: "10,000+ Families", sub: "Smiles & Success Stories", icon: Users },
              { label: "15 Years", sub: "Of Unmatched Excellence", icon: Award }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                className="flex-1 bg-white/10 backdrop-blur-md p-5 rounded-2xl flex items-center gap-4 text-left border border-white/20 shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">{card.label}</h4>
                  <p className="text-[11px] text-white/85 font-sans font-medium uppercase tracking-wider">{card.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE ISOMETRIC PERFORMANCE & TRUST PLATFORM */}
      <IsometricStatsSection onNavigate={onNavigate} />

      {/* NEW: 3. INTERACTIVE TAMIL NADU INVESTMENT HUB MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="investment-map-hub">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">INTERACTIVE GEOGRAPHIC CORRIDOR</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">Tamil Nadu Investment Hubs</h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500">
            Hover or click on our active regional hubs on the vector layout below to explore real-time local statistics, starting values, and primary urban growth drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md">
          
          {/* Vector SVG Map of Tamil Nadu (Left Column - 6 Cols) */}
          <div className="lg:col-span-6 flex justify-center items-center relative overflow-hidden bg-slate-50 rounded-2xl border border-slate-100/50 p-6 min-h-[360px]">
            {/* Ambient map backgrounds */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent"></div>
            
            <svg 
              viewBox="0 0 500 500" 
              className="w-full max-w-[420px] h-auto drop-shadow-lg z-10"
              style={{ overflow: 'visible' }}
            >
              {/* Outer boundary coordinates of Tamil Nadu (stylized abstract grid lines) */}
              <g className="stroke-slate-200 fill-none opacity-40">
                <line x1="50" y1="0" x2="50" y2="500" strokeDasharray="3 3" />
                <line x1="150" y1="0" x2="150" y2="500" strokeDasharray="3 3" />
                <line x1="250" y1="0" x2="250" y2="500" strokeDasharray="3 3" />
                <line x1="350" y1="0" x2="350" y2="500" strokeDasharray="3 3" />
                <line x1="450" y1="0" x2="450" y2="500" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" strokeDasharray="3 3" />
                <line x1="0" y1="200" x2="500" y2="200" strokeDasharray="3 3" />
                <line x1="0" y1="300" x2="500" y2="300" strokeDasharray="3 3" />
                <line x1="0" y1="400" x2="500" y2="400" strokeDasharray="3 3" />
              </g>

              {/* High-fidelity geographic boundary vector shape for Tamil Nadu */}
              <path 
                d="M 120,40 C 130,50 150,55 170,45 C 190,35 220,50 250,50 C 280,50 300,30 320,40 C 340,50 355,75 365,95 C 375,115 390,120 405,120 C 420,120 415,140 400,150 C 385,160 380,180 380,200 C 380,220 395,245 405,260 C 415,275 395,290 385,300 C 375,310 355,330 335,340 C 315,350 310,380 295,410 C 280,440 260,465 240,480 C 220,495 210,470 200,450 C 190,430 180,435 160,440 C 140,445 130,420 120,400 C 110,380 120,360 115,340 C 110,320 90,310 80,290 C 70,270 90,250 100,230 C 110,210 105,180 110,160 C 115,140 100,125 95,110 C 90,95 110,80 115,60 Z" 
                className="fill-slate-100 stroke-slate-200"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Connecting golden express trade highway paths */}
              <path
                d="M 135,90 L 375,110 L 295,310 L 210,395 L 95,280 L 175,250 L 135,90 Z"
                className="stroke-brand-gold/40 fill-none"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Dynamic rendering of City Nodes */}
              {regionalHubs.map((hub) => {
                const isActive = activeHub.id === hub.id;
                return (
                  <g 
                    key={hub.id} 
                    className="cursor-pointer group/node"
                    onClick={() => setActiveHub(hub)}
                    onMouseEnter={() => setActiveHub(hub)}
                  >
                    {/* Ring Pulse animation on hover or active */}
                    <circle 
                      cx={hub.x} 
                      cy={hub.y} 
                      r={isActive ? 18 : 10} 
                      className={`fill-transparent stroke-brand-gold transition-all duration-500 ease-out ${
                        isActive ? 'opacity-50 stroke-[3px]' : 'opacity-0 group-hover/node:opacity-30'
                      }`}
                    />
                    
                    {/* Inner glowing node */}
                    <circle 
                      cx={hub.x} 
                      cy={hub.y} 
                      r={isActive ? 7.5 : 5.5} 
                      className={`transition-all duration-300 ${
                        isActive ? 'fill-brand-gold stroke-white stroke-[2px] shadow-lg' : 'fill-brand-green group-hover/node:fill-brand-gold'
                      }`}
                    />

                    {/* Text Label overlay */}
                    <text 
                      x={hub.x} 
                      y={hub.y - 14} 
                      textAnchor="middle"
                      className={`font-sans text-[11px] font-extrabold tracking-tight transition-all duration-300 ${
                        isActive ? 'fill-brand-green font-black' : 'fill-slate-600'
                      }`}
                    >
                      {hub.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detailed Floating Information Board (Right Column - 6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {activeHub.tamilName}
                    </span>
                    <span className="bg-brand-gold/15 text-brand-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                      ACTIVE DEVELOPMENT
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-extrabold text-brand-green flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-brand-gold shrink-0" />
                    {activeHub.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest">
                    Prime Investment Zone &bull; {activeHub.enclaves} Premium Enclaves
                  </p>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Main statistics cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/70 text-center">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-1">Starting Price</span>
                    <span className="font-serif font-black text-sm text-brand-gold-dark">{activeHub.startPrice}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/70 text-center">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-1">Appreciation</span>
                    <span className="font-sans font-extrabold text-xs sm:text-sm text-emerald-600 flex items-center justify-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {activeHub.metrics.appreciation}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/70 text-center">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-1">Water Quality</span>
                    <span className="font-sans font-bold text-[10px] text-brand-green leading-tight block">{activeHub.metrics.water}</span>
                  </div>
                </div>

                {/* Description paragraph */}
                <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {activeHub.description}
                </p>

                {/* Growth Drivers Bullet List */}
                <div className="space-y-3.5">
                  <span className="text-[10px] font-black tracking-widest text-brand-green/60 uppercase font-sans block">CRITICAL INFRASTRUCTURE DRIVERS</span>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Key Corridor:</strong> {activeHub.growthFactor}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Premium Road Widths:</strong> {activeHub.metrics.road}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Asset Protections:</strong> 100% DTCP Approved, crystal-clear parent deeds and legal surveys.</span>
                    </div>
                  </div>
                </div>

                {/* Main Action Call-to-filter */}
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => preloadRoute('projects')}
                  onTouchStart={() => preloadRoute('projects')}
                  onClick={() => handleMapHubSelect(activeHub)}
                  className="w-full bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  View Available Plots in {activeHub.name}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 3.5 DYNAMIC SCROLL-STROKE PATH EXPERIENCE */}
      <ScrollStrokeExperience onNavigate={onNavigate} />

      {/* 4. FEATURED PROJECTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="featured-projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6" id="featured-carousel-anchor">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">HANDPICKED EXCLUSIVES</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">Featured Project Enclaves</h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xl">
              Explore our best-performing, high-growth premium developments offering immediate construction feasibility and massive appreciation potential.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              id="carousel-prev-btn"
              onClick={() => handleScrollCarousel('left')}
              className="w-11 h-11 rounded-full border border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="carousel-next-btn"
              onClick={() => handleScrollCarousel('right')}
              className="w-11 h-11 rounded-full border border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div 
          ref={carouselRef}
          id="featured-projects-carousel"
          className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {carouselProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 60 }}
              className="min-w-[300px] sm:min-w-[360px] w-[360px] bg-white rounded-2xl overflow-hidden border border-slate-100 snap-start relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-brand-gold/30"
            >
              {/* Image with zoom on hover */}
              <div className="h-52 relative overflow-hidden flex flex-col justify-between p-6">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradientFrom} ${project.imageGradientTo}`}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-10"></div>
                
                {/* Status Badges */}
                <div className="flex items-center justify-between relative z-20">
                  <span className="bg-white/95 backdrop-blur-md text-brand-green text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {project.unitSize ? 'Managed Farmland' : project.status}
                  </span>
                  
                  {project.dtcpApproved ? (
                    <span className="bg-green-500/95 text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      DTCP Approved
                    </span>
                  ) : (
                    <span className="bg-emerald-600/95 text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      Clear Title &amp; Patta
                    </span>
                  )}
                </div>

                {/* Left over plots */}
                <span className="self-start bg-brand-gold text-brand-green font-sans text-[10px] font-extrabold px-3 py-1 rounded-md relative z-20 shadow-md">
                  Only {project.availablePlots} Plots Left
                </span>

                {/* Subtitle location */}
                <div className="relative z-20 text-white space-y-1">
                  <p className="text-[11px] font-bold tracking-widest text-brand-gold uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    {project.location}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white">{project.name}</h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-white z-20">
                <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between border-y border-slate-100 py-3 text-xs font-semibold">
                  <div className="space-y-0.5">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-sans font-normal">Plot Area</span>
                    <span className="text-brand-green font-medium font-sans">{project.sqft} Sq.Ft onwards</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-sans font-normal">Price Starts</span>
                    <span className="text-brand-gold-dark font-serif font-bold text-sm sm:text-base">{project.priceStr}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onMouseEnter={() => preloadRoute('project-detail')}
                    onTouchStart={() => preloadRoute('project-detail')}
                    onClick={() => onSelectProject(project.id)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onMouseEnter={() => preloadRoute('contact')}
                    onTouchStart={() => preloadRoute('contact')}
                    onClick={() => {
                      onNavigate('contact');
                      setTimeout(() => {
                        const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
                        if (messageInput) {
                          messageInput.value = `I am interested in ${project.name} (${project.location}). Please provide availability.`;
                        }
                      }, 100);
                    }}
                    className="bg-brand-green hover:bg-brand-green-light text-brand-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    title="Inquire"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TRUST / LEGAL VERIFICATION MATRIX */}
      <section className="bg-slate-100/50 py-20 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">100% REGULATORY ASSURANCE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">Your Investment, Fully Protected</h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every single plot layout designed by Aurum Properties undergoes strict legal vetting, securing absolute ownership compliance with state authorities.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
          >
            {[
              { title: "DTCP Layout Approval", desc: "Approved layouts meeting government guidelines on spacing, public parks, and road width allocations.", icon: Trees },
              { title: "RERA Registration", desc: "Ensures legal protections, transparency, delivery commitments, and formal registry compliance.", icon: ShieldCheck },
              { title: "Clear Title Deed", desc: "Undisputed verified chain of ownership for more than 30 years to avoid any future legal claims.", icon: CheckCircle },
              { title: "Encumbrance Certificate", desc: "Proof that the property is completely free from any pending mortgages, liabilities, or disputes.", icon: ShieldCheck },
              { title: "Layout Approval Plan", desc: "Engineered physical boundaries, proper utility provisions, and high-performance drainage designs.", icon: Trees },
              { title: "Government Survey Records", desc: "Accurately mapped boundary coordinates aligned with the official Tamil Nadu land survey systems.", icon: CheckCircle }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: '#D4AF37' }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green/5 text-brand-green flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-green" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-brand-green flex items-center gap-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
