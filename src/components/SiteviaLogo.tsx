import React from 'react';

interface ViteWebLogoProps {
  variant?: 'horizontal' | 'icon' | 'stacked' | 'full';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}

export const ViteWebLogo: React.FC<ViteWebLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  };

  const currentIconClass = iconSizes[size];
  const logoSrc = "/viteweb-logo.png";
  const fallbackLogoSrc = "https://i.ibb.co/DPztyt6Z/file-000000003d6882119dfb99f4cee0a98a.png";

  // 1. Icon Only variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={logoSrc}
          alt="ViteWEB Logo Icon"
          className={`${currentIconClass} object-contain transition-transform duration-300 group-hover:scale-105 select-none`}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackLogoSrc;
          }}
        />
      </div>
    );
  }

  // 2. Full / Stacked Logo (Exact representation with real icon + official branding)
  if (variant === 'stacked' || variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <img
          src={logoSrc}
          alt="ViteWEB Brand Logo"
          className={`${size === 'xl' ? 'h-28 sm:h-32' : size === 'lg' ? 'h-20 sm:h-24' : 'h-14 sm:h-16'} w-auto object-contain transition-transform duration-300 hover:scale-105 select-none drop-shadow-[0_10px_25px_rgba(0,102,255,0.25)]`}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackLogoSrc;
          }}
        />

        {/* Wordmark: VITE (Navy/White) + WEB (Vibrant Blue to Purple Gradient) */}
        <div className="mt-4 flex items-baseline tracking-tight font-black font-sans">
          <span className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 dark:text-white font-extrabold uppercase">
            VITE
          </span>
          <span className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#9333EA] font-extrabold uppercase">
            WEB
          </span>
        </div>

        {/* Tagline Bar: WEBSITES • DESIGNS • SOLUTIONS */}
        <div className="mt-2.5 flex items-center justify-center gap-2 w-full max-w-[340px]">
          <div className="h-[2px] w-6 sm:w-10 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF]" />
          <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-800 dark:text-slate-200 tracking-wider uppercase whitespace-nowrap">
            WEBSITES • DESIGNS • SOLUTIONS
          </span>
          <div className="h-[2px] w-6 sm:w-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA]" />
        </div>

        {/* Slogan Quote: YOUR VISION, OUR CODE */}
        <div className="mt-2">
          <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 tracking-[0.22em] uppercase">
            YOUR VISION, OUR CODE
          </span>
        </div>
      </div>
    );
  }

  // 3. Horizontal Header / Navbar Variant
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      <img
        src={logoSrc}
        alt="ViteWEB Logo"
        className={`${currentIconClass} object-contain transition-transform duration-300 group-hover:scale-105 select-none`}
        loading="eager"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackLogoSrc;
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none font-sans font-black">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white transition-colors uppercase">
            VITE
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#9333EA] transition-colors uppercase">
            WEB
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            WEBSITES • DESIGNS • SOLUTIONS
          </span>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility across existing components
export const WebviaLogo = ViteWebLogo;
export const SiteviaLogo = ViteWebLogo;


