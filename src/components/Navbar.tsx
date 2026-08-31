import React, { useState, useEffect } from 'react';
import { SiteviaLogo } from './SiteviaLogo';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigateToSection?: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToSection, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [animatingTheme, setAnimatingTheme] = useState(false);

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

  const handleThemeToggle = () => {
    setAnimatingTheme(true);
    toggleTheme();
    setTimeout(() => setAnimatingTheme(false), 500);
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Demos', href: '#work', id: 'work' },
    { label: 'Why ViteWEB', href: '#why-sitevia', id: 'why-sitevia' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Industries', href: '#who-we-build-for', id: 'who-we-build-for' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigateToSection) {
      onNavigateToSection(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            <a
              id="header-logo-link"
              href="#home"
              onClick={(e) => handleLinkClick('#home', e)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 transition-transform hover:scale-102"
              aria-label="ViteWEB Home"
            >
              <SiteviaLogo variant="horizontal" size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav
              id="desktop-nav"
              className="hidden lg:flex items-center gap-1"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    id={`nav-link-${link.label.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={`text-sm font-semibold transition-colors duration-150 px-4 py-2 rounded-xl ${
                      isActive
                        ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right Controls: Light/Dark Mode + "Get Started" Blue CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={handleThemeToggle}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-sm flex items-center justify-center min-w-[40px] min-h-[40px] relative overflow-hidden group"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className={animatingTheme ? 'theme-icon-animate' : 'transition-transform duration-300 group-hover:rotate-12'}>
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </button>

              <button
                id="header-get-started-cta"
                type="button"
                onClick={(e) => handleLinkClick('#contact', e)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Actions: Theme Toggle + Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                id="mobile-theme-toggle-btn"
                type="button"
                onClick={handleThemeToggle}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 min-w-[42px] min-h-[42px] flex items-center justify-center"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className={animatingTheme ? 'theme-icon-animate' : ''}>
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </button>

              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white min-w-[44px] min-h-[44px]"
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
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={`py-3 px-3.5 rounded-xl text-base font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                        : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-600 font-mono">→</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Action inside Mobile Menu */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 pb-4">
            <button
              id="mobile-nav-get-started-btn"
              type="button"
              onClick={(e) => handleLinkClick('#contact', e)}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
