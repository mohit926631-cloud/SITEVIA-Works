import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Check,
  X as XMark,
  Globe,
  Phone,
  MessageCircle,
  MapPin,
  Star,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface ResultItem {
  id: string;
  name: string;
  category: string;
  rating: string;
  reviews: string;
  status: string;
  actions: string[];
  isUserBusiness?: boolean;
}

const SEARCH_QUERIES = [
  'salon near me',
  'restaurant near me',
  'cafe near me',
  'clinic near me',
];

export const WebsiteDifferenceDemo: React.FC = () => {
  const [hasWebsite, setHasWebsite] = useState<boolean>(true);
  const [displayText, setDisplayText] = useState<string>('salon near me');
  const [queryIndex, setQueryIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Automated typing animation for the search bar
  useEffect(() => {
    const currentFullQuery = SEARCH_QUERIES[queryIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFullQuery.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullQuery.slice(0, displayText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 45);
      } else {
        setIsDeleting(false);
        setQueryIndex((prev) => (prev + 1) % SEARCH_QUERIES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, queryIndex]);

  // Generic example businesses as strictly requested
  const yourBusiness: ResultItem = {
    id: 'your-business',
    name: 'Your Business',
    category: 'Local Premium Service',
    rating: '4.9',
    reviews: '128',
    status: 'Open · Closes 9 PM',
    actions: ['Website', 'WhatsApp', 'Call now'],
    isUserBusiness: true,
  };

  const competitors: ResultItem[] = [
    {
      id: 'comp-1',
      name: 'A nearby salon / outlet',
      category: 'Local Competitor',
      rating: '4.4',
      reviews: '86',
      status: 'Open · Closes 8 PM',
      actions: ['Website', 'Call'],
    },
    {
      id: 'comp-2',
      name: 'Another local business',
      category: 'Nearby Competitor',
      rating: '4.2',
      reviews: '52',
      status: 'Open · Closes 7:30 PM',
      actions: ['Directions', 'Call'],
    },
    {
      id: 'comp-3',
      name: 'A big chain outlet',
      category: 'Commercial Outlet',
      rating: '4.1',
      reviews: '142',
      status: 'Open · Closes 10 PM',
      actions: ['Website'],
    },
  ];

  // In "Without website": competitors rank first, user business is last and unlisted
  // In "With website": user business is rank #1 highlighted, followed by competitors
  const currentList = hasWebsite
    ? [yourBusiness, ...competitors]
    : [...competitors, yourBusiness];

  return (
    <section
      id="difference-demo"
      className="py-16 sm:py-24 bg-white dark:bg-[#070A10] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Interactive Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            See the difference a website makes.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Switch between the two modes below to see how local customers find your business when searching online.
          </p>
        </motion.div>

        {/* State Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              type="button"
              onClick={() => setHasWebsite(false)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                !hasWebsite
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={!hasWebsite}
            >
              <XMark className="w-4 h-4 stroke-[2.5]" />
              <span>Without a website</span>
            </button>

            <button
              type="button"
              onClick={() => setHasWebsite(true)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                hasWebsite
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={hasWebsite}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>With a website</span>
            </button>
          </div>
        </div>

        {/* Interactive Mock Browser & Results Display */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/80 shadow-md overflow-hidden"
        >
          {/* Mock Browser Top Header Bar */}
          <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Mock Search Input with Typewriter Animation */}
            <div className="flex-1 max-w-lg mx-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-900 dark:text-slate-100 font-medium font-mono truncate">
                {displayText}
              </span>
              <span className="w-0.5 h-4 bg-blue-500 animate-pulse shrink-0" />
            </div>

            <div className="text-[10px] text-slate-400 font-mono hidden sm:block shrink-0">
              Google Search Mockup
            </div>
          </div>

          {/* Results List with Animated Reordering */}
          <div className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 mb-1">
              <span>Local Search Results near your location</span>
              <span className="font-mono text-[11px]">Sorted by relevance & web authority</span>
            </div>

            <ul className="space-y-3">
              {currentList.map((item, index) => {
                const isUser = item.isUserBusiness;
                const isUserWinning = isUser && hasWebsite;
                const isUserMissing = isUser && !hasWebsite;

                return (
                  <motion.li
                    key={item.id}
                    layout
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 28,
                    }}
                    className={`rounded-xl p-4 sm:p-5 border transition-all ${
                      isUserWinning
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500/80 ring-2 ring-blue-500/20 shadow-sm'
                        : isUserMissing
                        ? 'bg-slate-100/70 dark:bg-slate-900/40 border-dashed border-rose-300/80 dark:border-rose-900/60 opacity-60'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Rank Badge */}
                        <div
                          className={`w-7 h-7 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                            isUserWinning
                              ? 'bg-blue-600 text-white'
                              : isUserMissing
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {isUserMissing ? '—' : `#${index + 1}`}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className={`text-sm sm:text-base font-bold tracking-tight ${
                                isUserWinning
                                  ? 'text-blue-900 dark:text-blue-100'
                                  : isUserMissing
                                  ? 'text-slate-600 dark:text-slate-400 line-through decoration-rose-500'
                                  : 'text-slate-900 dark:text-white'
                              }`}
                            >
                              {item.name}
                            </h4>

                            {isUserWinning && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                                <Check className="w-3 h-3 stroke-[3]" />
                                Ranked #1
                              </span>
                            )}

                            {isUserMissing && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-600 text-white">
                                <XMark className="w-3 h-3 stroke-[3]" />
                                No website — not showing up
                              </span>
                            )}
                          </div>

                          {/* Business Metadata */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {isUserMissing ? (
                              <span className="text-rose-600 dark:text-rose-400 font-medium">
                                Customers can't find your phone, hours, or services online. Competitors take the leads.
                              </span>
                            ) : (
                              <>
                                <span className="flex items-center gap-1 text-amber-500 font-bold">
                                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                                  <span>{item.rating}</span>
                                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                                    ({item.reviews})
                                  </span>
                                </span>
                                <span>•</span>
                                <span>{item.category}</span>
                                <span>•</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                  {item.status}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 sm:self-center pl-10 sm:pl-0">
                        {isUserMissing ? (
                          <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900">
                            ✕ No Online Inquiries
                          </div>
                        ) : (
                          item.actions.map((act) => (
                            <span
                              key={act}
                              className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
                                isUserWinning && act === 'WhatsApp'
                                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                                  : isUserWinning && act === 'Website'
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {act === 'Website' && <Globe className="w-3 h-3 shrink-0" />}
                              {act === 'WhatsApp' && <MessageCircle className="w-3 h-3 fill-white/20 shrink-0" />}
                              {act === 'Call now' && <Phone className="w-3 h-3 shrink-0" />}
                              {act === 'Directions' && <MapPin className="w-3 h-3 shrink-0" />}
                              {act === 'Call' && <Phone className="w-3 h-3 shrink-0" />}
                              <span>{act}</span>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Footnote as requested */}
          <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Illustration only — example businesses, not real clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
