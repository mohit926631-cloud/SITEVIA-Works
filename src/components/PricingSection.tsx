import React from 'react';
import { Check, Sparkles } from 'lucide-react';
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
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
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
    <section id="pricing" className="scroll-mt-16">
      {/* Top Royal Blue Header Banner */}
      <div className="py-16 sm:py-20 bg-gradient-to-b from-blue-700 via-blue-800 to-[#0A1638] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 animate-specular-shimmer">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect website package for your business. No hidden fees, no surprises. Just honest, affordable pricing for small businesses.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="py-16 sm:py-20 bg-white dark:bg-[#070C18] text-slate-900 dark:text-white transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20"
          >
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan.isPopular;
              return (
                <motion.div key={plan.id} variants={cardVariants} className="h-full flex">
                  <TiltCard
                    maxTilt={5}
                    id={`pricing-card-${plan.id}`}
                    className={`w-full p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                      isPopular
                        ? 'bg-slate-50/90 dark:bg-slate-900/80 border-2 border-blue-600 dark:border-cyan-400 shadow-2xl relative md:-translate-y-2'
                        : 'bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-black uppercase px-4 py-1 rounded-full shadow-lg shadow-blue-600/40 whitespace-nowrap animate-specular-shimmer z-30">
                        ★ MOST POPULAR
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                          {plan.id === 'starter' && '🌱 '}
                          {plan.id === 'business' && '⭐ '}
                          {plan.id === 'professional' && '🚀 '}
                          {plan.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed min-h-[32px]">
                        {plan.subtitle}
                      </p>

                      <div className="flex items-baseline gap-1.5 mb-6">
                        <span className={`text-4xl sm:text-5xl font-black font-mono ${
                          isPopular ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'
                        }`}>
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">/ one-time</span>
                      </div>

                      <div className="space-y-3 mb-8 pt-5 border-t border-slate-200/80 dark:border-slate-800">
                        {plan.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                            <span className="font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <MagneticButton
                      onClick={() => onSelectPlan(`${plan.name} — ${plan.price}`)}
                      variant={isPopular ? 'primary' : 'secondary'}
                      shimmer={isPopular}
                      className={`w-full py-3.5 px-4 text-sm font-bold shadow-md`}
                    >
                      {plan.ctaText}
                    </MagneticButton>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
