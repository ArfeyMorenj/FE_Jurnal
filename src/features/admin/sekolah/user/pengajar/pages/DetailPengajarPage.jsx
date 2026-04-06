import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../../../components/common/BreadCrumbs";
import { Icon } from "@iconify/react";
import DetailRow from "../../../../rebuild/user/components/DetailRow";
import SearchInput from "../../../../../../components/common/SearchInput";
import Pagination from "../../../../../../components/Pagination";
import FilterKelasPengajar from "../components/FilterKelasPengajar";
import ActionButton from "../../../../../../components/common/ActionButton";
import { FaEye } from "react-icons/fa6";
import { useTeacherController } from "../../hooks/useTeacherController";

export default function DetailPengajarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    handleShowDetail, 
    loading, 
    selectedTeacher,
    classrooms,
    classroomLoading,
    classroomFilters,
    setClassroomFilters,
    classroomSearch,
    setClassroomSearch,
    classroomPage,
    setClassroomPage,
    classroomTotalPages,
    classroomTotalItems,
  } = useTeacherController();

  const [showFilter, setShowFilter] = useState(false);

  const [tempFilterValues, setTempFilterValues] = useState({
    start_date: "",
    end_date: "",
  });


  useEffect(() => {
    if (id) {
      handleShowDetail(id, classroomFilters, classroomSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, classroomFilters, classroomSearch, classroomPage]);

  const handleApplyFilter = () => {
    setClassroomFilters({
      start_date: tempFilterValues.start_date,
      end_date: tempFilterValues.end_date,
    });
    setClassroomPage(1);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    const emptyFilters = {
      start_date: "",
      end_date: "",
    };
    setTempFilterValues(emptyFilters);
    setClassroomFilters(emptyFilters);
    setClassroomPage(1);
    setShowFilter(false);
  };

  const handleOpenFilter = () => {
    setTempFilterValues(classroomFilters);
    setShowFilter(true);
  };

  const handleSearch = (value) => {
    setClassroomSearch(value);
    setClassroomPage(1);
  };

  const hasActiveFilters = Object.values(classroomFilters).some(val => val !== "");

  const RoleBadge = () => (
    <span className="px-3 py-1 text-xs font-bold bg-[#FFEAEB] text-[#CA2323] rounded-lg">
      Pengajar
    </span>
  );

  const StatusBadge = ({ status }) => (
    <span
      className={`px-3 py-[3px] text-xs font-bold rounded-lg inline-flex items-center gap-1 
        ${
          status === "Premium"
            ? "bg-[#FEF5E5] text-[#E45E14]"
            : "bg-[#F2F2F7] text-[#5E5E5E]"
        }`}
    >
      {status === "Premium" && (
        <Icon icon="material-symbols:crown" className="text-[#E45E14] text-base" />
      )}
      {status}
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon icon="eos-icons:loading" className="text-6xl text-[#CA2323] mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail pengajar...</p>
        </div>
      </div>
    );
  }

  if (!selectedTeacher) {
    return (
      <div className="p-10 text-red-500">
        Pengajar tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-7xl flex flex-col gap-6">
      <BreadCrumbs role="sekolah"
                  manual={[
                                { label: "Pengajar", path: "/sekolah/pengguna/pengajar" },
                                { label: "Detail Pengajar", path: "" }
                            ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#CA2323] bg-gray-200 flex items-center justify-center">
              <Icon icon="mdi:account" className="text-8xl text-gray-400" />
            </div>

            <h2 className="text-lg font-semibold mt-4 text-center">
              {selectedTeacher.nama}
            </h2>

            <div className="flex gap-2 mt-2">
              <RoleBadge />
              <StatusBadge status={selectedTeacher.status} />
            </div>

            <p className="text-xs text-gray-500 mt-4">Masa Berlaku Premium</p>
            <p className="text-sm font-bold">{selectedTeacher.tanggal}</p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="material-symbols:info-outline"
                className="text-[#CA2323] text-xl"
              />
              <h3 className="font-semibold text-lg">Data Diri Pengajar</h3>
            </div>

            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow label="Nama Pengajar" value={selectedTeacher.nama} />
              <DetailRow label="Nomor Identitas" value={selectedTeacher.identitas} />
              <DetailRow label="Email" value={selectedTeacher.email} />
              <DetailRow label="Tanggal Lahir" value={selectedTeacher.ttl} />
              <DetailRow label="Jenis Kelamin" value={selectedTeacher.jenisKelamin} />
              <DetailRow label="Role" value={selectedTeacher.role} />
              <DetailRow label="Alamat" value={selectedTeacher.alamat} span />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="mdi:google-classroom"
                className="text-[#CA2323] text-xl"
              />
              <h3 className="font-semibold text-lg">Daftar Kelas Yang Diajar</h3>
            </div>

            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

            <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
              <SearchInput
                placeholder="Cari kelas..."
                value={classroomSearch}
                onSearch={handleSearch}
                onClear={() => handleSearch("")}
              />

              <button
                onClick={handleOpenFilter}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  hasActiveFilters
                    ? "bg-[#C24A4A] text-white border-[#C24A4A] hover:bg-[#A83F3F]"
                    : "border-[#AA494E] text-[#AA494E] hover:bg-red-50"
                }`}
              >
                <Icon icon="mi:filter" className="text-lg" />
                {hasActiveFilters && (
                  <span className="ml-1 bg-white text-[#C24A4A] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {Object.values(classroomFilters).filter(val => val !== "").length}
                  </span>
                )}
              </button>
            </div>

            <div className="w-full border-b mb-4"></div>

            {/* TABEL */}
            {classroomLoading ? (
              <div className="flex items-center justify-center py-12">
                <Icon icon="eos-icons:loading" className="text-4xl text-[#CA2323]" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#B13434] text-white text-left">
                        <th className="p-3 w-16">No</th>
                        <th className="p-3">Nama Kelas</th>

                        <th className="p-3">Jumlah Tugas</th>
                        <th className="p-3">Jumlah Siswa</th>
                        <th className="p-3">Tanggal Dibuat</th>
                        <th className="p-3 text-center w-20">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {classrooms.length > 0 ? (
                        classrooms.map((item, i) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="p-3">
                              {(classroomPage - 1) * 10 + i + 1}
                            </td>

                            <td className="p-3">{item.nama_kelas}</td>
                            <td className="p-3">{item.jumlah_tugas} Tugas</td>
                            <td className="p-3">{item.jumlah_siswa} Siswa</td>
                            <td className="p-3">{item.tanggal}</td>

                            <td className="p-3 text-center">
                              <ActionButton
                                icon={FaEye}
                                color="#1A73E8"
                                hoverBg="#E7F0FF"
                                onClick={() => navigate(`/sekolah/kelas/${item.id}`)}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="p-6 text-center text-gray-500">
                            Tidak ada kelas.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* FOOTER PAGINATION */}
                {classrooms.length > 0 && (
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600 ml-1">
                      Menampilkan{" "}
                      <span className="font-semibold">
                        {(classroomPage - 1) * 10 + 1}
                      </span>
                      –
                      <span className="font-semibold">
                        {Math.min(classroomPage * 10, classroomTotalItems)}
                      </span>{" "}
                      dari <span className="font-semibold">{classroomTotalItems}</span>{" "}
                      data
                    </div>

                    <Pagination
                      currentPage={classroomPage}
                      totalPages={classroomTotalPages}
                      onPageChange={setClassroomPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>

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

      {/* MODAL FILTER */}
      {showFilter && (
        <FilterKelasPengajar
          filterValues={tempFilterValues}
          setFilterValues={setTempFilterValues}
          onApply={handleApplyFilter}
          onReset={handleResetFilter}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}