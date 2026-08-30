import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
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
    <section id="final-cta" className="py-24 sm:py-32 relative overflow-hidden transition-colors">
      {/* 3D Atmospheric Nebula Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 text-xs font-semibold mb-6 font-mono animate-specular-shimmer">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-READY DEPLOYMENT</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          Ready to Elevate Your Business Online?
        </h2>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Tell us your vision. We engineer a bespoke website tailored to convert your traffic into long-term clients.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <MagneticButton
            id="final-cta-get-website-btn"
            variant="primary"
            shimmer={true}
            onClick={handleGetWebsite}
            className="w-full sm:w-auto text-sm px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 dark:shadow-blue-900/60 min-h-[54px]"
          >
            <span>Get Your Website</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            id="final-cta-view-work-btn"
            variant="secondary"
            shimmer={false}
            onClick={handleViewWork}
            className="w-full sm:w-auto text-sm px-7 py-4 rounded-2xl min-h-[54px]"
          >
            <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Explore Live Demos</span>
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
};
