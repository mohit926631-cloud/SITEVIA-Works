import React from 'react';
import { ExternalLink, ArrowRight, Check } from 'lucide-react';
import { DEMO_PROJECTS } from '../constants';
import { MagneticButton } from './MagneticButton';

interface FeaturedProjectProps {
  onBuildSimilar?: (projectType: string) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ onBuildSimilar }) => {
  const featured = DEMO_PROJECTS[0];

  const handleBuildSimilar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBuildSimilar) {
      onBuildSimilar('Restaurant Website');
    } else {
      const enquiryEl = document.getElementById('enquiry');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="featured-work" className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Featured Demo Blueprint
          </span>
        </div>

        {/* Clean Showcase Frame */}
        <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Project Details & Action */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                {featured.categoryLabel}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                {featured.name}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {featured.description} Designed with an intuitive digital menu explorer, instant WhatsApp table reservations, and embedded Google Maps navigation.
              </p>

              {/* Core Features List */}
              <div className="space-y-2 mb-8 w-full">
                {featured.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <MagneticButton
                  variant="primary"
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-5 py-3 rounded-xl"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={handleBuildSimilar}
                  className="text-xs px-5 py-3 rounded-xl"
                >
                  <span>Build Something Similar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </MagneticButton>
              </div>
            </div>

            {/* Right: Clean Browser Mockup */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md group">
                {/* Browser top chrome */}
                <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[220px]">
                    {featured.url.replace('https://', '')}
                  </span>
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Open ↗
                  </a>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={featured.previewImage}
                    alt={featured.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

