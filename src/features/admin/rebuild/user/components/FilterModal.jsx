import React, { useState, useEffect } from "react";

export default function FilterModal({ open, onClose, filters, onApply, onReset }) {
  const [tempFilters, setTempFilters] = useState({
    role: "",
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
    const resetFilters = {
      role: "",
      status: "",
      start: "",
      end: "",
    };
    setTempFilters(resetFilters);
    onReset(resetFilters);
  };

  const handleClose = () => {
    setTempFilters(filters);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">
        <h2 className="text-lg font-bold mb-2">Filter Data</h2>
        <hr className="border-t border-gray-300 mb-4" />

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm font-semibold">Role</label>
            <select
              value={tempFilters.role}
              onChange={(e) => setTempFilters((f) => ({ ...f, role: e.target.value }))}
              className="w-full mt-1 mb-4 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            >
              <option value="">Semua</option>
              <option value="Pengajar">Pengajar</option>
              <option value="Siswa">Siswa</option>
              <option value="Sekolah">Sekolah</option>
            </select>

            <label className="text-sm font-semibold">Tanggal mulai bergabung</label>
            <input
              type="date"
              value={tempFilters.start}
              onChange={(e) => setTempFilters((f) => ({ ...f, start: e.target.value }))}
              className="w-full mt-1 mb-4 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            />
          </div>

          <div className="w-1/2">
            <label className="text-sm font-semibold">Status</label>
            <select
              value={tempFilters.status}
              onChange={(e) => setTempFilters((f) => ({ ...f, status: e.target.value }))}
              className="w-full mt-1 mb-4 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            >
              <option value="">Semua</option>
              <option value="Premium">Premium</option>
              <option value="Basic">Basic</option>
            </select>

            <label className="text-sm font-semibold">Tanggal terakhir bergabung</label>
            <input
              type="date"
              value={tempFilters.end}
              onChange={(e) => setTempFilters((f) => ({ ...f, end: e.target.value }))}
              className="w-full mt-1 mb-4 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA494E]"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button 
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors" 
            onClick={handleReset}
          >
            Reset
          </button>

          <div className="flex gap-3">
            <button 
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors" 
              onClick={handleClose}
            >
              Batal
            </button>

            <button
              className="px-4 py-2 bg-[#AA494E] text-white rounded-lg hover:bg-[#8F3B3F] transition-colors"
              onClick={handleApply}
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}