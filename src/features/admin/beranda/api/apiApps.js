import { useApiClient } from "../../../../hooks/useApiClient";

export function useAppsApi(sectionId) {
  const api = useApiClient();

  return {
    list: () => api.get(`/applications/all`),   
    getSection: () => api.get(`/landing-apps`),  
    createRecord: (payload) => api.post(`/landing-apps`, payload),    
    updateRecord: (recordId, payload) => api.put(`/landing-apps/${recordId}`, payload),    
    deleteRecord: (recordId) => api.delete(`/landing-apps/${recordId}`),
  };
}