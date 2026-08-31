import React from 'react';
import {
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onExploreWorkClick?: () => void;
  onGetWebsiteClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorkClick }) => {
  const handleExploreWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreWorkClick) {
      onExploreWorkClick();
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-white dark:bg-[#070C18] text-slate-900 dark:text-white overflow-hidden transition-colors"
    >
      {/* Background Soft Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/15 via-purple-500/10 to-transparent dark:from-blue-600/20 dark:via-purple-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header Area with Staggered Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            id="hero-main-headline"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5"
          >
            Build Your Dream{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#9333EA]">
              Website Today
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            id="hero-subtext"
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal"
          >
            Professional, stunning websites designed for{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              salons, restaurants, gyms, clinics
            </strong>
            , and local businesses. Get online in just{' '}
            <span className="font-bold text-blue-600 dark:text-cyan-400 underline decoration-blue-500 dark:decoration-cyan-400 decoration-2 underline-offset-4">
              7 days! 🚀
            </span>
          </motion.p>

          {/* Dual Magnetic Action Buttons with Shimmer */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* Green WhatsApp Magnetic Button with Red "Free" Badge & Specular Shimmer */}
            <div className="relative w-full sm:w-auto">
              <MagneticButton
                id="hero-whatsapp-btn"
                href={createQuickWhatsAppUrl('Hi ViteWEB! I would like to discuss building a website for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="emerald"
                shimmer={true}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-lg shadow-emerald-500/25 min-h-[50px]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </MagneticButton>
              {/* Red "Free" Pill Badge */}
              <span className="absolute -top-2.5 -right-2 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md pointer-events-none z-20 animate-pulse">
                Free
              </span>
            </div>

            {/* Frosted "View Demos" Magnetic Button */}
            <MagneticButton
              id="hero-view-work-btn"
              onClick={handleExploreWork}
              variant="secondary"
              shimmer={false}
              className="w-full sm:w-auto px-7 py-3.5 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 font-bold text-base min-h-[50px]"
            >
              <span>View Demos</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
