import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import {
  BUSINESS_TYPES,
  WEBSITE_TYPES,
  PACKAGE_RADIO_OPTIONS,
  STEP4_PAGE_OPTIONS,
  STEP4_BUDGET_OPTIONS,
  FEATURE_OPTIONS,
  VITEWEB_WHATSAPP_NUMBER,
} from '../constants';
import { ProjectFormData } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { isValidIndianMobile } from '../utils/phone';
import {
  Send,
  Check,
  Copy,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Lock,
} from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<ProjectFormData>(() => {
    // Resolve initial package if passed from pricing cards
    let pkgVal = 'Starter (₹2,999)';
    let pageVal = '2–3 pages';
    let budgetVal = 'Under ₹3,000';

    if (initialPackage) {
      const lower = initialPackage.toLowerCase();
      if (lower.includes('business') || lower.includes('5,499')) {
        pkgVal = 'Business (₹5,499)';
        pageVal = '4–6 pages';
        budgetVal = '₹3,000 – ₹5,500';
      } else if (lower.includes('premium') || lower.includes('7,999')) {
        pkgVal = 'Premium (₹7,999)';
        pageVal = '7–10 pages';
        budgetVal = '₹5,500 – ₹8,000';
      } else if (lower.includes('starter') || lower.includes('2,999')) {
        pkgVal = 'Starter (₹2,999)';
        pageVal = '2–3 pages';
        budgetVal = 'Under ₹3,000';
      }
    }

    return {
      name: '',
      businessName: '',
      businessType: initialBusinessType || '',
      websiteType: initialWebsiteType || '',
      package: pkgVal,
      pages: pageVal,
      budget: budgetVal,
      features: ['WhatsApp Integration'],
      phone: '',
      email: '',
      requirements: '',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync with outside triggers if user clicked a plan/service on another page
  useEffect(() => {
    if (initialPackage) {
      const lower = initialPackage.toLowerCase();
      let pkgVal = 'Starter (₹2,999)';
      let pageVal = '2–3 pages';
      let budgetVal = 'Under ₹3,000';

      if (lower.includes('business') || lower.includes('5,499')) {
        pkgVal = 'Business (₹5,499)';
        pageVal = '4–6 pages';
        budgetVal = '₹3,000 – ₹5,500';
      } else if (lower.includes('premium') || lower.includes('7,999')) {
        pkgVal = 'Premium (₹7,999)';
        pageVal = '7–10 pages';
        budgetVal = '₹5,500 – ₹8,000';
      }

      setFormData((prev) => ({
        ...prev,
        package: pkgVal,
        pages: pageVal,
        budget: budgetVal,
      }));
    }
  }, [initialPackage]);

  useEffect(() => {
    if (initialWebsiteType) {
      setFormData((prev) => ({ ...prev, websiteType: initialWebsiteType }));
    }
  }, [initialWebsiteType]);

  useEffect(() => {
    if (initialBusinessType) {
      setFormData((prev) => ({ ...prev, businessType: initialBusinessType }));
    }
  }, [initialBusinessType]);

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter your full name.';
      }
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Please enter your business or brand name.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please enter your WhatsApp number.';
      } else if (!isValidIndianMobile(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian WhatsApp number.';
      }
    } else if (step === 2) {
      if (!formData.businessType) {
        newErrors.businessType = 'Please select a business type.';
      }
      if (!formData.websiteType) {
        newErrors.websiteType = 'Please select a website type.';
      }
    } else if (step === 3) {
      if (!formData.package) {
        newErrors.package = 'Please choose a package.';
      }
    } else if (step === 4) {
      if (!formData.pages) {
        newErrors.pages = 'Please select the number of pages.';
      }
      if (!formData.budget) {
        newErrors.budget = 'Please select your budget range.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      setCurrentStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

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

  // Submit via WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    // Validate phone number once again before final step launch
    if (!isValidIndianMobile(formData.phone)) {
      setErrors({ phone: 'Please enter a valid 10-digit Indian WhatsApp number.' });
      setCurrentStep(1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // Ignore if confetti not supported
    }

    const whatsappUrl = createWhatsAppUrl(formData);
    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = async () => {
    const name = formData.name.trim() || 'Client';
    const business = formData.businessName.trim() || 'Business';
    const bType = formData.businessType || 'Not specified';
    const wType = formData.websiteType || 'Not specified';
    const pkg = formData.package || 'Not Sure';
    const pgs = formData.pages || 'Not specified';
    const bdgt = formData.budget || 'Not specified';
    const feats = formData.features.length > 0 ? formData.features.join(', ') : 'None';
    const ph = formData.phone.trim() || 'Not specified';
    const em = formData.email.trim() || 'Not specified';
    const req = formData.requirements.trim() || 'None';

    const text = `Hello SITEVIA WORKS 👋\n\nProject Enquiry:\n• Name: ${name}\n• Business: ${business}\n• Business Type: ${bType}\n• Website Type: ${wType}\n• Package: ${pkg}\n• Pages: ${pgs}\n• Budget: ${bdgt}\n• Features: ${feats}\n• WhatsApp: ${ph}\n• Email: ${em}\n• Notes: ${req}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Dynamic Summary Text for Step 4
  const summaryParts = [
    formData.name.trim() || 'Name',
    formData.businessName.trim() || 'Brand',
    formData.websiteType || formData.businessType || 'Website',
    formData.package || 'Package',
  ];
  const summaryText = summaryParts.join(' · ');

  return (
    <section id="enquiry" className="py-6 sm:py-10 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Main Step Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Project enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Takes about two minutes. Fields marked * are required.
            </p>
          </div>

          {/* Stepper Progress Bar (4 Segments) */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  stepNum <= currentStep
                    ? 'bg-blue-600 dark:bg-blue-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Step Indicator Label */}
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
            {currentStep === 1 && 'Step 1 of 4: Contact details'}
            {currentStep === 2 && 'Step 2 of 4: Business details'}
            {currentStep === 3 && 'Step 3 of 4: Package'}
            {currentStep === 4 && 'Step 4 of 4: Requirements'}
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {/* STEP 1: Contact Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="field-name"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Full name *
                    </label>
                    <input
                      id="field-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.name
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Business or Brand Name */}
                  <div>
                    <label
                      htmlFor="field-businessName"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Business or brand name *
                    </label>
                    <input
                      id="field-businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        if (errors.businessName) setErrors({ ...errors, businessName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.businessName
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    />
                    {errors.businessName && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.businessName}</span>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label
                      htmlFor="field-phone"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      WhatsApp number *
                    </label>
                    <input
                      id="field-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:outline-none ${
                        errors.phone
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Email address (optional) */}
                  <div>
                    <label
                      htmlFor="field-email"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Email address <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="field-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all focus:outline-none"
                    />
                  </div>

                  {/* Continue Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Business Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Business Type */}
                  <div>
                    <label
                      htmlFor="field-businessType"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Business type *
                    </label>
                    <select
                      id="field-businessType"
                      value={formData.businessType}
                      onChange={(e) => {
                        setFormData({ ...formData, businessType: e.target.value });
                        if (errors.businessType) setErrors({ ...errors, businessType: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.businessType
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.businessType}</span>
                      </div>
                    )}
                  </div>

                  {/* Website Type */}
                  <div>
                    <label
                      htmlFor="field-websiteType"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Website type *
                    </label>
                    <select
                      id="field-websiteType"
                      value={formData.websiteType}
                      onChange={(e) => {
                        setFormData({ ...formData, websiteType: e.target.value });
                        if (errors.websiteType) setErrors({ ...errors, websiteType: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.websiteType
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    >
                      <option value="">Select website type</option>
                      {WEBSITE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.websiteType && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.websiteType}</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 space-y-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Package */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Choose a package *
                    </label>

                    {/* Radio Cards */}
                    <div className="space-y-3">
                      {PACKAGE_RADIO_OPTIONS.map((pkg) => {
                        const isSelected =
                          formData.package === pkg.value ||
                          formData.package.toLowerCase().includes(pkg.name.toLowerCase());

                        return (
                          <div
                            key={pkg.id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                package: pkg.value,
                                ...(pkg.id === 'starter'
                                  ? { pages: '2–3 pages', budget: 'Under ₹3,000' }
                                  : pkg.id === 'business'
                                  ? { pages: '4–6 pages', budget: '₹3,000 – ₹5,500' }
                                  : pkg.id === 'premium'
                                  ? { pages: '7–10 pages', budget: '₹5,500 – ₹8,000' }
                                  : {}),
                              });
                              if (errors.package) setErrors({ ...errors, package: '' });
                            }}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                              isSelected
                                ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-blue-500/30'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            {/* Radio Circle */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'border-blue-600 dark:border-blue-500'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                              )}
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {pkg.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {pkg.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {errors.package && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.package}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                      Prices are one-time starting prices. Domain, paid hosting and third-party services may cost extra where applicable.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 space-y-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Requirements */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Number of Pages */}
                  <div>
                    <label
                      htmlFor="field-pages"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Number of pages *
                    </label>
                    <select
                      id="field-pages"
                      value={formData.pages}
                      onChange={(e) => {
                        setFormData({ ...formData, pages: e.target.value });
                        if (errors.pages) setErrors({ ...errors, pages: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.pages
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    >
                      <option value="">Select</option>
                      {STEP4_PAGE_OPTIONS.map((pg) => (
                        <option key={pg} value={pg}>
                          {pg}
                        </option>
                      ))}
                    </select>
                    {errors.pages && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.pages}</span>
                      </div>
                    )}
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label
                      htmlFor="field-budget"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Budget range *
                    </label>
                    <select
                      id="field-budget"
                      value={formData.budget}
                      onChange={(e) => {
                        setFormData({ ...formData, budget: e.target.value });
                        if (errors.budget) setErrors({ ...errors, budget: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border text-sm text-slate-900 dark:text-white transition-all focus:outline-none ${
                        errors.budget
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                      }`}
                    >
                      <option value="">Select</option>
                      {STEP4_BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.budget}</span>
                      </div>
                    )}
                  </div>

                  {/* Required Features (Optional) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      Required features <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="space-y-2">
                      {FEATURE_OPTIONS.map((feat) => {
                        const isChecked = formData.features.includes(feat);
                        return (
                          <label
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                              isChecked
                                ? 'border-blue-600/70 dark:border-blue-500/70 bg-blue-50/40 dark:bg-blue-950/20 text-slate-900 dark:text-white'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                isChecked
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">{feat}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project description or additional requirements */}
                  <div>
                    <label
                      htmlFor="field-requirements"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Project description or additional requirements{' '}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="field-requirements"
                      rows={3}
                      placeholder="Tell us about your business, the pages you need, any websites you like, or a launch date you have in mind."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all focus:outline-none resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Summary
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {summaryText}
                    </p>
                  </div>

                  {/* Submitted Confirmation Alert */}
                  {submitted && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-emerald-900 dark:text-emerald-100">
                          Enquiry Ready!
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                          WhatsApp has opened with your formatted requirements. We reply directly within 15 minutes.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="pt-2 space-y-2">
                    {/* Primary Continue in WhatsApp Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Continue in WhatsApp</span>
                    </button>
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                      Opens WhatsApp with your details — you then tap Send.
                    </p>

                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    {/* Optional Copy Details Link */}
                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium cursor-pointer inline-flex items-center gap-1"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Details Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Or copy details to clipboard</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Talk to us directly bottom section (as in the video) */}
        <div className="mt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Talk to us directly
          </p>
          <div className="inline-flex items-center gap-3 p-3.5 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/50">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block leading-tight">
                WhatsApp
              </span>
              <a
                href={`https://wa.me/${VITEWEB_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold font-mono text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                +91 95110 07593
              </a>
            </div>
            <a
              href={`https://wa.me/${VITEWEB_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
