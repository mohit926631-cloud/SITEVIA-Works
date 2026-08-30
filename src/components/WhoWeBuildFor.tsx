import React from 'react';
import { TARGET_AUDIENCES } from '../constants';
import {
  UtensilsCrossed,
  Coffee,
  Sparkles,
  Dumbbell,
  Shirt,
  Store,
  Laptop,
  Camera,
  Code,
  GraduationCap,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { TargetAudience } from '../types';
import { TiltCard } from './TiltCard';

interface WhoWeBuildForProps {
  onSelectAudience?: (businessType: string) => void;
}

export const WhoWeBuildFor: React.FC<WhoWeBuildForProps> = ({ onSelectAudience }) => {
  const getAudienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return UtensilsCrossed;
      case 'Coffee':
        return Coffee;
      case 'Sparkles':
        return Sparkles;
      case 'Dumbbell':
        return Dumbbell;
      case 'Shirt':
        return Shirt;
      case 'Store':
        return Store;
      case 'Laptop':
        return Laptop;
      case 'Camera':
        return Camera;
      case 'Code':
        return Code;
      case 'GraduationCap':
        return GraduationCap;
      case 'Rocket':
      default:
        return Rocket;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
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
    <section id="who-we-build-for" className="py-16 sm:py-24 bg-slate-100/50 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-3">
            <span>Tailored For Your Niche</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built For Businesses Like Yours.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3">
            We understand the specific requirements, user flows, and conversion elements each type of business needs.
          </p>
        </motion.div>

        {/* 11 Audience Cards with 3D Parallax Tilt and Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {TARGET_AUDIENCES.map((item: TargetAudience) => {
            const Icon = getAudienceIcon(item.iconName);
            return (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <TiltCard
                  maxTilt={6}
                  className="h-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-sm dark:shadow-none"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.featuresNeeded.map((f) => (
                        <span
                          key={f}
                          className="text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[130px]">
                      Demo: {item.sampleWebsite}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectAudience?.(item.title.split('&')[0].trim())}
                      className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 p-1 cursor-pointer transition-colors"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
