import React from 'react';
import { Hero } from '../components/Hero';
import { InfiniteMarquee } from '../components/InfiniteMarquee';
import { TrustStrip } from '../components/TrustStrip';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';
import { PageType } from '../types';

interface HomePageProps {
  onNavigatePage: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigatePage }) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onExploreWorkClick={() => onNavigatePage('services')}
        onGetWebsiteClick={() => onNavigatePage('contact')}
      />

      {/* 2. Continuous Running Feature Marquee */}
      <InfiniteMarquee />

      {/* 3. Trust & Core Value Benefits Strip */}
      <TrustStrip />

      {/* 4. Final Call to Action */}
      <FinalCTA
        onGetWebsiteClick={() => onNavigatePage('contact')}
        onViewWorkClick={() => onNavigatePage('services')}
      />

      {/* 5. Dedicated FAQ Accordion Section */}
      <FAQSection onNavigatePage={onNavigatePage} />
    </div>
  );
};
