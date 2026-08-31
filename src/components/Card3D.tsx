import React, { useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareOpacity?: number;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 8,
  glareOpacity = 0.2,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    const rX = -yPct * intensity;
    const rY = xPct * intensity;

    inner.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) translateZ(8px) scale(1.015)`;

    if (glareRef.current) {
      const gX = (mouseX / width) * 100;
      const gY = (mouseY / height) * 100;
      glareRef.current.style.opacity = `${glareOpacity}`;
      glareRef.current.style.background = `radial-gradient(circle at ${gX.toFixed(1)}% ${gY.toFixed(1)}%, rgba(255, 255, 255, 0.4) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className={`relative cursor-pointer select-none ${className}`}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
        className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl group overflow-hidden transition-colors duration-300"
      >
        {/* Specular 3D light glare layer */}
        <div
          ref={glareRef}
          style={{
            transition: 'opacity 0.25s ease',
          }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay opacity-0"
        />

        {/* Ambient Top Rim Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 dark:via-cyan-400/40 to-transparent" />

        {/* Children container with 3D depth context */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between [transform-style:preserve-3d]">
          {children}
        </div>
      </div>
    </div>
  );
};

