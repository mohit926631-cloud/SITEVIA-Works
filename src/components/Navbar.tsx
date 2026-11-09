import React, { useState, useEffect, useRef } from 'react';
import { SiteviaLogo } from './SiteviaLogo';
import { ArrowRight, Share2, Check } from 'lucide-react';
import { PageType } from '../types';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { shareWebsite } from '../utils/share';

interface NavbarProps {
  currentPage: PageType;
  onNavigatePage: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const lastScrollYRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const handleShareClick = async () => {
    const res = await shareWebsite();
    if (res.method === 'clipboard') {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    }
  };

  // Hide on scroll down, show on scroll up — synced with requestAnimationFrame for 60/120fps smoothness
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 15);

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 8) {
        // Scrolling down -> hide header
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollYRef.current - 8) {
        // Scrolling up -> show header
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

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
        }, 80);
      }
    } else if (dest === 'faq') {
      if (currentPage === 'home' || currentPage === 'pricing') {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigatePage('home');
        setTimeout(() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else if (dest === 'contact') {
      onNavigatePage('contact');
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled || mobileMenuOpen
            ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
            : 'py-4 bg-white border-b border-slate-100'
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
              className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/80"
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
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Controls: Share + "Start Project" Blue CTA */}
            <div className="hidden md:flex items-center gap-2">
              <button
                id="header-share-btn"
                type="button"
                onClick={handleShareClick}
                title="Share SITEVIA WORKS with friends & clients"
                className="px-3 py-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                id="header-get-started-cta"
                type="button"
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-slate-900 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Project</span>
              </button>
            </div>

            {/* Mobile Actions: Animated 3-Lines to X Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-colors duration-200 min-w-[44px] min-h-[44px] cursor-pointer ${
                  mobileMenuOpen
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:text-black'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="relative w-5 h-4 flex flex-col justify-between items-center">
                  <span
                    className={`block w-5 h-0.5 rounded-full bg-current transform transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? ' translate-y-[7px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-200 ease-out ${
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                  />
                  <span
                    className={`block w-5 h-0.5 rounded-full bg-current transform transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Blurred Dim Backdrop + Staggered Cascade + Active Page Dot */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* 3. Background Blur Dimming Overlay */}
            <motion.div
              id="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Floating Dropdown Sheet right below the header */}
            <motion.div
              id="mobile-menu-overlay"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[68px] left-3 right-3 z-50 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 sm:p-5 md:hidden max-h-[calc(100vh-84px)] overflow-y-auto flex flex-col justify-between"
            >
              {/* 2. Staggered Cascade Mobile Navigation Links + 5. Active Page Dot */}
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((item, idx) => {
                  const isActive = item.active;
                  return (
                    <motion.button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      type="button"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.22,
                        delay: prefersReducedMotion ? 0 : 0.04 + idx * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => handleNavClick(item.id as any)}
                      className={`py-3 px-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-between cursor-pointer text-left group ${
                        isActive
                          ? 'text-white bg-blue-600 font-bold shadow-md shadow-blue-600/25'
                          : 'text-slate-800 hover:text-blue-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {/* 5. Active Page Indicator Dot */}
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            isActive
                              ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] scale-110'
                              : 'bg-slate-300 group-hover:bg-blue-500'
                          }`}
                        />
                        <span>{item.label}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-mono transition-transform duration-200 ${
                          isActive
                            ? 'text-blue-100 translate-x-0.5 font-sans font-semibold'
                            : 'text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600'
                        }`}
                      >
                        {isActive && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white font-bold">
                            Active
                          </span>
                        )}
                        <span>→</span>
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom Action Buttons inside Mobile Menu */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.24,
                  delay: prefersReducedMotion ? 0 : 0.06 + navLinks.length * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5"
              >
                <button
                  id="mobile-drawer-share-btn"
                  type="button"
                  onClick={handleShareClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-center flex items-center justify-center gap-2 border border-slate-200 text-sm cursor-pointer transition-colors"
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
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-slate-900 active:bg-blue-700 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 text-sm sm:text-base cursor-pointer transition-colors duration-200"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

