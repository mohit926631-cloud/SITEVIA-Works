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

  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  // Section completion calculators
  const isSectionComplete = (sectionNum: number): boolean => {
    switch (sectionNum) {
      case 1:
        return formData.name.trim().length >= 2 && formData.phone.trim().length >= 7;
      case 2:
        return Boolean(formData.businessType && formData.websiteType);
      case 3:
        return Boolean(formData.package && formData.pages && formData.budget);
      case 4:
        return formData.features.length > 0;
      case 5:
        return formData.requirements.trim().length >= 5;
      default:
        return false;
    }
  };


  // Section Status Indicator Icon
  const renderSectionStatusIcon = (sectionNum: number) => {
    const complete = isSectionComplete(sectionNum);
    const active = activeSection === sectionNum;

    if (complete) {
      return (
        <span
          aria-label={`Section ${sectionNum} complete`}
          className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 transition-all duration-300 ease-out transform scale-100"
        >
          <Check className="w-3 h-3 stroke-[2.5]" />
        </span>
      );
    }

    if (active) {
      return (
        <span
          aria-label={`Section ${sectionNum} active`}
          className="w-5 h-5 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 border border-blue-500/40 dark:border-cyan-400/40 flex items-center justify-center shrink-0 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
        </span>
      );
    }

    return (
      <span
        aria-label={`Section ${sectionNum} pending`}
        className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/60"
      >
        0{sectionNum}
      </span>
    );
  };

  // Section Status Text Badge
  const renderSectionStatusBadge = (sectionNum: number) => {
    const complete = isSectionComplete(sectionNum);
    const active = activeSection === sectionNum;

    if (complete) {
      return (
        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <span>✓ Done</span>
        </span>
      );
    }

    if (active) {
      return (
        <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
          <span>Active</span>
        </span>
      );
    }

    if (sectionNum === 1) {
      return (
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-normal">
          Required *
        </span>
      );
    }

    if (sectionNum === 5) {
      return (
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-normal">
          Optional
        </span>
      );
    }

    return (
      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-normal">
        Configured
      </span>
    );
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
      const firstErrorKey = Object.keys(errors)[0] || 'name';
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

    setSubmitted(true);
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
    <section id="enquiry" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#070A10] border-t border-slate-200/80 dark:border-slate-800/80 relative transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Project Intake</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Launch Your Website Project.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto font-normal">
            Configure your brief below. We review your requirements and reply directly on WhatsApp within 15 minutes.
          </p>
        </div>

        {/* The Main Project Brief Form */}
        <form
          id="project-enquiry-form"
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
          noValidate
        >
          {/* Group 1: Contact Information */}
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out border ${
              activeSection === 1
                ? 'border-blue-500/40 dark:border-cyan-400/40 bg-blue-500/[0.025] dark:bg-cyan-500/[0.03] shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200/80 dark:border-slate-800/80 bg-transparent'
            }`}
            onFocus={() => setActiveSection(1)}
            onClick={() => setActiveSection(1)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                {renderSectionStatusIcon(1)}
                <span>01. CONTACT & IDENTITY</span>
              </h3>
              {renderSectionStatusBadge(1)}
            </div>

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
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out border ${
              activeSection === 2
                ? 'border-blue-500/40 dark:border-cyan-400/40 bg-blue-500/[0.025] dark:bg-cyan-500/[0.03] shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200/80 dark:border-slate-800/80 bg-transparent'
            }`}
            onFocus={() => setActiveSection(2)}
            onClick={() => setActiveSection(2)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                {renderSectionStatusIcon(2)}
                <span>02. INDUSTRY & FORMAT</span>
              </h3>
              {renderSectionStatusBadge(2)}
            </div>

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
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out border ${
              activeSection === 3
                ? 'border-blue-500/40 dark:border-cyan-400/40 bg-blue-500/[0.025] dark:bg-cyan-500/[0.03] shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200/80 dark:border-slate-800/80 bg-transparent'
            }`}
            onFocus={() => setActiveSection(3)}
            onClick={() => setActiveSection(3)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                {renderSectionStatusIcon(3)}
                <span>03. PACKAGE, PAGES & BUDGET</span>
              </h3>
              {renderSectionStatusBadge(3)}
            </div>

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
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out border ${
              activeSection === 4
                ? 'border-blue-500/40 dark:border-cyan-400/40 bg-blue-500/[0.025] dark:bg-cyan-500/[0.03] shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200/80 dark:border-slate-800/80 bg-transparent'
            }`}
            onFocus={() => setActiveSection(4)}
            onClick={() => setActiveSection(4)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                {renderSectionStatusIcon(4)}
                <span>04. INTEGRATIONS & MODULES</span>
              </h3>
              {renderSectionStatusBadge(4)}
            </div>

            <div className="flex flex-wrap gap-2">
              {FEATURE_OPTIONS.map((feature) => {
                const isSelected = formData.features.includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 min-h-[40px] cursor-pointer ${
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
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out border ${
              activeSection === 5
                ? 'border-blue-500/40 dark:border-cyan-400/40 bg-blue-500/[0.025] dark:bg-cyan-500/[0.03] shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200/80 dark:border-slate-800/80 bg-transparent'
            }`}
            onFocus={() => setActiveSection(5)}
            onClick={() => setActiveSection(5)}
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="field-requirements" className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-mono cursor-pointer">
                {renderSectionStatusIcon(5)}
                <span>05. REQUIREMENTS & INSPIRATION</span>
              </label>
              {renderSectionStatusBadge(5)}
            </div>

            <textarea
              id="field-requirements"
              rows={3}
              placeholder="Detail your timeline, special sections, reference websites, or brand palette..."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none"
            />
          </div>

          {/* Live Brief Summary Preview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                  Your Brief Summary
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Live Preview
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {formData.websiteType && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs">
                  <span className="text-slate-400 text-[10px]">Type:</span>
                  <strong className="font-semibold">{formData.websiteType}</strong>
                </span>
              )}

              {formData.businessType && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs">
                  <span className="text-slate-400 text-[10px]">Industry:</span>
                  <strong className="font-semibold">{formData.businessType}</strong>
                </span>
              )}

              {formData.package && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-blue-700 dark:text-cyan-300 shadow-xs">
                  <span className="text-blue-500/70 text-[10px]">Plan:</span>
                  <strong className="font-semibold font-mono">{formData.package}</strong>
                </span>
              )}

              {formData.pages && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs">
                  <span className="text-slate-400 text-[10px]">Scope:</span>
                  <strong className="font-semibold font-mono">{formData.pages}</strong>
                </span>
              )}

              {formData.budget && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 shadow-xs">
                  <span className="text-emerald-600/70 text-[10px]">Budget:</span>
                  <strong className="font-semibold font-mono">{formData.budget}</strong>
                </span>
              )}

              {formData.businessName.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 shadow-xs">
                  <span className="text-amber-600/70 text-[10px]">Brand:</span>
                  <strong className="font-semibold">{formData.businessName.trim()}</strong>
                </span>
              )}

              {formData.features.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 text-slate-600 dark:text-slate-400"
                >
                  <span className="text-emerald-500 font-bold">✓</span>
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-100">
                  Project Brief Prepared Successfully!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                  WhatsApp is opening with your formatted requirements. We review and reply within 15 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Action Submission Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              id="submit-project-brief-whatsapp-btn"
              type="submit"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[50px] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Brief via WhatsApp →</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors min-h-[50px] cursor-pointer"
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
