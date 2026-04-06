import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAssignmentDetail } from "../hooks/useAssignmentDetail"
import Button from "../../../../components/common/Button";
import { Icon } from "@iconify/react";
import StudentTable from "../components/StudentTable";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { FilterDate } from "../components/FilterDate";

const TaskDetail = () => {
  const { classId, taskId } = useParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    assignmentDetail,
    filteredStudents,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    filters,
    searchTerm,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    exportLoading,
    handleExportExcel,
    handleExportPdf
  } = useAssignmentDetail(classId, taskId);


  if (!assignmentDetail) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Tugas tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <BreadCrumbs 
        role="sekolah" 
        manual={[
          { label: `Kelas` },
          { label: "Detail Tugas" }
        ]} 
      />
      
      <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
        <label className="block text-lg text-[#464646] font-semibold inter flex items-center gap-2">
          <Icon icon="mingcute:task-2-fill" width="20" className="text-primary-red" />
          <span>Detail Tugas</span>
        </label>
        
        <hr className="border-[#D9D9D9]/80 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 inter gap-10">
          <div className="space-y-5 px-8">
            <div>
              <p className="text-sm font-medium text-[#686868]">Judul Tugas</p>
              <p className="text-base text-black">
                {assignmentDetail.title}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[#686868]">Tanggal Dibuat</p>
              <p className="text-base text-black">
                {assignmentDetail.created_at}
              </p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-sm font-medium text-[#686868]">Deskripsi Tugas</p>
            <p className="text-[19px] leading-relaxed text-[#464646]">
              {assignmentDetail.description}
            </p>
          </div>
        </div>
      </div>

      <StudentTable 
        students={assignmentDetail.students}
        pagination={{
          currentPage,
          lastPage,
          totalItems,
          itemsPerPage,
        }}
        onExportPDF={handleExportPdf}
        onExportExcel={handleExportExcel}
        exportLoading={exportLoading}
        search={searchTerm}
        handleSearch={handleSearch}
        onPageChange={handlePageChange}
        onFilterClick={() => setIsFilterOpen(true)}  
        loading={loading}
      />

      <FilterDate
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        initialFilters={filters}
      />

      <div className="flex justify-end mt-4">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;