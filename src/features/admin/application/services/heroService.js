import apiClient from '../../../../lib/axios';
import { SECTION_IDS } from '../../../../constants/sections';

const SECTION_ID = SECTION_IDS.APPLICATION_HERO_SECTION;

export const fetchHeroSection = async () => {
  try {
    const response = await apiClient.get(`/sections/${SECTION_ID}/banners`);
    const payload = response.data || {};
    
    // Handle response format - bisa array atau single object
    const rawData = payload.data;
    const banners = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);
    
    return {
      banners,
      meta: payload.meta,
    };
  } catch (error) {
    throw error;
  }
};

export const createHeroSection = async (formData) => {
  try {
    // Timeout lebih lama untuk upload file (60 detik)
    const response = await apiClient.post(`/sections/${SECTION_ID}/banners`, formData, {
      timeout: 60000, // 60 detik untuk upload file
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update existing hero banner (application hero section)
 * Endpoint: POST /sections/{SECTION_ID}/banners/{bannerId}
 */
export const updateHeroSection = async (bannerId, formData) => {
  try {
    const response = await apiClient.post(
      `/sections/${SECTION_ID}/banners/${bannerId}`,
      formData,
      {
        timeout: 60000,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

