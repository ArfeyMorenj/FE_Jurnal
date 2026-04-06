import apiClient from "../../../lib/axios";
import { SECTION_IDS } from "../../../constants/sections";

const SECTION_ID = SECTION_IDS.APPLICATION;

/**
 * Fetch daftar aplikasi dari section
 * Endpoint: /sections/{sectionId}/applications
 */
export const fetchApplications = async () => {
  try {
    const response = await apiClient.get(`/applications/all`);
    const payload = response.data || {};

    return {
      applications: payload.data || [],
      meta: payload.meta,
      pagination: payload.meta?.pagination || null,
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    
    // Provide more helpful error messages
    if (error.code === 'ECONNABORTED') {
      const timeoutError = new Error('Request timeout - Server tidak merespons dalam waktu yang ditentukan. Periksa koneksi internet atau coba lagi nanti.');
      timeoutError.code = 'TIMEOUT';
      throw timeoutError;
    }
    
    if (error.code === 'ERR_NETWORK') {
      const networkError = new Error('Network error - Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      networkError.code = 'NETWORK_ERROR';
      throw networkError;
    }
    
    throw error;
  }
};

/**
 * Fetch detail aplikasi berdasarkan slug
 * Endpoint: /sections/{sectionId}/applications/slug/{slug}
 */
export const fetchApplicationBySlug = async (sectionId, slug) => {
  if (!slug) {
    throw new Error("Application slug is required");
  }
  
  if (!sectionId) {
    throw new Error("Section ID is required");
  }

  try {
    const response = await apiClient.get(
      `/sections/${sectionId}/applications/slug/${slug}`
    );

    const payload = response.data || {};
    return payload.data || null;
  } catch (error) {
    console.error("❌ Error fetching application:", error);

    if (error.code === "ECONNABORTED") {
      const timeoutError = new Error(
        "Request timeout - Server tidak merespons dalam waktu yang ditentukan."
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

    throw error;
  }
};

/**
 * Delete aplikasi
 * Endpoint: DELETE /sections/{sectionId}/applications/{applicationId}
 */
export const deleteApplication = async (applicationId) => {
  if (!applicationId) {
    throw new Error("Application ID is required for deletion");
  }

  try {
    const response = await apiClient.delete(`/sections/${SECTION_ID}/applications/${applicationId}`);
    return response.data?.data;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};

