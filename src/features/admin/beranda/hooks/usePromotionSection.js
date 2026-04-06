import { useState, useEffect } from "react";
import apiClient from "../../../../lib/axios";
import { Toasts } from "../../../../utils/Toast";

export const usePromotionSection = (navigate) => {
  const [loading, setLoading] = useState(false);
  const [promotionId, setPromotionId] = useState(null);

  const [formData, setFormData] = useState({
    judul_section: "",
    subjudul_section: "",
    label_tombol: "",
    active_user: "",
    app_user: "",
    app_rate: "",
  });

  const [errors, setErrors] = useState({});

  // GET DATA
  const fetchPromotion = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get("/promotions");

      if (res.data) {
        const list =
          res.data.data?.data ||
          res.data.data ||
          [];

        if (!Array.isArray(list) || list.length === 0) {
          Toasts("warning", 3000, "Data Promotion Section masih kosong!");
          return;
        }

        const latest = list[list.length - 1];

        setPromotionId(latest.id);

        setFormData({
          judul_section: latest.title || "",
          subjudul_section: latest.subtitle || "",
          label_tombol: latest.button_label || "",
          active_user: latest.active_users || "",
          app_user: latest.app_users || "",
          app_rate: latest.app_rating || "",
        });
      }
    } catch (error) {
      console.error(error);
      Toasts("error", 3000, "Gagal memuat data Promotion Section.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["active_user", "app_user", "app_rate"];
    if (numericFields.includes(name)) {
      if (!/^[0-9]*$/.test(value)) return; // hanya angka
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    let newErrors = {};

    if (!formData.judul_section.trim()) newErrors.judul_section = "Judul wajib diisi!";
    if (!formData.subjudul_section.trim()) newErrors.subjudul_section = "Subjudul wajib diisi!";
    if (!formData.label_tombol.trim()) newErrors.label_tombol = "Label tombol wajib diisi!";

    const numericFields = [
      { key: "active_user", label: "Pengguna aktif" },
      { key: "app_user", label: "Pengguna aplikasi" },
      { key: "app_rate", label: "Rating aplikasi" },
    ];

    numericFields.forEach(({ key, label }) => {
      const value = formData[key];

      if (!value.trim()) {
        newErrors[key] = `${label} wajib diisi!`;
      } else if (!/^[0-9]+$/.test(value)) {
        newErrors[key] = `${label} harus berupa angka!`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    const payload = {
      judul_section: formData.judul_section,
      subjudul_section: formData.subjudul_section,
      label_tombol: formData.label_tombol,
      active_user: formData.active_user,
      app_user: formData.app_user,
      app_rate: formData.app_rate,
    };

    savePromotion(() => navigate(-1), payload);
  };

  // SAVE DATA
  const savePromotion = async (onSuccess, payload) => {
    try {
      setLoading(true);

      const formattedPayload = {
        title: payload.judul_section,
        subtitle: payload.subjudul_section,
        button_label: payload.label_tombol,
        button_link: payload.button_link ?? null,
        active_users: payload.active_user,
        app_users: payload.app_user,
        app_rating: payload.app_rate,
      };

      if (promotionId) {
        await apiClient.put(`/promotions/${promotionId}`, formattedPayload);
        Toasts("success", 3000, "Berhasil memperbarui Promotion Section!");
      } else {
        await apiClient.post(`/promotions`, formattedPayload);
        Toasts("success", 3000, "Berhasil menambahkan Promotion Section!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      Toasts("error", 3000, "Gagal menyimpan Promotion Section.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotion();
  }, []);

  return {
    loading,
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
};
