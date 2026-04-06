import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import Pagination from "../../../../components/Pagination";
import TestimonialTable from "../components/TestimonialTable";
import InputField from "../../../../components/common/InputField";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import useTestimonialSectionPage from "../hooks/useTestimonialPage";
import { SECTION_IDS } from "../../../../constants/sections";

export default function TestimonialSectionPage() {
  const SECTION_ID = SECTION_IDS.LANDING_PAGE;
  
  const {
    testimonials,
    leadInText,
    setLeadInText,
    loading,
    currentPage,
    lastPage,
    totalItems,
    handlePageChange,
    handleSave,
    handleAddTestimonial,
    handleDeleteClick,
    handleView,
    handleEditTestimonial,
  } = useTestimonialSectionPage(SECTION_ID);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Testimonial Section" }]} />

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

        {/* Pagination */}
        <div className="mt-8 flex flex-col">
          <div className="text-sm text-gray-600 hidden md:block">
            Menampilkan {testimonials.length} dari {totalItems} data
          </div>

          <div className="flex justify-center md:justify-end w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
        <div className="flex gap-3 self-end sm:self-auto">
          <Button
            onClick={() => window.history.back()}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
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