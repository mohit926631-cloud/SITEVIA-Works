import React, { useRef, useState } from 'react';
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.32;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.32;
    setOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
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
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0px) scale(${isHovered ? 1.04 : 1})`,
      transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
