import SearchInput from "../../../../../components/common/SearchInput";
import FilterButton from "../../../../../components/common/FilterButton";
import ExportButtons from "../../../../../components/common/ExportButtons";
import ActionButton from "../../../../../components/common/ActionButton";
import Pagination from "../../../../../components/Pagination";
import Button from "../../../../../components/common/Button";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { FilterDate } from "../../components/FilterDate";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTaskTabController } from '../../hooks/useTaskTabController'

export default function TasksTab({ classId, tugas }) {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    exportLoading,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    showFilterModal,
    setShowFilterModal,
    filters,
    searchTerm,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportPdf,
    handleExportExcel
  } = useTaskTabController(classId, tugas);

  return (
    <div className="mb-6">
      <div className="bg-white p-8 rounded-[10px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <SearchInput
              placeholder="Telusuri sesuatu..."
              value={searchTerm}
              onSearch={handleSearch}
              onClear={() => handleSearch("")}
              size="md"
              className="w-full md:w-[350px]"
            />
            <FilterButton onClick={() => setShowFilterModal(true)} />
          </div>

          <div className="ml-auto w-full sm:w-auto flex justify-end">
            <ExportButtons 
              onExportPDF={handleExportPdf}
              onExportExcel={handleExportExcel}
              loading={exportLoading}
            />
          </div>
        </div>

        <hr className="border-t border-[#C1C7CD] my-4" />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden p-6">
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full inter border-l border-r border-gray-200 min-w-[700px]">
                <thead className="bg-[#AA494E] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-[13px] font-semibold">No</th>
                    <th className="px-4 py-3 min-w-[230px] text-left text-[13px] font-semibold">
                      Judul Tugas
                    </th>
                    <th className="px-4 py-3 text-left text-[13px] font-semibold">Deskripsi</th>
                    <th className="px-4 py-3 min-w-[200px] text-left text-[13px] font-semibold">
                      Tanggal Dibuat
                    </th>
                    <th className="px-4 py-3 min-w-[200px] text-center text-[13px] font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-[13px] text-[#606060] text-center font-light">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="px-4 py-3 text-[13px] text-[#606060]">{item.name}</td>

                      <td className="px-4 py-3 text-[13px] text-[#606060]">{item.description}</td>

                      <td className="px-4 py-3 text-[13px] text-[#606060]">
                        {item.created_at || item.date}
                      </td>

                      <td className="px-4 py-3 text-[13px] text-[#606060]">
                        <div className="flex justify-center items-center gap-2">
                          <ActionButton
                            icon={FaEye}
                            color="#2B71EB"
                            hoverBg="#E7F0FF"
                            size={17}
                            onClick={() => handleView(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {tasks.length === 0 && (
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
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex bg-white p-4 rounded-[10px] justify-end mt-4">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
        >
          Kembali
        </Button>
      </div>

      <FilterDate
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        initialFilters={filters}
      />
    </div>
  );
}