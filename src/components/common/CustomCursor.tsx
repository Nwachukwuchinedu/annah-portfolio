import { useState, useEffect } from 'react';
import { motion, useSpring as useFramerSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const cursorX = useFramerSpring(mouseX, springConfig);
  const cursorY = useFramerSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute('data-cursor') || '');
      } else {
        setHovering(false);
        setLabel('');
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-amber-600 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div 
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9998] hidden md:flex backdrop-blur-[2px]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 80 : 32,
          height: hovering ? 80 : 32,
          backgroundColor: hovering ? 'rgba(217, 119, 6, 0.9)' : 'rgba(217, 119, 6, 0.1)',
          border: hovering ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(217, 119, 6, 0.3)',
        }}
      >
        <AnimatePresence mode="wait">
          {hovering && (
            <motion.span 
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white text-[10px] font-bold tracking-widest uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
