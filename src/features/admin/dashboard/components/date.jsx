import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react'; 

/**
 * Helper function untuk format tanggal
 */
const formatDate = (dateString, options = {}) => {
  const { empty = '-', day } = options;
  
  if (!dateString) return empty;
  
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return empty;
  
  const formatOptions = {
    day: day || 'numeric',
    month: 'short',
    year: 'numeric',
  };
  
  return date.toLocaleDateString('id-ID', formatOptions);
};

/**
 * Reusable date range filter component shared by Admin & School dashboards.
 * Props:
 * - value: { from, to } in ISO string (controlled)
 * - onApply: ({ from, to }) => void (used by School)
 * - onFilterChange: ({ date_from, date_to }) => void (used by Admin)
 * - defaultValue: { from, to } optional fallback when value empty
 */
export default function FilterPeriode({
  value,
  onApply,
  onFilterChange,
  defaultValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fromIso, setFromIso] = useState(value?.from || defaultValue?.from || '');
  const [toIso, setToIso] = useState(value?.to || defaultValue?.to || '');

  useEffect(() => {
    setFromIso(value?.from || defaultValue?.from || '');
    setToIso(value?.to || defaultValue?.to || '');
  }, [value?.from, value?.to, defaultValue?.from, defaultValue?.to]);

  const displayLabel = useMemo(
    () =>
      `${formatDate(fromIso, { empty: 'Semua tanggal', day: '2-digit' })} - ${formatDate(
        toIso,
        { empty: 'Semua tanggal', day: '2-digit' },
      )}`,
    [fromIso, toIso],
  );

  const handleApply = () => {
    const payload = { from: fromIso || '', to: toIso || '' };

    if (typeof onApply === 'function') {
      onApply(payload);
    }
    if (typeof onFilterChange === 'function') {
      onFilterChange({ date_from: payload.from, date_to: payload.to });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-lg px-4 py-3 flex items-center justify-between min-w-[334px]"
      >
        <div className="flex items-center gap-3">
          <div className=" rounded-lg p-2 bg-[#C6E3F6] ">
            <Calendar className="w-5 h-5 text-[#2D9CDB]  " />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Filter Periode</p>
            <p className="text-xs text-gray-600">
              {displayLabel}
            </p>
          </div>
        </div>
        <div className='w-[25px] h-[25px] bg-[#C6E3F6]/20 rounded-full flex items-center justify-center'>
        <ChevronDown 
          className={`w-5 h-5 text-[#2D9CDB]  transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
        </div>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50 min-w-[320px]">
          <p className="text-sm text-gray-600 mb-3">Pilih Periode:</p>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]"
                value={fromIso}
                onChange={(e) => setFromIso(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500 block mb-1">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]"
                value={toIso}
                onChange={(e) => setToIso(e.target.value)}
              />
            </div>

            <button
              onClick={handleApply}
              className="w-full bg-[#2D9CDB] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#2589C8] transition-colors"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}