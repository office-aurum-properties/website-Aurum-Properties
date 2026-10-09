import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Download, Eye, ShieldCheck, CheckCircle, RefreshCw } from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data';
import { preloadRoute } from '../lib/routePreloader';
import { downloadBrochurePDF } from '../lib/utils';

interface ProjectsListingProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (sectionId: string) => void;
  externalSearchQuery: string;
  initialFilters?: { city?: string; budget?: string; type?: string };
}

export default function ProjectsListing({ onSelectProject, onNavigate, externalSearchQuery, initialFilters }: ProjectsListingProps) {
  // Only keep Live projects
  const liveProjects = projectsData.filter(p => p.status !== 'Upcoming');

  // Cities Filter State
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  // Size range filter state
  const [selectedSizeRange, setSelectedSizeRange] = useState<string>('all');
  // Budget range slider state (in Lakhs, from 5L to 200L (2Cr))
  const [maxBudget, setMaxBudget] = useState<number>(200);
  // Status check filters state
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Search state inside listing page (syncs with query)
  const [innerSearch, setInnerSearch] = useState('');

  // Brochure request modal state
  const [brochureModalProject, setBrochureModalProject] = useState<string | null>(null);

  // Active projects list state after filtering (only Live projects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(liveProjects);

  // Trigger filters on load if initialFilters are passed (from hero)
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.city) {
        setSelectedCities([initialFilters.city]);
      }
      if (initialFilters.budget) {
        if (initialFilters.budget === '15L') setMaxBudget(15);
        else if (initialFilters.budget === '25L') setMaxBudget(30);
        else if (initialFilters.budget === '50L') setMaxBudget(50);
        else if (initialFilters.budget === '1Cr') setMaxBudget(200);
      }
      handleApplyFilters();
    }
  }, [initialFilters]);

  // Sync external header search to inner listing search
  useEffect(() => {
    setInnerSearch(externalSearchQuery);
  }, [externalSearchQuery]);

  // Run filtering on search change or basic updates
  useEffect(() => {
    evaluateFilters();
  }, [innerSearch, selectedCities, selectedSizeRange, maxBudget, selectedStatuses]);

  const handleCityCheckbox = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleStatusCheckbox = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const evaluateFilters = () => {
    const results = liveProjects.filter((project) => {
      // 1. Filter by City
      if (selectedCities.length > 0 && !selectedCities.includes(project.city)) {
        return false;
      }

      // 2. Filter by Name (Search query)
      if (innerSearch.trim() !== '') {
        const query = innerSearch.toLowerCase();
        const matchName = project.name.toLowerCase().includes(query);
        const matchLoc = project.location.toLowerCase().includes(query);
        if (!matchName && !matchLoc) return false;
      }

      // 3. Filter by Size Range
      if (selectedSizeRange !== 'all') {
        if (selectedSizeRange === 'below-1000' && project.sqft >= 1000) return false;
        if (selectedSizeRange === '1000-2000' && (project.sqft < 1000 || project.sqft > 2000)) return false;
        if (selectedSizeRange === 'above-2000' && project.sqft <= 2000) return false;
      }

      // 4. Filter by Budget Range
      if (project.priceNumeric > maxBudget) {
        return false;
      }

      // 5. Filter by Development Status
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(project.status)) {
        return false;
      }

      return true;
    });

    setFilteredProjects(results);
  };

  const handleApplyFilters = () => {
    evaluateFilters();
  };

  const handleClearFilters = () => {
    setSelectedCities([]);
    setSelectedSizeRange('all');
    setMaxBudget(200);
    setSelectedStatuses([]);
    setInnerSearch('');
    setFilteredProjects(liveProjects);
  };

  const handleDownloadBrochure = async (projectName: string, brochureUrl?: string) => {
    const targetProject = projectsData.find(p => p.name === projectName || p.id === projectName);
    const url = brochureUrl || targetProject?.brochureUrl || (projectName.toLowerCase().includes('erode') || projectName.toLowerCase().includes('sre') ? '/Aurum-Sre-Nagar-Extension-Brochure.pdf' : undefined);
    
    if (url) {
      await downloadBrochurePDF(url, `${projectName.replace(/[^a-zA-Z0-9]/g, '-')}-Official-Brochure.pdf`);
      return;
    }
    setBrochureModalProject(projectName);
  };

  // Variant setups
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardItem = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 }
    }
  };

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title block */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-brand-gold-dark tracking-widest uppercase font-sans">
            MANAGED FARMLANDS &bull; CMDA & DTCP APPROVED DEVELOPMENTS &bull; TAMIL NADU
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">
            Our Projects & Communities
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-2xl">
            Explore our prime live managed farmland communities and DTCP-approved residential developments with 100% clear titles, immediate registration, and high appreciation potential.
          </p>
        </div>

        {/* Global Reset */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="global-reset-filters"
          onClick={handleClearFilters}
          className="text-xs font-bold text-brand-gold-dark hover:text-brand-green font-sans tracking-wider uppercase underline underline-offset-4 cursor-pointer self-start md:self-end flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset All Filters
        </motion.button>
      </div>

      <div className="space-y-6">
        
        {/* Category Controls & Search bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Live Projects Status Indicator */}
          <div className="flex items-center gap-2">
            <div 
              id="live-projects-indicator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green text-brand-gold text-xs font-bold font-sans shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Projects ({liveProjects.length})
            </div>
          </div>

          {/* Search bar & count display */}
          <div className="flex items-center gap-3 flex-1 md:max-w-md">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="search-projects-input"
                type="text"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                placeholder="Search by project name or location..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-sans border border-slate-200 bg-slate-50 focus:bg-white text-brand-green focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            
            <div className="text-xs font-sans text-slate-500 text-right font-medium shrink-0 hidden sm:block">
              Showing <span className="text-brand-green font-bold">{filteredProjects.length}</span> of {liveProjects.length}
            </div>
          </div>
        </div>

        {/* Main Grid: 2 columns for 4 projects */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div 
              variants={listContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  id={`project-card-${project.id}`}
                  variants={cardItem}
                  layout
                  whileHover={{ y: -6, borderColor: '#D4AF37' }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image with zoom on hover */}
                  <div className="h-60 sm:h-64 relative overflow-hidden flex flex-col justify-between p-5">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradientFrom} ${project.imageGradientTo}`}></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10"></div>
                    
                    <div className="flex items-center justify-between relative z-20">
                      <span className="bg-emerald-600/95 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Live Project
                      </span>
                      
                      <div className="flex gap-1.5">
                        {project.dtcpApproved && (
                          <span className="bg-white/90 text-brand-green text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase flex items-center gap-1 shadow-sm">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> DTCP Approved
                          </span>
                        )}
                        {project.reraRegistered && (
                          <span className="bg-brand-gold/95 text-brand-green text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase flex items-center gap-1 shadow-sm">
                            <CheckCircle className="w-3 h-3 text-brand-green" /> RERA
                          </span>
                        )}
                        {project.bankLoanAvailable && (
                          <span className="bg-blue-600/90 text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase flex items-center gap-1 shadow-sm">
                            <ShieldCheck className="w-3 h-3 text-white" /> Bank Loan
                          </span>
                        )}
                        {!project.dtcpApproved && !project.reraRegistered && (
                          <span className="bg-emerald-600/95 text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase flex items-center gap-1 shadow-sm">
                            <ShieldCheck className="w-3 h-3 text-white" /> Clear Patta
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative z-20 text-white">
                      <p className="text-xs font-bold tracking-widest text-brand-gold uppercase flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        {project.location}
                      </p>
                      <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide mt-1 text-white line-clamp-2">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between bg-white z-20">
                    <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Key Amenities Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-sans font-medium">
                          {amenity}
                        </span>
                      ))}
                      {project.amenities.length > 3 && (
                        <span className="text-[10px] text-slate-400 px-1 py-1 font-sans">
                          +{project.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-y border-slate-100 py-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Area / Dimensions</span>
                        <span className="text-brand-green font-bold font-sans text-sm">
                          {project.totalArea || `${project.sqft.toLocaleString()} Sq.Ft`}
                        </span>
                        {project.id === 'avinashi' && (
                          <span className="text-[10px] text-brand-gold-dark font-medium block">
                            5 Plots (23.5 Cents each)
                          </span>
                        )}
                        {project.id === 'sre-nagar-extension-erode' && (
                          <span className="text-[10px] text-brand-gold-dark font-medium block">
                            All 19 Plots For Sale (Plot 05–11 North @ ₹3,299 • Others South @ ₹2,999)
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5 text-right">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Pricing</span>
                        <span className="text-brand-gold-dark font-serif font-bold text-base sm:text-lg">{project.priceStr}</span>
                        {project.isNegotiable && (
                          <span className="text-[10px] text-emerald-700 font-bold block font-sans">
                            Negotiable
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        id={`view-details-${project.id}`}
                        onMouseEnter={() => preloadRoute('project-detail')}
                        onTouchStart={() => preloadRoute('project-detail')}
                        onClick={() => onSelectProject(project.id)}
                        className="flex items-center justify-center gap-1.5 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>
                      
                      <button
                        id={`download-brochure-${project.id}`}
                        onClick={() => handleDownloadBrochure(project.name, project.brochureUrl)}
                        className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm"
                        title="Direct Download Brochure to Device (PDF)"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Brochure
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-4 max-w-md mx-auto"
              >
                <div className="w-14 h-14 bg-brand-green/5 text-brand-green rounded-full flex items-center justify-center mx-auto text-xl font-bold font-serif">!</div>
                <h3 className="font-serif text-lg font-bold text-brand-green">No Match Found</h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  We couldn't find any projects matching your exact filter parameters. Try expanding your budget range slider or checking other cities.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-brand-green text-brand-gold px-6 py-2 rounded-xl text-xs font-bold uppercase transition-colors hover:bg-brand-green-light cursor-pointer"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      {/* Brochure Request Modal */}
      <AnimatePresence>
        {brochureModalProject && (
          <div 
            id="brochure-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
              onClick={() => setBrochureModalProject(null)}
            ></div>

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 max-w-md w-full relative z-10 space-y-6 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                <Download className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold text-brand-gold-dark uppercase tracking-widest block">
                  Official Digital Brochure
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-green">
                  {brochureModalProject}
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  The complete high-resolution project brochure with DTCP approval details, RERA compliance certificates, layout map, road dimensions, and pricing schedule will be dispatched immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadBrochure(brochureModalProject || 'Sre-Nagar-Extension');
                    setBrochureModalProject(null);
                  }}
                  className="flex-1 bg-brand-green hover:bg-brand-green-light text-brand-gold hover:text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Direct Download (PDF)
                </button>

                <a
                  href="/Aurum-Sre-Nagar-Extension-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl border border-brand-green/30 text-brand-green hover:bg-emerald-50 font-sans text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  title="View PDF directly in browser"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>

                <button
                  onClick={() => setBrochureModalProject(null)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-green font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
