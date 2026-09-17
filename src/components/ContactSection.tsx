import React, { useState } from 'react';
import { MessageCircle, Mail, Send, Phone, Clock, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { VITEWEB_EMAIL } from '../constants';
import { createWhatsAppUrl, createQuickWhatsAppUrl } from '../utils/whatsapp';
interface ContactSectionProps {
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenLegal }) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteType, setWebsiteType] = useState('Starter Business Website (₹1,999)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppUrl({
      name: name || 'Business Owner',
      businessName: businessName || 'Small Business',
      businessType: websiteType,
      websiteType: websiteType,
      package: 'Inquiry',
      phone: phone,
      requirements: message || 'I would like to discuss building a website for my business.',
    });
    setSubmitted(true);
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="scroll-mt-16">
      {/* Top Royal Blue Header Banner */}
      <div className="py-16 sm:py-20 bg-gradient-to-b from-blue-700 via-blue-800 to-[#0A1638] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Have a question or ready to start your website? Reach out to us directly through WhatsApp or email.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-16 sm:py-20 bg-white dark:bg-[#070C18] text-slate-900 dark:text-white transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Info & Fast Links */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                      FASTEST RESPONSE
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">WhatsApp Chat</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Chat with us in real-time. Share your ideas, ask questions, or get instant advice.
                </p>
                <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-4">
                  +91 95110 07593
                </p>
                <a
                  href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I have a question regarding a new website.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-blue-600 dark:text-cyan-400 block">
                      OFFICIAL INQUIRIES
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Us</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Send us your detailed brief or RFPs. We reply within 24 hours.
                </p>
                <p className="text-sm font-bold font-mono text-blue-600 dark:text-cyan-400 mb-4 truncate">
                  {VITEWEB_EMAIL}
                </p>
                <a
                  href={`mailto:${VITEWEB_EMAIL}?subject=Website%20Inquiry%20for%20SITEVIA%20WORKS`}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>
              </div>

              {/* Hours & Response Info */}
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span><strong>Working Hours:</strong> Mon - Sat, 9:00 AM - 9:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Average WhatsApp Response:</strong> Under 15 Minutes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Form */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-9 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Fill in your project details and we will connect with you on WhatsApp instantly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Sharma Dental Clinic"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Website Type
                      </label>
                      <select
                        value={websiteType}
                        onChange={(e) => setWebsiteType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Starter Business Website (₹1,999)">Starter Business Website (₹1,999)</option>
                        <option value="Salon & Clinic Booking Website (₹3,499)">Salon & Clinic Booking Website (₹3,499)</option>
                        <option value="Restaurant & Multi-Page Website (₹5,999)">Restaurant & Multi-Page Website (₹5,999)</option>
                        <option value="Custom Project">Custom Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Tell us about your requirements
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share what pages you need, any reference links, or questions you have..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>We respect your privacy. View our</span>
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

                  {submitted && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Opening WhatsApp with your filled inquiry message...</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
