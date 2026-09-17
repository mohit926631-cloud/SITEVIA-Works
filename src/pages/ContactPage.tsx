import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  Layers,
  Store,
  Utensils,
  User,
  HeartPulse,
  ShoppingBag,
  Cpu,
  Zap,
} from 'lucide-react';
import { VITEWEB_WHATSAPP_NUMBER, VITEWEB_EMAIL } from '../constants';
import { PageType } from '../types';

interface ContactPageProps {
  initialPackage?: string;
  initialWebsiteType?: string;
  initialBusinessType?: string;
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
  onNavigatePage?: (page: PageType) => void;
}

interface WebTypeOption {
  id: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  desc: string;
  suggestedPlan: string;
}

const WEB_TYPES: WebTypeOption[] = [
  {
    id: 'Business Website',
    title: 'Business Website',
    icon: Store,
    badge: 'Popular',
    desc: 'Local service, agency, or corporate brand showcase.',
    suggestedPlan: 'Business Plan (₹5,499)',
  },
  {
    id: 'Restaurant & Café',
    title: 'Restaurant & Café',
    icon: Utensils,
    badge: 'High Conversion',
    desc: 'Digital food menu, WhatsApp reservations & location map.',
    suggestedPlan: 'Business Plan (₹5,499)',
  },
  {
    id: 'Portfolio / Personal',
    title: 'Portfolio & Creator',
    icon: User,
    badge: 'Sleek & Fast',
    desc: 'Showcase photos, design work, CV, or freelance skills.',
    suggestedPlan: 'Starter Plan (₹2,999)',
  },
  {
    id: 'Clinic & Healthcare',
    title: 'Clinic & Healthcare',
    icon: HeartPulse,
    badge: 'Trust & Care',
    desc: 'Doctor profiles, treatments, WhatsApp appointment triggers.',
    suggestedPlan: 'Business Plan (₹5,499)',
  },
  {
    id: 'E-Commerce / Catalog',
    title: 'Store / Catalog',
    icon: ShoppingBag,
    badge: 'Sell Products',
    desc: 'Product catalog with WhatsApp ordering & payment links.',
    suggestedPlan: 'Premium Plan (₹7,999)',
  },
  {
    id: 'Custom Web App',
    title: 'Custom Web App',
    icon: Cpu,
    badge: 'Tailored Logic',
    desc: 'Interactive calculators, booking workflows & dynamic tools.',
    suggestedPlan: 'Custom Quote',
  },
];

const FEATURE_LIST = [
  { id: 'mobile', label: '📱 Mobile-First Fast UI', defaultChecked: true },
  { id: 'whatsapp', label: '💬 WhatsApp Direct Orders / Chat', defaultChecked: true },
  { id: 'maps', label: '📍 Google Maps Location Pin', defaultChecked: true },
  { id: 'domain', label: '🌐 Custom Domain Setup Help', defaultChecked: true },
  { id: 'seo', label: '🔍 On-Page SEO & Google Ranking', defaultChecked: true },
  { id: 'speed', label: '⚡ 95+ Google PageSpeed Optimization', defaultChecked: true },
  { id: 'qr', label: '💳 UPI / Payment QR Integration', defaultChecked: false },
  { id: 'gallery', label: '📸 High-Resolution Image Gallery', defaultChecked: false },
];

