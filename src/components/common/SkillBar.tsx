import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { useSpring as useReactSpring, animated } from '@react-spring/web';
import { itemVariants } from '../../constants/variants';

interface SkillBarProps {
  skill: string;
  percentage: number;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(ref, { once: false, amount: 0.5 });
  
  const { width, number } = useReactSpring({
    from: { width: '0%', number: 0 },
    to: { width: inView ? `${percentage}%` : '0%', number: inView ? percentage : 0 },
    delay: 300,
    config: { mass: 1, tension: 60, friction: 14 },
  });

  return (
    <motion.div variants={itemVariants} ref={ref} className="mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-slate-900 font-serif text-xl">{skill}</span>
        <animated.span className="text-amber-600 font-sans font-semibold text-sm">
          {number.to(n => `${n.toFixed(0)}%`)}
        </animated.span>
      </div>
      <div className="h-[2px] w-full bg-slate-200 overflow-hidden relative">
        <animated.div style={{ width }} className="absolute top-0 left-0 h-full bg-amber-500" />
      </div>
    </motion.div>
  );
};
