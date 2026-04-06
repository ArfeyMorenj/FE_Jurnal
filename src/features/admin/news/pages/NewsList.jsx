import React from "react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import SearchInput from "../../../../components/common/SearchInput";
import SelectField from "../../../../components/common/SelectField";
import { useNavigate } from "react-router-dom";
import NewsTable from "../components/NewsTable";
import Pagination from "../../../../components/Pagination";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useNewsListPage } from "../hooks/useNewsListPage";

const NewsList = () => {
  const navigate = useNavigate();
  const {
    searchValue,
    categoryOptions,
    isCategoriesLoading,
    categoryError,
    news,
    isLoading,
    error,
    pagination,
    categoryId,
    handleCategoryChange,
    handleSearchChange,
    handleView,
    handleEdit,
    handleDelete,
    setPage,
    startIndex,
    totalData,
  } = useNewsListPage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <BreadCrumbs />
        <Button
          className="bg-[#AA494E] text-white hover:bg-[#923E43] rounded-[7px] font-bold text-[13px] px-3"
          leftIcon={<FaPlus size={17} />}
          onClick={() => navigate("/admin/berita/tambah")}
        >
          Buat Berita
        </Button>
      </div>

      <div className="bg-white rounded-[10px] p-7.5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full mb-6">
          <div className="flex-1">
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Cari judul atau kata kunci..."
              size="md"
            />
          </div>
          <div className="md:w-auto w-full">
            <SelectField
              name="kategori"
              value={categoryId}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder={
                isCategoriesLoading ? "Memuat kategori..." : "Filter Kategori"
              }
              inputStyle="!mb-0"
              styleInput="h-[44px]"
              disabled={isCategoriesLoading}
            />
          </div>
        </div>

        <hr className="border-[#D9D9D9]/80 mb-6" />
 
        {(error || categoryError) && (
          <p className="text-red-500 text-sm mb-4">
            {error || categoryError}
          </p>
        )}

        {isLoading ? (
          <div className="py-10">
            <LoadingSpinner text="Memuat daftar berita..." />
          </div>
        ) : (
          <NewsTable
            data={news}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            startIndex={startIndex}
          />
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
          <p className="text-[13px] inter font-medium text-[#8B8B8B] text-center md:text-left">
            Menampilkan{" "}
            {news.length > 0
              ? `${startIndex + 1}–${startIndex + news.length}`
              : "0"}{" "}
            dari {totalData} data
          </p>

          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.lastPage}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmModal />
    </div>
  );
};

export default NewsList;
