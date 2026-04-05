import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({ text, className }) => {
  const words = text.split(" ");
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  return (
    <motion.div style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }} variants={container} className={className}>
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
