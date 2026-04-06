import { useApiClient } from "../../../../hooks/useApiClient";

export function useMessageApi() {
  const api = useApiClient();
  const base = "/contacts";

  return {
    create: (data) => api.post(base, data),
    list: (params = {}, controller) =>
      api.get(base, {
        params,
        signal: controller?.signal,
      }),
    get: (id) => api.get(`${base}/${id}`),
    delete: (id) => api.delete(`${base}/${id}`),

    // Tambahkan reply
    reply: (id, data) => api.post(`${base}/${id}/reply`, data),
  };
}
