import React, { useState, useEffect } from 'react';
import { MessageCircle, Rocket } from 'lucide-react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface MobileStickyCTAProps {
  onGetWebsiteClick?: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onGetWebsiteClick }) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky bottom bar once user has scrolled past hero top (180px)
      setShowBar(window.scrollY > 180);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetWebsite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGetWebsiteClick) {
      onGetWebsiteClick();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!showBar) return null;

  return (
    <aside
      id="mobile-sticky-bottom-cta-bar"
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#070C18]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 pt-2 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* WhatsApp Button */}
        <a
          id="mobile-sticky-whatsapp-btn"
          href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I would like to build a website for my business.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-sm shadow-sm min-h-[46px] transition-transform active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Get Website Button */}
        <a
          id="mobile-sticky-get-website-btn"
          href="#contact"
          onClick={handleGetWebsite}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-sm min-h-[46px] transition-transform active:scale-[0.98]"
        >
          <Rocket className="w-4 h-4" />
          <span className="truncate">Get Quote</span>
        </a>
      </div>
    </aside>
  );
};
