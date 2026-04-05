import { useRef } from 'react';
import { useInView as useFramerInView } from 'framer-motion';
import { useSpring as useReactSpring, animated } from '@react-spring/web';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  suffix = "", 
  prefix = "", 
  label, 
  decimals = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(ref, { once: false, amount: 0.5 });
  
  const { number } = useReactSpring({
    from: { number: 0 },
    to: { number: inView ? end : 0 },
    delay: 200,
    config: { mass: 1, tension: 80, friction: 20 },
  });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 border-r border-slate-200/50 last:border-0 relative overflow-hidden h-full">
      <div className="text-5xl md:text-7xl font-serif text-slate-900 mb-3 flex items-center">
        {prefix && <span className="text-slate-400 mr-1">{prefix}</span>}
        <animated.span>{number.to(n => n.toFixed(decimals))}</animated.span>
        <span className="text-amber-600 ml-1">{suffix}</span>
      </div>
      <p className="text-slate-500 font-sans text-xs md:text-sm tracking-widest uppercase font-semibold text-center">{label}</p>
    </div>
  );
};
