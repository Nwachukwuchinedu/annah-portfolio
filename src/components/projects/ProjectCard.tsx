import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  summary: string;
  details: string;
  excelMockupData?: {
    headers: string[];
    rows: string[][];
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  category, 
  summary, 
  details, 
  excelMockupData 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      data-cursor={isOpen ? "Close" : "Expand"}
      className="bg-white border border-slate-200/50 p-8 cursor-pointer"
      whileHover={{ borderColor: "rgba(217, 119, 6, 0.4)" }}
    >
      <motion.div layout className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <motion.p layout className="text-amber-600 font-sans font-semibold text-xs tracking-widest uppercase mb-2">{category}</motion.p>
          <motion.h3 layout className="text-3xl font-serif text-slate-900">{title}</motion.h3>
        </div>
        <motion.div 
          layout
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ opacity: { duration: 0.2 }, height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } }}
          >
            <div className={`pt-8 mt-8 border-t border-slate-100 ${excelMockupData ? 'grid lg:grid-cols-2 gap-10' : ''}`}>
              <div>
                <p className="font-sans text-slate-900 text-lg mb-4 font-medium">{summary}</p>
                <p className="font-sans text-slate-600 leading-relaxed">{details}</p>
              </div>
              
              {excelMockupData && (
                <div className="bg-[#1e293b] p-1 rounded-sm shadow-sm border border-slate-200 font-mono text-[10px] sm:text-xs overflow-hidden flex flex-col h-full pointer-events-none">
                  {/* Fake Excel Window Chrome */}
                  <div className="bg-[#0f172a] text-slate-400 px-3 py-1.5 flex items-center gap-2 mb-1">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="ml-2 uppercase tracking-wider text-[9px] font-semibold text-slate-500">Output Validation.xlsx</span>
                  </div>
                  
                  {/* Fake Excel Grid */}
                  <div className="bg-white overflow-x-auto grow">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr>
                          <th className="bg-slate-100 border border-slate-300 w-8"></th>
                          {excelMockupData.headers.map((_, i) => (
                            <th key={i} className="bg-slate-100 border border-slate-300 px-2 py-1 font-semibold text-slate-600 text-center">{String.fromCharCode(65 + i)}</th>
                          ))}
                        </tr>
                        <tr>
                          <th className="bg-slate-100 border border-slate-300 text-center text-slate-400">1</th>
                          {excelMockupData.headers.map((_, i) => (
                            <td key={i} className="border border-slate-300 bg-slate-50 px-2 py-1 font-bold text-slate-700">{_}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {excelMockupData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="bg-slate-100 border border-slate-300 text-center text-slate-400">{rIdx + 2}</td>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="border border-slate-300 px-2 py-1 text-slate-600 text-right">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
