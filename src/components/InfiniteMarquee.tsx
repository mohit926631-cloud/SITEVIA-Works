import React from 'react';
import {
  Zap,
  Smartphone,
  MessageCircle,
  Search,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const tickerItems = [
    { icon: Clock, text: '7-Day Fast Delivery' },
    { icon: Smartphone, text: '100% Mobile Ready' },
    { icon: MessageCircle, text: 'Direct WhatsApp Leads' },
    { icon: Zap, text: '1.5s Ultra-Fast Speed' },
    { icon: Search, text: 'Google SEO Optimized' },
    { icon: MapPin, text: 'Google Maps Integration' },
    { icon: CreditCard, text: 'Online Payments & QR' },
    { icon: ShieldCheck, text: 'Free 30-Day Support' },
    { icon: Sparkles, text: 'Custom Business Design' },
  ];

  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      id="infinite-feature-marquee"
      aria-label="Features banner"
      className="relative w-full overflow-hidden py-3.5 bg-gradient-to-r from-blue-900/40 via-indigo-950/50 to-blue-900/40 dark:from-[#060D1E] dark:via-[#0A1638] dark:to-[#060D1E] border-y border-blue-500/20 dark:border-blue-500/15 backdrop-blur-md"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#070A10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#070A10] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-6 sm:space-x-10 items-center">
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap select-none"
            >
              <div className="p-1 rounded-md bg-blue-500/10 dark:bg-cyan-500/15 text-blue-600 dark:text-cyan-400">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span>{item.text}</span>
              <span className="text-blue-400/40 dark:text-cyan-400/40 ml-3 sm:ml-5 font-black">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
