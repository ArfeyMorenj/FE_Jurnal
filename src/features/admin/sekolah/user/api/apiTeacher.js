import { useApiClient } from "../../../../../hooks/useApiClient";

export function useTeacherApi() {
  const api = useApiClient();

  const list = async (params = {}) => {
    try {
      const response = await api.get("/teacher", { params });
      return response;
    } catch (error) {
      console.error("Error fetching teacher list:", error);
      throw error;
    }
  };

  const detail = async (id, params = {}) => {
    try {
      const response = await api.get(`/teacher-detail/${id}`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching teacher detail:", error);
      throw error;
    }
  };

  const classrooms = async (teacherId, params = {}) => {
    try {
      const response = await api.get(`/teacher/${teacherId}/classrooms`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching teacher classrooms:", error);
      throw error;
    }
  };

  const exportPdf = async (params = {}) => {
    try {
      const response = await api.get("/export/teacher-pdf", {
        params,
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error("Error exporting teacher PDF:", error);
      throw error;
    }
  };

  const exportExcel = async (params = {}) => {
    try {
      const response = await api.get("/export/teacher-excel", {
        params,
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error("Error exporting teacher Excel:", error);
      throw error;
    }
  };

  return {
    list,
    detail,
    classrooms,
    exportPdf,
    exportExcel,
  };
}