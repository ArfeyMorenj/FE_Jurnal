import apiClient from "../../../lib/axios";

export const fetchBannerBySlug = async ({ sectionId, slug }) => {
  if (!sectionId) {
    throw new Error("sectionId is required to fetch banner data");
  }

  if (!slug) {
    throw new Error("slug is required to fetch banner data");
  }

  try {
    const response = await apiClient.get(
      `/sections/${sectionId}/banners/slug/${slug}`
    );
    const payload = response.data || {};
    return payload.data || null;
  } catch (error) {
    console.error(
      `Failed to fetch banner for section ${sectionId} with slug ${slug}`,
      error
    );
    throw error;
  }
};

// Fetch single banner by its ID (for static hero like List Aplikasi)
export const fetchBannerById = async ({ sectionId, bannerId }) => {
  if (!sectionId) {
    throw new Error("sectionId is required to fetch banner data");
  }

  if (!bannerId) {
    throw new Error("bannerId is required to fetch banner data");
  }

  try {
    const response = await apiClient.get(
      `/sections/${sectionId}/banners/${bannerId}`
    );
    const payload = response.data || {};
    return payload.data || null;
  } catch (error) {
    console.error(
      `Failed to fetch banner for section ${sectionId} with id ${bannerId}`,
      error
    );
    throw error;
  }
};

