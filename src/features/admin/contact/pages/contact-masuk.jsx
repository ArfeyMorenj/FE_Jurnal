import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import SearchInput from "../../../../components/common/SearchInput";
import SelectField from "../../../../components/common/SelectField";
import Pagination from "../../../../components/Pagination";
import { sortOptions, statusOptions } from "../../../../helper/statusOption";
import { useMessage } from "../hooks/useMessage";
import { getGlobalColor, getInitials } from "../../../../utils/avatarGenerator";
import { autoFormatDate } from "../../../../utils/formatDate";

const ContactMasukPage = () => {
  const navigate = useNavigate();

  const {
    items,
    loading,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    lastPage,
    perPage,
    totalItems,
  } = useMessage();

  useEffect(() => {}, [filters]);
  useEffect(() => {}, [currentPage]);
  useEffect(() => {}, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleMessageClick = (id) => {
    navigate(`/admin/kotak-masuk/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs />

      <div className="bg-white rounded-[10px] p-7.5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full mb-6">
          <div className="w-full flex-1 md:w-auto">
            <SearchInput
              placeholder="Telusuri sesuatu..."
              value={filters.search}
              onChange={() => {}}
              onSearch={(value) => handleFilterChange({ search: value })}
              onClear={() => handleFilterChange({ search: "" })}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-[180px]">
              <SelectField
                name="sort"
                value={filters.direction}
                onChange={(e) =>
                  handleFilterChange({
                    sortBy: "created_at",
                    direction: e.target.value,
                  })
                }
                options={sortOptions}
                placeholder="Urutkan"
                inputStyle="!mb-0"
                styleInput="h-[44px]"
              />
            </div>

            <div className="flex-1 md:w-[180px]">
              <SelectField
                name="status"
                value={filters.status}
                onChange={(e) =>
                  handleFilterChange({ status: e.target.value })
                }
                options={statusOptions}
                placeholder="Filter Status"
                inputStyle="!mb-0"
                styleInput="h-[44px]"
              />
            </div>
          </div>
        </div>

        <hr className="border-[#D9D9D9]/80 mb-6" />

        <div className="flex flex-col gap-0">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Memuat...</p>
          ) : items.length === 0 ? (
            <p className="text-center py-6 text-gray-500">Tidak ada pesan</p>
          ) : (
            items.map((message, index) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  index !== items.length - 1
                    ? "border-b border-[#EBF1F6]"
                    : ""
                } ${
                  message.status === 1
                    ? "bg-white hover:bg-gray-50"
                    : "bg-blue-50/50 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-3 flex-shrink-0">
                    {message.status === 0 && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>

                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{
                      backgroundColor: getGlobalColor(message.name),
                    }}
                  >
                    {getInitials(message.name, message.email)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#000405] text-sm mb-1">
                          {message.name}
                        </h3>
                        <p className="text-xs text-[#8B8B8B] mb-2">
                          {message.email}
                        </p>
                        <p className="text-sm text-[#000405]/70 line-clamp-2">
                          {message.message}
                        </p>
                      </div>

                      <p className="text-xs text-[#8B8B8B] whitespace-nowrap">
                        {autoFormatDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
          <p className="text-[13px] inter font-medium text-[#8B8B8B] text-center md:text-left">
            Menampilkan {(currentPage - 1) * perPage + 1}–
            {Math.min(currentPage * perPage, totalItems)} dari {totalItems} data
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={lastPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactMasukPage;
