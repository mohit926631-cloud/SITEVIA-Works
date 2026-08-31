import React, { useEffect, useState } from 'react';
import { X, Shield, FileText, CheckCircle2, Lock, Scale, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { WEBVIA_EMAIL, WEBVIA_WHATSAPP_NUMBER } from '../constants';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';

export type LegalTab = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 transition-all">
        {/* Compact Tab Selection & Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-900/70 px-4 sm:px-6 py-3 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="tab-privacy-policy"
              onClick={() => setActiveTab('privacy')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              id="tab-terms-of-service"
              onClick={() => setActiveTab('terms')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6 text-sm leading-relaxed scrollbar-thin">
          {activeTab === 'privacy' ? (
            /* PRIVACY POLICY CONTENT */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Privacy Summary</span>
                </p>
                <p className="text-blue-800/90 dark:text-blue-300/90 leading-normal">
                  Webvia is committed to protecting your privacy. We strictly use your provided information to communicate project details, design your website, configure integrations (such as WhatsApp & Google Maps), and provide support. We never sell or share your data with third-party advertisers.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">1</span>
                  <span>Information We Collect</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  We collect information necessary to deliver high-quality website design and development services:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
                  <li><strong className="text-slate-800 dark:text-slate-200">Contact Information:</strong> Your name, business name, WhatsApp phone number, and email address provided through enquiry forms or direct chats.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Project Assets:</strong> Logos, brand images, menu lists, service descriptions, address/location coordinates, and design preferences you share with us.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Technical Diagnostics:</strong> Standard anonymized logs (browser type, screen resolution, device category) to test cross-device responsiveness and optimize page load speeds.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">2</span>
                  <span>How We Use Your Information</span>
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
                  <li>To provide accurate website cost estimates and recommend appropriate page architectures.</li>
                  <li>To build, program, test, and host your custom business website or portfolio.</li>
                  <li>To embed functional features such as one-tap WhatsApp reservation buttons and interactive Google Maps location pins.</li>
                  <li>To provide after-sales assistance, staging reviews, domain linking, and maintenance.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">3</span>
                  <span>WhatsApp & Direct Communications</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  When you initiate a project brief or contact us via WhatsApp, your message history is protected by WhatsApp’s end-to-end encryption standards. We will never spam your number with automated robocalls or unsolicited third-party marketing.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">4</span>
                  <span>Third-Party Hosting & Integration Services</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  To ensure 99.9% uptime and lightning-fast loading speeds, websites built by Webvia are deployed using world-class hosting infrastructures (such as Vercel, Cloudflare, or Netlify). Third-party services like Google Maps Platform and WhatsApp API operate under their respective privacy terms.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">5</span>
                  <span>Data Security & Confidentiality</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  We implement robust technical and operational practices to safeguard your project files, credentials, and draft designs. Any temporary access credentials shared for domain DNS configuration or hosting setup are securely purged once configuration is complete.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 text-xs font-bold">6</span>
                  <span>Your Data Rights & Contact</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  You have the right to request access, correction, or deletion of your contact records at any time. For questions regarding our privacy practices, reach out directly:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Webvia Privacy Desk</p>
                    <p className="text-slate-500 font-mono">{WEBVIA_EMAIL}</p>
                  </div>
                  <a
                    href={`mailto:${WEBVIA_EMAIL}?subject=Privacy%20Inquiry%20-%20Webvia`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Privacy Desk</span>
                  </a>
                </div>
              </section>
            </div>
          ) : (
            /* TERMS OF SERVICE CONTENT */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm">
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Terms Summary</span>
                </p>
                <p className="text-indigo-800/90 dark:text-indigo-300/90 leading-normal">
                  By engaging Webvia for web design & development services, you agree to these transparent terms covering project scopes, deliverables, transparent milestone pricing, code ownership, and client responsibilities.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">1</span>
                  <span>Scope of Services & Packages</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Webvia provides custom website design, responsive front-end development, interactive user interfaces, WhatsApp ordering/booking triggers, Google Maps integration, and live deployment. Packages are structured as:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
                  <li><strong className="text-slate-800 dark:text-slate-200">Starter Plan (₹1,999):</strong> 1–3 pages, mobile-first design, WhatsApp integration, Google Maps, contact section, live deployment.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Plan (₹3,499):</strong> 4–7 pages, custom modern design, gallery, services section, animations, WhatsApp booking, Google Maps, live deployment.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Professional Plan (₹5,999):</strong> 7–10+ pages, comprehensive high-impact design, advanced booking features, complex interactive components, live deployment.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">2</span>
                  <span>Client Responsibilities & Materials</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  To ensure on-time delivery (within our standard 3–7 business day window), clients agree to provide necessary text content, logo files, product/menu details, and address information. The client guarantees that all supplied media and branding are either owned by them or properly licensed.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">3</span>
                  <span>Review Milestone & Revisions</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Every project includes a dedicated staging review milestone. Clients can test their website live on mobile and desktop devices. Revisions within the agreed package scope (adjusting colors, typography, images, and content phrasing) are completed promptly before final domain launch.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">4</span>
                  <span>Code Ownership & Intellectual Property</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Upon completion of the project and full payment, full ownership of the final website frontend code, styling, and custom digital assets is transferred to the client. Webvia reserves the right to showcase screenshots and live preview links in our portfolio and marketing materials.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">5</span>
                  <span>Domains & Third-Party Services</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  We assist clients in connecting their custom domains (e.g. yourbusiness.com). External domain registration fees or third-party paid API quotas (if any specialized external enterprise subscriptions are requested) remain the client’s responsibility.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">6</span>
                  <span>Payment Terms & Support</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Payments are processed via secure UPI, Net Banking, or Bank Transfer. Webvia provides initial post-launch warranty support to ensure all links, contact forms, and map coordinates operate smoothly.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Need clarification?</span>
            <a
              href={createQuickWhatsAppUrl('Hi Webvia! I have a question regarding your Privacy Policy or Terms of Service.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold transition-all"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
