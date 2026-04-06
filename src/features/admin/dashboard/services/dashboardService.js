import apiClient from "../../../../lib/axios";

/**
 * Fetch dashboard data from API
 * @param {Object} params - Query parameters
 * @param {string} params.date_from - Start date filter (optional)
 * @param {string} params.date_to - End date filter (optional)
 * @returns {Promise<Object>} Dashboard data
 */
export const getDashboardData = async (params = {}) => {
  try {
    const response = await apiClient.get("/dashboard-admin", {
      params: {
        date_from: params.date_from || "",
        date_to: params.date_to || "",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getDashboardData,
};

