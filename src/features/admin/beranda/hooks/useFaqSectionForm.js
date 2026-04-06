import { useState, useEffect } from "react";
import { Toasts } from "../../../../utils/Toast";
import { createFaq, updateFaq } from "../service/faqService";

export function useFaqSectionForm(initialSectionData, initialFaqs, recordMap) {
  const [formData, setFormData] = useState({
    title: "",
    cta_title: "",
    cta_description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      title: initialSectionData.title || "",
      cta_title: initialSectionData.cta_title || "",
      cta_description: initialSectionData.cta_description || "",
    });
  }, [initialSectionData]);

  const submit = async (currentFaqs, currentRecordMap) => {
    const { title, cta_title, cta_description } = formData;

    let newErrors = {};

    if (!cta_title?.trim()) {
        newErrors.cta_title = "Judul box FAQ wajib diisi";
    }

    if (!cta_description?.trim()) {
        newErrors.cta_description = "Deskripsi wajib diisi";
    }

    if (!title?.trim()) {
        newErrors.title = "Judul FAQ Section wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
    }

    if (currentFaqs.length === 0) {
        Toasts("error", 2000, "Validasi Gagal", "Minimal harus ada 1 FAQ");
        return false;
    }

    const invalidFaqs = currentFaqs.filter(
        (faq) => !faq.question?.trim() || !faq.answer?.trim()
    );

    if (invalidFaqs.length > 0) {
        Toasts("error", 3000, "Validasi Gagal", "Semua FAQ harus memiliki pertanyaan dan jawaban yang valid");
        return false;
    }

    setErrors({});
    setLoading(true);


    try {
      const sharedData = {
        title: title.trim(),
        cta_title: cta_title?.trim() || "",
        cta_description: cta_description?.trim() || "",
      };

      const updatePromises = [];
      const createPromises = [];

      for (const faq of currentFaqs) {
        const recordId = currentRecordMap[faq.id];

        const payload = {
          ...sharedData,
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        };

        if (recordId) {
          updatePromises.push(updateFaq(recordId, payload));
        } else {
          createPromises.push(createFaq(payload));
        }
      }

      await Promise.all([...updatePromises, ...createPromises]);

      Toasts("success", 2000, "Berhasil", "FAQ Section berhasil disimpan!");
      return true;
    } catch (err) {
      console.error("Failed to save FAQ section:", err);

      if (err?.response?.status === 422) {
        const backendErrors = err.response.data.errors || {};
        const firstError = Object.values(backendErrors)[0]?.[0] || "Validasi gagal";
        Toasts("error", 3000, "Validasi Gagal", firstError);
      } else {
        const message =
          err.response?.data?.meta?.message ||
          err.response?.data?.data ||
          "Gagal menyimpan data";
        Toasts("error", 3000, "Gagal", message);
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    submit,
  };
}