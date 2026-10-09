import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface IsometricStatsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function IsometricStatsSection({ onNavigate }: IsometricStatsSectionProps) {
  const stats = [
    {
      value: '10,000+',
      label: 'Happy Families',
      subtext: 'Homeowners across Tamil Nadu',
    },
    {
      value: '500+',
      label: 'Acres Masterplanned',
      subtext: 'High-growth economic corridors',
    },
    {
      value: '50+',
      label: 'Projects Delivered',
      subtext: '100% CMDA & DTCP approved',
    },
    {
      value: '15+',
      label: 'Years of Trust',
      subtext: 'Consistent capital appreciation',
    },
  ];

  const trustPillars = [
    '100% Clear Titles & Nil Encumbrance',
    'Pre-Approved Bank Loans (SBI, HDFC)',
    'Immediate Individual Patta Guarantee',
  ];

  return (
    <section 
      id="stats-counter-section"
      className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Clean, Minimalist Luxury Container */}
      <div className="bg-[#0B3520] text-white rounded-2xl border border-brand-gold/25 shadow-xl shadow-slate-900/10 p-6 sm:p-8 lg:p-10 backdrop-blur-md">
        
        {/* 4 Minimal Metric Columns with Subtle Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`space-y-1.5 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-gold block">
                {stat.value}
              </span>
              <h3 className="font-sans text-sm sm:text-base font-semibold text-white">
                {stat.label}
              </h3>
              <p className="font-sans text-xs text-slate-300 font-light">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Trust Bar Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-300">
          <div className="flex items-center gap-2 text-brand-gold font-medium">
            <Award className="w-4 h-4 text-brand-gold shrink-0" />
            <span>The Gold Standard in Land Development</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {trustPillars.map((pillar, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {pillar}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
