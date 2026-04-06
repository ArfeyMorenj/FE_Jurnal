import React, { useState, useEffect } from "react";

export default function FilterModal({
  open,
  onClose,
  filters,
  onApply,
  onReset,
}) {
  const [tempFilters, setTempFilters] = useState({
    status: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (open) {
      setTempFilters(filters);
    }
  }, [open, filters]);

  const handleApply = () => {
    onApply(tempFilters);
  };

  const handleReset = () => {
    // Reset local state
    const resetValues = {
      status: "",
      start: "",
      end: "",
    };
    setTempFilters(resetValues);
    onReset();
  };

  const handleClose = () => {
    setTempFilters(filters);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[450px] shadow-lg animate-fadeIn">

        {/* Title */}
        <h2 className="text-lg font-bold mb-3">Filter Data</h2>
        <hr className="border-gray-300 mb-4" />

        {/* STATUS */}
        <label className="text-sm font-semibold">Status</label>
        <select
          value={tempFilters.status}
          onChange={(e) =>
            setTempFilters((f) => ({ ...f, status: e.target.value }))
          }
          className="w-full mt-1 mb-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
        >
          <option value="">Semua</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
        </select>

        {/* DATE ROW */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold">
              Tanggal Mulai Bergabung
            </label>
            <input
              type="date"
              value={tempFilters.start}
              onChange={(e) =>
                setTempFilters((f) => ({ ...f, start: e.target.value }))
              }
              className="w-full mt-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Tanggal Terakhir Bergabung
            </label>
            <input
              type="date"
              value={tempFilters.end}
              onChange={(e) =>
                setTempFilters((f) => ({ ...f, end: e.target.value }))
              }
              className="w-full mt-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>

            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#AA494E] text-white rounded-lg hover:bg-[#8B3A3E] transition-colors"
            >
              Terapkan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}