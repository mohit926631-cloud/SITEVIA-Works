import React, { useEffect, useRef } from 'react';

export const SpotlightEffect: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on pointer devices (desktop with mouse) to prevent mobile stutter
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const spotlight = spotlightRef.current;
    const container = containerRef.current;
    if (!spotlight || !container) return;

    let rafId: number | null = null;
    let targetX = -500;
    let targetY = -500;
    let isVisible = false;

    const updatePosition = () => {
      if (spotlight) {
        spotlight.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible && container) {
        isVisible = true;
        container.style.opacity = '1';
      }

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      if (container) {
        isVisible = false;
        container.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 overflow-hidden hidden md:block opacity-0"
    >
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.04) 40%, rgba(0,0,0,0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

