import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Clock, Smartphone, MessageCircle } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  color: string;
}

const StatCounter: React.FC<StatItemProps> = ({
  icon: Icon,
  targetValue,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  sublabel,
  color,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(easeOutProgress * targetValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-lg transition-all"
    >
      <div className={`p-3 rounded-xl ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
        <span>{prefix}</span>
        <span>{decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue)}</span>
        <span>{suffix}</span>
      </div>

      <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-0.5">
        {label}
      </div>

      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
        {sublabel}
      </div>
    </motion.div>
  );
};

export const AnimatedStats: React.FC = () => {
  const stats: StatItemProps[] = [
    {
      icon: Clock,
      targetValue: 7,
      suffix: ' Days',
      label: 'Guaranteed Launch',
      sublabel: 'From kickoff to live deployment',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Zap,
      targetValue: 1.2,
      prefix: '<',
      suffix: 's',
      decimals: 1,
      label: 'Page Load Speed',
      sublabel: 'Optimized for high Google ranking',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      icon: Smartphone,
      targetValue: 99.9,
      suffix: '%',
      decimals: 1,
      label: 'Mobile Responsive',
      sublabel: 'Flawless across all screen sizes',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: MessageCircle,
      targetValue: 100,
      suffix: '%',
      label: 'WhatsApp Lead Routing',
      sublabel: 'Direct client inquiries to your phone',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-slate-50/70 dark:bg-[#070A10] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <StatCounter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
