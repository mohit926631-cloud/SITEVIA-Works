import React, { useRef } from 'react';
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
  shimmer = true,
}) => {
  const btnRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px) scale(1.03)`;
  };

  const handleMouseEnter = () => {
    playHoverTick();
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-900/40 border border-cyan-400/30 hover:border-cyan-300',
    secondary:
      'bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 shadow-lg shadow-black/40 hover:border-slate-500',
    emerald:
      'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-xl shadow-emerald-950/50 border border-emerald-400/30 hover:border-emerald-300',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-700',
  };

  const shimmerClass = shimmer && (variant === 'primary' || variant === 'emerald') ? 'animate-specular-shimmer' : '';

  const commonProps = {
    id,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    style: {
      transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform',
    },
    className: `relative inline-flex items-center justify-center font-bold rounded-xl transition-colors duration-200 select-none cursor-pointer overflow-hidden ${variantStyles[variant]} ${shimmerClass} ${className}`,
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type="button"
      {...commonProps}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
