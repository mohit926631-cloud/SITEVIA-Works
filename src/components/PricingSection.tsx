import React from 'react';
import { Check, Clock, Minus, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS, PRICING_COMPARISON_ROWS } from '../constants';
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
    starter: '3 – 4 Days',
    business: '5 – 6 Days',
    premium: '7 – 9 Days',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 3 Core Pricing Cards */}
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
                    ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-lg md:-translate-y-1'
                    : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Metadata: Purpose & Popular */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs font-semibold">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      {plan.purpose}
                    </span>

                    {isPopular && (
                      <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed min-h-[34px]">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Block: Clearly labeled as one-time */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums ${
                        isPopular ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                      }`}
                    >
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

                  {/* Features List (Concise, not overcrowded) */}
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

      {/* Clean Pricing Comparison Table */}
      <div id="pricing-comparison" className="w-full pt-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Compare Plan Features
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Every core difference in detail so you can pick the exact fit.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 w-2/5">
                    Feature
                  </th>
                  <th scope="col" className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 w-1/5 text-center">
                    Starter <span className="block text-[10px] text-slate-400 font-mono font-normal">₹2,999</span>
                  </th>
                  <th scope="col" className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 w-1/5 text-center bg-blue-50/40 dark:bg-blue-950/20">
                    Business <span className="block text-[10px] text-blue-500 font-mono font-normal">₹5,499</span>
                  </th>
                  <th scope="col" className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 w-1/5 text-center">
                    Premium <span className="block text-[10px] text-slate-400 font-mono font-normal">₹7,999</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
                {PRICING_COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40 ${
                      idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>

                    {/* Starter Column */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[2.5]" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {row.starter}
                        </span>
                      )}
                    </td>

                    {/* Business Column (Subtle highlight) */}
                    <td className="py-3.5 px-4 text-center bg-blue-50/30 dark:bg-blue-950/10">
                      {typeof row.business === 'boolean' ? (
                        row.business ? (
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto stroke-[2.5]" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {row.business}
                        </span>
                      )}
                    </td>

                    {/* Premium Column */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[2.5]" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {row.premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Disclaimer Note */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-slate-700 dark:text-slate-300">Domain & Hosting Charges:</strong> Domain registration and cloud hosting server fees are paid directly by the client to the provider. SITEVIA WORKS provides free setup, DNS connection, and SSL deployment.
              </p>
            </div>
            <div className="flex items-start gap-2 text-slate-400 dark:text-slate-500 pl-6">
              <p className="leading-relaxed">
                Development pricing is a fixed, transparent one-time fee with zero monthly platform builder fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