const TIMELINE_OPTIONS = [
  { id: 'express', label: '⚡ Urgent (2-3 Days)', note: 'Priority expedited delivery' },
  { id: 'standard', label: '🚀 Standard (4-6 Days)', note: 'Recommended standard pace' },
  { id: 'flexible', label: '🗓️ Flexible (1-2 Weeks)', note: 'Plan according to your launch' },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  initialPackage,
  initialWebsiteType,
  initialBusinessType,
  onOpenLegal,
  onNavigatePage,
}) => {
  const [selectedType, setSelectedType] = useState<string>(initialWebsiteType || 'Business Website');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    '📱 Mobile-First Fast UI',
    '💬 WhatsApp Direct Orders / Chat',
    '📍 Google Maps Location Pin',
    '🌐 Custom Domain Setup Help',
    '🔍 On-Page SEO & Google Ranking',
  ]);
  const [timeline, setTimeline] = useState<string>('🚀 Standard (4-6 Days)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (initialWebsiteType) {
      setSelectedType(initialWebsiteType);
    }
  }, [initialWebsiteType]);

  const toggleFeature = (featureLabel: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureLabel)
        ? prev.filter((f) => f !== featureLabel)
        : [...prev, featureLabel]
    );
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(VITEWEB_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopySummary = async () => {
    const summaryText = `Project Scope for SITEVIA WORKS:
- Type: ${selectedType}
- Timeline: ${timeline}
- Features: ${selectedFeatures.join(', ')}
- Name: ${name || 'Prospective Client'}
- Phone: ${phone || 'Not provided'}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebratory confetti
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#06b6d4', '#ffffff'],
    });

    const lines = [
      `👋 Hi SITEVIA WORKS! I customized my project scope on your website:`,
      ``,
      `*📌 Website Type:* ${selectedType}`,
      `*⏱️ Preferred Timeline:* ${timeline}`,
      `*✨ Selected Features:* ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Standard package features'}`,
    ];

    if (name.trim()) lines.push(`*👤 My Name:* ${name.trim()}`);
    if (phone.trim()) lines.push(`*📞 Phone/WhatsApp:* ${phone.trim()}`);
    if (email.trim()) lines.push(`*📧 Email:* ${email.trim()}`);
    if (notes.trim()) lines.push(`*📝 Project Notes:* ${notes.trim()}`);

    lines.push(``);
    lines.push(`Let's discuss bringing this website live! 🚀`);

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${VITEWEB_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Live Availability */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for New Projects • Avg Response &lt; 15 mins</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Let’s Build Something{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500">
              Exceptional Together.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Customize your website scope below in 3 simple steps, or reach out directly on WhatsApp for an immediate consultation.
          </p>
        </div>

        {/* 2-Column Layout: Left Interactive Scope Builder, Right Live Scope Summary & Direct Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: 3-Step Interactive Project Builder (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <form onSubmit={handleSubmitWhatsApp} className="space-y-8">
              {/* STEP 1: Select Website Type (Visual Cards) */}
              <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Select Website Category
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pick the category that best matches your vision
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {WEB_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm text-slate-900 dark:text-white">
                                {type.title}
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {type.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {type.desc}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-cyan-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Feature Tags (Click to toggle) */}
              <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Include Desired Features
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tap each tag to toggle requirements for your website
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {FEATURE_LIST.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat.label);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.label)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-sm'
                            : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isChecked
                              ? 'bg-emerald-500 text-white'
                              : 'border border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{feat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Timeline & Contact Details */}
              <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    3
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Target Launch & Contact Details
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      When would you like this live, and how can we address you?
                    </p>
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                    Launch Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {TIMELINE_OPTIONS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTimeline(item.label)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          timeline === item.label
                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{item.label}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.note}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name, Phone, Email & Message */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name / Business Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma / Brew Café"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Any specific preferences or existing website link?
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. We need a dark mode design, online menu with direct WhatsApp order button, and links to Instagram."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>Send Project Scope on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      100% Free consultation & transparent quote
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Summary Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: Instant Contact Hub (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Direct Contact Cards Hub */}
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Direct Contact Hub</span>
              </h3>

              {/* WhatsApp Item */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current/20" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Direct WhatsApp</p>
                    <p className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                      +91 95110 07593
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${VITEWEB_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-colors"
                >
                  Chat
                </a>
              </div>

              {/* Email Item with 1-click Copy */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Official Email</p>
                    <p className="text-xs sm:text-sm font-semibold font-mono text-slate-900 dark:text-white truncate">
                      {VITEWEB_EMAIL}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Operating Hours & Speed */}
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Support Hours: Monday – Saturday (9:00 AM – 10:00 PM IST)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Replies typically within 15 minutes on WhatsApp</span>
                </div>
              </div>

              {/* Privacy & Terms links */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified Studio</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => (onNavigatePage ? onNavigatePage('privacy') : onOpenLegal?.('privacy'))}
                    className="hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => (onNavigatePage ? onNavigatePage('terms') : onOpenLegal?.('terms'))}
                    className="hover:underline cursor-pointer"
                  >
                    Terms
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
