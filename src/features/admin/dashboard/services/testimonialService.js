import apiClient from "../../../../lib/axios";

/**
 * Fetch testimonials from API with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.per_page - Items per page
 * @returns {Promise<Object>} Testimonials data with pagination
 */
export const getTestimonials = async ({ 
  page = 1, 
  per_page = 10,
  sectionId = DEFAULT_SECTION_ID 
} = {}) => {
  try {
    const response = await apiClient.get(
      `/sections/${sectionId}/testimonials`,
      {
        params: {
          page,
          per_page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export default {
  getTestimonials,
};

