import apiClient from "../../../../lib/axios";

/**
 * Fetch school transaction history
 * Endpoint: /payment/web/transaction
 * @param {Object} params - Query parameters for filtering
 * @returns {Promise<Object>} Transaction data with pagination info
 */

export const fetchTransactions = async (params = {}) => {
  try {
    const response = await apiClient.get("/payment/web/transaction", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data transaksi"
    );
  }
};

/**
 * Parse order_items string to extract package name
 * @param {string} orderItemsString - JSON string of order items
 * @returns {string} Package name
 */
export const parseOrderItems = (orderItemsString) => {
  try {
    // Decode HTML entities
    const decodedString = orderItemsString
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");

    const items = JSON.parse(decodedString);
    return items[0]?.name || "-";
  } catch (error) {
    console.error("Error parsing order_items:", error);
    return "-";
  }
};

/**
 * Transform API transaction data to table format
 * @param {Array} transactions - Raw transaction data from API
 * @returns {Array} Transformed data for table
 */
export const transformTransactionData = (transactions) => {
  return transactions.map((transaction, index) => {
    const packageName = parseOrderItems(transaction.order_items);
    
    // Determine status based on payment status and expiration
    let status = "expired";
    if (transaction.status === "PAID") {
      const now = new Date();
      const expiredTime = new Date(transaction.expired_time);
      status = now < expiredTime ? "aktif" : "expired";
    }

    return {
      id: transaction.id,
      reference: transaction.reference,
      merchant_ref: transaction.merchant_ref,
      paket: packageName,
      start_date: transaction.created_at,
      end_date: transaction.expired_time,
      status: status,
      payment_method: transaction.payment_name,
      amount: transaction.amount,
      total_fee: transaction.total_fee,
      total_amount: transaction.amount + transaction.total_fee,
      raw: transaction, // Keep raw data for detail page
    };
  });
};

/**
 * Fetch transaction detail by reference
 * Endpoint: /payment/detail-transaction/{reference}
 * @param {string} reference - Transaction reference code
 * @returns {Promise<Object>} Transaction detail data
 */
export const fetchTransactionDetail = async (reference) => {
  try {
    const response = await apiClient.get(`/payment/detail-transaction/${reference}`);
    const payload = response.data || {};

    if (payload.code !== 200) {
      throw new Error(payload.message || "Gagal mengambil detail transaksi");
    }

    return payload.data || {};
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      const timeoutError = new Error(
        "Request timeout - Server tidak merespons. Coba lagi nanti."
      );
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }

    if (error.code === "ERR_NETWORK") {
      const networkError = new Error(
        "Network error - Tidak dapat terhubung ke server."
      );
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    }

    throw new Error(
      error.response?.data?.message || "Gagal mengambil detail transaksi"
    );
  }
};

/**
 * Parse order_items from detail response (already JSON, not HTML encoded)
 * @param {string|Array} orderItems - JSON string or array of order items
 * @returns {Array} Parsed order items
 */
export const parseOrderItemsDetail = (orderItems) => {
  try {
    if (Array.isArray(orderItems)) {
      return orderItems;
    }

    if (typeof orderItems === "string") {
      // Try parsing as JSON first (detail endpoint returns clean JSON)
      try {
        return JSON.parse(orderItems);
      } catch {
        // Fallback to HTML entity decoding (for list endpoint)
        const decodedString = orderItems
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        return JSON.parse(decodedString);
      }
    }

    return [];
  } catch (error) {
    console.error("Error parsing order_items:", error);
    return [];
  }
};
