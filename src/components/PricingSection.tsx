import React from 'react';
import { Check, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../constants';
import { MagneticButton } from './MagneticButton';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
  };

  const turnaroundByPlan: Record<string, string> = {
    starter: '3 - 4 Days',
    business: '5 - 6 Days',
    premium: '7 - 9 Days',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
      >
        {PRICING_PLANS.map((plan) => {
          const isPopular = plan.isPopular;
          const turnaround = turnaroundByPlan[plan.id] || '5 Days';

          return (
            <motion.div key={plan.id} variants={cardVariants} className="h-full flex">
              <div
                id={`pricing-card-${plan.id}`}
                className={`w-full p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-200 relative ${
                  isPopular
                    ? 'bg-slate-50 dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-md relative md:-translate-y-1'
                    : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Subtle Most Popular Indicator */}
                {isPopular && (
                  <div className="mb-4">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                      Recommended for most businesses
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed min-h-[34px]">
                    {plan.subtitle}
                  </p>

                  {/* Price Block: Clearly labeled as one-time */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums ${
                      isPopular ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      one-time
                    </span>
                  </div>

                  {/* Turnaround Metadata */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>Launch in {turnaround}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 pt-5 border-t border-slate-200/80 dark:border-slate-800">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5] mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <MagneticButton
                  onClick={() => onSelectPlan(`${plan.name} — ${plan.price}`)}
                  variant={isPopular ? 'primary' : 'secondary'}
                  className="w-full py-3.5 px-4 text-sm font-bold shadow-sm cursor-pointer"
                >
                  {plan.ctaText}
                </MagneticButton>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

