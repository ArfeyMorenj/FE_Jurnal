import { useApiClient } from "../../../../hooks/useApiClient";

export function useContactApi() {
    const api = useApiClient();
    const base = "/contact-settings"

    return {
        list: () => api.get(base),
        create: (data) => api.post(base, data),
        update: (id, data) => api.post(`${base}/${id}`, data),
        remove: (id) => api.delete(`${base}/${id}`),
    }
}