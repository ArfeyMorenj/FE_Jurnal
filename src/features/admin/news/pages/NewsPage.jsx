import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import InputField from "../../../../components/common/InputField";
import FileInput from "../../../../components/common/FileInput";
import TextareaField from "../../../../components/common/TextareaField";
import Button from "../../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useHeroForm } from "../../beranda/hooks/useHeroForm";
import { useHero } from "../../beranda/hooks/useHero";
import { SECTION_IDS } from "../../../../constants/sections";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const SECTION_ID = SECTION_IDS.BERITA;

const NewsPage = () => {
  const navigate = useNavigate();
  const { heroes, loading: loadingHeroes } = useHero(SECTION_ID);

  const [heroId, setHeroId] = useState(null);

  const {
    formData,
    errors,
    setErrors,
    setFormData,
    submit,
    loading,
  } = useHeroForm(
    {
      title: "",
      description: "",
      button_link: "",
      image: null,
    },
    heroId, 
    SECTION_ID
  );

  useEffect(() => {
    if (heroes.length === 0) {
      setHeroId(null); 
      return;
    }

    const item = heroes[0];
    setHeroId(item.id);

    setFormData({
      title: item.title ?? "",
      description: item.description ?? "",
      button_link: item.button_link ?? "",
      image: item.image ?? null,
    });
  }, [heroes, setFormData]);

  const handleChange = (e) => {
    const { name, value, files, error } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submit();
    if (success) {
    }
  };

  if (loadingHeroes) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs />

      <form onSubmit={handleSubmit}>
        <FormSectionWrapper
          title="Hero Section"
          description="Akan tampil di bagian paling atas halaman ruang berita."
        >
          <FileInput
            label="Masukkan Gambar"
            name="image"
            required
            accept="image/*"
            value={formData.image}
            onChange={handleChange}
            error={errors.image}
          />

          <InputField
            label="Masukkan Headline*"
            name="title"
            placeholder="Masukkan headline ruang berita"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />

          <TextareaField
            label="Masukkan Deskripsi"
            name="description"
            placeholder="Masukkan subheadline sebagai pendukung headline"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            required
          />

          <InputField
            label="Label Tombol CTA"
            name="button_link"
            placeholder="Masukkan label untuk tombol CTA"
            value={formData.button_link}
            onChange={handleChange}
            error={errors.button_link}
            required
            note="Tombol ini berfungsi untuk scroll ke bawah"
          />
        </FormSectionWrapper>

        <div className="flex justify-center sm:justify-end items-center gap-3 p-5 bg-white rounded-[10px]">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-[#8B8B8B] text-white font-bold rounded-lg hover:bg-gray-500"
          >
            Kembali
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#AA494E] text-white font-bold rounded-lg hover:bg-[#B21E1E] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsPage;
