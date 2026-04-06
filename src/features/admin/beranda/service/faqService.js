import apiClient from "../../../../lib/axios";
import { SECTION_IDS } from "../../../../constants/sections";

const SECTION_ID = SECTION_IDS.LANDING_PAGE;

// Base URL pakai sectionId
const getBaseUrl = () => `/sections/${SECTION_ID}/faqs`;

export const fetchFaqs = async () => {
  const response = await apiClient.get(getBaseUrl());
  return response.data?.data ?? [];
};

export const getFaqById = async (id) => {
  if (!id) {
    throw new Error("FAQ ID is required");
  }

  const response = await apiClient.get(`${getBaseUrl()}/${id}`);
  return response.data?.data;
};

export const createFaq = async ({ 
  title, 
  question, 
  answer, 
  cta_title, 
  cta_description 
}) => {
  const formData = new FormData();
  
  if (title) formData.append("title", title);
  if (question) formData.append("question", question);
  if (answer) formData.append("answer", answer);
  if (cta_title) formData.append("cta_title", cta_title);
  if (cta_description) formData.append("cta_description", cta_description);

  const response = await apiClient.post(getBaseUrl(), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data?.data;
};

export const updateFaq = async (id, { 
  title, 
  question, 
  answer, 
  cta_title, 
  cta_description 
}) => {
  if (!id) {
    throw new Error("FAQ ID is required for update");
  }

  const formData = new FormData();
  formData.append("_method", "put");
  
  if (title) formData.append("title", title);
  if (question) formData.append("question", question);
  if (answer) formData.append("answer", answer);
  if (cta_title) formData.append("cta_title", cta_title);
  if (cta_description) formData.append("cta_description", cta_description);

  const response = await apiClient.post(`${getBaseUrl()}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data?.data;
};

export const deleteFaq = async (id) => {
  if (!id) {
    throw new Error("FAQ ID is required for deletion");
  }

  try {
    const response = await apiClient.delete(`${getBaseUrl()}/${id}`);
    return response.data?.data;
  } catch (error) {
    const shouldRetryWithForm =
      error.response?.status === 400 || error.response?.status === 405;

    if (!shouldRetryWithForm) {
      throw error;
    }

    const formData = new FormData();
    formData.append("_method", "delete");

    const fallbackResponse = await apiClient.post(`${getBaseUrl()}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return fallbackResponse.data?.data;
  }
};

export default {
  fetchFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
};