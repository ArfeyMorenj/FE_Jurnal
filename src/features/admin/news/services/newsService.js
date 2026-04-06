import apiClient from "../../../../lib/axios";

const BASE_ENDPOINT = "/news";

const normalizePagination = (pagination) => {
  if (!pagination) return null;
  return {
    path: pagination.path,
    perPage: pagination.per_page,
    currentPage: pagination.current_page,
    total: pagination.total,
    lastPage: pagination.last_page,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    from: pagination.from,
    to: pagination.to,
  };
};

export const getNewsList = async (params = {}) => {
  try {
    const response = await apiClient.get(BASE_ENDPOINT, { params });
    const payload = response.data || {};
    return {
      data: payload.data || [],
      pagination: normalizePagination(payload.meta?.pagination),
      meta: payload.meta,
    };
  } catch (error) {
    throw error;
  }
};

export const getNewsDetail = async (id) => {
  try {
    const response = await apiClient.get(`${BASE_ENDPOINT}/${id}`);
    return response.data?.data || null;
  } catch (error) {
    throw error;
  }
};

export const getNewsDetailBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`${BASE_ENDPOINT}/slug/${slug}`);
    return response.data?.data || null;
  } catch (error) {
    throw error;
  }
};

const normalizeHashtags = (hashtags) => {
  if (Array.isArray(hashtags)) {
    return hashtags
      .map((tag) => (tag || "").toString().replace(/^#/, "").trim())
      .filter(Boolean)
      .map((tag) => `#${tag}`)
      .join(" ");
  }

  if (typeof hashtags === "string") {
    return hashtags;
  }

  return "";
};

const buildNewsFormData = (payload) => {
  const formData = new FormData();

  if (payload.thumbnail instanceof File) {
    formData.append("thumbnail", payload.thumbnail);
  }

  if (payload.removeThumbnail) {
    formData.append("remove_thumbnail", "1");
  }

  formData.append("title", payload.title || "");
  formData.append("category_id", payload.category_id || "");
  formData.append("hashtags", normalizeHashtags(payload.hashtags));
  formData.append("content", payload.content || "");
  formData.append("is_published", payload.is_published ? 1 : 0);

  return formData;
};

export const createNews = async (payload) => {
  try {
    const formData = buildNewsFormData(payload);
    const response = await apiClient.post(BASE_ENDPOINT, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNews = async (id, payload) => {
  try {
    const formData = buildNewsFormData(payload);
    formData.append("_method", "PUT"); // Backend expects POST override
    const response = await apiClient.post(`${BASE_ENDPOINT}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`${BASE_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

