import React, { useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  id,
  maxTilt = 6,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt on touch devices for maximum fluidity
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / (height / 2)) * -maxTilt;
    const rY = ((mouseX - width / 2) / (width / 2)) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

    if (glare && glareRef.current) {
      const gX = (mouseX / width) * 100;
      const gY = (mouseY / height) * 100;
      glareRef.current.style.opacity = '0.35';
      glareRef.current.style.background = `radial-gradient(circle at ${gX.toFixed(1)}% ${gY.toFixed(1)}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
        willChange: 'transform',
      }}
      className={`relative ${className}`}
    >
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-20 overflow-hidden opacity-0"
        />
      )}
      {children}
    </div>
  );
};

