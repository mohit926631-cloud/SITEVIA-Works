import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BUSINESS_TYPES,
  WEBSITE_TYPES,
  PACKAGES,
  FEATURE_OPTIONS,
  BUDGET_OPTIONS,
  PAGE_OPTIONS,
  VITEWEB_WHATSAPP_NUMBER,
} from '../constants';
import { ProjectFormData } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { MessageSquare, Send, Check, Copy, ShieldCheck, Lock } from 'lucide-react';
interface ProjectEnquiryProps {
  initialPackage?: string;
  initialWebsiteType?: string;
  initialBusinessType?: string;
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
}

export const ProjectEnquiry: React.FC<ProjectEnquiryProps> = ({
  initialPackage = '',
  initialWebsiteType = '',
  initialBusinessType = '',
  onOpenLegal,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    businessName: '',
    businessType: initialBusinessType || BUSINESS_TYPES[0],
    websiteType: initialWebsiteType || WEBSITE_TYPES[0],
    package: initialPackage || PACKAGES[1],
    pages: PAGE_OPTIONS[2],
    features: ['WhatsApp', 'Google Maps', 'Gallery', 'Contact Form'],
    budget: BUDGET_OPTIONS[1],
    phone: '',
    email: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPackage) setFormData((prev) => ({ ...prev, package: initialPackage }));
  }, [initialPackage]);

  useEffect(() => {
    if (initialWebsiteType) setFormData((prev) => ({ ...prev, websiteType: initialWebsiteType }));
  }, [initialWebsiteType]);

  useEffect(() => {
    if (initialBusinessType) setFormData((prev) => ({ ...prev, businessType: initialBusinessType }));
  }, [initialBusinessType]);

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      if (exists) {
        return { ...prev, features: prev.features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...prev.features, feature] };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your WhatsApp contact number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      el?.focus();
      return;
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#3b82f6', '#ffffff'],
    });

    const waUrl = createWhatsAppUrl(formData);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const waUrl = createWhatsAppUrl(formData);
    const textParam = new URL(waUrl).searchParams.get('text') || '';
    navigator.clipboard.writeText(textParam);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="enquiry" className="py-20 sm:py-28 bg-slate-50 dark:bg-[#070A10] border-t border-slate-200/80 dark:border-slate-800/80 relative transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Project Intake</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Launch Your Website Project.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto">
            Configure your brief below. We review your requirements and reply directly on WhatsApp within 15 minutes.
          </p>
        </div>

        {/* The Main Project Brief Form */}
        <form
          id="project-enquiry-form"
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg dark:shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-8"
          noValidate
        >
          {/* Group 1: Contact Information */}
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400"></span>
              1. CONTACT & IDENTITY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="field-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400'
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="field-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400'
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="field-businessName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Brand or Business Name
                </label>
                <input
                  id="field-businessName"
                  type="text"
                  placeholder="e.g. Lumé Hair Studio / Forge Fitness"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="field-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  id="field-email"
                  type="email"
                  placeholder="e.g. hello@yourbrand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Classification */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              2. INDUSTRY & FORMAT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-businessType" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Industry / Business Type
                </label>
                <select
                  id="field-businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white text-sm focus:outline-none"
                >
                  {BUSINESS_TYPES.map((bt) => (
                    <option key={bt} value={bt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {bt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="field-websiteType" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Website Category
                </label>
                <select
                  id="field-websiteType"
                  value={formData.websiteType}
                  onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white text-sm focus:outline-none"
                >
                  {WEBSITE_TYPES.map((wt) => (
                    <option key={wt} value={wt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {wt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Group 3: Scope & Budget */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              3. PACKAGE, PAGES & BUDGET
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="field-package" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Selected Package
                </label>
                <select
                  id="field-package"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-3.5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white text-sm focus:outline-none font-mono"
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg} value={pkg} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="field-pages" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Page Scope
                </label>
                <select
                  id="field-pages"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  className="w-full px-3.5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white text-sm focus:outline-none font-mono"
                >
                  {PAGE_OPTIONS.map((pg) => (
                    <option key={pg} value={pg} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {pg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="field-budget" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Budget Expectation
                </label>
                <select
                  id="field-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white text-sm focus:outline-none font-mono"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Group 4: Required Features */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 font-mono">
              4. INTEGRATIONS & MODULES
            </label>
            <div className="flex flex-wrap gap-2">
              {FEATURE_OPTIONS.map((feature) => {
                const isSelected = formData.features.includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 min-h-[40px] ${
                      isSelected
                        ? 'bg-blue-600 text-white border border-blue-400 dark:border-cyan-400 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-black dark:hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${isSelected ? 'bg-white text-blue-600 font-bold' : 'border border-slate-300 dark:border-slate-700'}`}>
                      {isSelected && '✓'}
                    </span>
                    <span>{feature}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 5: Additional Requirements */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <label htmlFor="field-requirements" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              5. Project Brief Notes / Inspiration / Reference URLs
            </label>
            <textarea
              id="field-requirements"
              rows={3}
              placeholder="Detail your timeline, special sections, reference websites, or brand palette..."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none"
            />
          </div>

          {/* Action Submission Buttons */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
            <button
              id="submit-project-brief-whatsapp-btn"
              type="submit"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-700/20 dark:shadow-emerald-950/80 transition-all min-h-[54px]"
            >
              <Send className="w-5 h-5" />
              <span>SEND BRIEF VIA WHATSAPP →</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 transition-colors min-h-[54px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Brief Text Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>
          </div>

          {/* WhatsApp Direct Line & Legal Assurance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <span>Direct WhatsApp Line:</span>
              <a
                href={`https://wa.me/${VITEWEB_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold font-mono"
              >
                +91 95110 07593
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Protected by</span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('privacy')}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>&</span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('terms')}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 underline cursor-pointer"
              >
                Terms
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
