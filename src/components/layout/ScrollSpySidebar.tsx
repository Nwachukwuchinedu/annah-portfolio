import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollSpySidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'timeline', label: 'Trajectory' },
    { id: 'data-demos', label: 'Data Demos' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActive = 'hero';

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const offsetTop = el.offsetTop - window.innerHeight / 3;
          if (pageYOffset >= offsetTop) {
            newActive = sec.id;
          }
        }
      });
      setActiveSection(newActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col gap-3 items-end">
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <div 
            key={sec.id}
            onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-4 cursor-pointer group py-1"
            data-cursor="Scroll"
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-[10px] font-sans font-bold tracking-widest uppercase text-amber-600 bg-[#FAF9F6] px-1"
                >
                  {sec.label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              layout
              initial={false}
              animate={{
                height: isActive ? 32 : 8,
                backgroundColor: isActive ? '#d97706' : '#cbd5e1'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-2 rounded-full group-hover:bg-amber-400 shadow-sm"
            />
          </div>
        );
      })}
    </div>
  );
};
