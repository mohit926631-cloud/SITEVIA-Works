import React from 'react';
import { AboutSitevia } from '../components/AboutSitevia';
import { WhySitevia } from '../components/WhySitevia';
import { PageType } from '../types';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* About Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          "Your Vison, Our code"
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed">
          At SITEVIA WORKS, we believe every business deserves a fast, beautiful, and reliable online presence without agency markups or confusing technical jargon.
        </p>
      </div>

      {/* Main About Story, Hindi/English Toggle & Solutions Grid */}
      <AboutSitevia />

      {/* Why Choose SITEVIA WORKS */}
      <WhySitevia />

      {/* Bottom Conversion Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-10 border border-blue-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have a project in mind?</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-md">
              Let's talk through your vision and create a website tailored specifically to your audience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
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
