import React, { useState } from 'react';
import { ExternalLink, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEMO_PROJECTS } from '../constants';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

export const PortfolioSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { key: 'all', label: 'All Demos' },
    { key: 'restaurant', label: 'Restaurant & Café' },
    { key: 'salon', label: 'Salon & Spa' },
    { key: 'fitness', label: 'Gym & Fitness' },
    { key: 'fashion', label: 'Fashion Studio' },
    { key: 'portfolio', label: 'Portfolios' },
  ];

  const filteredProjects = DEMO_PROJECTS.filter((project) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'restaurant') return project.id === 'the-saffron-table' || project.id === 'moss-and-bean';
    if (selectedFilter === 'salon') return project.id === 'lume-beauty';
    if (selectedFilter === 'fitness') return project.id === 'forge-fitness';
    if (selectedFilter === 'fashion') return project.id === 'mera-studio';
    if (selectedFilter === 'portfolio') return project.category === 'portfolio';
    return true;
  });

  return (
    <section
      id="work"
      className="scroll-mt-24 w-full pt-10 pb-16 sm:py-20 bg-slate-50/60 dark:bg-[#070A10] text-slate-900 dark:text-white transition-colors"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Website Blueprints</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
            View Demos
          </h2>

          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Live interactive website blueprints designed specifically for salons, restaurants, gyms, and local businesses.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          id="portfolio-category-filters"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 px-1"
        >
          {filterOptions.map((tab) => {
            const isSelected = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-blue-600 rounded-xl shadow-md shadow-blue-600/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid with 3D Tilt */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <TiltCard
                  id={`project-card-${project.id}`}
                  className="w-full h-full rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl transition-shadow duration-300 group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
                      <img
                        src={project.previewImage}
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Top Left Live Status Pill */}
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md z-10">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Live Demo</span>
                      </div>

                      {/* Category Label */}
                      <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm z-10">
                        {project.categoryLabel}
                      </div>
                    </div>

                    <div className="p-5 sm:p-7">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span>{project.highlights?.[0] || 'Mobile Responsive Design'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span>{project.highlights?.[1] || 'Direct WhatsApp Integration'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 pt-0">
                    <MagneticButton
                      id={`view-live-btn-${project.id}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      shimmer={true}
                      className="w-full py-3 px-4 text-sm font-bold shadow-md shadow-blue-600/20"
                    >
                      <span>View Live Demo</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
