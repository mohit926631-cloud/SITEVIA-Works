import React, { useRef, useState } from 'react';

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
  intensity = 12,
  glareOpacity = 0.2,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    setRotateX(-yPct * intensity);
    setRotateY(xPct * intensity);
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className={`relative cursor-pointer transition-transform duration-150 ease-out select-none ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateZ(10px) scale(1.015)' : 'translateZ(0px) scale(1)'}`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl group overflow-hidden transition-colors duration-300"
      >
        {/* Specular 3D light glare layer */}
        <div
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)`,
            transition: 'opacity 0.25s ease',
          }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
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
