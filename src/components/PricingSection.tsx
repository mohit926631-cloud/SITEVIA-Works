import React from 'react';
import { Check, Sparkles, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../constants';
import { TiltCard } from './TiltCard';
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
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
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
              <TiltCard
                maxTilt={5}
                id={`pricing-card-${plan.id}`}
                className={`w-full p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isPopular
                    ? 'bg-gradient-to-b from-blue-50/90 to-white dark:from-blue-950/40 dark:to-slate-900/90 border-2 border-blue-600 dark:border-cyan-400 shadow-xl relative md:-translate-y-2'
                    : 'bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-cyan-500 text-white text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-bl-2xl shadow-md z-20 flex items-center gap-1.5 animate-specular-shimmer">
                    <span>🔥 MOST POPULAR</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed min-h-[34px]">
                    {plan.subtitle}
                  </p>

                  {/* Price Block: Clearly labeled as one-time */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                      isPopular ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                      one-time
                    </span>
                  </div>

                  {/* Turnaround Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-6">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>Launch in {turnaround}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8 pt-5 border-t border-slate-200/80 dark:border-slate-800">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5] mt-0.5" />
                        <span className="font-medium leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <MagneticButton
                  onClick={() => onSelectPlan(`${plan.name} — ${plan.price}`)}
                  variant={isPopular ? 'primary' : 'secondary'}
                  shimmer={isPopular}
                  className="w-full py-3.5 px-4 text-sm font-bold shadow-md cursor-pointer"
                >
                  {plan.ctaText}
                </MagneticButton>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
