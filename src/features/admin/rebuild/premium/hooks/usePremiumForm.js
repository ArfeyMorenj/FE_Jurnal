import { useState, useEffect } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { validatePremiumForm } from "../schemas/premiumSchemas";

export const usePremiumForm = ({ initialData = null, onSubmit } = {}) => {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    masa: "",
    keterangan: "",
    benefit: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        harga: initialData.harga || "",
        masa: initialData.masa || "1 Bulan",
        keterangan: initialData.keterangan || "",
        benefit: initialData.benefit || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleContentChange = (name, value) => {
    const val = typeof value === "string" ? value : value?.target?.value || "";
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validatePremiumForm(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (err) {
      Toasts("error", 3000, "Gagal", err?.message || "Gagal menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleContentChange,
    handleSubmit,
  };
};
