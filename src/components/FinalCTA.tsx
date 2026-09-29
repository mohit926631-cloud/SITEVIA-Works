import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';

interface FinalCTAProps {
  onGetWebsiteClick?: () => void;
  onViewWorkClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onGetWebsiteClick,
  onViewWorkClick,
}) => {
  const handleGetWebsite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGetWebsiteClick) {
      onGetWebsiteClick();
    } else {
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewWorkClick) {
      onViewWorkClick();
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="final-cta" className="py-20 sm:py-28 relative overflow-hidden transition-colors border-t border-slate-200/80 dark:border-slate-800/80">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
          Ready to Get Your Business Website Online?
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          Tell us about your business. We'll build a fast, clean website with direct WhatsApp inquiries and dedicated support. Ready in 3 to 7 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <MagneticButton
            id="final-cta-get-website-btn"
            variant="primary"
            onClick={handleGetWebsite}
            className="w-full sm:w-auto text-sm px-7 py-3.5 rounded-xl shadow-sm min-h-[50px]"
          >
            <span>Get Your Website</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <button
            id="final-cta-view-work-btn"
            type="button"
            onClick={handleViewWork}
            className="w-full sm:w-auto text-sm px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2 min-h-[50px] font-semibold cursor-pointer"
          >
            <Compass className="w-4 h-4 text-blue-500" />
            <span>Explore Live Demos</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

