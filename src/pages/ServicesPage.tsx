import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhoWeBuildFor } from '../components/WhoWeBuildFor';
import { PageType } from '../types';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface ServicesPageProps {
  onNavigatePage: (page: PageType) => void;
  onSelectServiceType: (serviceType: string) => void;
  onSelectAudienceType: (audienceType: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigatePage,
  onSelectServiceType,
  onSelectAudienceType,
}) => {
  const handleDiscussService = (websiteType: string) => {
    onSelectServiceType(websiteType);
    onNavigatePage('contact');
  };

  const handleSelectAudience = (audience: string) => {
    onSelectAudienceType(audience);
    onNavigatePage('contact');
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Services Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Websites Engineered for Real Business Results.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed">
          From high-converting landing pages to complete business websites and digital portfolios. Explore our core services and interactive live demos below.
        </p>
      </div>

      {/* Services Section */}
      <ServicesSection onDiscussService={handleDiscussService} />

      {/* Live Portfolio Demos */}
      <PortfolioSection />

      {/* Who We Build For (Industries) */}
      <WhoWeBuildFor onSelectAudience={handleSelectAudience} />

      {/* Bottom Services CTA Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Ready to build your website?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              Transparent one-time pricing starting from ₹2,999 with mobile-first design, WhatsApp inquiry routing, and dedicated post-launch support.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigatePage('pricing')}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              View Pricing Plans
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Start Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
