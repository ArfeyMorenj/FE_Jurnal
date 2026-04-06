import { useState, useEffect } from "react";
import apiClient from "../../../../../lib/axios";
import { Toasts } from "../../../../../utils/Toast";

export default function usePremiumDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiClient.get(`/premium-packages/${id}`);

        if (res.data?.meta?.code !== 200) {
          throw new Error(res.data?.meta?.message || "Gagal mengambil detail paket");
        }

        setData(res.data.data);
      } catch (err) {
        const errorMsg = err.response?.data?.meta?.message || err.message;
        setError(errorMsg);
        Toasts("error", 3000, "Gagal", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { data, loading, error };
}