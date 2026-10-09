import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Video, 
  Compass, 
  Check,
  ExternalLink,
  Navigation,
  Landmark,
  GraduationCap,
  HeartPulse,
  Bus,
  Car,
  Sparkles,
  Building2,
  Trees,
  Download,
  FileText,
  Eye
} from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data';
import { sanitizeInput, sanitizePhone, submitNetlifyForm, downloadBrochurePDF } from '../lib/utils';

import coimbatoreImg from '../assets/images/coimbatore_plots_1782481615987.webp';
import familyNewHomeImg from '../assets/images/family_new_home_1782481713774.webp';
import guduvancheryImg from '../assets/images/guduvanchery_plots_1782481597171.webp';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function ProjectDetail({ projectId, onBack, onNavigate }: ProjectDetailProps) {
  const project = projectsData.find(p => p.id === projectId) || projectsData[0];

  const snapshot = project.snapshot || {
    projectName: project.name.split('–')[0].trim(),
    marketer: "Aurum Properties",
    location: project.location,
    totalFarm: project.totalArea || `${project.plotsCount} Plots`,
    unitSize: project.unitSize || `${project.sqft} Sq.Ft`,
    plantation: "Curated Landscaping & Greenery",
    concept: "Gated Residential Community",
    horizon: "Immediate Handover",
    market: "Tamil Nadu + NRI Buyers",
    priceExact: project.priceStr
  };

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedFacingFilter, setSelectedFacingFilter] = useState<'all' | 'north' | 'south'>('all');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const brochureUrl = project.brochureUrl || '/Aurum-Sre-Nagar-Extension-Brochure.pdf';
    setIsDownloading(true);
    try {
      await downloadBrochurePDF(brochureUrl, `${project.name.replace(/[^a-zA-Z0-9]/g, '-')}-Official-Brochure.pdf`);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3500);
    } finally {
      setIsDownloading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredSize: project.partitionDetails?.plots?.[0]
      ? (project.id === 'avinashi' 
          ? `${project.partitionDetails.plots[0].id} - ${project.partitionDetails.plots[0].cents} Cents (${project.partitionDetails.plots[0].priceStr})`
          : `${project.partitionDetails.plots[0].id} - ${project.partitionDetails.plots[0].sqft} Sq.Ft (${project.partitionDetails.plots[0].priceStr})`)
      : project.partitionDetails
      ? 'Plot 01'
      : project.unitSize || `${project.sqft} Sq.Ft`,
    visitDate: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const cleanName = sanitizeInput(formData.name);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPrefSize = sanitizeInput(formData.preferredSize);
    const cleanDate = sanitizeInput(formData.visitDate);
    const cleanMsg = sanitizeInput(formData.message);

    const errors: Record<string, string> = {};
    if (!cleanName) errors.name = 'Name is required';
    
    if (cleanPhone.length !== 10) errors.phone = 'Please enter a valid 10-digit mobile number';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) errors.email = 'Please enter a valid email address';
    
    if (!cleanDate) {
      errors.visitDate = 'Please select a visit date';
    } else {
      const selectedDate = new Date(cleanDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.visitDate = 'Visit date cannot be in the past';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    await submitNetlifyForm('project-visit-booking', {
      projectName: project.name,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      preferredSize: cleanPrefSize,
      visitDate: cleanDate,
      message: cleanMsg,
    });
    setIsSubmitting(false);
    setShowSuccessModal(true);

    const emailTo = "info.aurumproperties@gmail.com";
    const subject = encodeURIComponent(`[Site Visit Booking] ${project.name} - ${cleanName}`);
    const body = encodeURIComponent(
      `Dear Aurum Properties Team,\n\n` +
      `I have scheduled a site visit booking for your project "${project.name}" through the website. Here are the booking details:\n\n` +
      `- Project Name: ${project.name}\n` +
      `- Client Name: ${cleanName}\n` +
      `- Mobile Number: ${cleanPhone}\n` +
      `- Email Address: ${cleanEmail}\n` +
      `- Preferred Size: ${cleanPrefSize} Sq.Ft\n` +
      `- Proposed Visit Date: ${cleanDate}\n` +
      `- Client Message: ${cleanMsg || 'None'}\n\n` +
      `Please register this site visit and arrange for the corporate transport setup.\n\n` +
      `Best regards,\n` +
      `${cleanName}`
    );
    
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  const galleryMedia = [
    { title: "Main Layout Corridor Entrance", url: project.imageUrl, fallbackFrom: "from-brand-green", fallbackTo: "to-emerald-950" },
    { title: "Scenic Plots & Broad Roads Layout", url: coimbatoreImg, fallbackFrom: "from-emerald-900", fallbackTo: "to-brand-green" },
    { title: "Recreational Walkways & Gardens", url: familyNewHomeImg, fallbackFrom: "from-amber-800", fallbackTo: "to-emerald-950" },
    { title: "Comprehensive Security Perimeter", url: guduvancheryImg, fallbackFrom: "from-slate-800", fallbackTo: "to-emerald-950" }
  ];

  const currentMedia = galleryMedia[activeImgIdx] || galleryMedia[0];

  const amenities = [
    { name: "Underground Cabling", desc: "No hanging overhead lines. Neat digital connections." },
    { name: "24/7 Security Patrols", desc: "Corporate guard cabins with security records." },
    { name: "Wide Tar Roads", desc: "40ft and 30ft high-load asphalt tar roadways." },
    { name: "Sweet Water Outlets", desc: "Durable connections linked directly to sweet aquifers." },
    { name: "Underground Sewage", desc: "Sealed municipal-grade channels for total hygiene." },
    { name: "Solar Street Arrays", desc: "Continuous smart lighting during grid shortages." },
    { name: "Aesthetic Parks", desc: "Lush gardens featuring multi-age childrens play areas." },
    { name: "Miyawaki Forests", desc: "Native micro-forest blocks keeping ambient temperatures cool." }
  ];

  return (
    <section id="project-detail" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Header Nav bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-gold-dark font-sans uppercase tracking-widest cursor-pointer self-start transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-gold" />
          Back to Layout Portfolio
        </button>

        <span className="text-[10px] bg-brand-gold/15 text-brand-green font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono self-start sm:self-center border border-brand-gold/20">
          {project.dtcpApproved 
            ? 'PROJECT OVERVIEW • DTCP & RERA APPROVED VILLA PLOTS'
            : project.partitionDetails 
              ? 'PROJECT OVERVIEW • PRIME PLOTTED LAND'
              : project.reraRegistered 
                ? 'PROJECT OVERVIEW • RERA COMPLIANT' 
                : 'PROJECT OVERVIEW • MANAGED AGRO-FARMLAND'}
        </span>
      </div>

      {/* Main Name & Meta details block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs font-bold text-brand-gold-dark uppercase tracking-widest font-sans flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-gold" />
            {project.location}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-brand-green leading-tight">{project.name}</h2>
          
          <div className="flex flex-wrap gap-2 pt-1">
            {project.dtcpApproved && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> DTCP Approved Layout
              </span>
            )}
            {project.reraRegistered && (
              <span className="bg-amber-100 text-amber-900 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-amber-200">
                <CheckCircle className="w-3.5 h-3.5 text-amber-700" /> RERA REGISTERED: {project.reraNo}
              </span>
            )}
            {project.bankLoanAvailable && (
              <span className="bg-blue-100 text-blue-900 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-blue-200">
                <Landmark className="w-3.5 h-3.5 text-blue-700" /> Bank Loan Approved (80% - 90%)
              </span>
            )}
            {project.partitionDetails && project.id === 'avinashi' && (
              <>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Clear Title &bull; Individual Patta
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> 1.18 Acre Parcel &bull; 5 Plots (23.5 Cents Each)
                </span>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  ₹10 Lakhs / Cent (Negotiable)
                </span>
              </>
            )}
            {project.partitionDetails && project.id !== 'avinashi' && (
              <>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> 100% Clear Title &bull; Individual Patta
                </span>
                <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> 19 Demarcated Plots &bull; 40ft &amp; 30ft Roads
                </span>
              </>
            )}
            {!project.dtcpApproved && !project.reraRegistered && !project.partitionDetails && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Managed Agro-Farmland &bull; Clear Title &amp; Individual Patta
              </span>
            )}
          </div>
        </div>

        {/* Price & size tag */}
        <div className="bg-brand-green/5 border border-brand-green/10 rounded-2xl p-6 text-right shrink-0">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
            {project.id === 'avinashi'
              ? 'Rate per Cent (Negotiable)'
              : project.pricePerSqft
                ? 'Rate per Sq.Ft'
                : project.pricePerCent
                  ? 'Starting Price'
                  : project.unitSize
                    ? 'Unit Price'
                    : 'Premium Plots Starting From'}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-gold-dark mt-0.5">{project.priceStr}</h3>
          <p className="text-xs text-brand-green font-sans font-medium mt-1">
            {project.pricePerSqft
              ? `${project.pricePerSqft} • ${project.unitSize || project.totalArea}`
              : project.pricePerCent && project.id !== 'avinashi'
                ? `${project.pricePerCent} • ${project.unitSize || project.totalArea}`
                : project.id === 'avinashi' && project.partitionDetails
                  ? `${project.totalArea} • 5 Plots of ${project.partitionDetails.centsPerPlot} Cents Each`
                  : project.unitSize 
                    ? `${project.unitSize} • ${project.totalArea || 'Managed Farmland'}` 
                    : `${project.sqft} Sq.Ft upwards`}
          </p>
          <div className="flex flex-col items-end gap-1.5 mt-2.5">
            {project.isNegotiable && (
              <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full font-sans uppercase tracking-wider">
                Price Negotiable
              </span>
            )}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={handleDownload}
                id="top-download-brochure-link"
                disabled={isDownloading}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-green-light bg-amber-100/90 hover:bg-amber-200 border border-amber-300/80 px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-75"
                title="Download brochure directly to your device"
              >
                {downloadDone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                    <span className="text-emerald-800">Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className={`w-3.5 h-3.5 text-brand-gold-dark ${isDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isDownloading ? 'Downloading...' : 'Download Brochure'}</span>
                  </>
                )}
              </button>
              <a
                href={project.brochureUrl || "/Aurum-Sre-Nagar-Extension-Brochure.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-brand-green bg-white hover:bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer"
                title="View PDF directly in new tab"
              >
                <Eye className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span className="hidden sm:inline">View</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT SNAPSHOT CARD */}
      <div 
        id="project-snapshot-section"
        className="bg-[#FAF7F0] border border-[#E6DCB8] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
      >
        {/* Snapshot Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#D8C6A3]/60 pb-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8C6D32] tracking-tight">
            Project Snapshot
          </h3>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#3B3321] tracking-tight">
            {snapshot.priceExact}
          </div>
        </div>

        {/* 3x3 Snapshot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
          {/* Row 1 */}
          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              PROJECT
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.projectName}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              MARKETER
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.marketer}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              LOCATION
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.location}
            </span>
          </div>

          {/* Row 2 */}
          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              {project.partitionDetails ? 'TOTAL LAND' : 'TOTAL AREA / FARM'}
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.totalFarm}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              {project.partitionDetails ? 'SUBDIVISION / PLOTS' : 'UNIT SIZE'}
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.unitSize}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              {project.partitionDetails ? 'ZONING & VIABILITY' : 'PLANTATION'}
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.plantation}
            </span>
          </div>

          {/* Row 3 */}
          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              CONCEPT
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.concept}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              HORIZON
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.horizon}
            </span>
          </div>

          <div className="space-y-1.5 border-b border-[#D8C6A3]/40 pb-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#8C6D32] block">
              MARKET
            </span>
            <span className="font-serif text-base font-medium text-[#1A382B] block">
              {snapshot.market}
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left Media & Details | Right Inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column (8 Cols) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* A. MEDIA GALLERY WITH CROSS-FADE ANIMATION */}
          <div className="space-y-4">
            <div className="h-80 sm:h-[420px] rounded-2xl relative overflow-hidden flex flex-col justify-end p-8 text-white">
              {/* Animated Presence Image Cross-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImgIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  {currentMedia.url ? (
                    <img 
                      src={currentMedia.url} 
                      alt={currentMedia.title} 
                      className="w-full h-full object-cover"
                      loading={activeImgIdx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${currentMedia.fallbackFrom} ${currentMedia.fallbackTo}`}></div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Gradient Mask over image */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 pointer-events-none"></div>
              
              <div className="relative z-20 space-y-1 pointer-events-none">
                <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase font-sans">ACTUAL SITE PREVIEW</span>
                <h4 className="font-serif text-lg sm:text-2xl font-bold">{currentMedia.title}</h4>
              </div>
            </div>

            {/* Thumbnails grid */}
            <div className="grid grid-cols-4 gap-3">
              {galleryMedia.map((thumb, idx) => {
                const isActive = activeImgIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-16 rounded-xl relative overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'ring-2 ring-brand-gold scale-[0.98]' 
                        : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                    title={thumb.title}
                  >
                    {thumb.url ? (
                      <img 
                        src={thumb.url} 
                        alt={thumb.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${thumb.fallbackFrom} ${thumb.fallbackTo}`}></div>
                    )}
                    <div className="absolute inset-0 bg-black/15"></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ABOUT THE PROPERTY NARRATIVE */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-2xl font-bold text-brand-green">About the Property</h3>
              <p className="text-xs text-slate-500 font-sans">
                {project.location} &bull; {project.totalArea || `${project.plotsCount} Units`} &bull; {project.status}
              </p>
            </div>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              {project.aboutText || project.description}
            </p>
          </div>

          {/* PRIME CONNECTIVITY (<5 KM) SECTION */}
          {project.connectivityHighlights && project.connectivityHighlights.length > 0 && (
            <div id="project-connectivity-section" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-brand-gold/15 text-brand-green font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Prime Strategic Location
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Within 5 KM Radius
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-green">
                    Easy Access &amp; Prime Connectivity
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Muthampalayam connects effortlessly to educational hubs, healthcare centers, transport terminals, and commercial corridors.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {project.connectivityHighlights.map((conn, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-brand-gold/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 group-hover:border-brand-gold/50 group-hover:text-brand-green">
                        {conn.category || "Nearby Hub"}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-mono font-extrabold text-brand-green bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {conn.distance}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded-md">
                          {conn.time}
                        </span>
                      </div>
                    </div>
                    <p className="font-sans text-xs font-bold text-slate-800 leading-snug group-hover:text-brand-green transition-colors">
                      {conn.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BANK LOANS & FINANCING SECTION */}
          {project.bankLoanAvailable && project.bankPartners && (
            <div id="project-bank-loans-section" className="bg-gradient-to-br from-blue-50/70 via-white to-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-blue-200/70 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-blue-600/15 text-blue-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Financing Assistance
                    </span>
                    <span className="text-[10px] bg-emerald-600/15 text-emerald-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      80% - 90% Loan Approved
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-green">
                    Bank Loan Approved &amp; Preferred Partners
                  </h3>
                  <p className="text-xs text-slate-600 font-sans mt-0.5">
                    Direct loan sanctions available through our dedicated banking relationship desk with minimal paperwork and doorstep assistance.
                  </p>
                </div>
                <div className="bg-white border border-blue-200 px-4 py-2 rounded-xl text-center shrink-0">
                  <span className="text-[9px] uppercase font-bold text-slate-400 font-sans block">Up To</span>
                  <span className="font-serif text-xl sm:text-2xl font-black text-blue-900">90% Funding</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {project.bankPartners.map((bank, bIdx) => (
                  <div key={bIdx} className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs flex flex-col items-center justify-center min-h-[64px]">
                    <Landmark className="w-4 h-4 text-brand-green mb-1 opacity-80" />
                    <span className="text-[10px] font-sans font-bold text-slate-800 leading-tight">
                      {bank}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROAD INFRASTRUCTURE SPECIFICATIONS */}
          {project.roadDetails && project.roadDetails.length > 0 && (
            <div id="project-road-infrastructure" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-2xl font-bold text-brand-green">
                  Roadway Dimensions &amp; Internal Infrastructure
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Engineered to high-load municipal standards with broad avenues for unrestricted vehicular movement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.roadDetails.map((rd, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-sans text-slate-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></span>
                    <span>{rd}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. DEMARCATED PLOTS TABLE & SELECTION GRID (SRE NAGAR EXTENSION / DTCP LAYOUTS) */}
          {project.partitionDetails && project.id !== 'avinashi' && (
            <div id="partition-details-breakdown" className="bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] bg-emerald-600/15 text-emerald-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      DTCP Approved Layout Plan
                    </span>
                    <span className="text-[10px] bg-amber-600/15 text-amber-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Bank Loan Available
                    </span>
                    <span className="text-[10px] bg-blue-600/15 text-blue-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Pure Sq.Ft Selling Rates
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green">
                    Table of 19 Demarcated Plots • SRE NAGAR EXTENSION
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
                    Select your preferred plot to review dimensions in square feet, orientation, and lock in for site visit registration.
                  </p>
                </div>

                <div className="bg-white/90 border border-amber-300 rounded-2xl p-4 sm:text-right shadow-sm shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold block">
                    Starting Sq.Ft Rate
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-black text-brand-gold-dark block">
                    ₹2,999 / Sq.Ft
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1 font-sans">
                    North: ₹3,299/Sq.Ft • South: ₹2,999/Sq.Ft
                  </span>
                </div>
              </div>

              {/* Key Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Total Plots</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">19 Plots (All For Sale)</p>
                  <p className="text-[10px] text-emerald-700 font-bold font-sans">None Sold • 100% Available</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">North Facing (7 Plots)</p>
                  <p className="text-sm sm:text-base font-serif font-black text-amber-800 mt-0.5">₹3,299 / Sq.Ft</p>
                  <p className="text-[10px] text-slate-500 font-medium font-sans">Plot 05 to Plot 11</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">South Facing (12 Plots)</p>
                  <p className="text-sm sm:text-base font-serif font-black text-emerald-700 mt-0.5">₹2,999 / Sq.Ft</p>
                  <p className="text-[10px] text-slate-500 font-medium font-sans">Plot 01–04 &amp; 12–19</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Bank Loan</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">Up to 90%</p>
                  <p className="text-[10px] text-emerald-700 font-bold font-sans">SBI, HDFC, ICICI, Canara</p>
                </div>
              </div>

              {/* Facing Orientation Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/40">
                <span className="text-xs font-bold text-brand-green font-sans mr-1">Filter by Facing:</span>
                <button
                  type="button"
                  onClick={() => setSelectedFacingFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                    selectedFacingFilter === 'all'
                      ? 'bg-brand-green text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-gold'
                  }`}
                >
                  All 19 Plots
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFacingFilter('north')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedFacingFilter === 'north'
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <span>North Facing (7 Plots)</span>
                  <span className="text-[10px] bg-amber-900/20 px-1.5 py-0.2 rounded font-mono">₹3,299/Sq.Ft</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFacingFilter('south')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedFacingFilter === 'south'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  <span>South Facing (12 Plots)</span>
                  <span className="text-[10px] bg-emerald-900/20 px-1.5 py-0.2 rounded font-mono">₹2,999/Sq.Ft</span>
                </button>
              </div>

              {/* Interactive Plots Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2">
                    <span>Available Plots &amp; Specifications</span>
                    <span className="text-xs font-sans font-normal text-slate-500">(Click to select &amp; prefill booking form)</span>
                  </h4>
                  <span className="text-xs text-brand-gold-dark font-semibold font-sans">
                    {project.availablePlots} Plots Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {project.partitionDetails.plots
                    ?.filter(plot => {
                      if (selectedFacingFilter === 'north') return plot.facing?.toLowerCase().includes('north');
                      if (selectedFacingFilter === 'south') return plot.facing?.toLowerCase().includes('south');
                      return true;
                    })
                    .map((plot, pIdx) => {
                    const isSelected = formData.preferredSize.includes(plot.id);
                    const isSold = plot.status === 'Sold';
                    const isReserved = plot.status === 'Reserved';
                    const isNorth = plot.facing?.toLowerCase().includes('north');
                    return (
                      <div
                        key={pIdx}
                        onClick={() => {
                          if (isSold) return;
                          setFormData(prev => ({
                            ...prev,
                            preferredSize: `${plot.id} - ${plot.sqft.toLocaleString()} Sq.Ft (${plot.priceStr})`,
                            message: `I am interested in ${plot.name} at SRE NAGAR EXTENSION, Muthampalayam, Erode (${plot.sqft.toLocaleString()} Sq.Ft, ${plot.priceStr}, rate: ₹${plot.ratePerSqft || (isNorth ? 3299 : 2999)}/Sq.Ft). Please arrange a site inspection and bank loan details.`
                          }));
                          document.getElementById('booking-inquiry-box')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                          isSold 
                            ? 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
                            : isSelected
                              ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400 shadow-md cursor-pointer'
                              : 'bg-white border-slate-200/80 hover:border-brand-gold hover:shadow-sm cursor-pointer'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-serif text-base font-bold text-brand-green">
                            {plot.id}
                          </span>
                          <span className={`text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSold 
                              ? 'bg-slate-200 text-slate-600'
                              : isReserved
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {plot.status}
                          </span>
                        </div>

                        <p className="text-xs font-sans text-slate-600 mb-2.5 font-medium line-clamp-1">
                          {plot.name}
                        </p>

                        {/* Facing Tag */}
                        <div className="mb-2.5">
                          <span className={`inline-block text-[10px] font-bold font-sans px-2.5 py-0.5 rounded-md border ${
                            isNorth 
                              ? 'bg-amber-50 text-amber-800 border-amber-200' 
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {isNorth ? 'North Facing • ₹3,299/Sq.Ft' : 'South Facing • ₹2,999/Sq.Ft'}
                          </span>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 mb-3 text-xs font-sans">
                          <div className="flex justify-between text-slate-500">
                            <span>Area:</span>
                            <span className="font-bold text-slate-800">{plot.sqft.toLocaleString()} Sq.Ft</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Sq.Ft Rate:</span>
                            <span className="font-medium text-slate-700">₹{plot.ratePerSqft?.toLocaleString() || (isNorth ? '3,299' : '2,999')} / Sq.Ft</span>
                          </div>
                          <div className="flex justify-between text-slate-800 font-bold pt-1 border-t border-slate-200">
                            <span>Price:</span>
                            <span className="text-brand-gold-dark font-black">{plot.priceStr}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isSold}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold font-sans transition-colors text-center ${
                            isSold
                              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              : isSelected
                                ? 'bg-brand-green text-white cursor-pointer'
                                : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200 cursor-pointer'
                          }`}
                        >
                          {isSold ? 'Sold Out' : isSelected ? 'Selected in Booking Form ✓' : 'Select This Plot'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* D. OFFICIAL PROJECT BROCHURE DOWNLOADING SECTION */}
          <div id="brochure-download-section" className="bg-gradient-to-br from-[#0A3622] via-[#0E472D] to-slate-900 rounded-3xl p-6 sm:p-8 border border-brand-gold/30 text-white shadow-xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] bg-brand-gold/20 text-brand-gold font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border border-brand-gold/30 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-gold" /> Official Digital Brochure
                  </span>
                  <span className="text-[10px] bg-white/10 text-white font-mono font-medium px-3 py-0.5 rounded-full">
                    19 Demarcated Plots • Pure Sq.Ft Rates
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Download Official Project Brochure &amp; Layout Plan
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                  Download the comprehensive project dossier directly to your device. Includes official DTCP layout approval drawing, RERA registration credentials, exact 19-plot demarcation schedule in square feet (7 North-facing @ ₹3,299/Sq.Ft and 12 South-facing @ ₹2,999/Sq.Ft), 40ft &amp; 30ft blacktop roadway map, and 80%-90% bank loan sanction documents.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-brand-gold font-mono pt-1">
                  <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">Format: High-Res PDF</span>
                  <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">File Size: 1.45 MB</span>
                  <span className="bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 px-2.5 py-1 rounded-md font-sans font-semibold">Standard Universal PDF</span>
                </div>
              </div>

              {/* Direct Download Call to Action Button */}
              <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={handleDownload}
                    id="direct-download-brochure-section-btn"
                    disabled={isDownloading}
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider py-4 px-7 rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer disabled:opacity-75"
                  >
                    {downloadDone ? (
                      <>
                        <Check className="w-5 h-5 text-emerald-950 stroke-[3]" />
                        <span>Brochure Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className={`w-5 h-5 stroke-[2.5] ${isDownloading ? 'animate-bounce' : ''}`} />
                        <span>{isDownloading ? 'Downloading PDF...' : 'Download Brochure (PDF)'}</span>
                      </>
                    )}
                  </button>
                  <a
                    href={project.brochureUrl || "/Aurum-Sre-Nagar-Extension-Brochure.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-5 rounded-2xl border border-white/20 transition-all cursor-pointer"
                    title="Open brochure PDF directly in browser"
                  >
                    <ExternalLink className="w-4 h-4 text-brand-gold" />
                    <span>View in Browser</span>
                  </a>
                </div>
                <span className="text-[11px] font-sans text-white/70 text-center md:text-right flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Direct device download • Opens in any PDF reader
                </span>
              </div>
            </div>

            {/* Key Features Verified in Brochure */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center sm:text-left">
                <p className="text-[10px] font-mono text-brand-gold uppercase">Layout Approval</p>
                <p className="text-xs font-bold text-white mt-0.5">DTCP &amp; RERA Registered</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center sm:text-left">
                <p className="text-[10px] font-mono text-brand-gold uppercase">Pricing Basis</p>
                <p className="text-xs font-bold text-white mt-0.5">Pure Sq.Ft Rates</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center sm:text-left">
                <p className="text-[10px] font-mono text-brand-gold uppercase">Total Plots</p>
                <p className="text-xs font-bold text-white mt-0.5">19 Demarcated Plots</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center sm:text-left">
                <p className="text-[10px] font-mono text-brand-gold uppercase">Bank Sanctions</p>
                <p className="text-xs font-bold text-white mt-0.5">80% – 90% Bank Loans</p>
              </div>
            </div>
          </div>

          {/* C. SUBDIVISION & 5-PLOT PARTITION BREAKDOWN (Avinashi) */}
          {project.partitionDetails && project.id === 'avinashi' && (
            <div id="partition-details-breakdown" className="bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] bg-amber-600/15 text-amber-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Parcel Subdivision Plan
                    </span>
                    <span className="text-[10px] bg-emerald-600/15 text-emerald-900 font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Price Negotiable
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green">
                    1.18 Acre Parcel • 5 Plots Subdivision
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
                    Available as a complete 1.18-Acre (118 Cents) property, or split into 5 individual plots of 23.5 Cents each.
                  </p>
                </div>

                <div className="bg-white/90 border border-amber-300 rounded-2xl p-4 sm:text-right shadow-sm shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold block">
                    Price per Cent
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-black text-brand-gold-dark block">
                    ₹10 Lakhs
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1 font-sans">
                    Negotiable Rate
                  </span>
                </div>
              </div>

              {/* Key Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Total Land</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">1.18 Acres</p>
                  <p className="text-[10px] text-brand-gold-dark font-medium font-sans">118 Cents (~51,400 Sq.Ft)</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Subdivision</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">5 Plots</p>
                  <p className="text-[10px] text-brand-gold-dark font-medium font-sans">23.5 Cents Each</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Price / Plot</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">₹2.35 Crore</p>
                  <p className="text-[10px] text-emerald-700 font-bold font-sans">Negotiable</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Entire Parcel</p>
                  <p className="text-sm sm:text-base font-serif font-black text-brand-green mt-0.5">₹11.80 Crore</p>
                  <p className="text-[10px] text-emerald-700 font-bold font-sans">Negotiable for Bulk</p>
                </div>
              </div>

              {/* 5 Individual Plots Interactive Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2">
                    <span>Individual 23.5 Cent Plot Units</span>
                    <span className="text-xs font-sans font-normal text-slate-500">(Click to select &amp; inquire)</span>
                  </h4>
                  <span className="text-xs text-brand-gold-dark font-semibold font-sans">
                    5 Units Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {project.partitionDetails.plots?.map((plot, pIdx) => {
                    const isSelected = formData.preferredSize.includes(plot.id);
                    return (
                      <div
                        key={pIdx}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            preferredSize: `${plot.id} - 23.5 Cents (${plot.priceStr})`,
                            message: `I am interested in ${plot.name} in Avinashi (23.5 Cents, ${plot.priceStr}). Please contact me regarding pricing negotiation and site visit.`
                          }));
                          document.getElementById('booking-inquiry-box')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400 shadow-md'
                            : 'bg-white border-slate-200/80 hover:border-amber-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-serif text-base font-bold text-brand-green">
                            {plot.id}
                          </span>
                          <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {plot.status}
                          </span>
                        </div>

                        <p className="text-xs font-sans text-slate-600 mb-3 font-medium">
                          {plot.name}
                        </p>

                        <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 mb-3 text-xs font-sans">
                          <div className="flex justify-between text-slate-500">
                            <span>Area:</span>
                            <span className="font-bold text-slate-800">{plot.cents} Cents (~{plot.sqft.toLocaleString()} Sq.Ft)</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Rate:</span>
                            <span className="font-medium text-slate-700">₹10 Lakhs / Cent</span>
                          </div>
                          <div className="flex justify-between text-slate-800 font-bold pt-1 border-t border-slate-200">
                            <span>Price:</span>
                            <span className="text-amber-800 font-black">{plot.priceStr}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer text-center ${
                            isSelected
                              ? 'bg-brand-green text-white'
                              : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
                          }`}
                        >
                          {isSelected ? 'Selected in Booking Form ✓' : 'Select This Plot'}
                        </button>
                      </div>
                    );
                  })}

                  {/* Option for Full 1.18 Acre Estate */}
                  <div
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        preferredSize: 'Full 1.18 Acres (5 Plots / 118 Cents)',
                        message: 'I am interested in acquiring the entire 1.18 Acre (118 Cents) property in Avinashi. Please contact me to discuss negotiated bulk pricing and schedule site visit.'
                      }));
                      document.getElementById('booking-inquiry-box')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      formData.preferredSize.includes('1.18')
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 shadow-md'
                        : 'bg-gradient-to-br from-brand-green/5 to-amber-500/10 border-brand-green/20 hover:border-brand-green/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-serif text-base font-bold text-brand-green">
                        Whole 1.18 Acre Parcel
                      </span>
                      <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold-dark px-2 py-0.5 rounded-full">
                        Full Parcel
                      </span>
                    </div>

                    <p className="text-xs font-sans text-slate-600 mb-3 font-medium">
                      Contiguous single-owner holding (118 Cents total)
                    </p>

                    <div className="bg-white/80 rounded-xl p-2.5 space-y-1 mb-3 text-xs font-sans">
                      <div className="flex justify-between text-slate-500">
                        <span>Total Area:</span>
                        <span className="font-bold text-slate-800">1.18 Acres (118 Cents)</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Includes:</span>
                        <span className="font-medium text-slate-700">All 5 Subdivided Plots</span>
                      </div>
                      <div className="flex justify-between text-slate-800 font-bold pt-1 border-t border-slate-200">
                        <span>Total Value:</span>
                        <span className="text-emerald-800 font-black">₹11.80 Cr (Negotiable)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer text-center bg-brand-green text-white hover:bg-brand-green-light"
                    >
                      Inquire Full Estate
                    </button>
                  </div>
                </div>
              </div>

              {/* Negotiation Note */}
              <div className="bg-amber-100/60 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950 font-sans">
                <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Transparent Direct Negotiation: </span>
                  The ₹10 Lakhs per Cent pricing is negotiable for genuine buyers, quick registrations, and single-buyer acquisition of the full 1.18 Acre parcel.
                </div>
              </div>
            </div>
          )}

          {/* B. VIRTUAL TOUR PLACEHOLDER */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center space-y-4 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950 to-slate-900 opacity-50"></div>
            
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center animate-pulse relative z-10">
              <Video className="w-6 h-6" />
            </div>
            
            <div className="space-y-1 relative z-10">
              <h4 className="font-serif text-lg font-bold">360° Virtual Site Tour</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                Experience high-definition drone recordings and digital layouts walkthrough from your home. Coming Soon!
              </p>
            </div>
          </div>

          {/* D. AMENITIES GRID */}
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-2xl font-bold text-brand-green">Property Highlights &amp; Amenities</h3>
              <p className="text-xs text-slate-500 font-sans">
                {project.partitionDetails 
                  ? 'Key infrastructure, road access, and utility features of the Avinashi property.'
                  : 'This project boasts world-class utilities built directly to top municipal specifications.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(project.amenities && project.amenities.length > 0 
                ? project.amenities.map(name => ({ name, desc: "Key property feature & infrastructure" }))
                : amenities
              ).map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, borderColor: '#D4AF37' }}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[100px] cursor-pointer transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-green/5 text-brand-green flex items-center justify-center shrink-0 mb-2">
                    <Check className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-brand-green">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Booking Widget & Map (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28 z-20" id="booking-inquiry-box">
          
          {/* SIDEBAR BROCHURE DIRECT DOWNLOAD CARD */}
          <div className="bg-gradient-to-br from-[#0F3D27] via-brand-green to-slate-900 text-white p-5 rounded-2xl border border-brand-gold/40 shadow-xl space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-gold block">
                  Official Digital Document
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-0.5">
                  Project Brochure (PDF)
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/40">
                <Download className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Complete high-res layout drawings, 19-plot demarcation list, sq.ft rate cards, and bank approval files.
            </p>

            <div className="bg-black/25 rounded-xl p-2.5 flex items-center justify-between text-[11px] font-mono text-brand-gold border border-white/10">
              <span>PDF • 1.45 MB</span>
              <span className="text-emerald-400 font-sans font-bold">Standard PDF</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleDownload}
                id="sidebar-download-brochure-link"
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-75"
              >
                {downloadDone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-900 stroke-[3]" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className={`w-4 h-4 stroke-[2.5] ${isDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isDownloading ? 'Downloading...' : 'Download Brochure to Device'}</span>
                  </>
                )}
              </button>
              <a
                href={project.brochureUrl || "/Aurum-Sre-Nagar-Extension-Brochure.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold py-2 rounded-xl transition-colors text-center border border-white/10 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-brand-gold" />
                <span>Open / Preview in Browser</span>
              </a>
            </div>

            <p className="text-[10px] text-white/60 font-sans text-center">
              Direct download to your device • No WhatsApp redirect
            </p>
          </div>

          {/* E. BOOKING INQUIRY WIDGET */}
          <div className="bg-brand-green text-white p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-gold">Book Site Visit</h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Schedule an VIP site inspection with our corporate executive. Complimentary pickup & drop included.
              </p>
            </div>

            <form 
              name="project-visit-booking"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmitBooking} 
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="project-visit-booking" />
              <p className="hidden" aria-hidden="true">
                <label>Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} /></label>
              </p>
              <input type="hidden" name="projectName" value={project.name} />
              {/* Hidden field */}
              <input type="hidden" name="projectId" value={projectId} />

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Arun Kumar"
                  className={`w-full bg-white/5 border rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                    formErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                />
                {formErrors.name && <p className="text-red-300 text-[10px] font-sans">{formErrors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">Mobile Number*</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full bg-white/5 border rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                    formErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                />
                {formErrors.phone && <p className="text-red-300 text-[10px] font-sans">{formErrors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="arun@example.com"
                  className={`w-full bg-white/5 border rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 transition-all ${
                    formErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                />
                {formErrors.email && <p className="text-red-300 text-[10px] font-sans">{formErrors.email}</p>}
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">
                    {project.partitionDetails ? 'Select Plot / Area' : 'Preferred Area'}
                  </label>
                  <select
                    name="preferredSize"
                    value={formData.preferredSize}
                    onChange={handleInputChange}
                    className="w-full bg-brand-green border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
                  >
                    {project.partitionDetails?.plots && project.partitionDetails.plots.length > 0 ? (
                      <>
                        {project.partitionDetails.plots.map((plot, idx) => {
                          const val = project.id === 'avinashi'
                            ? `${plot.id} - ${plot.cents} Cents (${plot.priceStr})`
                            : `${plot.id} - ${plot.sqft.toLocaleString()} Sq.Ft (${plot.priceStr})`;
                          const label = project.id === 'avinashi'
                            ? `${plot.id} – ${plot.cents} Cts / ${plot.sqft} Sq.Ft (${plot.priceStr})`
                            : `${plot.id} – ${plot.sqft.toLocaleString()} Sq.Ft • ${plot.facing?.split('•')[0].trim()} (${plot.priceStr})`;
                          return (
                            <option key={idx} value={val}>
                              {label}
                            </option>
                          );
                        })}
                        {project.id === 'avinashi' && (
                          <option value="Full 1.18 Acres (5 Plots - 118 Cents)">Full 1.18 Acres (5 Plots - 118 Cents)</option>
                        )}
                        <option value="Custom Plot / Multiple Units">Custom Plot / Multiple Units</option>
                      </>
                    ) : (
                      <>
                        {project.unitSize && (
                          <option value={project.unitSize}>{project.unitSize} Unit ({project.sqft.toLocaleString()} Sq.Ft)</option>
                        )}
                        <option value="1200">1200 Sq.Ft</option>
                        <option value="1500">1500 Sq.Ft</option>
                        <option value="1800">1800 Sq.Ft</option>
                        <option value="2400">2400 Sq.Ft</option>
                        <option value="others">others</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">Preferred Date*</label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-green border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 ${
                      formErrors.visitDate ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-brand-gold focus:ring-brand-gold'
                    }`}
                  />
                  {formErrors.visitDate && <p className="text-red-300 text-[10px] font-sans">{formErrors.visitDate}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-white/80 font-sans">Your Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder={
                    project.id === 'sre-nagar-extension-erode'
                      ? "Interested in SRE NAGAR EXTENSION plots in Muthampalayam, Erode. Please share layout plan, bank loan details & schedule a site visit."
                      : project.partitionDetails 
                        ? "Interested in 23.5 Cents plot / Full 1.18 Acres. Please share negotiable pricing & site visit schedule."
                        : project.reraRegistered 
                          ? "I want to discuss financing / RERA approvals." 
                          : "I want to discuss farmland plantation care / site visit."
                  }
                  className="w-full bg-white/5 border border-white/20 focus:border-brand-gold rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-green hover:text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Submitting Inquiry...' : 'Confirm Site Visit'}
              </motion.button>

              {/* Instant WhatsApp Enquiry */}
              <a 
                href={`https://wa.me/917397395529?text=${encodeURIComponent(
                  project.id === 'sre-nagar-extension-erode'
                    ? `Hi Aurum Properties, I am interested in SRE NAGAR EXTENSION in Muthampalayam, Erode (DTCP Approved, 40ft/30ft tar roads, bank loan approved). Please share the layout map, available plots, and schedule a site visit.`
                    : project.id === 'avinashi' || project.partitionDetails
                    ? `Hi Aurum Properties, I am interested in Avinashi 1.18 Acre property (5 plots of 23.5 Cents each @ 10L/cent negotiable). Please share pricing and site visit details.`
                    : `Hi Aurum Properties, I am interested in ${project.name} in ${project.location}. Please share availability and current pricing.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                id={`whatsapp-enquire-${project.id}`}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                </svg>
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </form>
          </div>

          {/* F. LIVE GOOGLE MAP LOCATION */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4" id="project-location-map">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-sans font-bold text-sm text-brand-green flex items-center gap-2">
                <Compass className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                Live Site Location Map
              </h4>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Exact Pin
              </span>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title={`${project.name} Exact Google Map Location`}
                src={project.mapEmbedUrl || "https://maps.google.com/maps?q=11.1920433,77.2766952&hl=en&z=16&output=embed"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Coordinates & Google Maps navigation action */}
            <div className="space-y-3 pt-0.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans border-b border-slate-100 pb-2">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  GPS Coordinates:
                </span>
                <span className="font-mono text-slate-700 font-semibold text-[10px]">
                  {project.coordinates ? `${project.coordinates.lat.toFixed(7)}, ${project.coordinates.lng.toFixed(7)}` : '11.1920433, 77.2766952'}
                </span>
              </div>

              <a
                href={project.mapUrl || "https://maps.google.com/maps?q=11.1920433%2C77.2766952&z=17&hl=en"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white border border-brand-gold/30 py-2.5 px-3 rounded-xl font-sans text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.01] cursor-pointer"
                id="open-google-maps-btn"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-gold" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <p className="text-[11px] text-slate-500 font-sans leading-relaxed text-center">
                Click to open navigation in Google Maps app for direct driving directions to the site entrance.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="detail-success-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
            
            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 max-w-md w-full relative z-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-100">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-brand-green">Site Visit Request Logged</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Thank you! Our sales executive has registered your preferred date (<span className="font-semibold">{formData.visitDate}</span>). We will contact you within 24 hours to arrange transportation.
                </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
