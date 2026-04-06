import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../lib/axios";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";

export default function useTestimonialSectionApp(sectionId) {
  const navigate = useNavigate();
  const { openDeleteModal } = useDeleteModal();

  const [testimonials, setTestimonials] = useState([]);
  const [leadInText, setLeadInText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    if (!sectionId) {
      setError("Section ID tidak ditemukan. Pastikan navigasi dari halaman aplikasi.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/sections/${sectionId}/testimonials`);
           
      const responseData = response.data?.data;
      
      const testimonialsData = Array.isArray(responseData?.data) 
        ? responseData.data 
        : [];
      
      setTestimonials(testimonialsData);

      const firstWithLeadIn = testimonialsData.find(item => item.lead_in_text);
      if (firstWithLeadIn?.lead_in_text) {
        setLeadInText(firstWithLeadIn.lead_in_text);
      } else {
        setLeadInText("");
      }

    } catch (err) {

      if (err.response?.status === 404) {
        setTestimonials([]);
        setLeadInText("");
        setError(null);
      } else {
        const message = err.response?.data?.message || "Gagal memuat testimonial";
        setError(message);
        Toasts("error", 3000, "Error", message);
      }
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) {
      fetchTestimonials();
    }
  }, [fetchTestimonials, sectionId]);

  const handleSave = async () => {
    if (!sectionId) {
      Toasts("error", 3000, "Error", "Section ID tidak ditemukan");
      return;
    }

    if (!leadInText.trim()) {
      Toasts("error", 3000, "Gagal Simpan", "Lead-in text wajib diisi");
      return;
    }

    const targetTestimonial = testimonials.find(t => t.lead_in_text) || testimonials[0];
    
    if (!targetTestimonial) {
      Toasts("error", 3000, "Error", "Tidak ada testimonial untuk disimpan");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("lead_in_text", leadInText.trim());
      formData.append("name", targetTestimonial.name);
      formData.append("comment", targetTestimonial.comment);
      formData.append("application", targetTestimonial.application);
      formData.append("rating", targetTestimonial.rating);

      await apiClient.post(
        `/sections/${sectionId}/testimonials/${targetTestimonial.id}?_method=PUT`,
        formData
      );

      Toasts("success", 3000, "Berhasil", "Lead-in text berhasil disimpan");
      await fetchTestimonials(); 
      navigate(-1);
    } catch (err) {
      console.error('❌ Error saving lead-in text:', err);
      const message = err.response?.data?.message || "Gagal menyimpan lead-in text";
      Toasts("error", 3000, "Gagal", message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = () => {
    if (!sectionId) {
      Toasts("error", 3000, "Error", "Section ID tidak ditemukan");
      return;
    }
    navigate(`/admin/aplikasi/testimonial-add/${sectionId}`);
  };

  const handleDeleteClick = (testimonial) => {
    const id = typeof testimonial === "string" ? testimonial : testimonial.id;
    if (!id) return;

    openDeleteModal(id, async () => {
      setLoading(true);
      try {
        await apiClient.delete(`/sections/${sectionId}/testimonials/${id}`);
        Toasts("success", 3000, "Berhasil", "Testimonial berhasil dihapus");
        await fetchTestimonials(); 
      } catch (err) {
        const message = err.response?.data?.message || "Gagal menghapus testimonial";
        Toasts("error", 3000, "Gagal", message);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleView = (item) => {
    const id = typeof item === "string" ? item : item.id;
    if (!id) return;
    navigate(`/admin/aplikasi/testimonial-detail/${sectionId}/${id}`);
  };

  const handleEditTestimonial = (item) => {
    const id = typeof item === "string" ? item : item.id;
    if (!id) return;
    navigate(`/admin/aplikasi/testimonial-edit/${sectionId}/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return {
    testimonials,
    leadInText,
    setLeadInText,
    loading,
    error,
    sectionId,
    handleSave,
    handleAddTestimonial,
    handleDeleteClick,
    handleView,
    handleEditTestimonial,
    handleBack,
  };
}