import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJournalDetail } from "../hooks/useJournalDetail";
import Button from "../../../../components/common/Button";
import { Icon } from "@iconify/react";
import AbsenceTable from "../components/AbsenceTable";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import formatDate from "../../../../helper/formatDate";

const JournalDetail = () => {
  const { classId, journalId } = useParams();
  const navigate = useNavigate();

  const {
    journalDetail,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    searchTerm,
    statusFilter,
    handleSearch,
    handleStatusFilter,
    handlePageChange,
    exportLoading,
    handleExportExcel,
    handleExportPdf
  } = useJournalDetail(classId, journalId);

  

  if (!journalDetail) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Jurnal tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <BreadCrumbs 
        role="sekolah" 
        manual={[
          { label: `${journalDetail.classroom.name}` },
          { label: "Detail Jurnal" }
        ]} 
      />

      <div className="bg-white p-8 rounded-xl shadow-sm mt-6">
        <div className="flex items-center gap-3">
          <Icon icon="mingcute:task-2-fill" className="text-primary-red" width={22} />
          <h2 className="text-lg font-semibold text-[#464646]">Detail Jurnal</h2>
        </div>

        <hr className="border-[#D9D9D9]/80 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 px-8 inter gap-10">
          <div>
            <p className="text-sm text-[#686868]">Judul Jurnal</p>
            <p className="text-base text-black">{journalDetail.title}</p>
          </div>

          <div>
            <p className="text-sm text-[#686868]">Tanggal</p>
            <p className="text-base text-black">{formatDate(journalDetail.date)}</p>
          </div>

          {journalDetail.lesson && (
            <div>
              <p className="text-sm text-[#686868]">Mata Pelajaran</p>
              <p className="text-base text-black">{journalDetail.lesson.name}</p>
            </div>
          )}
        </div>

        <div className="mt-4 px-8">
          <p className="text-sm text-[#686868]">Deskripsi</p>
          <p className="text-[19px] text-black">{journalDetail.description}</p>
        </div>
      </div>

      <AbsenceTable 
        students={journalDetail.attendance?.data || []}
        pagination={{
          currentPage,
          lastPage,
          totalItems,
          itemsPerPage,
        }}
        onExportPDF={handleExportPdf}
        onExportExcel={handleExportExcel}
        exportLoading={exportLoading}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onPageChange={handlePageChange}
        loading={loading}
      />

      <div className="flex bg-white p-4 rounded-[10px] justify-end mt-4">
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

export default JournalDetail;