import { useApiClient } from "../../../../../hooks/useApiClient";

export function useHistoryApi(sectionId) {
  const api = useApiClient();
  const base = `/sections/${sectionId}/histories`;

  return {
    list: () => api.get(base),
    detail: (id) => api.get(`${base}/${id}`),
    create: (data) => api.post(base, data),
    update: (id, data) => api.post(`${base}/${id}`, data),
    remove: (id) => api.delete(`${base}/${id}`),
  };
}
