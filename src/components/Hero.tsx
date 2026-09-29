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
      className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 bg-white dark:bg-[#070A10] text-slate-900 dark:text-white overflow-hidden transition-colors"
    >
      {/* Subtle, quiet ambient background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Studio Banner Graphic */}
          <motion.div
            variants={itemVariants}
            id="hero-banner-image-container"
            className="mb-8 flex justify-center w-full relative"
          >
            <div className="relative z-10">
              <img
                id="hero-banner-image"
                src="/images/hero-banner.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/PsPsGXXZ/file-00000000ec9481f48ca4fe7d3ac52d35.png';
                }}
                referrerPolicy="no-referrer"
                alt="SITEVIA WORKS Studio Banner"
                className="max-w-[260px] xs:max-w-[300px] sm:max-w-md md:max-w-lg w-full h-auto object-contain mx-auto rounded-xl drop-shadow-sm transition-all"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* High-Impact Headline */}
          <motion.h1
            variants={itemVariants}
            id="hero-main-headline"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6 [text-wrap:balance]"
          >
            Websites That Turn Visitors Into{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Paying Clients.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            id="hero-subtext"
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal"
          >
            We design and build fast, modern websites for businesses, creators, clinics, and local brands with{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              direct WhatsApp inquiries, zero monthly platform fees, and dedicated post-launch support
            </strong>
            . Delivered in 3 to 7 days.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* WhatsApp Consultation Button */}
            <MagneticButton
              id="hero-whatsapp-btn"
              href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I would like to discuss building a custom website for my business.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="emerald"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold shadow-sm min-h-[50px]"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </MagneticButton>

            {/* Explore Demos / Get Started Button */}
            <button
              id="hero-view-work-btn"
              type="button"
              onClick={onExploreWorkClick}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[50px]"
            >
              <span>Explore Live Blueprints</span>
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </button>
          </motion.div>

          {/* Clean Proof & Turnaround Points */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>99+ PageSpeed</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>3–7 Day Turnaround</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Dedicated Support Included</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
