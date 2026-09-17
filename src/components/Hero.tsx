import React from 'react';
import {
  MessageCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onExploreWorkClick?: () => void;
  onGetWebsiteClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorkClick, onGetWebsiteClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-white dark:bg-[#060913] text-slate-900 dark:text-white overflow-hidden transition-colors"
    >
      {/* Dynamic Cosmic Ambient Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-1/4 w-[500px] sm:w-[800px] h-[500px] bg-blue-600/15 dark:bg-blue-600/25 rounded-full blur-[140px] animate-aurora-wave" />
        <div className="absolute top-[80px] right-1/4 w-[400px] sm:w-[600px] h-[450px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[130px] animate-aurora-wave [animation-delay:4s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Top Banner Graphic with Soft Aura & Floating Motion */}
          <motion.div
            variants={itemVariants}
            id="hero-banner-image-container"
            className="mb-6 sm:mb-8 flex justify-center w-full relative group"
          >
            {/* Diffused backdrop aura */}
            <div
              className="absolute inset-0 max-w-[280px] sm:max-w-md md:max-w-lg mx-auto bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />

            {/* Gentle ambient floating wrapper */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative z-10 cursor-default"
            >
              <img
                id="hero-banner-image"
                src="/images/hero-banner.png"
                onError={(e) => {
                  // High-reliability fallback to direct hosted image
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/PsPsGXXZ/file-00000000ec9481f48ca4fe7d3ac52d35.png';
                }}
                referrerPolicy="no-referrer"
                alt="Sitevia Works Banner"
                className="max-w-[260px] xs:max-w-[300px] sm:max-w-md md:max-w-lg w-full h-auto object-contain mx-auto drop-shadow-sm rounded-xl transition-all duration-300"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          {/* High-Impact Headline with Specular Shimmer */}
          <motion.h1
            variants={itemVariants}
            id="hero-main-headline"
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6"
          >
            Websites That Turn Visitors Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-400 animate-shimmer-text">
              Paying Clients.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            id="hero-subtext"
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal"
          >
            We engineer high-speed, modern websites for businesses, creators, clinics, and brands with{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              direct WhatsApp ordering, zero bloated code, and 100% ownership
            </strong>
            . Delivered in just 7 days.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* WhatsApp Consultation Button with Specular Shimmer */}
            <div className="relative w-full sm:w-auto">
              <MagneticButton
                id="hero-whatsapp-btn"
                href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I would like to discuss building a custom website for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="emerald"
                shimmer={true}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-lg shadow-emerald-500/25 min-h-[52px]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </MagneticButton>
              <span className="absolute -top-2.5 -right-2 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md pointer-events-none z-20 animate-pulse">
                Free Scope
              </span>
            </div>

            {/* Explore Demos / Get Started Button */}
            <button
              id="hero-view-work-btn"
              type="button"
              onClick={onExploreWorkClick}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md min-h-[52px]"
            >
              <span>Explore Live Blueprints</span>
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </button>
          </motion.div>

          {/* Quick Value Points Ribbon */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>99+ Google PageSpeed</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>7-Day Turnaround</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Full Code Ownership</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
