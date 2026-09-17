import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for fluid responsiveness on scroll
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-[70] pointer-events-none h-[2.5px] bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        id="scroll-progress-indicator"
        className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 dark:from-blue-500 dark:via-cyan-400 dark:to-emerald-400 origin-left shadow-[0_1px_8px_rgba(59,130,246,0.45)]"
        style={{ scaleX }}
      />
    </div>
  );
};
