import React, { useState } from "react";
import SearchInput from "../../../../components/common/SearchInput";
import FilterButton from "../../../../components/common/FilterButton";
import ExportButtons from "../../../../components/common/ExportButtons";
import Pagination from "../../../../components/Pagination";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const StudentTable = ({ 
  students = [], 
  pagination = {},
  onPageChange,
  onFilterClick,
  search,
  handleSearch,
  loading = false,
  exportLoading,
  onExportExcel,
  onExportPDF
}) => {
  const {
    currentPage = 1,
    lastPage = 1,
    totalItems = 0,
    itemsPerPage = 10
  } = pagination;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-8 rounded-[10px] mt-6">
      <label className="block text-lg text-[#464646] font-semibold inter flex items-center gap-2">
        <Icon icon="mingcute:task-2-fill" width="20" className="text-primary-red" />
        <span>Tabel Nilai Siswa</span>
      </label>

      <hr className="border-t border-[#C1C7CD] my-6" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SearchInput
            placeholder="Telusuri sesuatu..."
            value={search}
            onSearch={handleSearch}
            onClear={() => handleSearch("")}
            size="md"
            className="w-full md:w-[350px]"
          />

          <FilterButton onClick={onFilterClick} />
        </div>

         <div className="ml-auto w-full sm:w-auto flex justify-end">
          <ExportButtons 
            onExportPDF={onExportPDF}
            onExportExcel={onExportExcel}
            loading={exportLoading}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden p-6">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full inter border-l border-r border-gray-200 min-w-[700px]">
              <thead className="bg-[#AA494E] text-white">
                <tr>
                  <th className="px-4 py-3 text-center text-[13px] font-semibold">No</th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold">Nama Siswa</th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold">
                    Nomor Identitas (NISN)
                  </th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold">
                    Tanggal Mengumpulkan
                  </th>
                  <th className="px-4 py-3 text-center text-[13px] font-semibold">Nilai</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-[13px] text-[#606060] text-center font-light">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060]">
                      {item.name}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060]">
                      {item.identity_number || item.nisn || "-"}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060]">
                      {item.submitted_at || item.date || "-"}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060] text-center">
                      {item.score !== null && item.score !== undefined ? (
                        <span className="inline-flex items-center justify-center min-w-[50px] px-3 py-1 bg-green-100 text-green-700 rounded-lg font-semibold">
                          {item.score}
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center min-w-[50px] px-3 py-1 bg-gray-100 text-gray-500 rounded-lg">
                          Belum dinilai
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500 text-sm">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
            <p className="text-[13px] inter font-medium text-[#8B8B8B] text-center md:text-left">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;