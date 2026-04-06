// components/TableKelas.jsx
import React from "react";
import Pagination from "../../../../../../components/Pagination";
import ActionButton from "../../../../../../components/common/ActionButton";
import SearchInput from "../../../../../../components/common/SearchInput";
import { FaEye } from "react-icons/fa6";
import { Icon } from "@iconify/react";

export default function TableKelas({
  searchTerm,
  setSearchTerm,
  showFilter,
  setShowFilter,
  paginatedClasses,
  page,
  perPage,
  sortedClasses,
  startIndex,
  endIndex,
  totalPages,
  total = 0,
  setPage,
  navigate,
  FilterKelasSiswa
}) {
  return (
    <>
      {/* SEARCH + FILTER */}
      <div className="flex items-center mb-4 flex-wrap gap-3">
        <SearchInput
          placeholder="Telusuri sesuatu..."
          value={searchTerm}
          onSearch={setSearchTerm}
          onClear={() => setSearchTerm("")}
        />

        <button
          onClick={() => setShowFilter(true)}
          className="px-3 py-2 border border-[#AA494E] text-[#AA494E] rounded-lg hover:bg-red-50 flex items-center gap-2"
        >
          <Icon icon="mi:filter" className="text-lg" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#B13434] text-white text-left">
              <th className="p-3 w-16">No</th>

              <th className="p-3">Nama Kelas</th>
              <th className="p-3">Tanggal Bergabung</th>

            </tr>
          </thead>

          <tbody>
            {paginatedClasses.length > 0 ? (
              paginatedClasses.map((c, i) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{(page - 1) * perPage + i + 1}</td>
                  <td className="p-3">{c.nama_kelas}</td>
                  <td className="p-3">{c.tanggal_bergabung}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  Tidak ada kelas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Menampilkan {startIndex}-{endIndex} dari {total} data
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {FilterKelasSiswa}
    </>
  );
}
