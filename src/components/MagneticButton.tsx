import React from 'react';
import { playClickSound, playHoverTick } from '../utils/audio';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'emerald' | 'ghost';
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  shimmer?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  target,
  rel,
  id,
}) => {
  const handleMouseEnter = () => {
    playHoverTick();
  };

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white border border-blue-500/80 shadow-sm transition-colors',
    secondary:
      'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-100 border border-slate-700/80 shadow-sm transition-colors',
    emerald:
      'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white border border-emerald-500/80 shadow-sm transition-colors',
    ghost:
      'bg-transparent hover:bg-slate-800/60 active:bg-slate-800 text-slate-300 hover:text-white border border-transparent hover:border-slate-700 transition-colors',
  };

  const commonClasses = `inline-flex items-center justify-center font-semibold rounded-xl text-center select-none cursor-pointer transition-all duration-150 active:scale-[0.98] ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={commonClasses}
      >
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={commonClasses}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

