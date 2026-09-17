import React from 'react';
import { ViteWebLogo } from './SiteviaLogo';
import { MessageCircle, Mail, ArrowUp, ShieldCheck, Scale, Sparkles } from 'lucide-react';
import { VITEWEB_EMAIL } from '../constants';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { PageType } from '../types';

interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
  onNavigatePage?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigatePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services & Real Work', page: 'services' },
    { label: 'Pricing & Cost Calculator', page: 'pricing' },
    { label: 'About Our Story', page: 'about' },
    { label: 'Contact & Project Enquiry', page: 'contact' },
  ];

  const handlePageClick = (page: PageType) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-slate-100 dark:bg-[#070A0F] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-28 md:pb-16 text-slate-600 dark:text-slate-400 text-xs relative transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <button
              type="button"
              onClick={() => handlePageClick('home')}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-left cursor-pointer"
              aria-label="SITEVIA WORKS Top"
            >
              <ViteWebLogo variant="horizontal" size="md" />
            </button>

            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-4 max-w-sm tracking-wide">
              "Your Vison, Our code"
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
              Modern websites designed around your business. Fast, mobile-first, and engineered to turn visitors into real customers.
            </p>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Code Ownership
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 px-2.5 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Transparent Pricing
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-3">
              {pages.map((p) => (
                <li key={p.page}>
                  <button
                    type="button"
                    onClick={() => handlePageClick(p.page)}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Direct Channels */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href={createQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">WhatsApp</span>
                  <span className="font-mono text-xs">+91 95110 07593</span>
                </div>
              </a>

              <a
                href={`mailto:${VITEWEB_EMAIL}`}
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Email</span>
                  <span className="font-mono text-xs truncate">{VITEWEB_EMAIL}</span>
                </div>
              </a>
            </div>

            {/* Legal Information Section */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Legal & Compliance
              </h5>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => (onNavigatePage ? onNavigatePage('privacy') : onOpenLegal?.('privacy'))}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => (onNavigatePage ? onNavigatePage('terms') : onOpenLegal?.('terms'))}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
            <span>© 2026 SITEVIA WORKS. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => (onNavigatePage ? onNavigatePage('privacy') : onOpenLegal?.('privacy'))}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => (onNavigatePage ? onNavigatePage('terms') : onOpenLegal?.('terms'))}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
