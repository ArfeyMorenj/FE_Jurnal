import { useMemo } from "react"; 
import { useApiClient } from "../../../../../hooks/useApiClient";

export function useSponsorApi(sectionId) {
  const apiClient = useApiClient();
  const base = `/sections/${sectionId}/sponsors`;

  return useMemo(() => ({
    get: () => apiClient.get(base),
    create: (payload) => apiClient.post(base, payload),
    update: (id, payload) => apiClient.post(`${base}/${id}?_method=PUT`, payload),
    delete: (id) => apiClient.delete(`${base}/${id}`),
  }), [apiClient, base]); 
}