import { useApiClient } from "../../../../../hooks/useApiClient";

export function useStudentApi() {
  const api = useApiClient();

  const list = async (params = {}) => {
    try {
      const response = await api.get("/student", { params });
      return response;
    } catch (error) {
      console.error("Error fetching student list:", error);
      throw error;
    }
  };

  const detail = async (id, params = {}) => {
    try {
      const response = await api.get(`/students-detail/${id}`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching student detail:", error);
      throw error;
    }
  };

  const exportPdf = async (params = {}) => {
    try {
      const response = await api.get("/export/student-pdf", {
        params,
        responseType: "blob",
      });
      return response;
    } catch (error) {
      console.error("Error exporting student PDF:", error);
      throw error;
    }
  };

  const exportExcel = async (params = {}) => {
    try {
      const response = await api.get("/export/student-excel", {
        params,
        responseType: "blob",
      });
      return response;
    } catch (error) {
      console.error("Error exporting student Excel:", error);
      throw error;
    }
  };

  // Optional: Jika backend support endpoint terpisah
  const classrooms = async (studentId, params = {}) => {
    try {
      const response = await api.get(`/student/${studentId}/classrooms`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching student classrooms:", error);
      throw error;
    }
  };

  const assignments = async (studentId, params = {}) => {
    try {
      const response = await api.get(`/student/${studentId}/assignments`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching student assignments:", error);
      throw error;
    }
  };

  const attendances = async (studentId, params = {}) => {
    try {
      const response = await api.get(`/student/${studentId}/attendances`, { params });
      return response;
    } catch (error) {
      console.error("Error fetching student attendances:", error);
      throw error;
    }
  };

  return {
    list,
    detail,
    exportPdf,
    exportExcel,
    classrooms,
    assignments,
    attendances,
  };
}