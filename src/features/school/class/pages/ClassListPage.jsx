import React from "react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import SearchInput from "../../../../components/common/SearchInput";
import SelectField from "../../../../components/common/SelectField";
import ClassCard from "../../../../components/ClassCard";
import Pagination from "../../../../components/Pagination";
import { useClassController } from "../hooks/useClassController";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const ClassListPage = () => {
  const {
    classes,
    loading,
    currentPage,
    lastPage,
    totalItems,
    itemsPerPage,
    searchTerm,
    filters,
    teacherOptions,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
  } = useClassController();

  return (
    <div>
      <BreadCrumbs role="sekolah" />
      <hr className="border-t border-[#C1C7CD] my-6" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchInput
          placeholder="Telusuri sesuatu..."
          value={searchTerm}
          onSearch={handleSearch}
          onClear={() => handleSearch("")}
          size="md"
          className="w-full md:w-[350px]"
        />

        <div className="flex items-center gap-3">
          <div className="w-full md:w-[180px]">
            <SelectField
              name="filterGuru"
              value={filters.teacher}
              onChange={(e) => handleApplyFilter({ teacher: e.target.value })}
              placeholder="Filter Guru"
              options={[
                { value: "", label: "Semua Guru" }, 
                ...teacherOptions
              ]}
              styleInput="text-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : classes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Tidak ada data kelas</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((item) => (
              <ClassCard
                key={item.id}
                image={item.image}
                kodeKelas={item.kodeKelas}
                title={item.title}
                teacher={item.teacher.name}
                siswa={item.totalStudents}
                tugas={item.totalAssignments}
                jurnal={item.totalJournals}
                onDetail={() => handleView(item.id)}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
            <p className="text-[13px] inter font-medium text-[#8B8B8B] text-center md:text-left">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClassListPage;