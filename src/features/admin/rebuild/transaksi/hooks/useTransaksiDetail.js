import { useState, useEffect } from "react";
import apiClient from "../../../../../lib/axios";

export default function useTransaksiDetail(reference) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      return;
    }

    const fetchTransaksiDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get(`/payment/detail-transaction/${reference}`);
        const transaksiData = res.data.data;

        if (typeof transaksiData.order_items === "string") {
          transaksiData.order_items = JSON.parse(transaksiData.order_items);
        }

        if (typeof transaksiData.instructions === "string" && transaksiData.instructions) {
          transaksiData.instructions = JSON.parse(transaksiData.instructions);
        }

        setData(transaksiData);
      } catch (err) {
        console.error("Failed to fetch transaction detail:", err);
        setError(err?.response?.data?.message || "Gagal mengambil detail transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksiDetail();
  }, [reference]);

  return { data, loading, error };
}