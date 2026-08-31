import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { VITEWEB_WHATSAPP_NUMBER } from '../constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      id="desktop-floating-whatsapp-container"
      aria-label="Direct WhatsApp Support"
      className="hidden md:block fixed bottom-6 right-6 z-40"
    >
      {/* Floating parallax & gentle hover motion container */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center"
      >
        {/* Hover / Expandable Tooltip Card with tactile Spring physics and entrance delay */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              key="desktop-whatsapp-tooltip"
              id="desktop-whatsapp-tooltip"
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15, ease: 'easeOut' } }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
                mass: 0.8,
                delay: 0.18,
              }}
              className="absolute bottom-16 right-0 w-80 bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.15)] text-left relative overflow-hidden"
            >
              {/* Glass reflection highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
                    <span>ViteWEB Direct Support</span>
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close tooltip"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-200 mt-2.5 leading-relaxed">
                Have a question about pricing, timelines, or your custom website vision? Chat directly with us on WhatsApp.
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Typically replies in &lt; 15 mins
                </span>
                <span className="text-[10px] font-mono text-slate-400">{VITEWEB_WHATSAPP_NUMBER}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Button with Glassmorphism and Pulse Halo */}
        <motion.a
          id="desktop-floating-whatsapp-btn"
          href={createQuickWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-600/90 backdrop-blur-xl border border-emerald-400/40 text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_12px_36px_rgba(16,185,129,0.35),0_0_20px_rgba(5,150,105,0.2)] hover:shadow-[0_16px_44px_rgba(16,185,129,0.5),0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 overflow-hidden"
          aria-label="Chat with ViteWEB on WhatsApp"
        >
          {/* Subtle glass specular sweep */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none" />

          {/* Gentle continuous pulse glow layer behind icon */}
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-sm pointer-events-none"
            />
            <MessageCircle className="w-6 h-6 fill-white/20 relative z-10 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-emerald-950 z-20"></span>
          </div>

          <div className="flex flex-col text-left relative z-10">
            <span className="text-xs font-bold leading-tight drop-shadow-sm">Chat on WhatsApp</span>
            <span className="text-[10px] text-emerald-100 font-mono font-medium">+91 95110 07593</span>
          </div>
        </motion.a>
      </motion.div>
    </aside>
  );
};
