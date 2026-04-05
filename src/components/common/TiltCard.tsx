import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring as useFramerSpring } from 'framer-motion';
import { useMove } from '@use-gesture/react';
import { itemVariants } from '../../constants/variants';

interface TiltCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ icon, title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useFramerSpring(x, { damping: 20, stiffness: 150 });
  const rotateY = useFramerSpring(y, { damping: 20, stiffness: 150 });

  const bind = useMove(({ xy: [px, py] }) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rx = -(py - rect.top - rect.height / 2) / 10;
    const ry = (px - rect.left - rect.width / 2) / 10;
    x.set(rx);
    y.set(ry);
  });

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        {...bind()}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY }}
        data-cursor="Read"
        className="relative h-full bg-white rounded-sm p-8 border border-slate-200/60 transition-colors"
        whileHover={{ 
          borderColor: "rgba(217, 119, 6, 0.5)",
          boxShadow: "0 20px 40px rgba(217,119,6,0.04)"
        }}
      >
        <motion.div 
          className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-8 text-slate-400"
          whileHover={{ scale: 1.1, backgroundColor: "#fffbeb", color: "#d97706" }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-serif text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 font-sans leading-relaxed text-sm">{description}</p>
      </motion.div>
    </motion.div>
  );
};
