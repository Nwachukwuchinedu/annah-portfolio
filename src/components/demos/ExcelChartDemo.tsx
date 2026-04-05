import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { itemVariants } from '../../constants/variants';

export const ExcelChartDemo = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(chartRef, { once: true, amount: 0.5 });
  
  const chartData = [
    { label: 'Q1', val: 40 },
    { label: 'Q2', val: 55 },
    { label: 'Q3', val: 85 },
    { label: 'Q4', val: 65 },
  ];

  return (
    <motion.div variants={itemVariants} className="bg-white border border-slate-200/60 rounded-sm shadow-sm flex flex-col h-full" data-cursor="Analyze">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span className="font-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">Production Analysis — Excel & Python</span>
        </div>
      </div>
      <div ref={chartRef} className="p-6 grow flex flex-col justify-end relative h-64">
        {/* Y-Axis Gridlines */}
        <div className="absolute inset-x-6 inset-y-6 flex flex-col justify-between z-0 pointer-events-none">
          {[100, 75, 50, 25, 0].map(tick => (
            <div key={tick} className="w-full border-b border-slate-100 flex items-end">
              <span className="text-[10px] text-slate-400 font-mono -translate-y-2 bg-white pr-2 absolute left-0">{tick}k</span>
            </div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="flex justify-around items-end h-full z-10 pl-8 pt-4 pb-1 border-b-2 border-slate-300">
          {chartData.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group w-1/5">
              <div className="w-full relative flex justify-center items-end h-40">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: inView ? `${d.val}%` : 0 }}
                  transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: [0.25, 1, 0.5, 1] }}
                  className="w-full bg-[#1e293b] rounded-t-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] group-hover:bg-amber-600 transition-colors"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded-sm pointer-events-none whitespace-nowrap">
                    {d.val}k BBL
                  </div>
                </motion.div>
              </div>
              <span className="text-[10px] font-sans font-semibold text-slate-500 uppercase">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
