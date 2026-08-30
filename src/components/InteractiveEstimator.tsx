import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calculator, ShieldCheck, Send } from 'lucide-react';
import { Card3D } from './Card3D';
import { SITEVIA_WHATSAPP_NUMBER } from '../constants';

interface InteractiveEstimatorProps {
  onApplyConfiguration?: (config: { pages: number; features: string[]; estimatedPrice: string }) => void;
}

export const InteractiveEstimator: React.FC<InteractiveEstimatorProps> = ({ onApplyConfiguration }) => {
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'WhatsApp Direct Ordering',
    'Google Maps Pinpoint',
    'Mobile Responsive Optimization',
    'High-Speed CDN Hosting',
  ]);

  const addonOptions = [
    { id: 'wa', name: 'WhatsApp Direct Ordering', price: 0, desc: 'Instant 1-tap customer lead routing' },
    { id: 'maps', name: 'Google Maps Pinpoint', price: 0, desc: 'Turn-by-turn navigation embed' },
    { id: 'resp', name: 'Mobile Responsive Optimization', price: 0, desc: 'Pixel-perfect mobile layout' },
    { id: 'cdn', name: 'High-Speed CDN Hosting', price: 500, desc: 'Ultra-fast global loading speeds' },
    { id: 'menu', name: 'Interactive Catalog / Digital Menu', price: 800, desc: 'Filterable product/food items' },
    { id: 'seo', name: 'Advanced Local SEO Setup', price: 700, desc: 'Google Search & Meta tags setup' },
    { id: 'crm', name: 'Custom Contact & Booking Form', price: 600, desc: 'Validated customer inquiry pipeline' },
  ];

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  // Base calculation
  let basePrice = 2999;
  if (pageCount > 3 && pageCount <= 7) basePrice = 4999;
  if (pageCount > 7 && pageCount <= 12) basePrice = 7999;
  if (pageCount > 12) basePrice = 12999;

  // Addon extras
  const addonTotal = addonOptions.reduce((acc, curr) => {
    if (selectedAddons.includes(curr.name)) return acc + curr.price;
    return acc;
  }, 0);

  const totalPrice = basePrice + addonTotal;
  const formattedPrice = `₹${totalPrice.toLocaleString('en-IN')}`;

  let planName = 'Starter Package';
  if (pageCount > 3 && pageCount <= 7) planName = 'Business Package';
  if (pageCount > 7 && pageCount <= 12) planName = 'Professional Package';
  if (pageCount > 12) planName = 'Enterprise / Custom';

  const handleLaunchWhatsApp = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#06b6d4', '#10b981', '#ffffff'],
    });

    const msg = `👋 Hi Sitevia Team! I customized a project scope using your Interactive Estimator:
- *Package Tier:* ${planName}
- *Page Count:* ${pageCount} Pages
- *Selected Capabilities:* ${selectedAddons.join(', ')}
- *Estimated Budget:* ${formattedPrice}

I'd like to discuss bringing this live!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${SITEVIA_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');

    onApplyConfiguration?.({
      pages: pageCount,
      features: selectedAddons,
      estimatedPrice: formattedPrice,
    });
  };

  return (
    <section id="estimator" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Configure Your Scope in Real Time.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
            Slide to adjust pages and toggle business capabilities to calculate exact upfront costs.
          </p>
        </div>

        {/* 2-Column Interactive Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders and Feature Toggles */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8 shadow-sm dark:shadow-none">
            {/* Page Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400"></span>
                  1. Desired Page Count
                </label>
                <span className="text-xl font-extrabold text-blue-600 dark:text-cyan-400 font-mono bg-slate-100 dark:bg-slate-950 px-4 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={15}
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400 border border-slate-300 dark:border-slate-800"
              />

              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                <span>1 Page (Landing)</span>
                <span>5-7 Pages (Standard Business)</span>
                <span>15+ Pages (Multi-Section)</span>
              </div>
            </div>

            {/* Feature Selection Grid */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                2. Select Core Features & Integrations
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonOptions.map((opt) => {
                  const isSelected = selectedAddons.includes(opt.name);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleAddon(opt.name)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-sm dark:shadow-md dark:shadow-blue-950'
                          : 'bg-slate-50/70 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-blue-900 dark:text-white' : 'text-slate-800 dark:text-slate-300'}`}>
                          {opt.name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white font-bold' : 'border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{opt.desc}</p>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 mt-2 font-semibold">
                        {opt.price === 0 ? 'Included' : `+₹${opt.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Summary Card */}
          <div className="lg:col-span-5">
            <Card3D intensity={8} className="h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    Live Estimate Summary
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-semibold">
                    {planName}
                  </span>
                </div>

                {/* Price Display */}
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Estimated Investment
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    {formattedPrice}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    One-time fixed transparent pricing. No monthly platform lock-ins.
                  </p>
                </div>

                {/* Included List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>Base Tier ({pageCount} Pages):</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">₹{basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>Selected Add-ons ({selectedAddons.length}):</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">+₹{addonTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>Mobile-First Guarantee:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Free</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>WhatsApp Direct Pipeline:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Included</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-700/20 dark:shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>LAUNCH THIS ESTIMATE ON WHATSAPP →</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Guaranteed turnaround within 48 to 72 hours</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
