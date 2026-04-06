import apiClient from "../../../../lib/axios";

export const getNewsCategories = async (params = {}) => {
  try {
    const response = await apiClient.get("/categories", { params });
    const payload = response.data || {};
    return payload.data || [];
  } catch (error) {
    throw error;
  }
};


