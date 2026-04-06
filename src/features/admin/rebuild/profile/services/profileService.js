import apiClient from "../../../../../lib/axios";

/**
 * Fetch user profile information
 * Endpoint: /auth/user-info (for admin) or /auth/profile (for school)
 */
export const fetchUserProfile = async () => {
  try {
    // Try admin endpoint first
    let response;
    let userData;
    
    try {
      response = await apiClient.get("/auth/user-info");
      const payload = response.data || {};

      if (payload.meta?.code !== 200) {
        throw new Error(payload.meta?.message || "Gagal mengambil data profil");
      }

      userData = payload.data || {};
    } catch (adminError) {
      // If admin endpoint fails, try school endpoint
      response = await apiClient.get("/auth/profile");
      const payload = response.data || {};
      
      // Handle different response structures for school endpoint
      // Could be: { meta: {...}, data: {...} } or just { ... }
      if (payload.meta?.code === 200 && payload.data) {
        userData = payload.data;
      } else if (payload.data) {
        userData = payload.data;
      } else {
        userData = payload;
      }
    }

    // Transform API response to match component expectations
    // API returns premium_expired_at for school role profile
    const premiumExpiredAt = userData.premium_expired_at || null;
    
    return {
      id: userData.id,
      user_id: userData.user_id,
      name: userData.name || "",
      email: userData.user?.email || "",
      phone: userData.user?.phone_number || "",
      address: userData.address || "",
      role: userData.user?.role || "",
      image: userData.photo || "",
      identity_number: userData.identity_number || "",
      is_premium: userData.is_premium || 0,
      premium_expired_at: premiumExpiredAt, // Original field from API
      expired_date: premiumExpiredAt, // Mapped for backward compatibility with existing components
      expired_at: premiumExpiredAt, // Also expose as expired_at for consistency
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      const timeoutError = new Error(
        "Request timeout - Server tidak merespons dalam waktu yang ditentukan. Periksa koneksi internet atau coba lagi nanti."
      );
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }

    if (error.code === "ERR_NETWORK") {
      const networkError = new Error(
        "Network error - Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    }

    throw error;
  }
};

/**
 * Update user profile information
 * Endpoint: /auth/update-profile
 * @param {FormData} formData - Form data containing profile fields
 */
export const updateProfile = async (formData) => {
  try {
    formData.append('_method', 'PUT');
    
    // Timeout lebih lama untuk upload file (120 detik = 2 menit)
    const response = await apiClient.post("/auth/update-profile", formData, {
      timeout: 120000, // 120 detik untuk upload file yang besar
    });
    const payload = response.data || {};

    if (payload.meta?.code !== 200) {
      throw new Error(payload.meta?.message || "Gagal memperbarui data profil");
    }

    const userData = payload.data || {};

    // Transform API response to match component expectations
    return {
      id: userData.id,
      user_id: userData.user_id,
      name: userData.name || "",
      email: userData.user?.email || "",
      phone: userData.user?.phone_number || "",
      address: userData.address || "",
      role: userData.user?.role || "",
      image: userData.photo || "",
      identity_number: userData.identity_number || "",
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      const timeoutError = new Error(
        "Request timeout - Server tidak merespons dalam waktu yang ditentukan. Periksa koneksi internet atau coba lagi nanti."
      );
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }

    if (error.code === "ERR_NETWORK") {
      const networkError = new Error(
        "Network error - Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    }

    // Handle validation errors from API
    if (error.response?.data?.errors) {
      const errorMessages = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
        .join("; ");
      
      const validationError = new Error(errorMessages || "Validasi gagal. Periksa kembali data yang diinput.");
      validationError.errors = error.response.data.errors;
      throw validationError;
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

/**
 * Update user password
 * Endpoint: /auth/update-password
 * @param {Object} passwordData - Object containing password, new_password, and confirm_password
 */
export const updatePassword = async (passwordData) => {
  try {
    const response = await apiClient.post("/auth/update-password", passwordData);
    const payload = response.data || {};

    if (payload.meta?.code !== 200) {
      throw new Error(payload.meta?.message || "Gagal memperbarui password");
    }

    return payload.data || {};
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      const timeoutError = new Error(
        "Request timeout - Server tidak merespons dalam waktu yang ditentukan. Periksa koneksi internet atau coba lagi nanti."
      );
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }

    if (error.code === "ERR_NETWORK") {
      const networkError = new Error(
        "Network error - Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    }

    // Handle validation errors from API
    if (error.response?.data?.errors) {
      const errorMessages = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
        .join("; ");
      
      const validationError = new Error(errorMessages || "Validasi gagal. Periksa kembali data yang diinput.");
      validationError.errors = error.response.data.errors;
      throw validationError;
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

