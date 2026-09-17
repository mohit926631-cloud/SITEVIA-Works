import React from 'react';
import { Palette, Smartphone, MessageCircle, MapPin, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: Palette,
      title: 'CUSTOM DESIGN',
      subtitle: 'Tailored to your exact business aesthetic',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Smartphone,
      title: 'MOBILE-FIRST',
      subtitle: 'Flawless browsing on every smartphone size',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: MessageCircle,
      title: 'WHATSAPP READY',
      subtitle: 'Direct customer leads straight to your phone',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: MapPin,
      title: 'GOOGLE MAPS',
      subtitle: 'Pinpoint locations & 1-tap navigation',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: Zap,
      title: 'FAST DEPLOYMENT',
      subtitle: 'Rapid turnaround with modern infrastructure',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <section
      id="trust-strip"
      className="py-12 sm:py-16 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/60 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            BUILT FOR MAXIMUM CUSTOMER CONVERSIONS
          </span>
        </motion.div>

        {/* Dynamic Responsive Grid with subtle hover lift */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group cursor-default card-hover-glow"
              >
                <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 ${item.iconColor} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
