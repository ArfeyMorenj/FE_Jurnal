import { useApiClient } from "../../../../../hooks/useApiClient";

export const useUserApi = () => {
  const api = useApiClient()
  
  const list = async (params = {}) => {
    const response = await api.get("/user", { params });
    return response;
  };

  const detail = async (id) => {
    const response = await api.get(`/user/${id}`);
    return response;
  };

  const detailTeacher = async (id) => {
    const response = await api.get(`/teacher/${id}`);
    return response;
  };

  const detailStudent = async (id) => {
    const response = await api.get(`/student/${id}`);
    return response;
  };

  //export excel dan pdf
  const exportExcel = async (params = {}) => {
    const response = await api.get("/export/user-excel", { 
      params,
      responseType: 'blob' 
    });
    return response;
  };

  const exportPDF = async (params = {}) => {
    const response = await api.get("/export/user-pdf", { 
      params,
      responseType: 'blob'
    });
    return response;
  };

  return {
    list,
    detail,
    detailTeacher,
    detailStudent,
    exportExcel,
    exportPDF,
  };
};