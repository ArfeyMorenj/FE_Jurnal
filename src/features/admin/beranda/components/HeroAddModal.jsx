import ModalWrapper from "../../../../components/ModalWrapper";
import InputField from "../../../../components/common/InputField";
import TextareaField from "../../../../components/common/TextareaField";
import FileInput from "../../../../components/common/FileInput";
import { useHeroForm } from "../hooks/useHeroForm";

export default function HeroAddModal({ isOpen, onClose, onSave, sectionId }) {
  
  const { formData, setFormData, errors, setErrors, loading, submit, reset } = useHeroForm(
    {
      title: "",
      description: "",
      button_link: "",
      image: null,
    },
    null, 
    sectionId
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, value, error } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
 
  const handleSubmit = async () => {
    const success = await submit();
    if (success) {
      reset(); 
      onSave?.(); 
      onClose();  
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      icon="material-symbols:star-shine-rounded"
      iconBg="#AA494E"
      title="Tambah Slide Hero Section"
      description="Tambahkan (maksimal 5) slide yang akan ditampilkan di halaman awal landing"
      confirmText={loading ? "Menyimpan..." : "Tambah"}
      confirmColor="bg-[#AA494E]"
      onConfirm={handleSubmit}
      disabled={loading}
    >
      <div className="space-y-4">
        <FileInput
          label="Masukkan Gambar"
          name="image"
          required
          accept="image/*"
          onChange={handleImageChange}
          error={errors.image}
        />

        <InputField
          name="title"
          label="Masukkan Headline"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan headline utama landing page"
          required
          error={errors.title}
        />

        <TextareaField
          name="description"
          label="Masukkan Subheadline"
          value={formData.description}
          onChange={handleChange}
          placeholder="Masukkan subheadline pendukung headline utama"
          required
          error={errors.description}
        />

        <InputField
          name="button_link"
          label="Link Tombol Call-to-Action (CTA)"
          value={formData.button_link}
          onChange={handleChange}
          placeholder="Masukka Link Tombol Call-to-Action (CTA)"
          required
          error={errors.button_link}
          styleInput="!mb-0"
        />
      </div>
    </ModalWrapper>
  );
}
