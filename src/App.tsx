/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PageSkeletonScreen } from './components/PageSkeletonScreen';
import { PageType } from './types';

const VALID_PAGES: PageType[] = ['home', 'services', 'pricing', 'about', 'contact', 'terms', 'privacy'];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (VALID_PAGES.includes(hash as PageType)) {
      return hash as PageType;
    }
    return 'home';
  });

  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);
  const [targetPage, setTargetPage] = useState<PageType>(currentPage);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<string>('Business — ₹5,499');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Business Website');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash as PageType) && hash !== currentPage) {
        const next = hash as PageType;
        setTargetPage(next);
        setIsPageTransitioning(true);
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
        }
        transitionTimerRef.current = setTimeout(() => {
          setCurrentPage(next);
          setIsPageTransitioning(false);
        }, 340);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [currentPage]);

  const navigateToPage = useCallback((page: PageType) => {
    if (page === currentPage && !isPageTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setTargetPage(page);
    setIsPageTransitioning(true);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    transitionTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsPageTransitioning(false);
    }, 340);
  }, [currentPage, isPageTransitioning]);

  const handleOpenLegal = useCallback((tab: 'privacy' | 'terms') => {
    navigateToPage(tab === 'terms' ? 'terms' : 'privacy');
  }, [navigateToPage]);

  const handleSelectPricingPlan = useCallback((planVal: string) => {
    setSelectedPackage(planVal);
    navigateToPage('contact');
  }, [navigateToPage]);

  const handleSelectServiceType = useCallback((websiteType: string) => {
    setSelectedWebsiteType(websiteType);
    navigateToPage('contact');
  }, [navigateToPage]);

  const handleSelectAudience = useCallback((businessType: string) => {
    setSelectedBusinessType(businessType);
    navigateToPage('contact');
  }, [navigateToPage]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A10] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative transition-colors duration-300">
      {/* 3D WebGL Background Scene */}
      <ThreeCanvas />

      {/* Dynamic Cursor Spotlight Glow */}
      <SpotlightEffect />

      {/* Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Fixed Navigation Header with Page Tabs */}
      <Navbar
        currentPage={isPageTransitioning ? targetPage : currentPage}
        onNavigatePage={navigateToPage}
      />

      {/* Page Content Container with Smooth Transition Animations */}
      <main className="flex-1 relative z-10 pt-20 sm:pt-24 flex flex-col">
        <AnimatePresence mode="wait">
          {isPageTransitioning ? (
            <PageSkeletonScreen
              key={`skeleton-${targetPage}`}
              targetPage={targetPage}
            />
          ) : (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex-1"
            >
              {currentPage === 'home' && (
                <HomePage onNavigatePage={navigateToPage} />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  onNavigatePage={navigateToPage}
                  onSelectServiceType={handleSelectServiceType}
                  onSelectAudienceType={handleSelectAudience}
                />
              )}

              {currentPage === 'pricing' && (
                <PricingPage
                  onNavigatePage={navigateToPage}
                  onSelectPlan={handleSelectPricingPlan}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage onNavigatePage={navigateToPage} />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  initialPackage={selectedPackage}
                  initialWebsiteType={selectedWebsiteType}
                  initialBusinessType={selectedBusinessType}
                  onOpenLegal={handleOpenLegal}
                  onNavigatePage={navigateToPage}
                />
              )}

              {currentPage === 'terms' && (
                <TermsPage onNavigatePage={navigateToPage} />
              )}

              {currentPage === 'privacy' && (
                <PrivacyPage onNavigatePage={navigateToPage} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Unified Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onNavigatePage={navigateToPage}
      />

      {/* Mobile Fixed Bottom CTA Bar */}
      <MobileStickyCTA onGetWebsiteClick={() => navigateToPage('contact')} />

      {/* Desktop Floating WhatsApp Button with Smart Tooltip */}
      <FloatingWhatsApp />
    </div>
  );
}
