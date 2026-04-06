import { useState, useEffect } from "react";
import ModalWrapper from "../../../../../components/ModalWrapper";
import { Globe } from "lucide-react";
import InputField from "../../../../../components/common/InputField";
import TextareaField from "../../../../../components/common/TextareaField";

const HistoryModalEdit = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  initialData,
  errors
}) => {
  const defaultForm = {
    year: "",
    description: ""
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
  if (isOpen) {
    setFormData({
      year: initialData?.year ? String(initialData.year) : "",
      description: initialData?.description ?? "",
    });
  }
}, [isOpen, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      icon={<Globe size={24} />}
      iconBg="#AA494E"
      title="Edit Perjalanan"
      description="Ubah data perjalanan"
      confirmText="Simpan"
      cancelText="Batal"
      loading={loading}
      confirmColor="bg-[#AA494E]"
      cancelColor="bg-[#A0A0A0]"
    >
      <div className="space-y-4">
        <InputField
          label="Tahun"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          error={errors?.year}
          required
        />

        <TextareaField
          label="Deskripsi"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors?.description}
          rows={4}
          required
        />
      </div>
    </ModalWrapper>
  );
};

export default HistoryModalEdit;
