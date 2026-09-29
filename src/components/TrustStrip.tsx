import React from 'react';
import { Palette, Smartphone, MessageCircle, MapPin, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: Palette,
      title: 'Custom Design',
      subtitle: 'Tailored to your exact business aesthetic',
      iconColor: 'text-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      subtitle: 'Fast and responsive on all phone screens',
      iconColor: 'text-blue-500',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Ready',
      subtitle: 'Direct customer inquiries to your mobile',
      iconColor: 'text-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Google Maps & SEO',
      subtitle: 'Easy local discovery and 1-tap navigation',
      iconColor: 'text-blue-500',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      subtitle: 'Typically live in 3 to 7 business days',
      iconColor: 'text-blue-500',
    },
  ];

  return (
    <section
      id="trust-strip"
      className="py-10 sm:py-14 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 relative overflow-hidden transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group cursor-default transition-colors hover:border-slate-400 dark:hover:border-slate-700"
              >
                <div className={`p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 ${item.iconColor} mb-2.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
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

