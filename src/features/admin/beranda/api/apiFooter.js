import { useApiClient } from "../../../../hooks/useApiClient";
import { SECTION_IDS } from "../../../../constants/sections";

export function useFooterApi() {
  const api = useApiClient();
  const SECTION_ID = SECTION_IDS.LANDING_PAGE;
  
  return {
    get: () => api.get(`/sections/${SECTION_ID}/footers`),
    create: (data) => api.post(`/sections/${SECTION_ID}/footers`, data),
    update: (id, data) =>
      api.post(`/sections/${SECTION_ID}/footers/${id}`, data),
  };
}
