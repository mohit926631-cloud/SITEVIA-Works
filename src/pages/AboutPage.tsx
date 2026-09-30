import React from 'react';
import { AboutSitevia } from '../components/AboutSitevia';
import { WhySitevia } from '../components/WhySitevia';
import { PageType } from '../types';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* About Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          "Your Vision, Our Code"
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed">
          At SITEVIA WORKS, we believe every business deserves a fast, beautiful, and reliable online presence without agency markups or confusing technical jargon.
        </p>
      </div>

      {/* Main About Story, Hindi/English Toggle & Solutions Grid */}
      <AboutSitevia
        onNavigatePage={onNavigatePage}
        onNavigatePricing={() => onNavigatePage('pricing')}
      />

      {/* Why Choose SITEVIA WORKS */}
      <WhySitevia />

      {/* Bottom Conversion Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Have a project in mind?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
              Let's talk through your goals and build a website tailored to your business.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Talk to our Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
