import React, { useState } from 'react';
import { MessageCircle, Mail, Zap, Check, Copy } from 'lucide-react';
import { VITEWEB_WHATSAPP_NUMBER, VITEWEB_EMAIL } from '../constants';
import { ProjectEnquiry } from '../components/ProjectEnquiry';
import { PageType } from '../types';

interface ContactPageProps {
  initialPackage?: string;
  initialWebsiteType?: string;
  initialBusinessType?: string;
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
  onNavigatePage?: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialPackage,
  initialWebsiteType,
  initialBusinessType,
  onOpenLegal,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(VITEWEB_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="py-8 sm:py-14 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Direct Contact Fast Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp Direct Line */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/50">
                <MessageCircle className="w-5 h-5" />
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
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Chat
            </a>
          </div>

          {/* Official Email */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/50">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">Official Email</p>
                <p className="text-xs font-bold font-mono text-slate-900 dark:text-white truncate">
                  {VITEWEB_EMAIL}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Fast Response SLA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/50 dark:border-amber-800/50">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fast Turnaround</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Replies under 15 mins
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Mon – Sat (9:00 AM – 10:00 PM)
              </p>
            </div>
          </div>
        </div>

        {/* Live Project Brief Form with Smart Progress */}
        <ProjectEnquiry
          initialPackage={initialPackage}
          initialWebsiteType={initialWebsiteType}
          initialBusinessType={initialBusinessType}
          onOpenLegal={onOpenLegal}
        />
      </div>
    </div>
  );
};
