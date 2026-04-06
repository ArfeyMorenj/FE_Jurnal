import React from "react";
import { Icon } from "@iconify/react";

export default function FilterKelasPengajar({
  filterValues,
  setFilterValues,
  onApply,
  onReset,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 animate-[pop_0.25s_ease]"
      >
        {/* HEADER */}
        <h2 className="text-xl font-bold mb-4">Filter Data</h2>

        <div className="w-full border-b border-gray-300 mb-6"></div>

        {/* GRID 2 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tanggal Mulai Dibuat */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Mulai Dibuat
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              value={filterValues.start_date}
              onChange={(e) =>
                setFilterValues((prev) => ({ ...prev, start_date: e.target.value }))
              }
            />
          </div>

          {/* Tanggal Terakhir Dibuat */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Terakhir Dibuat
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              value={filterValues.end_date}
              onChange={(e) =>
                setFilterValues((prev) => ({ ...prev, end_date: e.target.value }))
              }
            />
          </div>
        </div>

        {/* GARIS PEMBATAS */}
        <div className="w-full border-b border-gray-300 mt-8 mb-6"></div>

        {/* BUTTONS */}
        <div className="flex justify-between items-center">
          <button
            onClick={onReset}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              onClick={onApply}
              className="px-6 py-2 bg-[#C24A4A] text-white rounded-lg hover:bg-[#A83F3F]"
            >
              Terapkan
            </button>
          </div>
        </div>

        {/* ANIMATION */}
        <style>{`
          @keyframes pop {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}