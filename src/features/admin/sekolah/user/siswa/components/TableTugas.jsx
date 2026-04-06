// components/TableTugas.jsx
import React from "react";
import ActionButton from "../../../../../../components/common/ActionButton";
import { FaEye } from "react-icons/fa6";
import SearchInput from "../../../../../../components/common/SearchInput";

export default function TableTugas({
  taskSearch,
  setTaskSearch,
  sortedTasks
}) {
  return (
    <>
      <div className="mb-4 w-[260px]">
        <SearchInput
          placeholder="Telusuri sesuatu..."
          value={taskSearch}
          onSearch={setTaskSearch}
          onClear={() => setTaskSearch("")}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#B13434] text-white text-left">
              <th className="p-3 w-16">No</th>

              <th className="p-3">Nama Tugas</th>

              <th className="p-3">Nama Kelas</th>
              <th className="p-3">Tanggal Penugasan</th>
            </tr>
          </thead>

          <tbody>
            {sortedTasks.length > 0 ? (
              sortedTasks.map((t, i) => (
                <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{t.tugas}</td>
                  <td className="p-3">{t.kelas}</td>
                  <td className="p-3">{t.tanggal_upload}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Tidak ada tugas ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
