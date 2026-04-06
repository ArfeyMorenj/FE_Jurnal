import React from "react";
import { Icon } from "@iconify/react";
import SearchInput from "../../../../../../components/common/SearchInput";
import DataTable from "../../../../rebuild/user/components/DataTable";
import ActionButton from "../../../../../../components/common/ActionButton";
import { FaEye } from "react-icons/fa6";
import BreadCrumbs from "../../../../../../components/common/BreadCrumbs";
import Pagination from "../../../../../../components/Pagination";
import FilterModal from "../../components/FilterModal";
import ExportButtons from "../../../../rebuild/user/components/ExportButtons";
import { useTeacherController } from "../../hooks/useTeacherController";

export default function PengajarPage() {
  const {
    teachers,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    sortConfig,
    searchTerm,
    handleSearch,
    handleSort,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportPdf,
    exportPdfLoading,
    handleExportExcel,
    exportExcelLoading,
  } = useTeacherController();

  /* ICON SORT */
  const SortIcon = ({ field }) => {
    if (sortConfig.key !== field)
      return <Icon icon="mingcute:arrow-down-line" className="text-white" />;

    return sortConfig.direction === "asc" ? (
      <Icon icon="mingcute:arrow-down-line" className="text-white" />
    ) : (
      <Icon icon="mingcute:arrow-up-line" className="text-white" />
    );
  };

  /* ROLE BADGE */
  const renderRole = () => {
    return (
      <span className="px-2 py-1 rounded-full text-sm font-bold bg-[#FFEAEB] text-[#CA2323]">
        Pengajar
      </span>
    );
  };

  /* STATUS BADGE */
  const renderStatus = (status) => {
    const isPremium = status === "Premium";
    return (
      <span 
        className={`px-3 py-[3px] inline-flex justify-center min-w-[94px] gap-1 rounded-lg text-sm font-semibold ${
          isPremium 
            ? "bg-[#FEF5E5] text-[#E45E14]" 
            : "bg-[#F2F2F7] text-[#5E5E5E]"
        }`}
      >
        {isPremium && <Icon icon="mdi:crown" className="text-[#E45E14] text-base" />}
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs role="sekolah" 
            manual={[
                          { label: "Pengajar", path: "/sekolah/pengguna/pengajar" }
                      ]} />

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex gap-3 items-center">
            <SearchInput
              placeholder="Cari pengajar..."
              value={searchTerm}
              onSearch={handleSearch}
              onClear={() => handleSearch("")}
            />

            <button
              className="px-3 py-2 border border-[#AA494E] text-[#AA494E] rounded-lg hover:bg-red-50 flex items-center gap-2"
              onClick={() => setShowFilterModal(true)}
            >
              <Icon icon="mi:filter" className="text-lg" />
            </button>
          </div>

           <div className="ml-auto w-full sm:w-auto flex justify-end">
              <ExportButtons 
                onExportPDF={handleExportPdf}
                exportPdfLoading={exportPdfLoading}
                onExportExcel={handleExportExcel}
                exportExcelLoading={exportExcelLoading}
              />
          </div>
        </div>

        <div className="w-full border-b border-gray-300 mb-6"></div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Icon icon="eos-icons:loading" className="text-6xl text-[#CA2323] mx-auto mb-4" />
              <p className="text-gray-600">Memuat data pengajar...</p>
            </div>
          </div>
        ) : (
          <>
            <DataTable
              columns={[
                { label: "No", className: "w-20" },

                {
                  label: (
                    <div
                    // NOTE: Sortby belum ada di be
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleSort("nama")}
                    >
                      Nama Pengajar
                      <SortIcon field="nama" />
                    </div>
                  ),
                },

                {
                  label: (
                    <div className="flex items-center gap-2 cursor-pointer">
                      Tanggal Bergabung
                    </div>
                  ),
                },

                { label: "Role" },
                { label: "Status", className: "text-center" },
                { label: "Aksi", className: "w-20 text-center" },
              ]}
              data={teachers}
              emptyText="Tidak ada data pengajar."
              renderRow={(item, i) => (
                <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.tanggal}</td>
                  <td className="p-3">{renderRole()}</td>
                  <td className="p-3 text-center">{renderStatus(item.status)}</td>
                  <td className="p-3 text-center">
                    <ActionButton
                      icon={FaEye}
                      color="#2B71EB"
                      hoverBg="#E7F0FF"
                      onClick={() => handleView(item.id)}
                    />
                  </td>
                </tr>
              )}
            />

            <div className="mt-8 flex flex-col">
              <div className="text-sm text-gray-600 hidden sm:block">
                  Menampilkan {teachers.length} dari {totalItems} data
              </div>

              <div className="flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={lastPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
}