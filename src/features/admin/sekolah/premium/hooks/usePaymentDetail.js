import { useState, useEffect } from "react";
import apiClient from "../../../../../lib/axios";

export default function usePaymentDetail(reference) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      return;
    }

    const fetchPaymentDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get(`/payment/detail-transaction/${reference}`);
        const paymentData = res.data.data;

        if (typeof paymentData.order_items === "string") {
          paymentData.order_items = JSON.parse(paymentData.order_items);
        }

        if (typeof paymentData.instructions === "string") {
          paymentData.instructions = JSON.parse(paymentData.instructions);
        }

        setData(paymentData);
      } catch (err) {
        console.error("Failed to fetch payment detail:", err);
        setError(err?.response?.data?.message || "Gagal mengambil detail pembayaran");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetail();
  }, [reference]);

  const refetch = async () => {
    if (!reference) return;

    try {
      setLoading(true);
      setError(null);

      const res = await apiClient.get(`/payment/detail-transaction/${reference}`);
      const paymentData = res.data.data;

      if (typeof paymentData.order_items === "string") {
        paymentData.order_items = JSON.parse(paymentData.order_items);
      }

      if (typeof paymentData.instructions === "string") {
        paymentData.instructions = JSON.parse(paymentData.instructions);
      }

      setData(paymentData);
    } catch (err) {
      console.error("Failed to refetch payment detail:", err);
      setError(err?.response?.data?.message || "Gagal memperbarui data pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}