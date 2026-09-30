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

  // Double the items inside each track so even wide displays have uninterrupted coverage
  const duplicatedSet = [...tickerItems, ...tickerItems];

  return (
    <div
      id="infinite-feature-marquee"
      aria-label="Features banner"
      className="relative w-full overflow-hidden py-3 bg-slate-100/70 dark:bg-[#070A10] border-y border-slate-200/80 dark:border-slate-800/80 select-none group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-100 dark:from-[#070A10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-100 dark:from-[#070A10] to-transparent z-10 pointer-events-none" />

      {/* Continuously moving marquee track */}
      <div className="flex w-max animate-marquee">
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
          {duplicatedSet.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`t1-${index}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                <div className="p-1 rounded-md bg-slate-200/80 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{item.text}</span>
                <span className="text-slate-300 dark:text-slate-700 ml-3 sm:ml-5 font-bold">·</span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Identical twin for seamless 0-gap infinite loop) */}
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10" aria-hidden="true">
          {duplicatedSet.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`t2-${index}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                <div className="p-1 rounded-md bg-slate-200/80 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{item.text}</span>
                <span className="text-slate-300 dark:text-slate-700 ml-3 sm:ml-5 font-bold">·</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

