import { useState, useEffect } from "react";
import InputField from "../../../../components/common/InputField";
import ModalWrapper from "../../../../components/ModalWrapper";
import TextareaField from "../../../../components/common/TextareaField";

export default function AddFaqModal({ isOpen, onClose, onSave, errors = {}, onClearError }) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // Reset form saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData({ question: "", answer: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (errors[name] && onClearError) {
      onClearError(name);
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      icon="wpf:faq"
      iconBg="#AA494E"
      title="Tambah FAQ"
      description="Tambahkan (maksimal 5) FAQ yang sering ditanyakan oleh orang-orang"
      confirmText="Tambah"
      confirmColor="bg-[#AA494E]"
      onConfirm={handleSave}
    >
      <div className="space-y-4">
        <InputField
          name="question"
          label="Pertanyaan"
          value={formData.question}
          onChange={handleChange}
          placeholder="Masukkan pertanyaan..."
          required
          error={errors.question}
        />
        <TextareaField
          name="answer"
          label="Jawaban"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Masukkan jawaban..."
          required
          error={errors.answer}
        />
      </div>
    </ModalWrapper>
  );
}