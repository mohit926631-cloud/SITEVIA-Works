import React from 'react';
import { DollarSign, Zap, Palette, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export const WhyWebvia: React.FC = () => {
  const reasons = [
    {
      id: 'affordable-pricing',
      icon: DollarSign,
      title: 'Affordable Pricing',
      description:
        "Quality doesn't have to break the bank. We offer transparent, competitive pricing designed specifically for small business budgets.",
    },
    {
      id: 'fast-delivery',
      icon: Zap,
      title: 'Fast Website Delivery',
      description:
        'Get your professional website live in 7-14 days. We deliver fast without compromising on design, quality, or responsiveness.',
    },
    {
      id: 'custom-design',
      icon: Palette,
      title: 'Custom Design',
      description:
        'Your website will match your brand perfectly. Custom colors, layouts, and high-converting features tailored to your business.',
    },
    {
      id: 'support-24-7',
      icon: Headphones,
      title: '24/7 Support',
      description:
        "We're here when you need us. Get help and support anytime directly through WhatsApp, phone, or email.",
    },
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
    <section
      id="why-sitevia"
      className="py-20 sm:py-24 bg-[#0A1128] dark:bg-[#060B18] text-white text-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Why Small Businesses Choose SITEVIA WORKS
          </h2>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-2xl mx-auto mb-14">
            We specialize in creating affordable, professional websites that help small businesses grow online and attract more customers.
          </p>
        </motion.div>

        {/* 4 3D Parallax Tilt Cards with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
        >
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <TiltCard
                  maxTilt={6}
                  id={`why-card-${item.id}`}
                  className="h-full p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all backdrop-blur-sm flex flex-col items-start shadow-md"
                >
                  <div className="p-3 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-blue-400 mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-blue-100/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export const WhySitevia = WhyWebvia;

