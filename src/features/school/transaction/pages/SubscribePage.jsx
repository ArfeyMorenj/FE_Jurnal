import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/Pagination";
import ModalFilter from "../../../admin/rebuild/transaksi/components/ModalFilter";
import ExportButtons from "../../../../components/common/ExportButtons";

import SubscribeTable from "../components/SubscribeTable";
import { useTransactions } from "../hooks/useTransactions";
import { SlidersHorizontal, Loader2 } from "lucide-react";

export default function SubscribePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    transactions,
    isLoading,
    error,
    pagination,
    filters,  
    handlePageChange,
    handleSearch,
    handleFilterChange,
    handleExportExcel,
    handleExportPDF,
  } = useTransactions();

  const handleView = (reference) => {
    navigate(`/sekolah/riwayat-transaksi/${reference}`);
  };

  const handleApplyFilter = (newFilters) => {
    handleFilterChange(newFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    handleFilterChange({
      status: "",
      start: "",
      end: "",
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <BreadCrumbs role="sekolah" />
      </div>

      <div className="bg-white rounded-[10px] p-7.5">
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 gap-3">
          <div className="flex flex-row items-center gap-3 w-full md:w-auto">
            <SearchInput 
              placeholder="Telusuri sesuatu..." 
              size="md"
              onSearch={handleSearch}  
              onClear={() => handleSearch("")} 
            />

            <button
              className="flex items-center gap-2 px-2 py-2 rounded-lg border border-[#AA494E] text-[#AA494E] 
              hover:bg-[#AA494E]/10 transition"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={18} />
            </button>

            <ModalFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}  
              onApply={handleApplyFilter}  
              onReset={handleResetFilter} 
            />
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <ExportButtons
              onExportExcel={handleExportExcel}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary-red" size={32} />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 font-semibold mb-2">Error</p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && transactions.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-sm">Tidak ada data transaksi</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && transactions.length > 0 && (
          <>
            <SubscribeTable
              data={transactions.map((item, idx) => ({
                ...item,
                no: (pagination.currentPage - 1) * pagination.perPage + idx + 1,
              }))}
              onView={handleView}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
              <p className="text-[13px] inter font-medium text-[#8B8B8B]">
                Menampilkan {Math.min(transactions.length, pagination.totalRecords)} dari {pagination.totalRecords} data
              </p>

              <Pagination 
                currentPage={pagination.currentPage} 
                totalPages={pagination.totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}