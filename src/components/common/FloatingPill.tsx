import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Mail } from 'lucide-react';

export const FloatingPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setIsOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white p-8 rounded-xl border border-slate-200 mb-4 w-[320px] origin-bottom-right"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            {submitted ? (
              <motion.div layout className="flex flex-col items-center justify-center py-8">
                <motion.svg className="w-16 h-16 text-amber-500 mb-4" viewBox="0 0 50 50">
                  <motion.path
                    fill="none" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    d="M 14.1 27.2 l 7.1 7.2 16.7-16.8"
                  />
                </motion.svg>
                <p className="font-serif text-xl text-slate-900">Message Sent</p>
              </motion.div>
            ) : (
              <motion.form layout onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h4 className="font-serif text-2xl text-slate-900 mb-2">Let's Connect</h4>
                <div className="relative">
                  <input required type="text" id="name" className="w-full border-b border-slate-300 bg-transparent py-2 text-slate-900 focus:outline-none focus:border-amber-500" placeholder="Name" />
                </div>
                <div className="relative mt-2">
                  <input required type="email" id="email" className="w-full border-b border-slate-300 bg-transparent py-2 text-slate-900 focus:outline-none focus:border-amber-500" placeholder="Email" />
                </div>
                <motion.button 
                  type="submit" 
                  className="mt-4 bg-slate-900 text-white py-3 rounded-full font-sans text-sm tracking-wide flex justify-center items-center gap-2"
                  whileHover={{ backgroundColor: "#d97706" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send <Send className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor={isOpen ? "Close" : "Chat"}
        className="bg-amber-500 text-white flex items-center justify-center gap-3 px-6 py-4 rounded-full overflow-hidden relative"
        style={{ boxShadow: "0 8px 20px rgba(217,119,6,0.3)" }}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
          {isOpen ? <X className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
        </motion.div>
        {!isOpen && <span className="font-sans font-medium">Get in touch</span>}
        
        {!isOpen && (
          <motion.div 
            className="absolute inset-0 rounded-full border border-amber-400 z-[-1]"
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
};
