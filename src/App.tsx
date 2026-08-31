/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { TrustStrip } from './components/TrustStrip';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { WhySitevia } from './components/WhySitevia';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { WhoWeBuildFor } from './components/WhoWeBuildFor';
import { AboutSitevia } from './components/AboutSitevia';
import { FAQSection } from './components/FAQSection';
import { ProjectEnquiry } from './components/ProjectEnquiry';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SpotlightEffect } from './components/SpotlightEffect';
import { LegalModal, LegalTab } from './components/LegalModal';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('Business — ₹3,499');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Business Website');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = useCallback((tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  }, []);

  const handleCloseLegal = useCallback(() => {
    setIsLegalOpen(false);
  }, []);

  const scrollToElementWithOffset = useCallback((id: string, offset = 80) => {
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToEnquiry = useCallback(() => {
    scrollToElementWithOffset('enquiry', 80);
  }, [scrollToElementWithOffset]);

  const scrollToWork = useCallback(() => {
    scrollToElementWithOffset('work', 80);
  }, [scrollToElementWithOffset]);

  const handleSelectPricingPlan = useCallback((planVal: string) => {
    setSelectedPackage(planVal);
    scrollToEnquiry();
  }, [scrollToEnquiry]);

  const handleDiscussService = useCallback((websiteType: string) => {
    setSelectedWebsiteType(websiteType);
    scrollToEnquiry();
  }, [scrollToEnquiry]);

  const handleSelectAudience = useCallback((businessType: string) => {
    setSelectedBusinessType(businessType);
    scrollToEnquiry();
  }, [scrollToEnquiry]);

  const handleNavbarNavigate = useCallback((id: string) => {
    scrollToElementWithOffset(id, 80);
  }, [scrollToElementWithOffset]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A10] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative transition-colors duration-300">
      {/* 3D WebGL Background Scene */}
      <ThreeCanvas />

      {/* Dynamic Cursor Spotlight Glow */}
      <SpotlightEffect />

      {/* Fixed Navigation Header */}
      <Navbar onNavigateToSection={handleNavbarNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onExploreWorkClick={scrollToWork}
          onGetWebsiteClick={scrollToEnquiry}
        />

        {/* 2. Continuous Running Feature Marquee */}
        <InfiniteMarquee />

        {/* 3. Trust & Core Value Benefits Strip */}
        <TrustStrip />

        {/* 5. Complete Live Demo Projects Portfolio ("Our Work") */}
        <PortfolioSection />

        {/* 6. Services Section with Hover-Scale Animations */}
        <ServicesSection onDiscussService={handleDiscussService} />

        {/* 7. Why Choose Webvia */}
        <WhySitevia />

        {/* 8. How It Works (Timeline) */}
        <HowItWorks />

        {/* 9. Pricing Plans (3 Exact Launch Tiers) */}
        <PricingSection onSelectPlan={handleSelectPricingPlan} />

        {/* 10. Who We Build For (Niche Audiences) */}
        <WhoWeBuildFor onSelectAudience={handleSelectAudience} />

        {/* 11. About Webvia (Why We Exist) */}
        <AboutSitevia />

        {/* 12. Main Conversion: Project Enquiry Form (WhatsApp) */}
        <ProjectEnquiry
          initialPackage={selectedPackage}
          initialWebsiteType={selectedWebsiteType}
          initialBusinessType={selectedBusinessType}
          onOpenLegal={handleOpenLegal}
        />

        {/* 13. FAQ Accordion */}
        <FAQSection />

        {/* 14. Direct Contact Section */}
        <ContactSection onOpenLegal={handleOpenLegal} />

        {/* 15. Final Call to Action */}
        <FinalCTA
          onGetWebsiteClick={scrollToEnquiry}
          onViewWorkClick={scrollToWork}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Mobile Fixed Bottom CTA Bar */}
      <MobileStickyCTA onGetWebsiteClick={scrollToEnquiry} />

      {/* Desktop Floating WhatsApp Button with Smart Tooltip */}
      <FloatingWhatsApp />

      {/* Comprehensive Legal Modal (Privacy Policy & Terms of Service) */}
      <LegalModal
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={handleCloseLegal}
      />
    </div>
  );
}
