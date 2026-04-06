import { useState, useEffect } from "react";
import {
  fetchTransactionDetail,
  parseOrderItemsDetail,
} from "../services/transactionService";

/**
 * Custom hook for managing transaction detail data
 * @param {string} reference - Transaction reference code
 * @returns {Object} Transaction detail, loading state, error
 */
export const useTransactionDetail = (reference) => {
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reference) {
      setError("Reference tidak ditemukan");
      setIsLoading(false);
      return;
    }

    const loadTransactionDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTransactionDetail(reference);
        
        // Parse order items
        const orderItems = parseOrderItemsDetail(data.order_items);
        
        // Transform data for display
        const transformedData = {
          ...data,
          orderItems: orderItems,
          packageName: orderItems[0]?.name || "-",
          packagePrice: orderItems[0]?.price || 0,
          packageQuantity: orderItems[0]?.quantity || 1,
          packageSubtotal: orderItems[0]?.subtotal || 0,
        };

        setTransaction(transformedData);
      } catch (err) {
        setError(err.message || "Gagal memuat detail transaksi");
        setTransaction(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactionDetail();
  }, [reference]);

  return {
    transaction,
    isLoading,
    error,
  };
};
