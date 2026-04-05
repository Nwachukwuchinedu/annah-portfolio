import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring as useFramerSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  cursor?: string;
  primary?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className, 
  onClick, 
  cursor = "Click", 
  primary = true 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useFramerSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useFramerSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < 80 && Math.abs(distanceY) < 80) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const reset = () => { x.set(0); y.set(0); };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
      data-cursor={cursor}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: primary ? "#1e293b" : "transparent",
        color: primary ? "#ffffff" : "#d97706",
        borderColor: primary ? "transparent" : "#d97706"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
