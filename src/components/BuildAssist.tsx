import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Landmark, 
  HardHat, 
  Compass, 
  FileText, 
  CheckCircle, 
  Calculator, 
  Award, 
  Sparkles, 
  Info 
} from 'lucide-react';

export default function BuildAssist() {
  // Roadmap states
  const [activeStep, setActiveStep] = useState(0);

  // Cost calculator states
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [constructionType, setConstructionType] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [floors, setFloors] = useState<number>(1); // 1, 2, or 3 (represented as G, G+1, G+2)
  const [flooringGrade, setFlooringGrade] = useState<'regular' | 'premium' | 'italian-marble'>('regular');
  const [estimatedCost, setEstimatedCost] = useState<number>(2930000);

  useEffect(() => {
    // Recompute cost on-the-fly for seamless real-time interaction!
    let ratePerSqft = 2400;
    if (constructionType === 'basic') ratePerSqft = 1800;
    if (constructionType === 'premium') ratePerSqft = 3200;

    let floorsFactor = 1;
    if (floors === 2) floorsFactor = 1.8;
    if (floors === 3) floorsFactor = 2.6;

    let flooringPremium = 0;
    if (flooringGrade === 'premium') flooringPremium = 150 * plotArea;
    if (flooringGrade === 'italian-marble') flooringPremium = 450 * plotArea;

    const baseCost = plotArea * ratePerSqft * floorsFactor;
    const finalTotal = baseCost + flooringPremium;

    setEstimatedCost(Math.round(finalTotal));
  }, [plotArea, constructionType, floors, flooringGrade]);

  const steps = [
    {
      num: 1,
      title: "Soil Testing & SBC Evaluation",
      short: "Soil Testing",
      icon: HardHat,
      timeline: "3 to 5 Days",
      desc: "Our structural engineering team visits your plot to extract core soil samples. We perform comprehensive Safe Bearing Capacity (SBC) laboratory testing. This ensures your foundation is engineered precisely to resist soil shifting and avoid future wall cracks.",
      providedByAurum: "Certified laboratory soil test reports, engineer consultations, and foundation design recommendations."
    },
    {
      num: 2,
      title: "Custom Architectural Design",
      short: "Architectural Plan",
      icon: Compass,
      timeline: "10 to 15 Days",
      desc: "Work 1-on-1 with our registered luxury architects to design your dream villa layout. We deliver full 2D layout drawings, elegant 3D elevation renderings, electrical structural schemas, and plumbing master layouts aligned perfectly with classical Vastu principles.",
      providedByAurum: "Unlimited architect revisions, high-fidelity 3D structural flythrough layouts, and furniture allocation blueprints."
    },
    {
      num: 3,
      title: "RERA & Municipal Approvals",
      short: "RERA Approval",
      icon: Landmark,
      timeline: "20 to 30 Days",
      desc: "We manage the entire municipal approval process on your behalf. Our legal experts submit structural dossiers to local development committees and RERA boards, securing hassle-free building licenses without you visiting government offices.",
      providedByAurum: "Complete liaison paperwork processing, structural stability certificate preparation, and official approval delivery."
    },
    {
      num: 4,
      title: "Premium Material Curation",
      short: "Material Selection",
      icon: Layers,
      timeline: "7 Days",
      desc: "Select customized finishing materials from our luxury partner showrooms. We offer pre-negotiated contractor rates for top global brands—including premium sanitary fittings, multi-grade modular kitchens, customized electrical modular switches, and high-quality flooring.",
      providedByAurum: "Direct physical material catalog checklists, partner showroom access passes, and absolute quality guarantees."
    },
    {
      num: 5,
      title: "Civil Construction & Handover",
      short: "Construction",
      icon: CheckCircle,
      timeline: "6 to 8 Months",
      desc: "Our veteran on-site engineers undertake civil construction following highest standards (using premium graded cement & structural steel). We provide weekly WhatsApp drone recordings and continuous quality checks, hand-delivering your key with zero cost overruns.",
      providedByAurum: "Full project management, regular audit reports, formal structural warranty, and key handover ceremony."
    }
  ];

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Helper function to return SVG elements based on selected specs and floors
  const renderStructuralPreviewSVG = () => {
    // Styling values depending on construction grade
    let wallColor = "#CBD5E1"; // basic (slate-300)
    let beamColor = "#94A3B8"; // slate-400
    let windowColor = "#E2E8F0"; // slate-200
    let accentColor = "#D4AF37"; // gold
    let frameColor = "#475569"; // slate-600

    if (constructionType === 'standard') {
      wallColor = "#F1F5F9"; // white plaster
      beamColor = "#B45309"; // brick orange/brown
      windowColor = "#93C5FD"; // soft sky blue
      accentColor = "#D4AF37";
      frameColor = "#78350F"; // dark timber
    } else if (constructionType === 'premium') {
      wallColor = "#334155"; // deep charcoal slate
      beamColor = "#D4AF37"; // luxury gold gilding
      windowColor = "#38BDF8"; // modern cyan sky glass
      accentColor = "#F59E0B"; // amber glow
      frameColor = "#0F172A"; // obsidian frame
    }

    return (
      <svg viewBox="0 0 240 280" className="w-full max-w-[200px] h-auto mx-auto drop-shadow-xl" style={{ overflow: 'visible' }}>
        {/* Foundation Block (always present) */}
        <rect x="20" y="240" width="200" height="24" rx="4" fill="#475569" className="transition-all duration-300" />
        <text x="120" y="256" textAnchor="middle" fill="#94A3B8" className="font-sans font-black text-[9px] uppercase tracking-widest">
          SBC REINFORCED FOUNDATION
        </text>

        {/* Dynamic Floors rendering */}
        {/* Ground Floor (Always Present) */}
        <g id="gf-svg-layer" className="transition-all duration-300">
          {/* Main GF Structural Block */}
          <rect x="35" y="170" width="170" height="70" rx="6" fill={wallColor} stroke={beamColor} strokeWidth="3" className="transition-colors duration-500" />
          
          {/* Door */}
          <rect x="50" y="195" width="28" height="45" rx="2" fill={frameColor} className="transition-colors duration-500" />
          <circle cx="72" cy="218" r="2.5" fill={accentColor} />

          {/* GF Windows */}
          <rect x="100" y="190" width="35" height="26" rx="3" fill={windowColor} stroke={frameColor} strokeWidth="2.5" className="transition-colors duration-500" />
          <rect x="155" y="190" width="35" height="26" rx="3" fill={windowColor} stroke={frameColor} strokeWidth="2.5" className="transition-colors duration-500" />
          
          {/* Label GF */}
          <text x="120" y="182" textAnchor="middle" fill={constructionType === 'premium' ? '#F8FAFC' : '#475569'} className="font-sans font-black text-[9px] tracking-wider">
            GROUND STORY (GF)
          </text>
        </g>

        {/* First Floor (G+1) */}
        {floors >= 2 && (
          <motion.g 
            key="ff-svg-layer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            id="ff-svg-layer"
          >
            {/* Main FF Structural Block */}
            <rect x="35" y="100" width="170" height="70" rx="6" fill={wallColor} stroke={beamColor} strokeWidth="3" className="transition-colors duration-500" />
            
            {/* FF Large Balcony Window */}
            <rect x="50" y="115" width="55" height="40" rx="2" fill={windowColor} stroke={frameColor} strokeWidth="2.5" className="transition-colors duration-500" />
            <line x1="77.5" y1="115" x2="77.5" y2="155" stroke={frameColor} strokeWidth="1.5" />

            {/* Window right */}
            <rect x="135" y="115" width="55" height="40" rx="2" fill={windowColor} stroke={frameColor} strokeWidth="2.5" className="transition-colors duration-500" />
            
            {/* Label FF */}
            <text x="120" y="112" textAnchor="middle" fill={constructionType === 'premium' ? '#F8FAFC' : '#475569'} className="font-sans font-black text-[9px] tracking-wider">
              FIRST STORY (G+1)
            </text>
          </motion.g>
        )}

        {/* Second Floor (G+2) */}
        {floors >= 3 && (
          <motion.g 
            key="sf-svg-layer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            id="sf-svg-layer"
          >
            {/* Main SF Structural Block */}
            <rect x="35" y="30" width="170" height="70" rx="6" fill={wallColor} stroke={beamColor} strokeWidth="3" className="transition-colors duration-500" />
            
            {/* Elegant Penthouse Rooftop/Window */}
            <rect x="60" y="45" width="120" height="40" rx="4" fill={windowColor} stroke={frameColor} strokeWidth="3" className="transition-colors duration-500" />
            <line x1="120" y1="45" x2="120" y2="85" stroke={frameColor} strokeWidth="2" />
            
            {/* Label SF */}
            <text x="120" y="42" textAnchor="middle" fill={constructionType === 'premium' ? '#F8FAFC' : '#475569'} className="font-sans font-black text-[9px] tracking-wider">
              PENTHOUSE STORY (G+2)
            </text>
          </motion.g>
        )}

        {/* Rooftop Pergola or Slab (Top level crown) */}
        <g>
          <rect 
            x="25" 
            y={floors === 1 ? "164" : floors === 2 ? "94" : "24"} 
            width="190" 
            height="8" 
            rx="2" 
            fill={beamColor} 
            className="transition-all duration-300" 
          />
          {constructionType === 'premium' && (
            <path 
              d={`M 50,${floors === 1 ? 164 : floors === 2 ? 94 : 24} L 70,${floors === 1 ? 144 : floors === 2 ? 74 : 4} L 170,${floors === 1 ? 144 : floors === 2 ? 74 : 4} L 190,${floors === 1 ? 164 : floors === 2 ? 94 : 24}`}
              fill="none" 
              stroke={accentColor} 
              strokeWidth="2.5" 
              className="transition-all duration-300" 
            />
          )}
        </g>
      </svg>
    );
  };

  return (
    <section id="build-assist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* Hero Banner inside section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-brand-green to-emerald-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border-b-4 border-brand-gold"
      >
        <div className="absolute right-[-100px] top-[-100px] w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-[-50px] bottom-[-50px] w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest font-sans inline-block">
            AURUM BUILD ASSIST PROGRAM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            From Raw Plot to Luxury Dream Home — <br />
            We're With You Every Step.
          </h2>
          <p className="font-sans text-xs sm:text-base text-white/80 font-light leading-relaxed">
            Own a plot but feel overwhelmed about construction? Aurum Build Assist is a comprehensive turn-key program managing architects, government licenses, material curations, and construction civil engineers under a single unified brand warranty.
          </p>
        </div>
      </motion.div>

      {/* Interactive 5-Step Workflow Roadmap */}
      <div className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">TRANSPARENT BLUEPRINT</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green">Your 5-Step Construction Roadmap</h3>
          <p className="text-xs text-slate-500 font-sans">
            Click on individual steps below to view details, milestones, and deliverables handled by our corporate team.
          </p>
        </div>

        {/* Horizontal Step Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                id={`roadmap-step-${st.num}`}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between min-h-[140px] cursor-pointer shadow-sm relative ${
                  isActive 
                    ? 'bg-brand-green text-white border-brand-gold scale-[1.02] shadow-md shadow-brand-green/15' 
                    : 'bg-white text-brand-green border-slate-100 hover:border-brand-green/20'
                }`}
              >
                {/* Active marker pill background */}
                {isActive && (
                  <motion.div 
                    layoutId="activeRoadmapStep"
                    className="absolute inset-0 bg-brand-green rounded-2xl -z-10 border border-brand-gold"
                  />
                )}

                <div className="space-y-1 flex flex-col items-center z-10">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive ? 'bg-brand-gold text-brand-green' : 'bg-brand-green/5 text-brand-green'
                  }`}>
                    Step {st.num}
                  </span>
                  <st.icon className={`w-6 h-6 mt-3 ${isActive ? 'text-brand-gold' : 'text-brand-green/80'}`} />
                </div>

                <h4 className="font-sans font-bold text-xs mt-3 leading-tight z-10">
                  {st.short}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Expanded Description Accordion Box */}
        <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              id="roadmap-expanded-panel"
              className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Left panel info */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-green text-brand-gold font-sans font-bold text-sm flex items-center justify-center border border-brand-gold">
                    {steps[activeStep].num}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-green">
                    {steps[activeStep].title}
                  </h4>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {steps[activeStep].desc}
                </p>

                <div className="bg-[#F8FAF9] p-4 rounded-xl border border-slate-100/50 space-y-2">
                  <h5 className="font-sans font-bold text-xs text-brand-green uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                    What Aurum Provides:
                  </h5>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {steps[activeStep].providedByAurum}
                  </p>
                </div>
              </div>

              {/* Right panel stats */}
              <div className="md:col-span-4 bg-brand-green/5 border border-brand-green/10 p-6 rounded-2xl space-y-4">
                <div className="space-y-0.5">
                  <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-sans">INDICATIVE TIMELINE</span>
                  <span className="text-brand-green font-serif font-black text-lg sm:text-xl block">{steps[activeStep].timeline}</span>
                </div>
                <div className="space-y-0.5 border-t border-slate-200/50 pt-3">
                  <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-sans">STAGE STATUS</span>
                  <span className="text-brand-gold-dark font-sans font-bold text-xs uppercase tracking-wider block">Fully Managed & Insured</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Construction Cost Calculator with Isometric Structural Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="construction-calculator">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="font-serif text-2xl font-bold text-brand-green flex items-center gap-2">
                <Calculator className="w-6 h-6 text-brand-gold shrink-0" />
                Construction Cost Estimator
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Enter details below to compute an indicative civil construction & finishing cost estimation for Tamil Nadu.
              </p>
            </div>

            <div className="space-y-6">
              {/* Plot Area */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-sans font-bold text-brand-green">Total Build Area (Sq.Ft)</label>
                  <span className="text-xs font-sans font-bold text-brand-gold-dark bg-brand-gold/5 px-2.5 py-0.5 rounded-full border border-brand-gold/20">{plotArea} Sq.Ft</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="5000"
                  step="50"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
                  <span>600 Sq.Ft (Standard plot)</span>
                  <span>5,000 Sq.Ft (Huge Villa)</span>
                </div>
              </div>

              {/* Construction Quality Type */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold text-brand-green block">Construction Specifications Grade</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'basic', label: 'Basic Grade', desc: '₹1,800/sqft', sub: 'Standard fixtures' },
                    { id: 'standard', label: 'Standard Premium', desc: '₹2,400/sqft', sub: 'Branded materials' },
                    { id: 'premium', label: 'Ultra Luxury', desc: '₹3,200/sqft', sub: 'High-end finishes' }
                  ].map((spec) => (
                    <label 
                      key={spec.id}
                      className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col justify-between min-h-[90px] relative ${
                        constructionType === spec.id
                          ? 'border-brand-gold bg-brand-gold/5 text-brand-green'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="const-spec"
                        value={spec.id}
                        checked={constructionType === spec.id}
                        onChange={() => setConstructionType(spec.id as any)}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold font-sans block">{spec.label}</span>
                      <span className="text-xs font-serif font-black text-brand-gold-dark block mt-1">{spec.desc}</span>
                      <span className="text-[9px] text-slate-400 font-sans block leading-none mt-1">{spec.sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Floors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-sans font-bold text-brand-green block">Number of Floors</label>
                  <div className="flex gap-2">
                    {[
                      { label: 'Ground (G)', value: 1 },
                      { label: 'G + 1 Story', value: 2 },
                      { label: 'G + 2 Stories', value: 3 }
                    ].map((fl) => (
                      <button
                        key={fl.value}
                        onClick={() => setFloors(fl.value)}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          floors === fl.value
                            ? 'border-brand-green bg-brand-green text-brand-gold'
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        {fl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flooring Grade select */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-brand-green block">Flooring Style Grade</label>
                  <select
                    value={flooringGrade}
                    onChange={(e) => setFlooringGrade(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-green focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="regular">Regular Vitrified Tiles (Included)</option>
                    <option value="premium">Premium Double Charged Tiles (+₹150/sqft)</option>
                    <option value="italian-marble">Luxury Italian Marble (+₹450/sqft)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex gap-2.5 items-center text-[11px] text-slate-400 font-sans leading-relaxed">
            <Info className="w-4.5 h-4.5 text-brand-gold shrink-0" />
            <span>Interactive estimates calibrate on-the-fly depending on specification sliders and flooring choice.</span>
          </div>
        </div>

        {/* Right Output Card with Real-time Interactive Villa Vector Map (5 Cols) */}
        <div className="lg:col-span-5 bg-[#F8FAF9] p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col justify-between items-center text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-gold-dark font-sans block">LIVE STRUCTURAL PREVIEW</span>
            <h4 className="font-serif text-lg font-bold text-brand-green">Villa Layout Visualization</h4>
            <p className="text-[11px] text-slate-400 font-sans">Watch your villa configuration evolve below.</p>
          </div>

          {/* Isometric Structural SVG container */}
          <div className="w-full h-52 bg-white rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/10 to-transparent"></div>
            <AnimatePresence mode="popLayout">
              {renderStructuralPreviewSVG()}
            </AnimatePresence>
          </div>

          {/* Calculate results */}
          <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-100 w-full shadow-sm">
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-400 block font-sans">INDICATIVE CONSTRUCTION COST</span>
            <motion.h3 
              key={estimatedCost}
              initial={{ scale: 0.95, color: '#D4AF37' }}
              animate={{ scale: 1, color: '#B45309' }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="font-serif text-2xl sm:text-3xl font-black"
            >
              {formatCurrency(estimatedCost)}
            </motion.h3>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Calculates structural excavation, civil cement blocks, high-tensile steel frame, external plastering & standard tiles.
            </p>
          </div>

          <p className="text-[9px] text-slate-400 font-sans leading-relaxed">
            *Disclaimer: This is an indicative estimate based on Tamil Nadu state market index benchmarks. Final cost may vary depending on deep foundation specs and actual architectural changes.
          </p>
        </div>

      </div>

      {/* Why Choose Build Assist Program (4 benefit cards) */}
      <div className="space-y-10">
        <h3 className="font-serif text-2xl font-bold text-brand-green text-center">
          Why Opt For Our Build Assist Program?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "One Point Accountability", desc: "No coordinating with different painters, plasterers, or electrical vendors. We handle everything.", icon: Landmark },
            { title: "Zero Budget Escalations", desc: "Once a contract quote is formally locked in, any material fluctuations are completely borne by us.", icon: Award },
            { title: "Rigorous Weekly Audits", desc: "Access live high-resolution drone walk-through videos and progress checklists every weekend.", icon: Compass },
            { title: "Legal & RERA Seamless", desc: "No running to municipal offices. Our team files all planning approvals and layout structural licenses.", icon: FileText }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6, borderColor: '#D4AF37' }}
              className="bg-white p-6 rounded-2xl border border-slate-100 text-center shadow-sm cursor-pointer transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green/5 text-brand-green flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="font-sans font-bold text-sm text-brand-green mb-2">{item.title}</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
