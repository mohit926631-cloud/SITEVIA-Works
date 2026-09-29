import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { VITEWEB_WHATSAPP_NUMBER } from '../constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      id="desktop-floating-whatsapp-container"
      aria-label="Direct WhatsApp Support"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="hidden md:block fixed bottom-6 right-6 z-40"
    >
      <div className="relative flex items-center">
        {/* Tooltip Card */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              key="desktop-whatsapp-tooltip"
              id="desktop-whatsapp-tooltip"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-16 right-0 w-72 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl text-left"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Direct Studio Chat
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                  aria-label="Close tooltip"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Have a question about pricing, packages, or your project? Chat directly with us on WhatsApp.
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-medium">Replies within 15 mins</span>
                <span className="font-mono text-[10px] text-slate-400">+{VITEWEB_WHATSAPP_NUMBER}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean Floating WhatsApp Button */}
        <a
          id="desktop-floating-whatsapp-btn"
          href={createQuickWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-colors cursor-pointer"
          aria-label="Chat with SITEVIA WORKS on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white/20 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">Chat on WhatsApp</span>
            <span className="text-[10px] text-emerald-100 font-mono font-medium">+91 95110 07593</span>
          </div>
        </a>
      </div>
    </aside>
  );
};
