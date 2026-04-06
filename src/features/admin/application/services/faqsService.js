import apiClient from "../../../../lib/axios";

export const fetchFaqs = async (sectionId) => {
  if (!sectionId) {
    throw new Error("Section ID is required");
  }
  
  const response = await apiClient.get(`/sections/${sectionId}/faqs`);
  return response.data?.data ?? [];
};

export const getFaqById = async (sectionId, faqId) => {
  if (!sectionId || !faqId) {
    throw new Error("Section ID and FAQ ID are required");
  }

  const response = await apiClient.get(`/sections/${sectionId}/faqs/${faqId}`);
  return response.data?.data;
};

export const createFaq = async (sectionId, { 
  title, 
  question, 
  answer, 
  cta_title, 
  cta_description 
}) => {
  if (!sectionId) {
    throw new Error("Section ID is required");
  }

  const formData = new FormData();
  
  if (title) formData.append("title", title);
  if (question) formData.append("question", question);
  if (answer) formData.append("answer", answer);
  if (cta_title) formData.append("cta_title", cta_title);
  if (cta_description) formData.append("cta_description", cta_description);

  const response = await apiClient.post(`/sections/${sectionId}/faqs`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data?.data;
};

export const updateFaq = async (sectionId, faqId, { 
  title, 
  question, 
  answer, 
  cta_title, 
  cta_description 
}) => {
  if (!sectionId || !faqId) {
    throw new Error("Section ID and FAQ ID are required for update");
  }

  const formData = new FormData();
  formData.append("_method", "put");
  
  if (title) formData.append("title", title);
  if (question) formData.append("question", question);
  if (answer) formData.append("answer", answer);
  if (cta_title) formData.append("cta_title", cta_title);
  if (cta_description) formData.append("cta_description", cta_description);

  const response = await apiClient.post(`/sections/${sectionId}/faqs/${faqId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data?.data;
};

export const deleteFaq = async (sectionId, faqId) => {
  if (!sectionId || !faqId) {
    throw new Error("Section ID and FAQ ID are required for deletion");
  }

  try {
    const response = await apiClient.delete(`/sections/${sectionId}/faqs/${faqId}`);
    return response.data?.data;
  } catch (error) {
    const shouldRetryWithForm =
      error.response?.status === 400 || error.response?.status === 405;

    if (!shouldRetryWithForm) {
      throw error;
    }

    const formData = new FormData();
    formData.append("_method", "delete");

    const fallbackResponse = await apiClient.post(`/sections/${sectionId}/faqs/${faqId}`, formData, {
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