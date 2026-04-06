import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../lib/axios";
import { Toasts } from "../../../../utils/Toast";
import { validateHeroSectionForm } from "../helper/Validate";

export const useHeroSectionForm = (sectionId) => {
  const navigate = useNavigate();
  
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    button_text: "",
    button_link: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageRemoved, setImageRemoved] = useState(false); 

  const isEditMode = Boolean(heroData);

  const fetchHeroSection = useCallback(async () => {
    if (!sectionId) {
      setError("Section ID tidak ditemukan. Pastikan navigasi dari halaman aplikasi.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/sections/${sectionId}/banners`);
      const data = response.data?.data;
      
      const banner = Array.isArray(data) ? data[0] : data;
      setHeroData(banner || null);
      
    } catch (err) {
      if (err.response?.status === 404) {
        setHeroData(null);
        setError(null);
      } else {
        const message = err.response?.data?.message || "Gagal memuat hero section";
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) {
      fetchHeroSection();
    }
  }, [fetchHeroSection, sectionId]);

  useEffect(() => {
    if (heroData) {
      setFormData({
        title: heroData.title || "",
        description: heroData.description || "",
        image: null,
        button_text: heroData.button_text || "",
        button_link: heroData.button_link || "",
      });
      setFormErrors({});
      setImageRemoved(false); 
    }
  }, [heroData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, value, error: fileError } = e.target;
    
    if (fileError) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: fileError,
      }));
      return;
    }
    
    if (name === 'image' && value === null && isEditMode) {
      setImageRemoved(true);
    } else if (name === 'image' && value instanceof File) {
      setImageRemoved(false);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sectionId) {
      Toasts("error", 3000, "Error", "Section ID tidak ditemukan");
      return;
    }
    
    const validationErrors = validateHeroSectionForm(
      formData, 
      isEditMode, 
      heroData?.image,
      imageRemoved
    );
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      
      const firstError = Object.values(validationErrors)[0];
      Toasts("error", 3000, "Validasi Gagal", firstError);
      return;
    }
    
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      
      submitFormData.append("title", formData.title.trim());
      submitFormData.append("description", formData.description.trim());
      submitFormData.append("button_text", formData.button_text.trim());
      submitFormData.append("button_link", formData.button_link.trim());

      if (formData.image instanceof File) {
        submitFormData.append("image", formData.image);
      }

      if (isEditMode) {
        await apiClient.post(
          `/sections/${sectionId}/banners/${heroData.id}`,
          submitFormData
        );
        Toasts("success", 3000, "Berhasil", "Hero section berhasil diperbarui");
      } else {
        await apiClient.post(
          `/sections/${sectionId}/banners`,
          submitFormData
        );
        Toasts("success", 3000, "Berhasil", "Hero section berhasil dibuat");
      }

      await fetchHeroSection();

      if (!isEditMode) {
        setFormData({
          title: "",
          description: "",
          image: null,
          button_text: "",
          button_link: "",
        });
      }

      setFormErrors({});
      
      navigate(-1);
      
    } catch (err) {      
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const backendErrors = err.response.data.errors;
        const formatted = {};
        Object.keys(backendErrors).forEach((key) => {
          formatted[key] = backendErrors[key][0] || backendErrors[key];
        });
        setFormErrors(formatted);
        
        const firstError = Object.values(formatted)[0];
        Toasts("error", 3000, "Validasi Gagal", firstError);
      } else {
        const message = err.response?.data?.message || 
          `Gagal ${isEditMode ? "memperbarui" : "membuat"} hero section`;
        Toasts("error", 3000, "Gagal", message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    isLoading,
    error,
    heroData,
    isEditMode,
    sectionId, 
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleBack,
  };
};