import { useApiClient } from "../../../../../hooks/useApiClient";

export function useHistoryApi(sectionId) {
  const api = useApiClient();
  const baseUrl = `/sections/${sectionId}/year-histories`;

  return {
    get: async () => {
      return await api.get(baseUrl);
    },

    save: async (payload) => {
      return await api.post(baseUrl, payload);
    },

    update: async (itemId, payload) => {
      return await api.put(`${baseUrl}/${itemId}`, payload);
    },

    delete: async (itemId) => {
      return await api.delete(`${baseUrl}/${itemId}`);
    },
  };
}