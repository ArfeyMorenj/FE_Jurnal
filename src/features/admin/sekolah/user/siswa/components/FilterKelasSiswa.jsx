import React from "react";

export default function FilterKelasSiswa({ show, onClose, filters, setFilters, onReset, onApply }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[460px] rounded-xl shadow-lg p-7 pt-8 animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-start items-center mb-4">
          <h2 className="font-bold text-lg">Filter Data</h2>
        </div>

        <div className="w-full h-[1px] bg-gray-200 mb-5"></div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          {/* Tanggal Mulai */}
          <div>
            <label className="text-sm font-medium">Tanggal Mulai</label>
            <input
              type="date"
              value={filters.start}
              onChange={(e) => setFilters((f) => ({ ...f, start: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Tanggal Akhir */}
          <div>
            <label className="text-sm font-medium">Tanggal Akhir</label>
            <input
              type="date"
              value={filters.end}
              onChange={(e) => setFilters((f) => ({ ...f, end: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

        </div>

        {/* FOOTER BUTTONS */}
        <div className="mt-10 flex justify-between items-center">

          {/* Left: Reset */}
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
            Reset
          </button>

          {/* Right: Batal + Terapkan */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              onClick={onApply}
              className="px-4 py-2 rounded-lg bg-[#AA494E] text-white hover:bg-[#8a3a3f]"
            >
              Terapkan
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
