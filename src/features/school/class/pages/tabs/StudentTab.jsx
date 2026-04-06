import SearchInput from "../../../../../components/common/SearchInput";
import ExportButtons from "../../../../../components/common/ExportButtons";
import Pagination from "../../../../../components/Pagination";
import ActionButton from "../../../../../components/common/ActionButton";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { FaEye } from "react-icons/fa6";
import Button from "../../../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useStudentTabController } from '../../hooks/useStudentTab'

export default function StudentTab({ classId, students = [] }) {
  const navigate = useNavigate();
  const {
    students: studentList,
    loading,
    exportLoading,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    searchTerm,
    handleSearch,
    handlePageChange,
    handleViewStudent,
    handleExportPdf,
    handleExportExcel,
  } = useStudentTabController(classId, students);

  return (
    <div className="mb-6">
      <div className="bg-white p-8 rounded-[10px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <SearchInput
            placeholder="Cari siswa..."
            value={searchTerm}
            onSearch={handleSearch}
            onClear={() => handleSearch("")}
            className="w-full md:w-[350px]"
          />

          <div className="ml-auto w-full sm:w-auto flex justify-end">
          <ExportButtons 
            onExportPDF={handleExportPdf}
            onExportExcel={handleExportExcel}
            loading={exportLoading}
          />
          </div>
        </div>

        <hr className="border-t border-[#C1C7CD] my-4" />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl inter">
              <table className="w-full border-l border-r border-gray-200 min-w-[700px]">
                <thead className="bg-[#AA494E] text-white">
                  <tr>
                    <th className="px-4 py-3 text-center text-[13px] font-medium">No</th>
                    <th className="px-4 py-3 text-left text-[13px] font-medium">
                      Gambar Profil
                    </th>
                    <th className="px-4 py-3 text-left text-[13px] font-medium">Nama Siswa</th>
                    <th className="px-4 py-3 text-left text-[13px] font-medium">
                      Nomor Identitas (NISN)
                    </th>
                    <th className="px-4 py-3 text-center text-[13px] font-medium">Aksi</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {studentList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-[13px] text-[#606060] text-center font-light">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="px-4 py-4">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="w-[70px] h-[70px] rounded-[15px] object-cover"
                          />
                        ) : (
                          <div className="w-[70px] h-[70px] rounded-[15px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Photo</span>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4 text-[13px] text-[#606060]">{item.name}</td>

                      <td className="px-4 py-4 text-[13px] text-[#606060]">
                        {item.nisn || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            icon={FaEye}
                            color="#2B71EB"
                            hoverBg="#E7F0FF"
                            size={17}
                            onClick={() => handleViewStudent(item.id, navigate)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {studentList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-500 text-sm">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full mt-8">
              <p className="text-[13px] text-[#8B8B8B] text-center md:text-left">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

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
}