import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { HowItWorks } from '../components/HowItWorks';
import { FAQSection } from '../components/FAQSection';
import { PageType } from '../types';
import { Sparkles, MessageCircle } from 'lucide-react';

interface PricingPageProps {
  onNavigatePage: (page: PageType) => void;
  onSelectPlan: (plan: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigatePage,
  onSelectPlan,
}) => {
  const handleSelectPricingPlan = (plan: string) => {
    onSelectPlan(plan);
    onNavigatePage('contact');
  };

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Pricing Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Honest & Transparent</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Clear Pricing. No Hidden Charges.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed">
          Choose the package that fits your business needs. Transparent one-time pricing, zero hidden charges, and 100% full ownership transferred on launch.
        </p>
      </div>

      {/* 3 Core Pricing Plans */}
      <PricingSection onSelectPlan={handleSelectPricingPlan} />

      {/* Timeline: How It Works */}
      <HowItWorks />

      {/* Frequently Asked Questions */}
      <FAQSection onNavigatePage={onNavigatePage} />

      {/* Bottom Conversion Prompt */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Need a custom solution or have questions?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
            We are always here to chat on WhatsApp. Get a personalized estimate within minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Contact Us Directly</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
