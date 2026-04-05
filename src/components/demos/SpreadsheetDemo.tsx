import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TableProperties, ArrowDownUp } from 'lucide-react';
import { itemVariants } from '../../constants/variants';

export const SpreadsheetDemo = () => {
  const [data] = useState([
    { id: 'WL-001', rate: 4200, pressure: 3150, wcut: 12.4, status: 'Active' },
    { id: 'WL-002', rate: 3850, pressure: 2980, wcut: 18.1, status: 'Active' },
    { id: 'WL-003', rate: 1200, pressure: 1450, wcut: 65.2, status: 'Review' },
    { id: 'WL-004', rate: 5100, pressure: 3400, wcut: 8.5, status: 'Active' },
    { id: 'WL-005', rate: 800, pressure: 1100, wcut: 82.0, status: 'Shut-in' },
  ]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data[0] | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key!];
        const bVal = b[sortConfig.key!];
        if (aVal < bVal) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: keyof typeof data[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: string) => {
    if (sortConfig.key !== name) return <ArrowDownUp className="w-3 h-3 opacity-30 inline ml-1" />;
    return <ArrowDownUp className={`w-3 h-3 inline ml-1 text-amber-600 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} />;
  };

  return (
    <motion.div variants={itemVariants} className="bg-white border border-slate-200/60 rounded-sm shadow-sm overflow-hidden flex flex-col h-full" data-cursor="Interact">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
        <TableProperties className="w-4 h-4 text-emerald-600" />
        <span className="font-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">Live Production Data</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm font-sans">
          <thead>
            <tr className="bg-white border-b border-slate-200">
              <th onClick={() => requestSort('id')} className="p-3 cursor-pointer hover:bg-slate-50 font-semibold text-slate-700 whitespace-nowrap">Well ID {getSortIcon('id')}</th>
              <th onClick={() => requestSort('rate')} className="p-3 cursor-pointer hover:bg-slate-50 font-semibold text-slate-700 whitespace-nowrap">Rate (BBL/d) {getSortIcon('rate')}</th>
              <th onClick={() => requestSort('pressure')} className="p-3 cursor-pointer hover:bg-slate-50 font-semibold text-slate-700 whitespace-nowrap">Pressure (psi) {getSortIcon('pressure')}</th>
              <th onClick={() => requestSort('wcut')} className="p-3 cursor-pointer hover:bg-slate-50 font-semibold text-slate-700 whitespace-nowrap">Water Cut (%) {getSortIcon('wcut')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-amber-50/50 transition-colors group">
                <td className="p-3 font-medium text-slate-900 border-r border-slate-50">{row.id}</td>
                <td className="p-3 text-slate-600 border-r border-slate-50 font-mono text-xs">{row.rate.toLocaleString()}</td>
                <td className="p-3 text-slate-600 border-r border-slate-50 font-mono text-xs">{row.pressure.toLocaleString()}</td>
                <td className="p-3 text-slate-600 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded-sm ${row.wcut > 50 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {row.wcut}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
