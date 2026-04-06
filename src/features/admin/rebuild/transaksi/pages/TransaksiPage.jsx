import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import SearchInput from "../../../../../components/common/SearchInput";
import TransaksiTable from "../components/TransaksiTable";
import Pagination from "../../../../../components/Pagination";
import ModalFilter from "../components/ModalFilter";
import ExportButtons from "../../../../../components/common/ExportButtons";
import { SlidersHorizontal } from "lucide-react";
import { useTransaksiList } from "../hooks/useTransaksiList"
import formatDate from "../../../../../helper/formatDate";

export default function TransaksiPage() {
  const {
    transactions,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    searchTerm,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportExcel,
    handleExportPdf,
  } = useTransaksiList();

  const from = ((currentPage - 1) * itemsPerPage) + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs />

      <div className="bg-white rounded-[10px] p-7.5">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchInput 
              placeholder="Telusuri sesuatu..." 
              size="md"
              value={searchTerm}
              onSearch={handleSearch}  // ✅ Ganti onChange jadi onSearch
              onClear={() => handleSearch("")} 
            />

            <button
              className="px-2 py-2 border border-[#AA494E] text-[#AA494E] rounded-lg hover:bg-[#AA494E]/10"
              onClick={() => setShowFilterModal(true)}
            >
              <SlidersHorizontal size={18} />
            </button>

            <ModalFilter
              isOpen={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              filters={filters}
              onApply={handleApplyFilter}
              onReset={handleResetFilter}
            />
          </div>

          <ExportButtons 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPdf}
            loading={exportLoading} 
          />
        </div>

        {/* Table */}
          <TransaksiTable
        loading={loading}
        data={transactions.map((item, idx) => ({
          id: item.id,
          reference: item.reference,
          no: (currentPage - 1) * itemsPerPage + idx + 1,
          nama: item.customer_name,
          tanggal: formatDate(item.created_at),
          total: item.amount,
          status: item.status,
          paket: item.order_items?.[0]?.name ?? "-",
        }))}
        onView={(row) => handleView(row.reference)}  
      />

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-3">
          <p className="text-[13px] text-[#8B8B8B]">
            Menampilkan {from}–{to} dari {totalItems} data
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}