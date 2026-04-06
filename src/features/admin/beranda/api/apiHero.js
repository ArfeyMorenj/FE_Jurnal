import { useApiClient } from "../../../../hooks/useApiClient";

export function useHeroApi(sectionId) {
  const api = useApiClient();

  return {
    list: (params) =>
      api.get(`/sections/${sectionId}/banners`, { params }),

    detail: (sectionId, bannerId) =>
      api.get(`/sections/${sectionId}/banners/${bannerId}`),

    create: (payload) =>
      api.post(`/sections/${sectionId}/banners`, payload),

    update: (id, payload) =>
      api.post(`/sections/${sectionId}/banners/${id}`, payload),

    remove: (id) =>
      api.delete(`/sections/${sectionId}/banners/${id}`),
  };
}