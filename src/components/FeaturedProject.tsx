import React from 'react';
import { ExternalLink, Sparkles, ArrowRight, Check } from 'lucide-react';
import { DEMO_PROJECTS } from '../constants';
import { Card3D } from './Card3D';
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
    <section id="featured-work" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-mono">
            [FLAGSHIP DEMO SHOWCASE]
          </span>
        </div>

        {/* 3D Showcase Container with Glass Highlights */}
        <Card3D intensity={4} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-2 sm:p-4">
            {/* Left: Project Details & Action */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 text-xs font-semibold mb-4 font-mono backdrop-blur-md">
                <span>VERIFIED PROTOTYPE</span>
                <span>•</span>
                <span>{featured.categoryLabel}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                {featured.name}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {featured.description} Designed with an intuitive digital menu explorer, instant WhatsApp table reservations, and embedded Google Maps navigation for seamless client arrival.
              </p>

              {/* Core Features List */}
              <div className="space-y-2.5 mb-8 w-full">
                {featured.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                    </div>
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
                  className="text-xs px-6 py-3.5 rounded-xl shadow-lg"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={handleBuildSimilar}
                  className="text-xs px-5 py-3.5 rounded-xl"
                >
                  <span>Build Something Similar</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </MagneticButton>
              </div>
            </div>

            {/* Right: Rich Interactive Browser Mockup with Glass Chrome */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 shadow-2xl group">
                {/* Browser top chrome */}
                <div className="bg-slate-950/90 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 truncate max-w-[220px]">
                    {featured.url}
                  </span>
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    Open ↗
                  </a>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={featured.previewImage}
                    alt={featured.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 bg-slate-900/80 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/15 font-mono shadow-md">
                      Live Restaurant Demo
                    </span>
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-white bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl transition-all shadow-md"
                    >
                      <span>Explore Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
};
