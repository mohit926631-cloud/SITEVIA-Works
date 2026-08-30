import React from 'react';
import { SiteviaLogo } from './SiteviaLogo';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { SITEVIA_EMAIL } from '../constants';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Demos & Work', href: '#work' },
    { label: 'Why Webvia', href: '#why-sitevia' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'Who We Build For', href: '#who-we-build-for' },
    { label: 'About Webvia', href: '#about' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Project Enquiry', href: '#enquiry' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-slate-100 dark:bg-[#070A0F] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-28 md:pb-16 text-slate-600 dark:text-slate-400 text-xs relative transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Webvia Top"
            >
              <SiteviaLogo variant="horizontal" size="md" />
            </a>

            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-4 max-w-sm tracking-wide">
              "YOUR VISION, OUR CODE"
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
              Modern websites designed around your business. Fast, mobile-first, and engineered to turn visitors into real customers.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
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
                href={`mailto:${SITEVIA_EMAIL}`}
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Email</span>
                  <span className="font-mono text-xs truncate">{SITEVIA_EMAIL}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <p>© 2026 Webvia. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
