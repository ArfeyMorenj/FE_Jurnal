import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import InputField from "../../../../components/common/InputField";
import FileInput from "../../../../components/common/FileInput";
import TextareaField from "../../../../components/common/TextareaField";
import Button from "../../../../components/common/Button";
import { IoMdStar } from "react-icons/io";
import useAddTestimonial from "../hooks/useAddTestimonial";

const AddTestimonialPage = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const { formData, rating, loading, handleChange, handleSubmit, setRating, errors } = useAddTestimonial(sectionId);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs
        manual={[
          { label: "Testimonial Section", path: "/admin/beranda/testimonial-section" },
          { label: "Tambah Testimonial" },
        ]}
      />

      <form onSubmit={(e) => handleSubmit(e, navigate)}>
        <div className="bg-white p-7.5 rounded-[10px]">
          <FileInput
            label="Gambar Profile"
            name="gambar_profile"
            required
            accept="image/*"
            onChange={handleChange}
            error={errors.gambar_profile}
          />

          <InputField
            label="Nama User"
            name="user_name"
            placeholder="Masukkan nama Anda untuk ditampilkan di testimoni"
            value={formData.user_name}
            onChange={handleChange}
            required
            note="Nama yang akan tampil di testimoni"
            error={errors.user_name}
          />

          <TextareaField
            label="Alasan Pengguna"
            name="review"
            placeholder="Ceritakan alasan Anda memberikan testimoni"
            value={formData.review}
            onChange={handleChange}
            required
            note="Alasan pengguna memberikan testimoni"
            error={errors.review}
          />

          <InputField
            label="Nama Aplikasi"
            name="app_name"
            placeholder="Masukkan nama aplikasi yang ingin ditampilkan"
            value={formData.app_name}
            onChange={handleChange}
            required
            note="Judul atau Nama Aplikasi"
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
                  onClick={() => setRating(star)}
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
              Pilih rating yang mewakili tingkat kepuasan pengguna terhadap layanan atau aplikasi.
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
              {loading ? "Menambah..." : "Tambah"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonialPage;
