import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Trees, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  Compass, 
  Award, 
  ArrowRight,
  CheckCircle2,
  Building2,
  Landmark,
  FileCheck,
  BadgeCheck,
  Calendar,
  PhoneCall,
  Eye,
  Layers,
  Check,
  ChevronRight,
  Zap
} from 'lucide-react';

interface ScrollStrokeExperienceProps {
  onNavigate: (sectionId: string) => void;
}

export default function ScrollStrokeExperience({ onNavigate }: ScrollStrokeExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);
  
  // Track scroll progress within this entire interactive section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 80%"]
  });

  // Smooth spring physics for fluid line descent
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // Transform scroll progress to pathLength (0 to 1) - reaches all the way to the bottom CTA
  const pathLength = useTransform(smoothProgress, [0.0, 0.96], [0, 1], { clamp: true });
  const strokeDashoffset = useTransform(pathLength, (v) => 1 - v);
  const glowOpacity = useTransform(smoothProgress, [0.0, 0.96], [0.35, 1], { clamp: true });
  
  // Percentage indicator for progress HUD
  const progressPercent = useTransform(smoothProgress, [0.0, 0.96], [0, 100], { clamp: true });

  // Milestone data along the golden stroke
  const milestones = [
    {
      step: "01",
      stepNum: 1,
      title: "Strategic Location Intelligence",
      subtitle: "High-Growth Corridors in Tamil Nadu",
      desc: "Every Aurum enclave is handpicked using comprehensive geospatial analysis along upcoming industrial corridors, Chennai Outer Ring Road extensions, and Coimbatore IT expressways.",
      icon: Compass,
      tag: "Micro-Market Vetting",
      stats: "18-22% Expected YoY Growth",
      accent: "from-amber-500/20 to-brand-gold/10",
      border: "border-brand-gold/40",
      glowColor: "rgba(212, 175, 55, 0.3)",
      deliverables: [
        "Proximity to high-capacity NH expressways and metro lines",
        "Upcoming multi-modal logistics & IT SEZ nodes",
        "Sweet underground water table verification (<40ft)",
        "Zero flood hazard topographic clearance"
      ],
      highlights: [
        { label: "Chennai Corridor", val: "+18% Annual Appreciation" },
        { label: "Coimbatore Tech Hub", val: "+22% Growth Projection" },
        { label: "Hosur SIPCOT Line", val: "+15% Industrial Value" }
      ]
    },
    {
      step: "02",
      stepNum: 2,
      title: "100% Legal & Regulatory Sanctity",
      subtitle: "DTCP & CMDA Approved Clear Titles",
      desc: "30-year unbroken title records, zero-encumbrance certificates, RERA formal registration, and government survey boundaries ensure zero risk and unconditional ownership peace of mind.",
      icon: ShieldCheck,
      tag: "Title Due Diligence",
      stats: "30-Year Clear Chain",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/40",
      glowColor: "rgba(16, 185, 129, 0.3)",
      deliverables: [
        "100% DTCP / CMDA approved layout plans with approved numbers",
        "Strict 30-year title search & encumbrance certificates (EC)",
        "Pre-approved plot loans with SBI, HDFC & ICICI",
        "Legal opinion certified by senior High Court advocates"
      ],
      highlights: [
        { label: "Government Approvals", val: "DTCP / CMDA Verified" },
        { label: "Litigation Clearance", val: "100% Nil Encumbrance" },
        { label: "Bank Loan Panel", val: "Approved by SBI & HDFC" }
      ]
    },
    {
      step: "03",
      stepNum: 3,
      title: "Resort-Grade Living Infrastructure",
      subtitle: "Engineered for Sustainable Luxury",
      desc: "40ft & 30ft heavy-duty blacktop avenue roads, sweet drinking groundwater, underground electrical conduits, solar-powered street lamps, and landscaped parks ready from Day 1.",
      icon: Trees,
      tag: "Immediate Ready-to-Build",
      stats: "40ft Wide Avenue Roads",
      accent: "from-brand-gold/20 to-amber-600/10",
      border: "border-brand-gold/40",
      glowColor: "rgba(212, 175, 55, 0.3)",
      deliverables: [
        "40ft & 30ft tar blacktop roads built with concrete curbs",
        "Gated entrance archway with 24/7 CCTV surveillance",
        "Underground storm-water drainage & sewage pipes",
        "Perimeter fencing with native avenue trees & children's park"
      ],
      highlights: [
        { label: "Road Quality", val: "40ft Heavy Blacktop" },
        { label: "Power & Water", val: "24/7 Underground Grid" },
        { label: "Eco-Avenue", val: "Native Tree Canopies" }
      ]
    },
    {
      step: "04",
      stepNum: 4,
      title: "Immediate Registration & Patta",
      subtitle: "Instant Handover & Custom Villa Assist",
      desc: "On-the-spot registry support, immediate individual Patta transfer, and seamless integration with our Build Assist architecture team for constructing your dream sanctuary.",
      icon: Landmark,
      tag: "Generational Wealth",
      stats: "10,000+ Happy Families",
      accent: "from-emerald-600/20 to-teal-600/10",
      border: "border-emerald-600/40",
      glowColor: "rgba(16, 185, 129, 0.3)",
      deliverables: [
        "Spot registration with full Sub-Registrar liaison support",
        "Individual Patta applied & delivered directly to your doorstep",
        "Stone boundary demarcation with geo-tagged coordinates",
        "Free consultation with Aurum Build Assist villa architects"
      ],
      highlights: [
        { label: "Registration", val: "Immediate On-The-Spot" },
        { label: "Patta Transfer", val: "100% Guaranteed" },
        { label: "Villa Design", val: "Free Architectural Plan" }
      ]
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStepTab(index);
    const element = document.getElementById(`milestone-step-${index + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="golden-journey-stroke"
      className="relative w-full bg-[#04120B] text-white overflow-hidden py-24 sm:py-32 my-12 border-y border-brand-gold/20"
    >
      {/* Dynamic ambient background glow circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-gold/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-brand-gold/10 blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-emerald-600/15 blur-[150px] pointer-events-none"></div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 px-4 py-1.5 rounded-full text-xs font-bold text-brand-gold uppercase tracking-widest font-sans shadow-lg shadow-brand-gold/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            THE AURUM GOLDEN JOURNEY &bull; SCROLL TO EXPLORE
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
          >
            The Golden Line of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-gold">
              Land Wealth & Sanctity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Scroll down to watch how every Aurum enclave is meticulously transformed from high-potential acreage into an enduring, high-appreciating heritage asset.
          </motion.p>

          {/* Interactive Step Navigator HUD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {milestones.map((m, idx) => (
              <button
                key={m.step}
                onClick={() => handleStepClick(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                  activeStepTab === idx 
                    ? 'bg-brand-gold text-brand-green border-brand-gold font-bold shadow-md shadow-brand-gold/20 scale-105' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-brand-gold/40'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-mono font-bold">
                  {m.stepNum}
                </span>
                <span>{m.title.split(' ')[0]} {m.title.split(' ')[1]}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* The Animated SVG Path Container & Milestones Layout */}
        <div className="relative">
          
          {/* Dynamic Scroll-Following Golden SVG Stroke (Spans Full Height from Top to Bottom CTA) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[700px] lg:w-[900px] pointer-events-none z-0">
            <svg
              viewBox="0 0 900 2600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Golden Gradient for Stroke */}
                <linearGradient id="aurumStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#FFF4BD" stopOpacity="1" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#E5C07B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#B8860B" stopOpacity="0.9" />
                </linearGradient>

                {/* Soft Gold Glow Filter */}
                <filter id="aurumGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Guide Path (Subtle Faint Track reaching all the way to the bottom CTA) */}
              <path
                d="M 450 0 C 780 200 820 400 450 600 C 80 800 120 1050 450 1250 C 780 1450 820 1700 450 1900 C 80 2100 180 2350 450 2600"
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="4"
                strokeDasharray="6 8"
                fill="none"
              />

              {/* Glowing Aura Path (Animated with Scroll Progress, reaching deeper down) */}
              <motion.path
                d="M 450 0 C 780 200 820 400 450 600 C 80 800 120 1050 450 1250 C 780 1450 820 1700 450 1900 C 80 2100 180 2350 450 2600"
                stroke="rgba(212, 175, 55, 0.45)"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
                filter="url(#aurumGlow)"
                style={{
                  pathLength,
                  opacity: glowOpacity
                }}
              />

              {/* Primary Active Golden Drawing Stroke with Enhanced Width and Shine */}
              <motion.path
                d="M 450 0 C 780 200 820 400 450 600 C 80 800 120 1050 450 1250 C 780 1450 820 1700 450 1900 C 80 2100 180 2350 450 2600"
                stroke="url(#aurumStrokeGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                style={{
                  pathLength,
                  strokeDashoffset
                }}
              />

              {/* Checkpoint Nodes along the path */}
              <circle cx="450" cy="600" r="10" fill="#04120B" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="450" cy="1250" r="10" fill="#04120B" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="450" cy="1900" r="10" fill="#04120B" stroke="#D4AF37" strokeWidth="3" />
              <circle cx="450" cy="2600" r="12" fill="#D4AF37" stroke="#FFF4BD" strokeWidth="4" />
            </svg>
          </div>

          {/* Vertical Linear Guide for Mobile Screens (Continuously moving lower) */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-1 bg-white/10 rounded-full z-0 overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-brand-gold via-amber-300 to-brand-gold rounded-full"
              style={{ height: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          {/* Interactive Milestone Cards Grid */}
          <div className="relative z-10 space-y-20 sm:space-y-28">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.step}
                  id={`milestone-step-${index + 1}`}
                  className={`flex flex-col md:flex-row items-stretch gap-6 lg:gap-12 scroll-mt-28 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Primary Narrative Card Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -35 : 35, y: 25 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="w-full md:w-1/2 pl-10 md:pl-0 flex flex-col"
                  >
                    <div className={`flex-1 p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-xl border ${item.border} shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-brand-gold/70 flex flex-col justify-between`}>
                      
                      {/* Ambient Gradient Accent */}
                      <div className={`absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl ${item.accent} rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-500`}></div>

                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-[11px] font-bold font-sans tracking-wide uppercase border border-white/10">
                            <item.icon className="w-3.5 h-3.5 text-brand-gold" />
                            {item.tag}
                          </span>
                          <span className="font-serif font-bold text-2xl sm:text-3xl text-brand-gold/70 group-hover:text-brand-gold transition-colors">
                            {item.step}
                          </span>
                        </div>

                        {/* Main Title & Subtitle */}
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-brand-gold transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-sans font-semibold text-emerald-400 mb-4 tracking-wide uppercase">
                          {item.subtitle}
                        </p>

                        {/* Description */}
                        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                          {item.desc}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="space-y-2 mb-6 bg-black/30 p-4 rounded-2xl border border-white/5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1">
                            Phase Deliverables & Guarantees
                          </span>
                          {item.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Key Metric / Stat Pill */}
                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
                        <span className="text-slate-400 font-medium">Aurum Benchmark</span>
                        <span className="text-brand-gold font-bold flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-brand-gold" />
                          {item.stats}
                        </span>
                      </div>

                    </div>
                  </motion.div>

                  {/* Central Stroke Checkpoint Marker */}
                  <div className="hidden md:flex flex-col items-center justify-center relative shrink-0">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 rounded-full bg-slate-950 border-2 border-brand-gold text-brand-gold flex items-center justify-center font-serif font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.45)] relative z-20 backdrop-blur-md cursor-pointer group"
                    >
                      {item.step}
                      <span className="absolute -inset-1 rounded-full border border-brand-gold/40 animate-ping opacity-30"></span>
                    </motion.div>
                  </div>

                  {/* Visual Complement Card Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 35 : -35, y: 25 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="w-full md:w-1/2 pl-10 md:pl-0 flex flex-col"
                  >
                    <div className="flex-1 p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.07] hover:border-brand-gold/30 transition-all duration-300">
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-brand-gold" />
                            Value Catalyst #{item.step}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                            Verified Protocol
                          </span>
                        </div>

                        {/* Interactive Growth Metric Matrix */}
                        <div className="grid grid-cols-1 gap-2.5 pt-1">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                              <span className="text-xs text-slate-300 font-medium">{h.label}</span>
                              <span className="text-xs font-bold text-brand-gold font-mono">{h.val}</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-light pt-2">
                          {index === 0 && "Early investor positioning along upcoming outer-ring infrastructure corridors yields maximum capital multiplication before full suburban urbanization."}
                          {index === 1 && "Every layout passes rigorous bank-panel audits, making loan sanctions effortless through leading financial institutions across Tamil Nadu."}
                          {index === 2 && "Avenue-grade 40ft blacktop roads with comprehensive storm drainage ensure effortless transit and zero seasonal water logging."}
                          {index === 3 && "Spot registration at the local Sub-Registrar combined with individual Patta delivery guarantees lifelong, unconditional ownership security."}
                        </p>
                      </div>

                      {/* Quick Action Button */}
                      <div className="pt-6 mt-4 border-t border-white/10">
                        <button
                          onClick={() => onNavigate('projects')}
                          className="w-full py-2.5 px-4 rounded-xl bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-green border border-brand-gold/30 text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Explore Eligible Projects</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Closing Callout Anchor (Seamlessly Connected to the Golden Lightline) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 sm:mt-32 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0B2C1B] to-slate-950 border-2 border-brand-gold/50 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-emerald-950/50"
        >
          {/* Subtle Ambient Gold Radiance */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-widest text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-4 py-1.5 rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              START YOUR GOLDEN PLOT JOURNEY
            </span>
            
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Own Verified Land in Tamil Nadu?
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto font-light leading-relaxed">
              Explore our current portfolio of CMDA & DTCP approved plots for sale across Chennai, Coimbatore, Hosur, Madurai, and Thanjavur.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto bg-brand-gold hover:bg-white text-brand-green hover:text-brand-green-light px-8 py-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Browse Available Plots
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Schedule a Free Site Visit
              </button>
            </div>

            {/* Quick Hotline Bar */}
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-300">
              <a 
                href="tel:+917397395529" 
                className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
                <span>Hotline: +91-7397395529</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <span className="text-emerald-400 font-medium">Free Cab Pickup for Site Inspection</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
