import React from "react";
import { Icon } from "@iconify/react";
import SearchInput from "../../../../../components/common/SearchInput";
import DataTable from "../components/DataTable";
import ActionButton from "../../../../../components/common/ActionButton";
import { FaEye } from "react-icons/fa6";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import Pagination from "../../../../../components/Pagination";
import FilterModal from "../components/FilterModal";
import ExportButtons from "../components/ExportButtons";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { useUserController } from "../hooks/useUserController";
import formatDate from '../../../../../helper/formatDate'

export default function UserPage() {
  const {
    filteredUsers,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    setFilters,
    sortConfig,
    searchTerm,

    handleSearch,
    handleSort,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,

    handleExportExcel,
    handleExportPDF,
  } = useUserController();

  const renderRole = (role) => {
    const colors = {
      Pengajar: "bg-[#FFEAEB] text-[#CA2323]",
      Siswa: "bg-[#ECF2FF] text-[#5D87FF]",
      Sekolah: "bg-[#FEF5E5] text-[#1D9375]",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm font-bold ${colors[role]}`}>
        {role}
      </span>
    );
  };

  const renderStatus = (status) => {
    const colors = {
      Premium: "bg-[#FEF5E5] text-[#E45E14]",
      Basic: "bg-[#F2F2F7] text-[#5E5E5E]",
    };
    return (
      <span
        className={`px-3 py-[3px] inline-flex justify-center min-w-[94px] gap-1 rounded-lg text-sm font-semibold ${colors[status]}`}
      >
        {status === "Premium" && (
          <Icon icon="mdi:crown" className="text-[#E45E14] text-base" />
        )}
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs />

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex gap-3 items-center">
            <SearchInput
              placeholder="Telusuri sesuatu..."
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

          <div className="ml-auto">
            <ExportButtons 
              onExportExcel={handleExportExcel}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <DataTable
              columns={[
                { label: "No", className: "w-20" },

                {
                  label: (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Nama Pengguna
                    </div>
                  ),
                },

                {
                  label: (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Tanggal Bergabung
                      <Icon
                        className="text-white"
                      />
                    </div>
                  ),
                },

                { label: "Role" },
                { label: "Status", className: "text-center" },
                { label: "Aksi", className: "w-20 text-center" },
              ]}
              data={filteredUsers}
              emptyText="Data pengguna tidak tersedia."
              renderRow={(item, i) => (
                <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-3">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{formatDate(item.tanggal)}</td>
                  <td className="p-3">{renderRole(item.role)}</td>
                  <td className="p-3 text-center">{renderStatus(item.status)}</td>
                  <td className="p-3 text-center">
                    <ActionButton
                      icon={FaEye}
                      color="#2B71EB"
                      hoverBg="#E7F0FF"
                      onClick={() => handleView(item.id, item.role)}
                    />
                  </td>
                </tr>
              )}
            />

            <div className="mt-8 flex flex-col">
              <div className="text-sm text-gray-600 hidden md:block">
                Menampilkan {filteredUsers.length} dari {totalItems} data
              </div>

              <div className="flex justify-center md:justify-end w-full">
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