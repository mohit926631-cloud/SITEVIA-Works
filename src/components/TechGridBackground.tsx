import React from 'react';

export const TechGridBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Ambient Radial Horizon Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-blue-500/20 dark:from-blue-600/25 via-cyan-500/10 to-transparent blur-3xl rounded-full opacity-70 transition-opacity" />

      {/* 3D Perspective Viewport */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          perspective: '800px',
          perspectiveOrigin: '50% 0%',
        }}
      >
        {/* 3D Floor Plane */}
        <div
          className="tech-grid-plane absolute -top-8 left-[-50%] w-[200%] h-[160%] opacity-60 dark:opacity-45"
          style={{
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0) 70%)',
          }}
        />
      </div>

      {/* Horizon Accent Hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/35 dark:via-cyan-400/50 to-transparent" />
    </div>
  );
};
