import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface RotatingCircularBadgeProps {
  className?: string;
}

export const RotatingCircularBadge: React.FC<RotatingCircularBadgeProps> = ({ className = '' }) => {
  return (
    <div
      id="hero-rotating-badge"
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-label="SITEVIA WORKS 7-Day Delivery"
    >
      {/* Outer Rotating Circular Text */}
      <svg
        viewBox="0 0 100 100"
        className="w-20 h-20 sm:w-24 sm:h-24 animate-spin-slow"
      >
        <defs>
          <path
            id="badge-text-path"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text
          className="text-[9.5px] font-bold tracking-[0.19em] uppercase fill-slate-700 dark:fill-slate-300"
        >
          <textPath href="#badge-text-path" startOffset="0%">
            SITEVIA WORKS • 7-DAY DELIVERY •
          </textPath>
        </text>
      </svg>

      {/* Center Static or Accent Container with Arrow */}
      <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs">
        <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
      </div>
    </div>
  );
};
