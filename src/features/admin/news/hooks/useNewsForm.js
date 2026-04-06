import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../services/newsService";
import { Toasts } from "../../../../utils/Toast";
import { validateForm } from "../helper/Validate";

/**
 * Custom hook for managing news form
 * @returns {Object} Form state, handlers, and submission logic
 */
export const useNewsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tags: [],
    is_published: true,
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    // Clear error for thumbnail when user selects a file
    if (errors.thumbnailFile) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.thumbnailFile;
        return newErrors;
      });
    }
  };

  const handleClearImage = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
    // Clear error for tags when user adds a tag
    if (errors.tags) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.tags;
        return newErrors;
      });
    }
  };

  const handleContentChange = (event) => {
    setFormData((prev) => ({ ...prev, content: event.target.value }));
    // Clear error for content when user starts typing
    if (errors.content) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  const handleTogglePublish = () => {
    setFormData((prev) => ({
      ...prev,
      is_published: !prev.is_published,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validateForm(formData, thumbnailFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    try {
      await createNews({
        title: formData.title,
        category_id: formData.category_id,
        content: formData.content,
        hashtags: formData.tags,
        is_published: formData.is_published,
        thumbnail: thumbnailFile,
      });

      Toasts("success", 3000, "Berhasil", "Berita berhasil dibuat.");
      navigate("/admin/berita");
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        // Map backend errors to form errors
        const mappedErrors = {};
        Object.keys(backendErrors).forEach((key) => {
          if (backendErrors[key] && backendErrors[key][0]) {
            mappedErrors[key] = backendErrors[key][0];
          }
        });
        setErrors(mappedErrors);

        const firstError = Object.values(backendErrors)[0]?.[0];
        Toasts("error", 3000, "Gagal", firstError || "Validasi gagal.");
      } else {
        const message =
          error.response?.data?.message || "Gagal membuat berita.";
        Toasts("error", 3000, "Gagal", message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    thumbnailFile,
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
  };
};

