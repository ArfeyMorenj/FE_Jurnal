import { useState } from "react";
import apiClient from "../../../../../lib/axios";

export default function useCreatePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async ({ packageId, method, customerName, customerEmail, customerPhone }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiClient.post("/payment/closed-transaction", {
        method: method,
        premium_package_id: packageId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        app_type: "web"
      });

      return res.data.data.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal membuat pembayaran");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPayment, loading, error };
}