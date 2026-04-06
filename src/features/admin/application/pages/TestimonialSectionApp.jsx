import { useParams } from "react-router-dom";
import TestimonialTable from "../../beranda/components/TestimonialTable";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import InputField from "../../../../components/common/InputField";
import InfoBar from "../../../../components/common/InfoBar";
import { IoAddCircleOutline } from "react-icons/io5";
import Button from "../../../../components/common/Button";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import useTestimonialSectionApp from "../hooks/useTestimonialApps";

export default function TestimonialSectionApp() {
  const { sectionId } = useParams();
  
  const {
    testimonials,
    leadInText,
    setLeadInText,
    loading,
    error,
    handleSave,
    handleAddTestimonial,
    handleDeleteClick,
    handleView,
    handleEditTestimonial,
    handleBack,
  } = useTestimonialSectionApp(sectionId); 

  if (loading && testimonials.length === 0) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner text="Memuat data testimonial..." />
      </div>
    );
  }

  if (!sectionId) {
    return (
      <div className="min-h-screen">
        <BreadCrumbs manual={[{ label: "Testimonial Section" }]} />
        <div className="bg-white p-5 rounded-xl mt-6">
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">Section ID tidak ditemukan</p>
            <Button
              className="bg-[#8B8B8B] text-white rounded-xl mt-4"
              onClick={handleBack}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Testimonial Section" }]} />

      <InfoBar message="Kelola testimoni untuk halaman Anda. Tambah, edit, atau hapus testimoni dari pengguna." />


      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white p-7.5 rounded-[10px]">
        <InputField
          label="Masukkan Lead-in Text"
          name="kata_pengantar"
          placeholder="Masukkan teks pengantar"
          value={leadInText}
          onChange={(e) => setLeadInText(e.target.value)}
          required
          note="Text akan tampil sebagai judul utama untuk bagian testimoni"
        />

        <div className="flex items-center justify-end mt-8 mb-4">
          <button
            onClick={handleAddTestimonial}
            type="button"
            className="flex items-center gap-1 inter text-xs md:text-[15px] font-medium group"
          >
            <IoAddCircleOutline className="h-3 w-3 md:w-5 md:h-5 text-primary-red" />
            <span className="relative bg-gradient-to-b from-primary-orange to-primary-red bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#E45E14] after:to-[#CA2323] group-hover:after:w-full after:transition-all after:duration-300">
              Tambah Testimoni Baru
            </span>
          </button>
        </div>

        <TestimonialTable
          data={testimonials.map((item) => ({
            id: item.id,
            image: item.photo,
            name: item.name,
            review: item.comment,
            app: item.application,
            rating: item.rating,
          }))}
          onView={handleView}
          onEdit={handleEditTestimonial}
          onDelete={handleDeleteClick}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
        <div className="flex gap-3 self-end sm:self-auto">
          <Button
            onClick={handleBack}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
            disabled={loading}
          >
            Kembali
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className={`bg-[#AA494E] text-[13px] font-bold rounded-lg text-white ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#B21E1E]"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <DeleteConfirmModal />
    </div>
  );
}