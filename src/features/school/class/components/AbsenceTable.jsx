import React, { useState, useEffect } from "react";
import SearchInput from "../../../../components/common/SearchInput";
import ExportButtons from "../../../../components/common/ExportButtons";
import Pagination from "../../../../components/Pagination";
import { Icon } from "@iconify/react";
import SelectField from "../../../../components/common/SelectField";
import { statusColor } from "../../../../constants/roleColors";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { absenceOptions } from '../../../../helper/statusOption'

const AbsenceTable = ({ 
  students = [], 
  pagination = {},
  searchTerm = "",
  statusFilter = "",
  onSearch,
  onStatusFilter,
  onPageChange,
  loading = false,
  exportLoading,
  onExportExcel,
  onExportPDF
}) => {
  const [search, setSearch] = useState(searchTerm);
  const [status, setStatus] = useState(statusFilter);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setStatus(statusFilter);
  }, [statusFilter]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    if (onStatusFilter) {
      onStatusFilter(value);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  const {
    currentPage = 1,
    lastPage = 1,
    totalItems = 0,
    itemsPerPage = 10
  } = pagination;

  return (
    <div className="bg-white p-8 rounded-[10px] mt-6">
      <label className="block text-lg text-[#464646] font-semibold inter flex items-center gap-2">
        <Icon icon="mingcute:task-2-fill" width="20" className="text-primary-red" />
        <span>Tabel Absensi Siswa</span>
      </label>

      <hr className="border-t border-[#C1C7CD] my-6" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SearchInput
            placeholder="Telusuri sesuatu..."
            value={search}
            onSearch={onSearch}  
            onClear={() => onSearch("")}
            size="md"
            className="w-full md:w-[350px]"
          />
        </div>

        <div className="flex items-center gap-3">
          <SelectField
            name="status"
            value={status}
            onChange={handleStatusChange}
            options={absenceOptions}
            placeholder="Filter Status"
            inputStyle="!mb-0"
            styleInput="h-[44px]"
          />

          <div className="ml-auto w-full sm:w-auto flex justify-end">
            <ExportButtons 
              onExportPDF={onExportPDF}
              onExportExcel={onExportExcel}
              loading={exportLoading}
            />
          </div>
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
                  <th className="px-4 py-3 text-left text-[13px] font-semibold">Nomor Identitas (NISN)</th>
                  <th className="px-4 py-3 text-center text-[13px] font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-[13px] text-[#606060] text-center font-light">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060]">
                      {item.student_name}
                    </td>

                    <td className="px-4 py-3 text-[13px] font-medium text-[#606060]">
                      {item.nisn || "-"}
                    </td>

                    <td
                      className={`px-4 py-3 text-[13px] font-medium text-center ${
                        statusColor[item.status] || "text-gray-600"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500 text-sm">
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

export default AbsenceTable;