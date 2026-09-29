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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="who-we-build-for" className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Built For Your Industry
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Tailored features and customer inquiry workflows configured for your specific business category.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {TARGET_AUDIENCES.map((item: TargetAudience) => {
            const Icon = getAudienceIcon(item.iconName);
            return (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <div
                  className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between transition-colors hover:border-slate-400 dark:hover:border-slate-700 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.featuresNeeded.map((f) => (
                        <span
                          key={f}
                          className="text-[10px] bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[130px]">
                      {item.sampleWebsite}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectAudience?.(item.title.split('&')[0].trim())}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

