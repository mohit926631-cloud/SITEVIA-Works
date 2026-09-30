import React, { useState, useEffect } from 'react';
import { SiteviaLogo } from './SiteviaLogo';
import { Menu, X, ArrowRight, Share2, Check } from 'lucide-react';
import { PageType } from '../types';
import { motion } from 'motion/react';
import { shareWebsite } from '../utils/share';

interface NavbarProps {
  currentPage: PageType;
  onNavigatePage: (page: PageType) => void;
}

interface NavItem {
  id: PageType;
  label: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigatePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShareClick = async () => {
    const res = await shareWebsite();
    if (res.method === 'clipboard') {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (dest: 'home' | 'services' | 'pricing' | 'portfolio' | 'about' | 'faq' | 'contact') => {
    setMobileMenuOpen(false);

    if (dest === 'home') {
      onNavigatePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'services') {
      onNavigatePage('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'pricing') {
      onNavigatePage('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'about') {
      onNavigatePage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'portfolio') {
      if (currentPage === 'services') {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigatePage('services');
        setTimeout(() => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 360);
      }
    } else if (dest === 'faq') {
      if (currentPage === 'home' || currentPage === 'pricing') {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigatePage('home');
        setTimeout(() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }, 360);
      }
    } else if (dest === 'contact') {
      onNavigatePage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', active: currentPage === 'home' },
    { id: 'services', label: 'Services', active: currentPage === 'services' },
    { id: 'portfolio', label: 'Work', active: false },
    { id: 'pricing', label: 'Pricing', active: currentPage === 'pricing' },
    { id: 'about', label: 'About', active: currentPage === 'about' },
    { id: 'contact', label: 'Contact', active: currentPage === 'contact' },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm'
            : 'py-4 bg-white dark:bg-[#0A0F1D] border-b border-slate-100 dark:border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="header-logo-link"
              type="button"
              onClick={() => handleNavClick('home')}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 transition-transform hover:scale-102 cursor-pointer text-left"
              aria-label="SITEVIA WORKS Home"
            >
              <SiteviaLogo variant="horizontal" size="md" />
            </button>

            {/* Desktop Navigation Links with animated active pill */}
            <nav
              id="desktop-nav"
              className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800"
            >
              {navLinks.map((item) => {
                const isActive = item.active;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id as any)}
                    className={`relative text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-blue-600 dark:bg-blue-600 shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Controls: "Start Project" Blue CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                id="header-get-started-cta"
                type="button"
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Project</span>
              </button>
            </div>

            {/* Mobile Actions: Hamburger Menu Toggle (3 lines) */}
            <div className="md:hidden flex items-center">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white min-w-[44px] min-h-[44px] cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-50 bg-white dark:bg-[#0A0F1D] flex flex-col justify-between p-6 md:hidden overflow-y-auto transition-colors"
        >
          <div>
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
              <SiteviaLogo variant="horizontal" size="md" />
              <button
                id="mobile-menu-close-btn"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1.5 mt-5">
              {navLinks.map((item) => {
                const isActive = item.active;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id as any)}
                    className={`py-3.5 px-4 rounded-xl text-base font-semibold transition-all flex items-center justify-between cursor-pointer text-left ${
                      isActive
                        ? 'text-white bg-blue-600 font-bold shadow-md shadow-blue-600/25'
                        : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70 font-mono">→</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Action inside Mobile Menu */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3 pb-4">
            <button
              id="mobile-drawer-share-btn"
              type="button"
              onClick={handleShareClick}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-center flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-sm cursor-pointer transition-colors"
            >
              {copiedShare ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link & Message Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>Share Website</span>
                </>
              )}
            </button>

            <button
              id="mobile-nav-get-started-btn"
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 text-base cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
