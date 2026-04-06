import { useState, useEffect } from "react";
import ModalWrapper from "../../../../components/ModalWrapper";
import TextareaField from "../../../../components/common/TextareaField";
import InputField from "../../../../components/common/InputField";

export default function EditFaqModal({
  isOpen,
  onClose,
  faq,
  sectionData,
  onUpdate,
  isSubmitting = false,
  errors = {},
  onClearError,
}) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (faq || sectionData) {
      setFormData({
        question: faq?.question || "",
        answer: faq?.answer || "",
      });
    }
  }, [faq, sectionData]);

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

  const handleUpdate = async () => {
    if (isSubmitting) return;
    const {  question, answer, } = formData;

    await onUpdate?.({
      ...faq,
      question,
      answer,
    });
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      icon="wpf:faq"
      iconBg="#E45E14"
      title="Edit FAQ"
      description="Edit FAQ Anda"
      confirmText={isSubmitting ? "Menyimpan..." : "Simpan"}
      confirmColor="bg-[#E45E14]"
      onConfirm={handleUpdate}
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