import apiClient from '../../../../lib/axios';
import { SECTION_IDS } from '../../../../constants/sections';

export const fetchApplications = async (params = {}) => {
  try {
    const response = await apiClient.get(`/applications/all`, { params });
    const payload = response.data || {};

    // Ambil hanya data aplikasi dari response
    const rawData = Array.isArray(payload.data) ? payload.data : [];
    const applications = rawData.map(transformApplicationData);

    const paginationMeta = payload.meta?.pagination;
    const pagination = paginationMeta
      ? {
          path: paginationMeta.path,
          perPage: paginationMeta.per_page,
          currentPage: paginationMeta.current_page,
          total: paginationMeta.total,
          lastPage: paginationMeta.last_page,
          nextPageUrl: paginationMeta.next_page_url,
          prevPageUrl: paginationMeta.prev_page_url,
          from: paginationMeta.from,
          to: paginationMeta.to,
        }
      : null;

    return {
      applications,
      pagination,
      meta: payload.meta,
    };
  } catch (error) {
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
 * Get detail aplikasi by slug
 * Endpoint: GET /sections/{sectionId}/applications/slug/{slug}
 */
export const getApplicationBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/applications/all/slug/${slug}`);
    const payload = response.data || {};

    if (payload.data) {
      return {
        application: transformApplicationData(payload.data),
        meta: payload.meta,
      };
    }

    return {
      application: null,
      meta: payload.meta,
    };
  } catch (error) {
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

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Get detail aplikasi by ID
 * Endpoint: GET /sections/{sectionId}/applications/{applicationId}
 */
export const getApplicationById = async (sectionId, applicationId) => {
  try {
    
    if (!sectionId) {
      throw new Error('Section ID tidak ditemukan');
    }
    
    if (!applicationId) {
      throw new Error('Application ID tidak ditemukan');
    }

    const response = await apiClient.get(
      `/sections/${sectionId}/applications/${applicationId}`
    );
    
    
    return {
      application: response.data?.data,
      meta: response.data?.meta,
    };
  } catch (error) {
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Update existing hero banner (Edit Mode)
 */
export const updateHeroSection = async (bannerId, formData) => {
  try {
    const response = await apiClient.put(`/banners/${bannerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Gagal memperbarui banner aplikasi');
  }
};

/**
 * Create new hero banner (Create Mode)
 */
export const createHeroSection = async (sectionId, applicationId, formData) => {
  try {
    const response = await apiClient.post(
      `/sections/${sectionId}/applications/${applicationId}/banners`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Gagal membuat banner aplikasi');
  }
};

/**
 * Get features by application ID
 * Endpoint: GET /features/applications/{applicationId}
 */
export const getFeaturesByApplicationId = async (applicationId) => {
  try {
    const response = await apiClient.get(`/features/applications/${applicationId}`);
    const payload = response.data || {};

    // Ambil hanya data features dari response
    const rawData = Array.isArray(payload.data) ? payload.data : [];
    const features = rawData.map(transformFeatureData);

    return {
      features,
      meta: payload.meta,
    };
  } catch (error) {
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

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Get feature by ID
 * Endpoint: GET /features/{featureId}
 */
export const getFeatureById = async (featureId) => {
  try {
    const response = await apiClient.get(`/features/${featureId}`);
    const payload = response.data || {};

    if (payload.data) {
      return {
        feature: transformFeatureData(payload.data),
        meta: payload.meta,
      };
    }

    return {
      feature: null,
      meta: payload.meta,
    };
  } catch (error) {
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

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

/**
 * Create feature
 * Endpoint: POST /features
 * @param {Object} featureData - Feature data
 * @param {string} featureData.application_id - Application ID
 * @param {string} featureData.name - Feature name
 * @param {string} featureData.description - Feature description
 * @param {File} featureData.feature_image - Feature image file (optional)
 * @param {File} featureData.icon_image - Icon image file (optional)
 * @param {string} featureData.color_gradient_start - Gradient start color
 * @param {string} featureData.color_gradient_end - Gradient end color
 */
export const createFeature = async (featureData) => {
  try {
    const formData = new FormData();
    
    // Required fields
    formData.append('application_id', featureData.application_id);
    formData.append('name', featureData.name.trim());
    formData.append('description', featureData.description.trim());
    formData.append('color_gradient_start', featureData.color_gradient_start);
    formData.append('color_gradient_end', featureData.color_gradient_end);
    
    // Optional file fields
    if (featureData.feature_image instanceof File) {
      formData.append('feature_image', featureData.feature_image);
    }
    
    if (featureData.icon_image instanceof File) {
      formData.append('icon_image', featureData.icon_image);
    }

    const response = await apiClient.post('/features', formData);
    const payload = response.data || {};

    if (payload.data) {
      return {
        feature: transformFeatureData(payload.data),
        meta: payload.meta,
      };
    }

    return {
      feature: null,
      meta: payload.meta,
    };
  } catch (error) {
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

    // Handle validation errors from API
    if (error.response?.data?.errors) {
      const errorMessages = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
        .join('; ');
      
      const validationError = new Error(errorMessages || 'Validasi gagal. Periksa kembali data yang diinput.');
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
 * Update feature
 * Endpoint: POST /features/{featureId} dengan method override PUT
 */
export const updateFeature = async (featureId, featureData) => {
  if (!featureId) {
    throw new Error("Feature ID is required for update");
  }

  try {
    const formData = new FormData();
    formData.append("_method", "PUT");

    if (featureData.application_id) {
      formData.append("application_id", featureData.application_id);
    }

    if (featureData.name) {
      formData.append("name", featureData.name.trim());
    }

    if (featureData.description) {
      formData.append("description", featureData.description.trim());
    }

    if (featureData.color_gradient_start) {
      formData.append("color_gradient_start", featureData.color_gradient_start);
    }

    if (featureData.color_gradient_end) {
      formData.append("color_gradient_end", featureData.color_gradient_end);
    }

    if (featureData.feature_image instanceof File) {
      formData.append("feature_image", featureData.feature_image);
    }

    if (featureData.icon_image instanceof File) {
      formData.append("icon_image", featureData.icon_image);
    }

    const response = await apiClient.post(`/features/${featureId}`, formData, {
      timeout: 60000,
    });
    const payload = response.data || {};

    if (payload.data) {
      return {
        feature: transformFeatureData(payload.data),
        meta: payload.meta,
      };
    }

    return {
      feature: null,
      meta: payload.meta,
    };
  } catch (error) {
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

    if (error.response?.data?.errors) {
      const errorMessages = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
        .join('; ');
      
      const validationError = new Error(errorMessages || 'Validasi gagal. Periksa kembali data yang diinput.');
      validationError.errors = error.response.data.errors;
      throw validationError;
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

export const transformApplicationData = (apiApplication) => ({
  id: apiApplication.id,
  name: apiApplication.name,
  slug: apiApplication.slug,
  leadInText: apiApplication.lead_in_text,
  description: apiApplication.description,
  image: apiApplication.image || '/images/phone1.png',
  buttonText: apiApplication.button_text,
  buttonLink: apiApplication.button_link,
  link: apiApplication.link || apiApplication.button_link,
  textColor: apiApplication.text_color,
  colorGradientStart: apiApplication.color_gradient_start,
  colorGradientEnd: apiApplication.color_gradient_end,
  isActive: Boolean(apiApplication.is_active),
  section: apiApplication.section,
  createdAt: apiApplication.created_at,
  updatedAt: apiApplication.updated_at,
});

/**
 * Delete feature
 * Endpoint: DELETE /features/{featureId}
 */
export const deleteFeature = async (featureId) => {
  if (!featureId) {
    throw new Error("Feature ID is required for deletion");
  }

  try {
    const response = await apiClient.delete(`/features/${featureId}`);
    return response.data;
  } catch (error) {
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

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw error;
  }
};

export const transformFeatureData = (apiFeature) => ({
  id: apiFeature.id,
  name: apiFeature.name,
  slug: apiFeature.slug,
  description: apiFeature.description,
  featureImage: apiFeature.feature_image,
  iconImage: apiFeature.icon_image,
  colorGradientStart: apiFeature.color_gradient_start,
  colorGradientEnd: apiFeature.color_gradient_end,
  application: apiFeature.application,
  createdAt: apiFeature.created_at,
  updatedAt: apiFeature.updated_at,
  deletedAt: apiFeature.deleted_at,
});

