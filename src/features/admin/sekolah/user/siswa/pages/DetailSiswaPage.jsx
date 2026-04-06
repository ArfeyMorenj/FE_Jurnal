import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../../../components/common/BreadCrumbs";
import { Icon } from "@iconify/react";
import DetailRow from "../../../../rebuild/user/components/DetailRow";
import SmallTable from "../components/SmallTable";
import TableKelas from "../components/TableKelas";
import TableTugas from "../components/TableTugas";
import TableAbsensi from "../components/TableAbsensi";
import FilterKelasSiswa from "../components/FilterKelasSiswa";
import { useStudentDetailController } from "../../hooks/useStudentDetailController";

function RoleBadge({ role }) {
  return (
    <span className="px-3 py-1 text-xs font-bold bg-[#EAF1FF] text-[#2E6BD8] rounded-lg">
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-[3px] text-xs font-bold rounded-lg inline-flex items-center gap-1 
        ${status === "Premium" ? "bg-[#FEF5E5] text-[#E45E14]" : "bg-[#F2F2F7] text-[#5E5E5E]"}`}
    >
      {status === "Premium" && <Icon icon="material-symbols:crown" className="text-[#E45E14] text-base" />}
      {status}
    </span>
  );
}

export default function DetailSiswaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    loading, 
    student, 
    classrooms, 
    assignments, 
    attendances 
  } = useStudentDetailController(id);

  // Sorting tidak ada (API tidak support sorting)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon icon="eos-icons:loading" className="text-6xl text-[#2E6BD8] mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail siswa...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-10 text-red-500">
        Siswa tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-7xl flex flex-col gap-6">
      <BreadCrumbs role="sekolah"
            manual={[
                          { label: "Siswa", path: "/sekolah/pengguna/siswa" },
                          { label: "Detail Siswa", path: "" }
                      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PROFILE */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#2E6BD8] bg-gray-200 flex items-center justify-center">
              <Icon icon="mdi:account" className="text-8xl text-gray-400" />
            </div>

            <h2 className="text-lg font-semibold mt-4 text-center">{student.nama}</h2>

            <div className="flex gap-2 mt-2">
              <RoleBadge role={student.role} />
              <StatusBadge status={student.status} />
            </div>

            <p className="text-xs text-gray-500 mt-4">Masa Berlaku Premium</p>
            <p className="text-sm font-bold">{student.tanggal}</p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* DATA DIRI */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="material-symbols:info-outline" className="text-[#2E6BD8] text-xl" />
              <h3 className="font-semibold text-lg">Data Diri Siswa</h3>
            </div>

            <div className="w-full h-[1px] bg-gray-200 mb-6" />

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow label="Nama Pengguna" value={student.nama} />
              <DetailRow label="Nomor Identitas (NISN/NIP)" value={student.identitas} />
              <DetailRow label="Email" value={student.email} />
              <DetailRow label="Tanggal Lahir" value={student.ttl} />
              <DetailRow label="Jenis Kelamin" value={student.jenisKelamin} />
              <DetailRow label="Role" value={student.role} />
              <DetailRow label="Alamat" value={student.alamat} span />
            </div>
          </div>

          {/* TERGABUNG DALAM KELAS */}
          <SmallTable title="Tergabung Dalam Kelas" icon="mdi:google-classroom">
            <TableKelas
              searchTerm={classrooms.search}
              setSearchTerm={classrooms.setSearch}
              showFilter={classrooms.showFilter}
              setShowFilter={classrooms.setShowFilter}
              paginatedClasses={classrooms.data}
              page={classrooms.page}
              perPage={classrooms.perPage}
              sortedClasses={classrooms.data}
              startIndex={classrooms.total === 0 ? 0 : (classrooms.page - 1) * classrooms.perPage + 1}
              endIndex={Math.min(classrooms.page * classrooms.perPage, classrooms.total)}
              totalPages={classrooms.totalPages}
              total={classrooms.total}
              setPage={classrooms.setPage}
              navigate={navigate}
              FilterKelasSiswa={
                <FilterKelasSiswa
                  show={classrooms.showFilter}
                  onClose={() => classrooms.setShowFilter(false)}
                  filters={classrooms.filters}
                  setFilters={classrooms.setFilters}
                  onReset={classrooms.handlers.resetFilter}
                  onApply={classrooms.handlers.applyFilter}
                />
              }
            />
          </SmallTable>

          {/* TUGAS TERBARU */}
          <SmallTable title="Daftar Tugas Terbaru" icon="material-symbols:menu-book-outline">
            <TableTugas
              taskSearch={assignments.search}
              setTaskSearch={assignments.setSearch}
              sortedTasks={assignments.data}
            />
          </SmallTable>

          {/* ABSENSI */}
          <SmallTable title="Daftar Absensi" icon="mdi:clipboard-text">
            <TableAbsensi
              sortedAbs={attendances.data}
              absPage={attendances.page}
              absPerPage={attendances.perPage}
              setAbsPage={attendances.setPage}
              filters={attendances.filters}
              setFilters={attendances.setFilters}
              total={attendances.total}
              totalPages={attendances.totalPages}
            />
          </SmallTable>

          {/* BACK BUTTON */}
          <div className="bg-white shadow-md rounded-xl p-4 flex justify-end">
            <button
              className="px-6 py-2 bg-[#8B8B8B] text-white rounded-lg hover:bg-gray-600"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}