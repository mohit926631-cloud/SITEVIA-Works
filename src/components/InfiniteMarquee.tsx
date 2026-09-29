import React from 'react';
import {
  Zap,
  Smartphone,
  MessageCircle,
  Search,
  CreditCard,
  MapPin,
  Clock,
  Palette,
  ShieldCheck,
} from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const tickerItems = [
    { icon: Clock, text: '7-Day Delivery' },
    { icon: Smartphone, text: '100% Mobile Ready' },
    { icon: MessageCircle, text: 'Direct WhatsApp Inquiries' },
    { icon: Zap, text: 'Fast Loading Speed' },
    { icon: Search, text: 'Google SEO Ready' },
    { icon: MapPin, text: 'Google Maps Integration' },
    { icon: CreditCard, text: 'Online Payments & QR' },
    { icon: ShieldCheck, text: 'Dedicated Post-Launch Support' },
    { icon: Palette, text: 'Custom Business Design' },
  ];

  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      id="infinite-feature-marquee"
      aria-label="Features banner"
      className="relative w-full overflow-hidden py-3 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#070A10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#070A10] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-6 sm:space-x-10 items-center">
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap select-none"
            >
              <div className="p-1 rounded bg-slate-200/70 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span>{item.text}</span>
              <span className="text-slate-300 dark:text-slate-700 ml-3 sm:ml-5 font-bold">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

