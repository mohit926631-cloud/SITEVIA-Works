import React from 'react';
import { PageType } from '../types';
import {
  Shield,
  Lock,
  EyeOff,
  Database,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mail,
  FileText,
  Sparkles,
  Server,
  KeyRound,
} from 'lucide-react';
import { VITEWEB_EMAIL, VITEWEB_WHATSAPP_NUMBER } from '../constants';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface PrivacyPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="py-10 sm:py-16 bg-slate-50/50 dark:bg-[#070A10]/50 min-h-screen text-slate-800 dark:text-slate-200 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            type="button"
            onClick={() => onNavigatePage('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Effective August 2026</span>
          </div>
        </div>

        {/* Page Hero Header - BIG & PROMINENT */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4" />
            <span>Data Protection & Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
            Privacy Policy
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
            We hold your privacy to the highest standard. Here is exactly how SITEVIA WORKS collects, protects, and handles your information when you build websites with us. Zero data selling, zero spam, and complete transparency.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Version 3.0</span>
            <span>•</span>
            <span>Entity: SITEVIA WORKS</span>
          </div>
        </div>

        {/* Big Privacy Commitments Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900/10 via-cyan-900/5 to-emerald-900/10 dark:from-blue-950/40 dark:via-slate-900/60 dark:to-cyan-950/30 border border-blue-200/80 dark:border-blue-800/60 shadow-lg mb-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <span>Our Privacy Commitments at a Glance</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Zero Data Selling</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">We never sell, rent, monetize, or trade your contact or business information with third-party advertisers or marketing brokers.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Encrypted Direct Chat</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">All project communications over WhatsApp adhere to end-to-end encryption protocols.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Safe Credential Disposal</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">Any temporary credentials provided for DNS or hosting setups are purged once your domain is live.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Strict No-Spam Policy</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">No unwanted newsletters, automated robocalls, or unsolicited promotional messages.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections with Larger Typography */}
        <div className="space-y-10 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                1
              </span>
              <span>Information We Collect</span>
            </h3>
            <p>
              We only collect information strictly necessary to communicate with you, analyze your web requirements, and build your custom website:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-2">
              <li><strong className="text-slate-900 dark:text-white">Contact & Identity:</strong> Your name, business name, WhatsApp mobile number, and email address submitted through project forms or WhatsApp chats.</li>
              <li><strong className="text-slate-900 dark:text-white">Project Assets:</strong> Brand logos, color schemes, photography, product lists, food menus, service descriptions, physical store addresses, and social media handles that you request us to embed on your website.</li>
              <li><strong className="text-slate-900 dark:text-white">Device Diagnostics:</strong> Standard anonymized browser, screen resolution, and operating system metrics used solely to verify multi-device mobile responsiveness and fast page loading.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                2
              </span>
              <span>How We Use Your Information</span>
            </h3>
            <p>
              Your provided information is used exclusively to fulfill our professional obligations to you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-2">
              <li>To provide clear project estimates and architectural recommendations.</li>
              <li>To design, write code for, test, and deploy your custom responsive website.</li>
              <li>To configure direct WhatsApp ordering triggers, lead forms, and interactive Google Maps location pins.</li>
              <li>To communicate project milestones, share staging preview links, and deliver post-launch technical warranty support.</li>
            </ul>
            <p className="font-semibold text-slate-900 dark:text-white pt-1">
              We never sell or monetize your data under any circumstances.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                3
              </span>
              <span>WhatsApp Communications & Direct Chats</span>
            </h3>
            <p>
              When you contact SITEVIA WORKS through WhatsApp, your direct chat is conducted on WhatsApp’s encrypted network. We will use your phone number only for conversations relating to your website project, updates, and customer support.
            </p>
            <p>
              We do not add your number to unsolicited telemarketing lists or automated promotional broadcast groups.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                4
              </span>
              <span>Third-Party Hosting & Integration Providers</span>
            </h3>
            <p>
              To ensure 99.9% uptime, global CDN delivery, and modern user experience, we partner with industry-standard platforms:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-2">
              <li><strong>Hosting & Edge Delivery:</strong> We deploy websites on top-tier global hosting services (such as Vercel, Cloudflare, Netlify, or AWS) that maintain robust SOC 2 and ISO 27001 data security compliance.</li>
              <li><strong>Map Integrations:</strong> Google Maps embeds operate under Google’s standard privacy terms.</li>
              <li><strong>Direct WhatsApp Links:</strong> WhatsApp click-to-chat triggers route directly through Meta/WhatsApp servers.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                5
              </span>
              <span>Data Retention & Security Safeguards</span>
            </h3>
            <p>
              We implement comprehensive technical and organizational safeguards to protect your files, draft code, and business assets against unauthorized access, alteration, or disclosure.
            </p>
            <p>
              If you provide temporary access credentials for domain DNS configuration, we strictly use them to point your records to the live host and then immediately delete/purge the temporary login details.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-sm font-black">
                6
              </span>
              <span>Your Rights: Access, Correction & Deletion</span>
            </h3>
            <p>
              You maintain full control over your information. At any point, you can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-2">
              <li>Request a copy of any personal contact data we have on file for you.</li>
              <li>Request corrections to any inaccurate contact information.</li>
              <li>Request that we permanently delete your contact records and preliminary draft assets from our internal communication archives.</li>
            </ul>
          </section>
        </div>

        {/* Cross-Link Banner to Terms of Service */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Related Document</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Looking for our Terms of Service?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Read about our project deliverables, milestone pricing, 100% source code ownership, and warranties.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigatePage('terms')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
          >
            <span>Read Terms of Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Legal Contact Help Desk */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Have questions about our Privacy Policy?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
            We are always here to provide complete transparency. Reach out to our privacy desk via WhatsApp or email.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I have a question regarding your Privacy Policy.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${VITEWEB_EMAIL}?subject=Privacy%20Inquiry%20-%20SITEVIA%20WORKS`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>{VITEWEB_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
