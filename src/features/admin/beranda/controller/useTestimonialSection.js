import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../../lib/axios";
import { getApiUrl } from "../../../../config/api";
import { Toasts } from "../../../../utils/Toast";

export const useTestimonialSection = (sectionId, options = {}) => {
  const { mode = "admin" } = options;
  
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [leadInText, setLeadInText] = useState("");
  const [error, setError] = useState(null);
  
  // Pagination states hanya untuk admin 
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const getBaseUrl = () => `/sections/${sectionId}/testimonials`;

  const normalizeList = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    return [];
  };

  const fetchTestimonials = useCallback(async (page = 1) => {
    if (!sectionId) return;
    
    setLoading(true);
    setError(null);

    try {
      const url = mode === "admin" 
        ? getApiUrl(`${getBaseUrl()}?page=${page}`)
        : getApiUrl(getBaseUrl());
      
      const { data } = await apiClient.get(url);
      
      const fetched = normalizeList(data?.data);
      setTestimonials(fetched);

      if (mode === "admin") {
        const paginate = data?.data?.paginate;
        if (paginate) {
          setCurrentPage(paginate.current_page);
          setLastPage(paginate.last_page);
          setTotalItems(paginate.total);
          setPerPage(paginate.per_page);
        }
      }

      if (fetched.length > 0) {
        setLeadInText(fetched[0]?.lead_in_text || "");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal memuat data testimonial.";

      setError(err);
      
      if (mode === "admin") {
        Toasts("error", 3000, "Gagal", message);
      }
    } finally {
      setLoading(false);
    }
  }, [sectionId, mode]);

  const getTestimonialById = useCallback(async (id) => {
    if (!sectionId) return null;
    
    try {
      const { data } = await apiClient.get(
        getApiUrl(`${getBaseUrl()}/${id}`)
      );
      return data?.data || null;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal mengambil data testimonial.";

      Toasts("error", 3000, "Gagal", message);
      throw err;
    }
  }, [sectionId]);

  const createTestimonial = useCallback(async (payload) => {
    if (!sectionId) return null;
    
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post(
        getApiUrl(getBaseUrl()),
        payload
      );

      const newItem = data?.data || null;

      if (newItem) {
        setTestimonials((prev) => [...prev, newItem]);
      }

      Toasts("success", 3000, "Berhasil", "Testimonial berhasil ditambahkan!");
      return newItem;
    } catch (err) {
      const message =
        err?.response?.data?.errors?.[0] ||
        err?.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat menambahkan testimonial.";

      setError(err);
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  const updateLeadInText = async (text) => {
    if (!sectionId || !testimonials || testimonials.length === 0) return;

    const first = testimonials[0];

    const formData = new FormData();
    formData.append("lead_in_text", text);
    formData.append("name", first.name);
    formData.append("comment", first.comment);
    formData.append("application", first.application);
    formData.append("rating", first.rating);

    try {
      await apiClient.post(
        getApiUrl(`${getBaseUrl()}/${first.id}?_method=PUT`),
        formData
      );

      Toasts("success", 3000, "Berhasil", "Lead-in text berhasil diperbarui");
      fetchTestimonials();
    } catch (error) {
      Toasts("error", 3000, "Gagal", "Lead-in text gagal diperbarui");
    }
  };

  const updateTestimonial = useCallback(async (id, payload) => {
    if (!sectionId) return null;
    
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post(
        getApiUrl(`${getBaseUrl()}/${id}?_method=PUT`),
        payload
      );

      const updated = data?.data;

      setTestimonials((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );

      Toasts("success", 3000, "Berhasil", "Testimonial berhasil diperbarui!");
      return updated;
    } catch (err) {
      const message =
        err?.response?.data?.errors?.[0] ||
        err?.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat memperbarui testimonial.";

      setError(err);
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  const deleteTestimonial = useCallback(async (id) => {
    if (!sectionId) return;
    
    setLoading(true);
    setError(null);

    try {
      await apiClient.delete(getApiUrl(`${getBaseUrl()}/${id}`));

      setTestimonials((prev) => prev.filter((item) => item.id !== id));

      Toasts("success", 3000, "Berhasil", "Testimonial berhasil dihapus!");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Terjadi kesalahan saat menghapus testimonial.";

      setError(err);
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) {
      fetchTestimonials(currentPage);
    }
  }, [sectionId, fetchTestimonials]);

  const handlePageChange = (page) => {
    if (mode === "admin") {
      setCurrentPage(page);
      fetchTestimonials(page);
    }
  };

  return {
    testimonials,
    leadInText,
    setLeadInText,
    loading,
    error,
    
    currentPage,
    lastPage,
    totalItems,
    perPage,
    handlePageChange,

    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    updateLeadInText,
    deleteTestimonial,
    getTestimonialById,
  };
};

export default useTestimonialSection;