import React from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

interface PageSkeletonScreenProps {
  targetPage?: PageType;
}

const getPageTitle = (page?: PageType): string => {
  switch (page) {
    case 'home':
      return 'Home';
    case 'services':
      return 'Services & Real Work';
    case 'pricing':
      return 'Pricing & Plans';
    case 'about':
      return 'About SITEVIA WORKS';
    case 'contact':
      return 'Contact & Project Enquiry';
    case 'terms':
      return 'Terms of Service';
    case 'privacy':
      return 'Privacy Policy';
    default:
      return 'Page';
  }
};

export const PageSkeletonScreen: React.FC<PageSkeletonScreenProps> = ({ targetPage = 'home' }) => {
  const activePage: PageType = targetPage as PageType;
  const title = getPageTitle(activePage);

  return (
    <motion.div
      key="page-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(3px)' }}
      transition={{ duration: 0.22 }}
      className="w-full flex-1 flex flex-col items-center relative select-none pointer-events-none py-6 sm:py-10"
      aria-busy="true"
      aria-label={`Loading ${title}`}
    >
      {/* Floating Global Loading Spinner Indicator */}
      <div className="fixed top-20 sm:top-24 z-40 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ y: -8, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -8, opacity: 0, scale: 0.95 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border border-blue-500/30 dark:border-blue-500/40 shadow-xl shadow-blue-500/10 text-xs font-semibold text-slate-800 dark:text-slate-100"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-40" />
            <Loader2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-spin" />
          </div>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Loading
          </span>
          <span className="text-slate-900 dark:text-white font-bold">{title}</span>
          <Sparkles className="w-3 h-3 text-blue-500 dark:text-cyan-400 opacity-80" />
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Top Hero Skeleton Block */}
        <div className="flex flex-col items-center text-center space-y-4 pt-4 sm:pt-8 max-w-3xl mx-auto">
          {/* Tag Pill Skeleton */}
          <div className="h-6 w-36 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />

          {/* Heading Skeleton Bar */}
          <div className="h-10 sm:h-14 w-4/5 sm:w-full rounded-2xl bg-slate-200/90 dark:bg-slate-800/90 animate-pulse" />

          {/* Subheading Skeleton Bar */}
          <div className="h-4 sm:h-5 w-3/5 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse mt-1" />

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-3 pt-3">
            <div className="h-11 w-36 rounded-xl bg-blue-500/20 dark:bg-blue-600/30 animate-pulse" />
            <div className="h-11 w-32 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
          </div>
        </div>

        {/* Page-Contextual Skeleton Layout */}
        {targetPage === 'pricing' ? (
          /* Pricing 3-Card Grid Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className={`p-6 sm:p-8 rounded-3xl border bg-white/70 dark:bg-slate-900/60 space-y-5 ${
                  card === 2
                    ? 'border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'border-slate-200/80 dark:border-slate-800/80'
                }`}
              >
                <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-8 w-32 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="h-3 w-full rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                  <div className="h-3 w-4/6 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                </div>
                <div className="h-11 w-full rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse pt-2" />
              </div>
            ))}
          </div>
        ) : targetPage === 'contact' ? (
          /* Contact Split-Form Skeleton */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 space-y-4">
              <div className="h-6 w-40 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
              <div className="space-y-3 pt-4">
                <div className="h-11 w-full rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                <div className="h-11 w-full rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                <div className="h-24 w-full rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                <div className="h-12 w-full rounded-xl bg-emerald-500/20 dark:bg-emerald-500/30 animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    <div className="h-4 w-40 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* General Content Bento Grid Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 dark:bg-blue-600/25 animate-pulse" />
                <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                  <div className="h-3 w-3/5 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                </div>
                <div className="h-4 w-28 rounded-md bg-blue-500/20 dark:bg-cyan-500/20 animate-pulse pt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Shimmer Bar */}
        <div className="h-16 w-full rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/60 dark:bg-slate-900/40 flex items-center justify-between px-6">
          <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
