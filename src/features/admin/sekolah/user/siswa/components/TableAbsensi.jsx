// components/TableAbsensi.jsx
import React from "react";
import Pagination from "../../../../../../components/Pagination";
import { absenceOptions, STATUS_MAP, STATUS_COLOR_MAP } from "../../../../../../helper/statusOption";


export default function TableAbsensi({
  sortedAbs,
  absPage,
  absPerPage,
  setAbsPage,
  filters,
  setFilters,
  total = 0,
  totalPages = 1
}) {
  return (
    <>
      {/* FILTER STATUS */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          id="attendance-status-filter"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filters.status || ""}
          onChange={(e) => {
            const value = e.target.value;
            setAbsPage(1);
            setFilters((prev) => ({ ...prev, status: value }));
          }}
        >
          {absenceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#B13434] text-white text-left">
              <th className="p-3 w-16">No</th>
              <th className="p-3">Hari, Tanggal</th>
              <th className="p-3 text-center">Status Kehadiran</th>
            </tr>
          </thead>

          <tbody>
            {sortedAbs.length > 0 ? (
              sortedAbs.map((a, i) => {
                const statusLabel = STATUS_MAP[a.status] || a.status;               
                const badgeColor = STATUS_COLOR_MAP[a.status] || "bg-gray-100 text-gray-700";

                return (
                  <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{(absPage - 1) * absPerPage + i + 1}</td>

                    {/* Hari + Tanggal */}
                    <td className="p-3">{a.tanggal}</td>

                    {/* Status Kehadiran */}
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  Tidak ada data absensi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Menampilkan {(absPage - 1) * absPerPage + 1}-
          {Math.min(absPage * absPerPage, total)} dari {total} data
        </div>

        <div className="flex items-center gap-2">
          <Pagination
            currentPage={absPage}
            totalPages={totalPages}
            onPageChange={(p) => setAbsPage(p)}
          />
        </div>
      </div>
    </>
  );
}