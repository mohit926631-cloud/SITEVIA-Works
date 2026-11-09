import React from 'react';

export const TechGridBackground: React.FC = React.memo(() => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Zero-blur-filter soft radial ambient glow */}
      <div
        className="absolute inset-x-0 top-0 h-[420px] opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(59, 130, 246, 0.14), rgba(6, 182, 212, 0.05) 55%, transparent 100%)',
        }}
      />

      {/* Static subtle grid pattern (no CPU background-position repaint) */}
      <div
        className="tech-grid-plane absolute inset-x-0 top-0 h-[380px] opacity-45"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
});

