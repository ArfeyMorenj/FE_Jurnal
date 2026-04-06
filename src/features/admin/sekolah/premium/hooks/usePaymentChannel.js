import { useState, useEffect } from "react";
import apiClient from "../../../../../lib/axios";

export default function usePaymentChannels() {
  const [data, setData] = useState({ banks: [], ewallets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get("/payment/channel");
        const channels = res.data.data;

        const banks = channels.filter(ch => ch.type === "bank" && ch.active === 1);
        const ewallets = channels.filter(ch => ch.type === "e-wallet" && ch.active === 1);

        setData({ banks, ewallets });
      } catch (err) {
        console.error("Failed to fetch payment channels:", err);
        setError(err?.response?.data?.message || "Gagal mengambil metode pembayaran");
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return { data, loading, error };
}