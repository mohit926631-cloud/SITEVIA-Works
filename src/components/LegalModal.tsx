import React, { useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2, Lock, HelpCircle, Mail } from 'lucide-react';
import { SITEVIA_EMAIL } from '../constants';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-modal-content"
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white dark:bg-[#0B0F17] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last updated: January 2026 • WEBVIA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed custom-scrollbar">
          {type === 'privacy' ? (
            <>
              <div>
                <p>
                  At <strong>WEBVIA</strong> ("we", "our", or "us"), we value your privacy and are committed to protecting any personal and business information you share with us. This Privacy Policy outlines what information we collect, how we use it, and how your data is safeguarded when you use our website or engage our design and development services.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  1. Information We Collect
                </h4>
                <p>We only collect information necessary to provide and customize your website services:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li><strong>Contact Details:</strong> Your name, email address, phone/WhatsApp number, and business name provided via our enquiry forms or direct messaging.</li>
                  <li><strong>Project Content & Assets:</strong> Logos, brand assets, images, menus, pricing sheets, and text content you provide for building your custom website.</li>
                  <li><strong>Technical Usage:</strong> Non-personally identifiable diagnostic data (browser type, device type, and visit timestamps) to optimize website performance.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  2. How We Use Your Information
                </h4>
                <p>Your details are used strictly for:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li>Designing, developing, and deploying your custom website.</li>
                  <li>Communicating project updates, design previews, revisions, and milestones via WhatsApp or Email.</li>
                  <li>Invoicing and providing post-launch maintenance and technical support.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  3. Data Sharing & Third Parties
                </h4>
                <p>
                  <strong>We do not sell, rent, or trade your personal or business data to any third-party advertisers or data brokers.</strong>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  We only share technical credentials with trusted deployment and hosting platforms (e.g., Cloudflare, Vercel, domain registrars) solely as required to publish and host your website under your authorization.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  4. Security & Retention
                </h4>
                <p>
                  We implement industry-standard encryption, HTTPS protocols, and restricted access to ensure your credentials, brand files, and communications remain private and secure.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  5. Contact Us Regarding Privacy
                </h4>
                <p>
                  If you have questions about your data or wish to request data deletion, contact us directly at <a href={`mailto:${SITEVIA_EMAIL}`} className="text-blue-600 dark:text-blue-400 hover:underline">{SITEVIA_EMAIL}</a> or via WhatsApp at <strong>+91 95110 07593</strong>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>
                  Welcome to <strong>WEBVIA</strong>. By accessing our website, requesting a quote, or engaging our web design and development services, you agree to comply with and be bound by the following Terms of Service.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  1. Scope of Services
                </h4>
                <p>
                  WEBVIA provides custom website design, frontend development, mobile optimization, WhatsApp integration, hosting setup, and digital deployment for small businesses, creators, and professionals.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li>Deliverables follow the agreed package specifications (Starter ₹1,999, Business ₹3,499, Professional ₹5,999, or custom enterprise quotes).</li>
                  <li>Standard project delivery timelines range from 5 to 7 business days from the receipt of all required client content and initial token advance.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  2. Client Responsibilities & Assets
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li>The client is responsible for providing necessary brand assets, text copy, images, and accurate contact details in a timely manner.</li>
                  <li>The client certifies that they hold the legal rights to all logos, photographs, and media supplied to WEBVIA.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  3. Pricing, Domain & Hosting
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li>Service pricing covers design, development, integration, and initial deployment setup.</li>
                  <li>Custom domain registration fees (e.g., .com, .in) or specialized paid third-party APIs/software are billed directly at actual provider costs where applicable.</li>
                  <li>Free SSL certificates and global CDN setup on platforms like Cloudflare / Vercel are included where stated.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  4. Revisions & Ownership
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500 dark:text-slate-400">
                  <li>We include design preview reviews and revisions during the development phase to ensure your complete satisfaction.</li>
                  <li>Upon final payment settlement, full ownership of the developed website code and published site assets is transferred to the client.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  5. Limitation of Liability & Support
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  WEBVIA strives for 100% uptime and optimal code quality. We provide post-launch support as outlined in your selected package. WEBVIA is not liable for third-party hosting outages, registrar DNS downtime, or unauthorized modifications made by third parties after project handover.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
