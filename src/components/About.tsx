import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Target, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Trees, 
  Scale, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Award,
  Layers,
  FileCheck,
  PhoneCall
} from 'lucide-react';

import ceoHeadshotImg from '../assets/images/regenerated_image_1789544838666.jpg';
import gatedEntranceImg from '../assets/images/gated_entrance_1782481578176.webp';

export default function About() {
  const navigate = useNavigate();
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<'services' | 'investment'>('services');

  const coreServices = [
    { 
      title: "Residential Layout Development", 
      desc: "Crafting masterplanned, fully-serviced gated plotted layouts with wide internal roads, avenue plantations, and storm drainage.",
      icon: Building2
    },
    { 
      title: "Joint Venture Projects", 
      desc: "Collaborating with discerning landowners through transparent equity and revenue-sharing structures for high-yield developments.",
      icon: Scale
    },
    { 
      title: "Land Acquisition & Aggregation", 
      desc: "Strategically identifying, vetting, and aggregating prime land parcels in rapidly developing high-speed transport corridors.",
      icon: Layers
    },
    { 
      title: "Villa & Gated Communities", 
      desc: "Architecting secure, private villa enclaves with 24/7 security, grand archways, clubhouse amenities, and dedicated green zones.",
      icon: Trees
    },
    { 
      title: "Real Estate Investment Advisory", 
      desc: "Providing research-driven capital counseling to maximize long-term land appreciation and capital safety across Tamil Nadu.",
      icon: TrendingUp
    },
    { 
      title: "DTCP / CMDA / RERA Clearances", 
      desc: "Navigating complete statutory compliance, patta verification, encumbrance clearances, and government town planning sanctions.",
      icon: FileCheck
    },
    { 
      title: "Commercial Property Development", 
      desc: "Developing prime commercial frontage plots and mixed-use commercial pockets engineered for superior rental and business yields.",
      icon: Briefcase
    },
    { 
      title: "Project Marketing & Management", 
      desc: "Providing end-to-end buyer facilitation, legal documentation, registration management, and post-possession client support.",
      icon: Sparkles
    }
  ];

  const investmentAdvantages = [
    { 
      title: "Long-Term Capital Appreciation", 
      desc: "Acquiring strategically positioned parcels in infrastructure-backed growth corridors that experience rapid value escalation.",
      badge: "Appreciation"
    },
    { 
      title: "Tangible Asset Security", 
      desc: "Physical land ownership under clear individual patta titles provides genuine generational security that paper assets cannot match.",
      badge: "Tangible Asset"
    },
    { 
      title: "Inflation-Resistant Store of Value", 
      desc: "Prime land holdings have historically preserved and expanded purchasing power through shifting macroeconomic and market cycles.",
      badge: "Inflation Hedge"
    },
    { 
      title: "Passive Wealth Multiplication", 
      desc: "Consistent land value appreciation compounds capital over time without recurring depreciation, maintenance drag, or tenant hassles.",
      badge: "Compounding"
    },
    { 
      title: "Portfolio Diversification", 
      desc: "Balancing volatile equity or debt instruments with durable, legally verified physical real estate assets in booming southern corridors.",
      badge: "Safety"
    },
    { 
      title: "Direct Infrastructure Proximity", 
      desc: "Every Aurum layout is situated along sanctioned expressways, ring roads, metro expansions, or industrial tech zones.",
      badge: "High Growth"
    }
  ];

  const whyChooseUs = [
    "Uncompromising Legal Sanctity & Clear Patta Titles",
    "Prime Locations in Sanctioned Growth Corridors",
    "100% CMDA & DTCP Approved Master Layouts",
    "Transparent Documentation & Zero Hidden Costs",
    "Experienced Real Estate & Engineering Network",
    "Long-Term Value Creation for Generational Legacy"
  ];

  const futureExpansion = [
    { 
      number: "01",
      title: "Premium Plotted Enclaves", 
      desc: "Establishing signature residential communities across emerging Tier-1 & Tier-2 economic junctions in Tamil Nadu." 
    },
    { 
      number: "02",
      title: "Smart Township Masterplans", 
      desc: "Designing integrated township layouts incorporating sustainable power, wide boulevards, and automated community utilities." 
    },
    { 
      number: "03",
      title: "Commercial Roadfront Plazas", 
      desc: "Developing high-visibility commercial plots optimized for retail, warehousing, and tech-corridor enterprise spaces." 
    },
    { 
      number: "04",
      title: "Structured Land Portfolios", 
      desc: "Curating focused land portfolios tailored for NRI investors, family offices, and generational wealth preservers." 
    },
    { 
      number: "05",
      title: "Eco-Centric Green Layouts", 
      desc: "Implementing Miyawaki native forests, rainwater harvesting aquifers, solar street illumination, and indigenous landscaping." 
    }
  ];

  const taglines = [
    "Building Value Beyond Land",
    "Where Growth Meets Trust",
    "Creating Golden Opportunities",
    "Invest in Tomorrow",
    "Transforming Land Into Legacy"
  ];

  const awards = [
    'Best Land Plot Developer Tamil Nadu 2024',
    'Most Transparent Gated Layouts Award 2023',
    'Elite Brand in Customer Satisfaction 2024',
    'Eco-Centric Infrastructure Excellence 2022',
    'Outstanding Contribution to RERA Adoption 2023'
  ];

  const heroStats = [
    { label: "Founded", value: "2026", subtext: "In Chennai, Tamil Nadu" },
    { label: "Approvals", value: "100%", subtext: "CMDA & DTCP Sanctioned" },
    { label: "Leadership", value: "20+ Yrs", subtext: "Industry Track Record" },
    { label: "Flagships", value: "Active", subtext: "Mathur & Srirangam" }
  ];

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 lg:space-y-28">
      
      {/* 1. Architectural Hero Header with Integrated Trust Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden bg-[#173832] text-white shadow-2xl border border-[#234c44]"
      >
        {/* Architectural backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-15"
          style={{ backgroundImage: `url(${gatedEntranceImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#173832]/80 via-[#173832]/95 to-[#173832]" />

        {/* Hero Content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#C9A227] text-xs font-semibold tracking-widest uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            AURUM PROPERTIES &bull; EST. 2026 &bull; TAMIL NADU
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Transforming Land Into Generations of Enduring Value
          </h1>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F7F4EA]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            A premier property development company founded on absolute title clarity, statutory CMDA/DTCP sanctions, and sustainable wealth creation across Tamil Nadu's fastest-growing corridors.
          </p>

          {/* Key Stat Cards Aligned Within Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-3xl mx-auto text-left">
            {heroStats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-[#0D2923]/60 backdrop-blur-md rounded-2xl p-4 border border-[#C9A227]/20 flex flex-col justify-between"
              >
                <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans">
                  {stat.label}
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight my-1">
                  {stat.value}
                </span>
                <span className="text-[11px] text-emerald-100/70 font-sans">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Executive Leadership Section — Mythili Ramaswamy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="bg-[#F7F4EA] rounded-3xl border border-[#e2dcce] p-6 sm:p-10 lg:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Column 1 (Left on desktop): Biography, Pull Quote & Credentials Strip */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-[#C9A227]" />
                  EXECUTIVE LEADERSHIP
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173832] tracking-tight">
                  Led by Experience
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                  Mythili Ramaswamy founded Aurum Properties in 2026, bringing more than two decades of executive experience across financial structuring, large-scale construction, and real estate operations to Chennai's residential development market.
                </p>

                {/* Professional Career & Leadership Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-[#e2dcce] flex flex-col justify-between hover:border-[#C9A227] transition-colors shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-2xl font-bold text-[#173832]">20+ Yrs</span>
                      <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans bg-[#C9A227]/10 px-2 py-0.5 rounded">EXPERIENCE</span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Cross-functional expertise spanning real estate operations, strategic market expansion, and project delivery.
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-[#e2dcce] flex flex-col justify-between hover:border-[#C9A227] transition-colors shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-xl font-bold text-[#173832]">MBA Finance</span>
                      <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans bg-[#C9A227]/10 px-2 py-0.5 rounded">ACADEMIC</span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      University of Madras alumnus ensuring disciplined capital structuring, transparent risk management, and investor ROI.
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-[#e2dcce] flex flex-col justify-between hover:border-[#C9A227] transition-colors shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-2xl font-bold text-[#173832]">14+ Yrs</span>
                      <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans bg-[#C9A227]/10 px-2 py-0.5 rounded">LEADERSHIP</span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Proven record directing large-scale marketing, sales pipelines, and civil infrastructure execution.
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-[#e2dcce] flex flex-col justify-between hover:border-[#C9A227] transition-colors shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-2xl font-bold text-[#173832]">End-to-End</span>
                      <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans bg-[#C9A227]/10 px-2 py-0.5 rounded">EXECUTION</span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Active leadership delivering on-schedule masterplanned developments in prime Mathur and Srirangam corridors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pull Quote set apart in gold accent color */}
              <div className="border-l-2 border-[#C9A227] pl-4 sm:pl-5 py-2 my-6 bg-[#C9A227]/5 rounded-r-xl">
                <p className="font-serif italic text-sm sm:text-base text-[#173832] leading-relaxed">
                  "Our mission is simple — to build landmarks that outlast generations, partnerships that thrive on trust, and communities that inspire pride."
                </p>
                <span className="text-xs font-sans text-[#C9A227] font-semibold block mt-1.5">
                  — Mythili Ramaswamy, CEO
                </span>
              </div>

              {/* Credentials Strip */}
              <div className="pt-2">
                <div className="bg-[#173832] text-[#F7F4EA] rounded-2xl px-5 py-4 border border-[#173832] flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-sans shadow-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C9A227] shrink-0" />
                    <span className="font-semibold text-white">CEO, Aurum Properties (2026–Present)</span>
                  </div>
                  <span className="text-[#C9A227] hidden md:inline">&bull;</span>
                  <span>MBA Finance, University of Madras</span>
                  <span className="text-[#C9A227] hidden md:inline">&bull;</span>
                  <span className="text-emerald-200">20+ Years Real Estate &amp; Business Track Record</span>
                </div>
              </div>

            </div>

            {/* Column 2 (Right on desktop): Executive Headshot */}
            <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
              <div className="relative group max-w-sm mx-auto lg:max-w-none">
                <div className="rounded-2xl overflow-hidden border-2 border-[#dcd5c4] bg-[#eae4d5] aspect-square sm:aspect-[4/5] shadow-md relative">
                  <img 
                    src={ceoHeadshotImg}
                    alt="Mythili Ramaswamy, CEO of Aurum Properties" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173832]/60 via-transparent to-transparent opacity-40" />
                </div>
                
                {/* Decorative corner accent */}
                <div className="hidden sm:block absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#C9A227] pointer-events-none rounded-br-xl" />
              </div>

              <div className="text-center lg:text-left pt-2">
                <h3 className="font-serif text-2xl font-bold text-[#173832]">Mythili Ramaswamy</h3>
                <p className="text-xs sm:text-sm font-sans text-[#173832]/70 font-medium tracking-wide">
                  Founder &amp; Chief Executive Officer
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173832]/5 text-[#173832] text-[11px] font-sans font-medium border border-[#173832]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Aurum Properties (2026–Present)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Aligned Foundational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAF9] p-6 sm:p-7 rounded-2xl border border-slate-200/80 space-y-3 hover:border-[#C9A227]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans block">
              THE AURUM ETHOS
            </span>
            <h4 className="font-serif font-bold text-base text-[#173832]">Symbol of Value &amp; Stability</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Derived from the Latin word for gold, "Aurum" represents enduring stability, intrinsic value, and generational security in every project we develop.
            </p>
          </div>

          <div className="bg-[#F8FAF9] p-6 sm:p-7 rounded-2xl border border-slate-200/80 space-y-3 hover:border-[#C9A227]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#173832]/10 text-[#173832] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans block">
              APPROVAL STANDARDS
            </span>
            <h4 className="font-serif font-bold text-base text-[#173832]">100% CMDA &amp; DTCP Sanctioned</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Every layout strictly adheres to government master plans, clear individual patta titles, encumbrance verification, and transparent regulatory sanctions.
            </p>
          </div>

          <div className="bg-[#F8FAF9] p-6 sm:p-7 rounded-2xl border border-slate-200/80 space-y-3 hover:border-[#C9A227]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase font-sans block">
              COLLABORATION
            </span>
            <h4 className="font-serif font-bold text-base text-[#173832]">Joint Ventures &amp; Partnerships</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Collaborating transparently with landowners, homebuyers, and institutional investors to build sustainable communities and create compounding wealth.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Guiding Principles: Vision, Mission & Investor Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
      >
        {/* Left Card: Strategic Vision & Mission */}
        <div className="bg-[#F8FAF9] p-7 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans flex items-center gap-2">
                <span className="w-4 h-[1.5px] bg-[#C9A227]" />
                GUIDING PRINCIPLES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173832]">
                Our Vision &amp; Mission
              </h3>
            </div>

            <div className="space-y-4">
              {/* Vision */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#173832]/5 text-[#173832] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#173832]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#173832]">Our Vision</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    To become Tamil Nadu's benchmark property development enterprise, recognized for unyielding legal integrity, customer transparency, and enduring value creation through strategically planned plotted communities.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#173832]">Our Mission</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                      <span>Deliver high-potential land opportunities with 100% statutory clearance and transparent title flow.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                      <span>Create thoughtfully designed gated layouts that elevate standard of living and foster thriving neighborhoods.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                      <span>Establish transparent, mutually profitable joint ventures with landowners and institutional partners.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                      <span>Incorporate modern infrastructure, blacktop avenues, groundwater recharge, and eco-conscious amenities into every layout.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Investor Philosophy & Verification */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col justify-between shadow-xs space-y-6">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans flex items-center gap-2">
                <span className="w-4 h-[1.5px] bg-[#C9A227]" />
                INVESTOR PHILOSOPHY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173832]">
                Built on Real Fundamentals
              </h3>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-[#F7F4EA] p-4 rounded-xl border border-[#e2dcce]">
              "We believe successful real estate investments are built on strong market fundamentals, disciplined financial planning, strategic infrastructure corridors, and unwavering legal diligence. We help our buyers participate in genuine land opportunities that build generational security."
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-serif font-bold text-sm text-[#173832]">
                Why Discerning Buyers Choose Aurum Properties
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {whyChooseUs.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#F8FAF9] p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-sans font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-sans">
              Have questions regarding layout approvals?
            </span>
            <button 
              onClick={() => navigate('/contact')}
              className="text-xs font-bold text-[#173832] hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              Consult Advisory <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4. Operational Capabilities & Investment Advantage Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#C9A227]" />
              CAPABILITIES &amp; VALUE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173832]">
              What We Deliver
            </h2>
          </div>

          {/* Symmetrical Interactive Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveCapabilityTab('services')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                activeCapabilityTab === 'services' ? 'text-white' : 'text-slate-600 hover:text-[#173832]'
              }`}
            >
              {activeCapabilityTab === 'services' && (
                <motion.div 
                  layoutId="activeCapabilityPill" 
                  className="absolute inset-0 bg-[#173832] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              Our Core Services (8)
            </button>
            <button
              onClick={() => setActiveCapabilityTab('investment')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                activeCapabilityTab === 'investment' ? 'text-white' : 'text-slate-600 hover:text-[#173832]'
              }`}
            >
              {activeCapabilityTab === 'investment' && (
                <motion.div 
                  layoutId="activeCapabilityPill" 
                  className="absolute inset-0 bg-[#173832] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              Investment Advantage (6)
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          {activeCapabilityTab === 'services' ? (
            <motion.div
              key="core-services"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {coreServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, borderColor: '#C9A227' }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#173832]/5 text-[#173832] flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-[#173832]" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#173832] leading-snug">
                        {service.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center text-[11px] font-semibold text-[#C9A227] tracking-wider uppercase font-sans">
                      Standard Quality <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="investment-advantages"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {investmentAdvantages.map((adv, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: '#C9A227' }}
                  className="bg-[#F8FAF9] p-6 sm:p-7 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-[#173832] uppercase tracking-wider font-sans">
                        {adv.badge}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#173832]">
                      {adv.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    Generational Security Focus
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 5. Future Expansion & Next Frontiers */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans inline-block">
            STRATEGIC ROADMAP
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#173832]">
            Our Future Expansion Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            Aurum Properties is continually expanding masterplanned layouts across high-growth logistical and industrial corridors in Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {futureExpansion.map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5, borderColor: '#C9A227' }}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C9A227] block">
                  {item.number}
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#173832] leading-snug">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed pt-2 border-t border-slate-100">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 6. Brand Ethos & Taglines Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#F7F4EA] p-8 sm:p-12 rounded-3xl border border-[#e2dcce]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#C9A227]" />
              BRAND ESSENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173832] leading-tight">
              Transforming Land Into Legacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Every tagline we register reflects a core promise of value, security, and wealth-building designed to sustain generations of landowners and investors.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {taglines.map((tag, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-xl border border-[#e2dcce] flex items-center gap-3.5 shadow-xs"
              >
                <span className="w-7 h-7 rounded-full bg-[#C9A227]/15 text-[#C9A227] text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-serif italic text-xs sm:text-sm font-semibold text-[#173832]">
                  "{tag}"
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 7. Industry Recognitions Infinite Marquee */}
      <div className="overflow-hidden bg-[#173832] border-y border-[#C9A227]/40 py-4 relative flex items-center select-none rounded-2xl shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          {Array.from({ length: 4 }).flatMap(() => awards).map((award, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 mx-4">
              <Award className="w-4 h-4 text-[#C9A227]" />
              <span className="text-xs sm:text-sm font-serif text-white font-bold tracking-wider uppercase">
                {award}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]/60 ml-2" />
            </div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 32s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
      </div>

      {/* 8. Bottom Call to Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-[#173832] to-[#0D2923] p-8 sm:p-12 lg:p-14 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border border-[#234c44] shadow-xl"
      >
        <div className="space-y-3 max-w-xl">
          <span className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase font-sans">
            PARTNER WITH AURUM
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Ready to Build Your Generational Land Legacy?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 font-sans leading-relaxed">
            Explore our DTCP &amp; CMDA approved layouts in Mathur and Srirangam, or discuss a joint venture partnership with our leadership team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#C9A227] text-[#173832] text-xs font-bold uppercase tracking-wider hover:bg-[#d8b030] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#C9A227]" />
            Speak with Advisory
          </button>
        </div>
      </motion.div>

    </section>
  );
}
