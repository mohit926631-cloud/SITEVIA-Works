import React from 'react';
import { Smartphone, Palette, MessageCircle, Search, Zap, MessageSquare, Sliders, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export const WhySitevia: React.FC = () => {
  const reasons = [
    {
      id: 'responsive-websites',
      icon: Smartphone,
      title: 'Responsive Websites',
      description:
        'Crafted mobile-first so your website looks sharp, loads fast, and navigates smoothly on every smartphone, tablet, and laptop.',
    },
    {
      id: 'custom-design',
      icon: Palette,
      title: 'Custom Brand Design',
      description:
        'Clean layouts, typography, and color schemes tailored specifically to your business identity without generic template clutter.',
    },
    {
      id: 'whatsapp-integration',
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description:
        'One-tap inquiry and booking buttons allow visitors to start an instant conversation straight to your business WhatsApp.',
    },
    {
      id: 'seo-basics',
      icon: Search,
      title: 'SEO Basics & Google Maps',
      description:
        'Proper metadata, semantic HTML, and Google Maps pin integration ensure local clients can discover and navigate to your business.',
    },
    {
      id: 'fast-delivery',
      icon: Zap,
      title: 'Fast Delivery (3–7 Days)',
      description:
        'Standard projects are designed, staged, and launched in 3 to 7 business days so your business can start receiving inquiries promptly.',
    },
    {
      id: 'easy-communication',
      icon: MessageSquare,
      title: 'Easy Direct Communication',
      description:
        'Communicate directly over WhatsApp and phone. Quick feedback loops, zero agency runaround, and transparent updates throughout.',
    },
    {
      id: 'customization',
      icon: Sliders,
      title: 'Niche Customization',
      description:
        'Features shaped for your industry: interactive digital menus, salon lookbooks, consultation forms, and product galleries.',
    },
    {
      id: 'support',
      icon: Headphones,
      title: 'Post-Launch Technical Support',
      description:
        'Dedicated technical warranty for 6 months to 1.5 years covers bug fixes, link checks, and updates so your site always works flawlessly.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="why-sitevia"
      className="py-16 sm:py-24 bg-slate-900 dark:bg-[#070C16] text-white text-center relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2 font-mono">
            GENUINE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Why Businesses Choose SITEVIA WORKS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            We focus on practical, high-impact web design: clean code, fast mobile loading, direct WhatsApp conversion, and dependable technical support.
          </p>
        </motion.div>

        {/* 8 Clean Advantage Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left"
        >
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <div
                  id={`why-card-${item.id}`}
                  className="h-full p-5 sm:p-6 rounded-xl bg-slate-800/60 dark:bg-slate-900/60 border border-slate-700/60 dark:border-slate-800 hover:border-slate-500 transition-colors flex flex-col items-start"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 mb-3.5 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export const WhyWebvia = WhySitevia;



