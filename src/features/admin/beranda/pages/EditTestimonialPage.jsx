import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { IoMdStar } from "react-icons/io";
import InputField from "../../../../components/common/InputField";
import FileInput from "../../../../components/common/FileInput";
import TextareaField from "../../../../components/common/TextareaField";
import Button from "../../../../components/common/Button";
import useEditTestimonial from "../hooks/useEditTestimonial";

const EditTestimonialPage = () => {
  const { sectionId, id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    rating,
    preview,
    loading,
    setRating,
    handleChange,
    handleSubmit,
    errors,
  } = useEditTestimonial(sectionId, id, navigate);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs
        manual={[
          { label: "Testimonial Section", path: "/admin/beranda/testimonial-section" },
          { label: "Edit Testimonial" },
        ]}
      />

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-7.5 rounded-[10px]">
          <FileInput
            label="Gambar Profile"
            name="gambar_profile"
            required
            accept="image/*"
            onChange={handleChange}
            value={formData.gambar_profile || preview}
            error={errors.gambar_profile}
          />

          <InputField
            label="Nama User"
            name="user_name"
            placeholder="Masukkan nama Anda"
            value={formData.user_name}
            onChange={handleChange}
            required
            error={errors.user_name}
          />

          <TextareaField
            label="Alasan Pengguna"
            name="review"
            placeholder="Ceritakan alasan Anda"
            value={formData.review}
            onChange={handleChange}
            required
            error={errors.review}
          />

          <InputField
            label="Nama Aplikasi"
            name="app_name"
            placeholder="Masukkan nama aplikasi"
            value={formData.app_name}
            onChange={handleChange}
            required
            error={errors.app_name}
          />

          <div className="flex flex-col items-start gap-2">
            <label className="inter font-regular text-[13px] text-black">
              Rating Pengguna<span className="text-primary-orange">*</span>
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <IoMdStar
                  key={star}
                  size={30}
                  onClick={() => {
                    setRating(prev => {
                      if (prev === star) return 0; 
                      return star; 
                    });
                  }}
                  className={`cursor-pointer transition-colors ${
                    star <= rating ? "text-[#FFAD33]" : "text-[#D2D2D2]"
                  }`}
                />
              ))}
            </div>

            {errors.rating && (
              <p className="text-red-500 text-[11px] mt-1">{errors.rating}</p>
            )}

            <p className="text-[10px] text-[#8B8B8B50] inter">
              Pilih rating yang sesuai dengan tingkat kepuasan pengguna.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
          <div className="flex gap-3 self-end sm:self-auto">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
            >
              Kembali
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={`bg-[#AA494E] text-[13px] font-bold rounded-lg text-white ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#B21E1E]"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonialPage;
