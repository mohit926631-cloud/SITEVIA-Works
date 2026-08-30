import React from 'react';
import { HOW_IT_WORKS } from '../constants';
import { MessageSquare, LayoutTemplate, Code2, RefreshCw, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export const HowItWorks: React.FC = () => {
  const stepIcons = [MessageSquare, LayoutTemplate, Code2, RefreshCw, Rocket];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" style={{ animationDuration: '4s' }} />
            <span>Streamlined 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Idea to Live Website.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3">
            No endless meetings or confusing technical jargon. We keep the process transparent, collaborative, and fast.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline (md and up) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden lg:grid grid-cols-5 gap-4 relative"
        >
          {/* Animated Glowing Horizontal Connecting Line */}
          <div className="absolute top-[28px] left-12 right-12 h-[3px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 -z-0 opacity-70 animate-flowing-timeline shadow-[0_0_12px_rgba(56,189,248,0.6)]"></div>

          {HOW_IT_WORKS.map((item, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            return (
              <motion.div key={item.step} variants={itemVariants} className="h-full">
                <TiltCard
                  maxTilt={6}
                  className="h-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative z-10 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl dark:shadow-lg shadow-sm group"
                >
                  <div>
                    {/* Step Header with Pulsing Milestone Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                        STEP {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-3">
                      "{item.description}"
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-3 border-t border-slate-200 dark:border-slate-800/80">
                    {item.detail}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile / Tablet Vertical Timeline (Under lg) with Animated Glowing Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:hidden relative pl-6 sm:pl-8 space-y-6"
        >
          {/* Animated Vertical Connecting Line */}
          <div className="absolute left-2.5 sm:left-3.5 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-blue-600 via-cyan-400 to-emerald-400 opacity-80 animate-flowing-timeline shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>

          {HOW_IT_WORKS.map((item, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            return (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="relative bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-md hover:border-cyan-500/50 transition-all"
              >
                {/* Timeline Bullet Node with Glowing Ring */}
                <div className="absolute -left-6 sm:-left-8 top-6 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-cyan-400 flex items-center justify-center -translate-x-1/2 shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping opacity-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 absolute"></span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                    STEP {item.step}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-2">
                  "{item.description}"
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800/60">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
