import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { useSpring as useReactSpring, animated } from '@react-spring/web';
import { itemVariants } from '../../constants/variants';

interface KPIDashboardCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const KPIDashboardCard: React.FC<KPIDashboardCardProps> = ({ 
  title, 
  value, 
  suffix = "", 
  prefix = "", 
  decimals = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(ref, { once: true, amount: 0.5 });
  
  const { number } = useReactSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    delay: 100,
    config: { mass: 1, tension: 90, friction: 20 },
  });

  return (
    <motion.div variants={itemVariants} ref={ref} className="bg-white border border-slate-200/60 p-6 rounded-sm flex flex-col justify-between relative overflow-hidden group shadow-sm" data-cursor="Metrics">
      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500 ease-out" />
      <p className="text-slate-500 font-sans text-xs tracking-widest uppercase font-semibold mb-4">{title}</p>
      <div className="text-4xl font-serif text-slate-900 flex items-end">
        {prefix && <span className="text-2xl text-slate-400 mr-1 mb-1">{prefix}</span>}
        <animated.span>{number.to(n => (decimals === 0 ? Math.floor(n).toLocaleString() : n.toFixed(decimals)))}</animated.span>
        <span className="text-lg text-amber-600 ml-1 mb-1 font-sans">{suffix}</span>
      </div>
    </motion.div>
  );
};
