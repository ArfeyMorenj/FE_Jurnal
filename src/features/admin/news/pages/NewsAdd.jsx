import React from "react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import { Icon } from "@iconify/react";
import SelectField from "../../../../components/common/SelectField";
import InputField from "../../../../components/common/InputField";
import TagInput from "../../../../components/common/TagInput";
import RichTextEditor from "../../../../components/common/RichTextEditor";
import Button from "../../../../components/common/Button";
import { FaCheckSquare } from "react-icons/fa";
import { IoSquareOutline } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNewsCategories } from "../hooks/useNewsCategories";
import { useNewsForm } from "../hooks/useNewsForm";
import { useNavigate } from "react-router-dom";

const NewsAdd = () => {
  const navigate = useNavigate()
  const {
    options: categoryOptions,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useNewsCategories();

  const {
    formData,
    thumbnailPreview,
    errors,
    isSubmitting,
    handleImageChange,
    handleClearImage,
    handleChange,
    handleTagsChange,
    handleContentChange,
    handleTogglePublish,
    handleSubmit,
  } = useNewsForm();

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs manual={[{ label: "Buat Berita" }]} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FormSectionWrapper
          title="Buat Berita"
          description="Buat dan publikasi sebuah berita yang menarik untuk dibaca."
        >
          {categoryError && (
            <p className="text-red-500 text-sm mb-4">{categoryError}</p>
          )}
          <div className="w-full mb-8">
            <label className="block text-[13px] inter text-black mb-3 flex items-center gap-2">
              Unggah Gambar Thumbnail <span className="text-primary-orange">*</span>
            </label>
            {errors.thumbnailFile && (
              <p className="text-red-500 text-xs flex items-center gap-1 mb-2">
                <IoAlertCircleOutline /> {errors.thumbnailFile}
              </p>
            )}
            <div className="relative p-1 w-[220px] h-[150px] md:w-[500px] md:h-[282px] rounded-lg flex items-center justify-center bg-[#F9FAFB] cursor-pointer hover:bg-gray-100 transition">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="8"
                  ry="8"
                  fill="none"
                  stroke="rgba(160, 160, 160, 0.7)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              </svg>

              {thumbnailPreview ? (
                <>
                  <img
                    src={thumbnailPreview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute -top-2 -right-2 bg-[#DE1B1B] text-white rounded-full p-1.5 z-10 transform transition-transform hover:scale-110"
                  >
                    <Icon icon="streamline:delete-1-solid" width="10" height="10" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center text-[#8B8B8B] text-sm cursor-pointer z-10">
                  <span className="text-xl">
                    <img
                      src="/images/photo.png"
                      alt="Tambah Gambar"
                      className="w-[100px] h-[100px]"
                    />
                  </span>
                  <span className="text-xl font-medium inter">Unggah Gambar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <SelectField
            label="Kategori Berita"
            required
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            options={categoryOptions}
            placeholder={
              isCategoriesLoading ? "Memuat kategori..." : "- Pilih Kategori Berita -"
            }
            disabled={isCategoriesLoading}
            error={errors.category_id}
          />

          <InputField
            label="Judul Berita"
            name="title"
            placeholder="Masukkan judul berita Anda"
            value={formData.title}
            onChange={handleChange}
            required
            error={errors.title}
          />

          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Hashtag Berita (#) <span className="text-primary-orange">*</span>
            </label>
            <TagInput 
              value={formData.tags} 
              onChange={handleTagsChange}
              error={errors.tags}
            />
            <p className="text-xs text-[#8B8B8B]/70 inter">tekan <span className="font-bold">enter</span> setelah menginputkan hashtag</p>
          </div>

          <RichTextEditor
            label="Deskripsi / Isi Berita"
            name="content"
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Masukkan deskripsi berita Anda di sini"
            required
            height="400px"
            error={errors.content}
          />
        </FormSectionWrapper>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none inter text-[13px] text-[#8B8B8B80] font-medium">
            <input
              type="checkbox"
              checked={!formData.is_published}
              onChange={handleTogglePublish}
              className="hidden"
            />
            <span className="text-xl">
              {!formData.is_published ? (
                <FaCheckSquare className="text-primary-red" />
              ) : (
                <IoSquareOutline className="text-[#D2D2D2]" />
              )}
            </span>
            Jangan Publikasikan Berita Saya
          </label>

          <div className="flex gap-3 self-end sm:self-auto">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#AA494E] text-[13px] font-bold rounded-lg hover:bg-[#B21E1E] text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Buat Berita"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsAdd;
