import React from 'react';
import {
  Smartphone,
  MessageCircle,
  Search,
  Mail,
  Globe,
  Share2,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { WHAT_YOU_GET_ITEMS } from '../constants';

export const TrustStrip: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return Smartphone;
      case 'MessageCircle':
        return MessageCircle;
      case 'Search':
        return Search;
      case 'Mail':
        return Mail;
      case 'Globe':
        return Globe;
      case 'Share2':
        return Share2;
      case 'Zap':
        return Zap;
      case 'ShieldCheck':
      default:
        return ShieldCheck;
    }
  };

  return (
    <section
      id="what-you-get"
      aria-label="What you get with every website"
      className="py-14 sm:py-20 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 relative overflow-hidden transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Standard Across All Packages</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            What You Get With Every Website
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Essential foundation items included with every SITEVIA WORKS project. Zero hidden extras.
          </p>
        </div>

        {/* 8 Concise Deliverable Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {WHAT_YOU_GET_ITEMS.map((item, idx) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="rounded-xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors hover:border-slate-400 dark:hover:border-slate-700"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
