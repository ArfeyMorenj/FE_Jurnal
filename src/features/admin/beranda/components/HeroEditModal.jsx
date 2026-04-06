import { useEffect } from "react";
import ModalWrapper from "../../../../components/ModalWrapper";
import InputField from "../../../../components/common/InputField";
import TextareaField from "../../../../components/common/TextareaField";
import FileInput from "../../../../components/common/FileInput";
import { useHeroForm } from "../hooks/useHeroForm";

export default function HeroEditModal({ isOpen, onClose, hero, onUpdate, sectionId }) {
  const { formData, setFormData, errors, loading, submit, setErrors } = useHeroForm(
    hero || {},
    hero?.id,
    sectionId
  );

  useEffect(() => {
    if (hero) {
      setFormData({
        title: hero.title || "",
        description: hero.description || "",
        button_link: hero.button_link || "",
        image: hero.image || "",
      });
    }
  }, [hero, setFormData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; 

    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, image: prev.image }));
    }
  };

  const handleSubmit = async () => {
    const result = await submit(); 
    if (result) {
      onUpdate?.(); 
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      icon="material-symbols:star-shine-rounded"
      iconBg="#E45E14"
      title="Edit Slide Hero Section "
      description="Edit (maksimal 5) slide yang akan ditampilkan di halaman awal landing."
      confirmText={loading ? "Menyimpan..." : "Simpan"}
      confirmColor="bg-[#E45E14]"
      onConfirm={handleSubmit}
    >
      <div className="space-y-4">
        <FileInput
          label="Edit Gambar (opsional)"
          name="image"
          accept="image/*"
          value={formData.image}        
          onChange={handleImageChange}
          error={errors.image}
          note="Kosongkan jika tidak ingin mengganti gambar."
        />

        <InputField
          label="Headline"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Masukkan headline hero"
          error={errors.title}
        />

        <TextareaField
          label="Subheadline"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Masukkan deskripsi singkat hero"
          error={errors.description}
        />

        <InputField
          label="Link Tombol Call-to-Action (CTA)"
          name="button_link"
          value={formData.button_link || ""}
          onChange={handleChange}
          placeholder="Masukkan Link Tombol Call-to-Action (CTA)"
          error={errors.button_link}
        />
      </div>
    </ModalWrapper>
  );
}
