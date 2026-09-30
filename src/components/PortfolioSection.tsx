import React, { useState } from 'react';
import { ExternalLink, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEMO_PROJECTS } from '../constants';
import { MagneticButton } from './MagneticButton';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
            Interactive Website Demos
          </h2>

          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Fully functional live blueprints built by SITEVIA WORKS. Test real navigation, mobile layouts, digital menus, and WhatsApp booking triggers.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          id="portfolio-category-filters"
          className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-8 px-1"
        >
          {filterOptions.map((tab) => {
            const isSelected = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  id={`project-card-${project.id}`}
                  className="w-full h-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all group"
                >
                  <div>
                    {/* Browser Mockup Header */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                      </div>
                      <span className="truncate max-w-[200px] text-slate-400">
                        {project.url.replace('https://', '')}
                      </span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={project.previewImage}
                        alt={`${project.name} — ${project.categoryLabel} Website Demo`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {project.category === 'portfolio' ? 'Creator Prototype' : 'Business Prototype'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span>{project.highlights?.[0] || 'Mobile Responsive Design'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span>{project.highlights?.[1] || 'Direct WhatsApp Integration'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        {project.tags.map((tag, i) => (
                          <React.Fragment key={tag}>
                            {i > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>}
                            <span>{tag}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons: View Live Demo + Get Similar Website */}
                  <div className="p-5 sm:p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <MagneticButton
                      id={`view-live-btn-${project.id}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      className="w-full py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>View Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </MagneticButton>

                    <a
                      id={`get-similar-btn-${project.id}`}
                      href={createQuickWhatsAppUrl(
                        `Hi SITEVIA WORKS! I tested your "${project.name}" (${project.categoryLabel}) live demo and would like to build something similar for my business.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                    >
                      <span>Build Something Similar</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

