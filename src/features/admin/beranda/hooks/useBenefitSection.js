import { useState, useEffect } from "react";
import apiClient from "../../../../lib/axios";
import { Toasts } from "../../../../utils/Toast";

export const useBenefitSection = () => {
  const [loading, setLoading] = useState(false);
  const [benefitId, setBenefitId] = useState(null);
  const [formData, setFormData] = useState({ deskripsi: "" });
  const [benefits, setBenefits] = useState([{ id: 1, value: "" }]);
  const [errors, setErrors] = useState({});

  // GET
  const fetchBenefitSection = async () => {https://2814-125-166-0-162.ngrok-free.app/api/applications/all
    try {
      setLoading(true);
      const res = await apiClient.get("/benefits");

      if (res.data) {
        const list = res.data.data;
        if (!list.length) return;

        const latest = list[list.length - 1];

        setBenefitId(latest.id);

        setFormData({
          deskripsi: latest.description || "",
        });

        const benefitArray = latest.benefit
          ? latest.benefit.split(",").map((b) => b.trim())
          : [];

        setBenefits(
          benefitArray.length
            ? benefitArray.map((val, idx) => ({
                id: idx + 1,
                value: val,
              }))
            : [{ id: 1, value: "" }]
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // SAVE
  const saveBenefitSection = async (onSuccess, payload) => {
    try {
      setLoading(true);
      const newErrors = {};

      // VALIDASI DESKRIPSI
      if (!payload.description.trim()) {
        newErrors.description = "Deskripsi wajib diisi!";
      }

      // VALIDASI BENEFIT
      benefits.forEach((b, idx) => {
        if (!b.value.trim()) {
          newErrors[`benefits.${idx}.value`] =
            `Benefit ${idx + 1} wajib diisi!`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      setErrors({});

      // PUT
      if (benefitId) {
        await apiClient.put(`/benefits/${benefitId}`, payload);
        Toasts("success", 3000, "Berhasil memperbarui Benefit Section!");
      }
      // POST
      else {
        await apiClient.post(`/benefits`, payload);
        Toasts("success", 3000, "Berhasil menambahkan Benefit Section!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      Toasts("error", 3000, "Gagal menyimpan data Benefit Section.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenefitSection();
  }, []);

  return {
    loading,
    formData,
    setFormData,
    benefits,
    setBenefits,
    errors,
    saveBenefitSection,
  };
};
