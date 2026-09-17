import React, { useState } from 'react';
import { WebviaLogo, SiteviaLogo } from './SiteviaLogo';
import { 
  MessageCircle, 
  ArrowRight, 
  Check, 
  X as XIcon, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  Zap, 
  PhoneCall, 
  Store, 
  Stethoscope, 
  Dumbbell, 
  Utensils, 
  Languages, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Smartphone,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createQuickWhatsAppUrl } from '../utils/whatsapp';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

export const AboutWebvia: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const struggles = [
    {
      id: 'no-website',
      icon: Globe,
      problem: lang === 'en' ? 'No Website' : 'कोई वेबसाइट नहीं',
      problemDesc: lang === 'en' ? 'Customers search online on Google and find competitors instead.' : 'ग्राहक गूगल पर सर्च करते हैं और उन्हें आपका कॉम्पीटिटर मिलता है।',
      solution: lang === 'en' ? 'Modern 7-Day Live Website' : 'आधुनिक 7-दिन में लाइव वेबसाइट',
      solutionDesc: lang === 'en' ? 'Rank on Google Maps and search with your own branded .com/.in domain.' : 'अपने खुद के ब्रांडेड डोमेन के साथ गूगल सर्च और मैप्स पर छा जाएं।',
    },
    {
      id: 'no-bookings',
      icon: Calendar,
      problem: lang === 'en' ? 'No Online Bookings' : 'ऑनलाइन बुकिंग सिस्टम नहीं',
      problemDesc: lang === 'en' ? 'Phone calls missed during peak business hours and late nights.' : 'व्यस्त समय और देर रात के समय ग्राहकों के कॉल्स मिस हो जाते हैं।',
      solution: lang === 'en' ? '24/7 Automated Appointment Forms' : '24/7 ऑटोमेटेड अपॉइंटमेंट सिस्टम',
      solutionDesc: lang === 'en' ? 'Customers book slots anytime directly synced to your WhatsApp & calendar.' : 'ग्राहक कभी भी स्लॉट बुक कर सकते हैं जो सीधे आपके व्हाट्सऐप पर आता है।',
    },
    {
      id: 'contact-friction',
      icon: PhoneCall,
      problem: lang === 'en' ? 'No Proper Way to Contact' : 'संपर्क करने का सही माध्यम नहीं',
      problemDesc: lang === 'en' ? 'Complicated forms or outdated contact cards that turn buyers away.' : 'जटिल फॉर्म या पुराना तरीका जिससे ग्राहक बिना ऑर्डर दिए चले जाते हैं।',
      solution: lang === 'en' ? '1-Tap Direct WhatsApp & Call Routing' : '1-टैप डायरेक्ट व्हाट्सऐप व कॉल राउटिंग',
      solutionDesc: lang === 'en' ? 'Instant click-to-chat buttons connecting real buyers to your mobile.' : 'तुरंत चैट बटन जो असली ग्राहकों को सीधे आपके फोन से जोड़ते हैं।',
    },
    {
      id: 'social-dependence',
      icon: Smartphone,
      problem: lang === 'en' ? 'Dependence Only on Instagram/WhatsApp' : 'सिर्फ इंस्टाग्राम या व्हाट्सऐप पर निर्भरता',
      problemDesc: lang === 'en' ? 'No digital ownership, algorithm changes drop your customer reach.' : 'कोई डिजिटल ओनरशिप नहीं, एल्गोरिदम बदलने पर रीच गिर जाती है।',
      solution: lang === 'en' ? '100% Owned Digital Asset' : '100% आपकी अपनी डिजिटल प्रॉपर्टी',
      solutionDesc: lang === 'en' ? 'A permanent online storefront you control with full pricing & menu catalogs.' : 'एक स्थायी ऑनलाइन शोरूम जिसपर आपका पूरा नियंत्रण होता है।',
    },
  ];

  const niches = [
    { icon: Utensils, label: lang === 'en' ? 'Restaurants & Cafes' : 'रेस्टोरेंट और कैफे' },
    { icon: Store, label: lang === 'en' ? 'Salons & Parlours' : 'सैलून और पार्लर' },
    { icon: Stethoscope, label: lang === 'en' ? 'Doctors & Clinics' : 'डॉक्टर और क्लिनिक' },
    { icon: Dumbbell, label: lang === 'en' ? 'Gyms & Trainers' : 'जिम और फिटनेस कोच' },
    { icon: Briefcase, label: lang === 'en' ? 'Shops & Local Stores' : 'दुकानें और लोकल स्टोर्स' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <section id="about" className="scroll-mt-16 overflow-hidden">
      {/* Top Royal Blue Header Banner */}
      <div className="py-16 sm:py-20 bg-gradient-to-b from-blue-700 via-blue-800 to-[#0A1638] text-white text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Bilingual Language Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5 ml-2 text-cyan-300" />
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'en' ? 'bg-white text-blue-900 shadow-md font-bold' : 'text-blue-100 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'hi' ? 'bg-white text-blue-900 shadow-md font-bold' : 'text-blue-100 hover:text-white'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>

          <motion.h2 
            key={`title-${lang}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            {lang === 'en' ? 'Why We Exist' : 'हम क्यों मौजूद हैं — साइटविया की कहानी'}
          </motion.h2>
          
          <motion.p 
            key={`desc-${lang}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed"
          >
            {lang === 'en' 
              ? 'We noticed that many great local businesses lose potential clients every day simply because they lack a proper website. We are here to change that.'
              : 'हमने देखा कि कई बेहतरीन लोकल बिजनेसेस सिर्फ एक अच्छी वेबसाइट न होने के कारण हर रोज नए ग्राहक खो देते हैं। हम इसे बदलने आए हैं।'}
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-16 sm:py-24 bg-white dark:bg-[#070C18] text-slate-900 dark:text-white transition-colors relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: The Core Mission & Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 mb-16 relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'OUR STORY & PURPOSE' : 'हमारा उद्देश्य और शुरुआत'}</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {lang === 'en' ? 'SITEVIA WORKS started with a simple idea:' : 'साइटविया वर्क्स (SITEVIA WORKS) की शुरुआत एक सरल विचार से हुई:'}
                </h3>
              </div>
              <WebviaLogo variant="horizontal" size="md" />
            </div>

            {/* Big Impact Callout */}
            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 border-l-4 border-blue-600 dark:border-cyan-400">
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                "{lang === 'en' 
                  ? 'Every small business deserves a strong, professional online presence.' 
                  : 'हर छोटे व्यवसाय का हक है कि उसका एक मजबूत और पेशेवर ऑनलाइन वजूद हो।'}"
              </p>
            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
              {lang === 'en' ? (
                <>
                  We noticed that many great local businesses like <strong className="text-blue-600 dark:text-cyan-400">salons, shops, clinics, gyms, and restaurants</strong> either don't have a website or don't use the internet properly to get customers. Because of this, they lose dozens of potential paying clients every single day.
                </>
              ) : (
                <>
                  हमने देखा कि बहुत सारे बेहतरीन लोकल बिजनेसेस जैसे <strong className="text-blue-600 dark:text-cyan-400">सैलून, दुकानें, क्लिनिक, जिम और रेस्टोरेंट</strong> या तो वेबसाइट नहीं रखते या इंटरनेट का सही उपयोग ग्राहकों को आकर्षित करने के लिए नहीं कर पाते। इस वजह से वे हर रोज कई संभावित ग्राहक खो देते हैं।
                </>
              )}
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-normal">
              {lang === 'en' ? (
                <>
                  That’s why <strong className="text-slate-900 dark:text-white">SITEVIA WORKS</strong> was created — to make professional websites and online systems <span className="underline decoration-blue-500 decoration-2 underline-offset-4 font-semibold">simple, affordable, and actually useful</span> for every small business.
                </>
              ) : (
                <>
                  इसीलिए <strong className="text-slate-900 dark:text-white">साइटविया वर्क्स (SITEVIA WORKS)</strong> का जन्म हुआ — ताकि पेशेवर वेबसाइट्स और ऑनलाइन सिस्टम्स को हर छोटे व्यवसाय के लिए <span className="underline decoration-blue-500 decoration-2 underline-offset-4 font-semibold">सरल, किफायती और बेहद उपयोगी</span> बनाया जा सके।
                </>
              )}
            </p>

            {/* Business Categories Tag Cloud */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                {lang === 'en' ? 'Tailored systems built for:' : 'विशेष रूप से इनके लिए तैयार:'}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {niches.map((n, idx) => {
                  const Icon = n.icon;
                  return (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700/60"
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                      <span>{n.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Section 2: Struggles vs SITEVIA WORKS Solutions (Interactive Comparison Grid) */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'SOLVING THE REAL PAIN POINTS' : 'समस्या और उसका पक्का समाधान'}</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'The Struggles We Solve Every Day' : 'वे 4 बड़ी परेशानियां जिन्हें हम दूर करते हैं'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              {lang === 'en'
                ? 'We saw business owners losing sales due to 4 critical bottlenecks. Here is how SITEVIA WORKS transforms them into revenue.'
                : 'हमने देखा कि 4 मुख्य कारणों से बिजनेस का नुकसान हो रहा था। देखिए साइटविया वर्क्स (SITEVIA WORKS) इसे कैसे मुनाफे में बदलता है।'}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {struggles.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.id} variants={itemVariants} className="h-full">
                  <TiltCard
                    maxTilt={5}
                    className="h-full p-6 sm:p-7 rounded-3xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                  >
                    <div>
                      {/* Problem Header (Red X) */}
                      <div className="flex items-start gap-3.5 mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                        <div className="p-1.5 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
                          <XIcon className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400">
                            {item.problem}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.problemDesc}
                          </p>
                        </div>
                      </div>

                      {/* Solution Block (Green Check) */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                        <div className="p-1.5 rounded-xl bg-emerald-500 text-white shrink-0 mt-0.5">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                              {lang === 'en' ? 'SITEVIA WORKS SOLUTION' : 'साइटविया वर्क्स समाधान'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                            {item.solution}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {item.solutionDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        <span>{lang === 'en' ? 'Fast 7-Day Setup' : '7 दिन में पूरा सेटअप'}</span>
                      </span>
                      <span className="font-mono text-blue-600 dark:text-cyan-400 font-semibold">
                        {lang === 'en' ? 'ROI Positive' : 'सीधे ग्राहक बढ़ें'}
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Section 3: 3 Growth Pillars (More Calls, More Bookings, More Customers) */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {lang === 'en' ? 'THE TRIPLE OUTCOME' : 'हमारा अंतिम लक्ष्य'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {lang === 'en' ? 'More Calls. More Bookings. More Customers.' : 'अधिक कॉल्स • अधिक बुकिंग्स • अधिक असली ग्राहक'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-center flex flex-col items-center shadow-sm"
            >
              <div className="p-3.5 rounded-2xl bg-blue-600 text-white mb-4 shadow-md shadow-blue-600/30">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {lang === 'en' ? '1. More Direct Calls' : '1. ज्यादा डायरेक्ट कॉल्स'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Mobile sticky call buttons convert local searchers into urgent live callers immediately.'
                  : 'मोबाइल स्क्रीन पर लगा डायरेक्ट कॉल बटन ग्राहकों को तुरंत आपसे सीधे बात करने की सुविधा देता है।'}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/60 text-center flex flex-col items-center shadow-sm"
            >
              <div className="p-3.5 rounded-2xl bg-cyan-600 text-white mb-4 shadow-md shadow-cyan-600/30">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {lang === 'en' ? '2. More Bookings' : '2. ज्यादा ऑनलाइन बुकिंग्स'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Smooth consultation & service booking forms that capture clients even when you are asleep.'
                  : 'जब आपकी दुकान बंद हो या आप सो रहे हों, तब भी ग्राहक आपकी सेवाएं और स्लॉट ऑनलाइन बुक कर सकते हैं।'}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-center flex flex-col items-center shadow-sm"
            >
              <div className="p-3.5 rounded-2xl bg-emerald-600 text-white mb-4 shadow-md shadow-emerald-600/30">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {lang === 'en' ? '3. More Customers' : '3. ज्यादा लॉयल कस्टमर्स'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Build unquestioned trust and brand credibility over competitors with a fast, modern website.'
                  : 'एक आधुनिक और तेज वेबसाइट आपके बिजनेस को प्रतिस्पर्धियों से कई गुना आगे और भरोसेमंद बनाती है।'}
              </p>
            </motion.div>
          </div>

          {/* Bottom Action CTA Banner with Specular Shimmer & Magnetic Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 animate-specular-shimmer">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'LAUNCH YOUR SITE IN 7 DAYS' : 'सिर्फ 7 दिन में अपनी वेबसाइट शुरू करें'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
              {lang === 'en' ? 'Ready to Give Your Business the Online Home It Deserves?' : 'क्या आप अपने बिजनेस को वह पहचान देने के लिए तैयार हैं जिसका वह हकदार है?'}
            </h3>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mb-7 leading-relaxed font-normal">
              {lang === 'en'
                ? 'Stop losing customers to competitors. Talk to our website specialists today on WhatsApp.'
                : 'ग्राहकों को खोना बंद करें। आज ही व्हाट्सऐप पर हमारी टीम से सीधे बात करें और सही पैकेज चुनें।'}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <MagneticButton
                href={createQuickWhatsAppUrl('Hi SITEVIA WORKS! I read your story and I want to build a website for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="emerald"
                shimmer={true}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold shadow-lg shadow-emerald-950/50 min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>{lang === 'en' ? 'Chat on WhatsApp (+91 95110 07593)' : 'व्हाट्सऐप पर बात करें (+91 95110 07593)'}</span>
              </MagneticButton>

              <MagneticButton
                onClick={scrollToPricing}
                variant="secondary"
                shimmer={false}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border-white/25 text-white font-bold text-sm min-h-[48px]"
              >
                <span>{lang === 'en' ? 'View Pricing Plans' : 'प्राइसिंग प्लान्स देखें'}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Backwards compatibility alias
export const AboutSitevia = AboutWebvia;


