import React from 'react';
import { PageType } from '../types';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mail,
  Lock,
  FileText,
} from 'lucide-react';
import { VITEWEB_EMAIL, VITEWEB_WHATSAPP_NUMBER } from '../constants';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

interface TermsPageProps {
  onNavigatePage: (page: PageType) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigatePage }) => {
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4" />
            <span>Legal Agreement & Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
            Terms of Service
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
            Clear, honest terms governing our web design and development engagements, project milestones, transparent pricing, and 100% full source code ownership.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Version 3.0</span>
            <span>•</span>
            <span>Entity: SITEVIA WORKS</span>
          </div>
        </div>

        {/* Big Highlights Banner (Key Guarantees at a Glance) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900/10 via-blue-900/5 to-cyan-900/10 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-cyan-950/30 border border-indigo-200/80 dark:border-indigo-800/60 shadow-lg mb-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
            <span>Client Guarantees at a Glance</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">100% Code Ownership</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">You own the full source code and digital assets on final project delivery. Zero recurring royalty fees.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Transparent One-Time Pricing</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">Fixed upfront rates with zero surprise charges or hidden platform commissions.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Rapid Turnaround</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">Standard projects are built, tested, and staged within 3 to 7 business days.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Post-Launch Support</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">Every plan includes 15 to 60 days of warranty support to fix any glitches.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections with Larger Typography */}
        <div className="space-y-10 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                1
              </span>
              <span>Acceptance of Terms & Scope of Services</span>
            </h3>
            <p>
              By accessing our website, requesting a project scope, or engaging <strong>SITEVIA WORKS</strong> for digital design and website engineering services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not initiate a project with us.
            </p>
            <p>
              SITEVIA WORKS specializes in crafting custom-coded, high-performance websites for businesses, clinics, restaurants, creators, and brands. Our services include UI/UX layout design, responsive frontend engineering, mobile speed optimization, WhatsApp lead-funnel buttons, interactive Google Maps pinpoint embeds, and domain hosting configuration.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                2
              </span>
              <span>Packages & Deliverable Boundaries</span>
            </h3>
            <p>
              All projects are executed strictly according to our transparent, one-time packages or mutually approved custom scope documents:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">STARTER PACKAGE — ₹2,999 (One-Time)</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">15 Days Support</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Suitable for individuals and small businesses. Includes up to 3 custom pages, professional responsive design, WhatsApp integration, contact section, social media links, basic SEO, fast loading speeds, and 15 days of post-launch warranty support.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-blue-950 dark:text-cyan-300 text-base">BUSINESS PACKAGE — ₹5,499 (One-Time) • Most Popular</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">1 Month Support</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Suitable for growing businesses. Includes up to 6 custom pages, premium mobile-first design, WhatsApp integration, contact form, Google Maps embed, social media integration, basic SEO, fast loading speeds, and 1 month of dedicated support.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">PREMIUM PACKAGE — ₹7,999 (One-Time)</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">2 Months Support</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Suitable for businesses requiring advanced web presence. Includes up to 10 custom pages, advanced custom design, premium interactions and animations, WhatsApp integration, contact form, Google Maps, social media integration, SEO-ready structure, performance optimization, and 2 months of support.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              Note: Packages do not include external enterprise e-commerce checkout gateways, payment processing fees, or complex third-party API subscription costs unless separately quoted in writing.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                3
              </span>
              <span>Client Assets, Content & Timely Cooperation</span>
            </h3>
            <p>
              To maintain our fast delivery timelines (3 to 7 business days), the client agrees to provide all necessary logos, high-resolution imagery, text copy, menu/pricing catalogs, and contact credentials in a timely manner.
            </p>
            <p>
              The client warrants that all text, artwork, trademarks, and photography provided to SITEVIA WORKS are owned by the client or that the client possesses full legal licensing rights. SITEVIA WORKS accepts no liability for copyright infringement arising from client-supplied materials.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                4
              </span>
              <span>Staging Review & Revision Milestones</span>
            </h3>
            <p>
              Before any website goes live on your official custom domain, we provide a private staging URL. You will have the opportunity to test the website on your smartphone and computer, inspect all interactive buttons, and request adjustments.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-2">
              <li><strong>Included Revisions:</strong> Tweaks to font styling, brand color accents, image replacements, copy edits, and form alignments within the agreed package.</li>
              <li><strong>Scope Changes:</strong> Requests to add brand new pages or fundamentally restructure layout logic beyond the selected package will be quoted transparently before execution.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                5
              </span>
              <span>100% Code Ownership & Intellectual Property</span>
            </h3>
            <p>
              We firmly believe you should own what you pay for. Upon completion of the project and settlement of the agreed one-time fee, <strong>full intellectual property rights and ownership of the customized website codebase are transferred directly to you</strong>.
            </p>
            <p>
              There are zero monthly licensing fees, zero proprietary locks, and zero restrictions on migrating your site to any host of your choice. SITEVIA WORKS reserves the standard industry right to display the completed work, screenshots, and live URL in our public design portfolio.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                6
              </span>
              <span>Hosting, Domains & Third-Party Platforms</span>
            </h3>
            <p>
              SITEVIA WORKS assists in connecting your custom domain name (e.g., <code>yourbusiness.com</code>) to reliable, global high-speed hosting (such as Vercel, Cloudflare, or AWS). Annual domain registration renewal fees remain the property and responsibility of the client.
            </p>
            <p>
              Third-party APIs and platforms (such as the WhatsApp chat redirect and Google Maps embeds) operate subject to their respective terms of service and uptime policies.
            </p>
          </section>

          {/* Section 7 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-black">
                7
              </span>
              <span>Payment Terms & Support Guarantee</span>
            </h3>
            <p>
              All rates are quoted in Indian Rupees (INR) as fixed, one-time fees. Payment milestones (typically an initial deposit followed by the remaining balance upon staging approval) are confirmed prior to project kickoff.
            </p>
            <p>
              Every project comes with post-launch warranty support (15 days for Starter, 30 days for Business, 60 days for Premium) covering technical bug fixes, link testing, and launch verification.
            </p>
          </section>
        </div>

        {/* Cross-Link Banner to Privacy Policy */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Related Document</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Looking for our Privacy Policy?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Read how we collect, safeguard, and respect your personal and business data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigatePage('privacy')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
          >
            <span>Read Privacy Policy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Legal Contact Help Desk */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Have questions about our Terms of Service?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
            We are always here to provide clarity before any project begins. Reach out directly via WhatsApp or email.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I have a question regarding your Terms of Service.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${VITEWEB_EMAIL}?subject=Terms%20of%20Service%20Inquiry%20-%20SITEVIA%20WORKS`}
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
