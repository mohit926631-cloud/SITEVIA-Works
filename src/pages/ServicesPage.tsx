import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhoWeBuildFor } from '../components/WhoWeBuildFor';
import { PageType } from '../types';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Services & Real Work</span>
        </div>
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
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Ready to build your website?</h3>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Transparent milestone pricing starting from ₹1,999 with 100% mobile-first design and WhatsApp direct triggers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigatePage('pricing')}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-blue-50 transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              View Pricing Plans
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-colors cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-2"
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
