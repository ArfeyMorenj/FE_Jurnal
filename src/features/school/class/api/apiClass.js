import { useApiClient } from "../../../../hooks/useApiClient";

export const useClassApi = () => {
  const api = useApiClient();
  
  const list = async (params = {}) => {
    const response = await api.get("/school-classrooms", { params });
    return response;
  };

  const detail = async (id, params = {}) => { 
    const response = await api.get(`/school-classrooms/${id}`, { params });
    return response;
  };

  const detailAssignment = async (id, params = {}) => {
    const response = await api.get(`/assignments/${id}`, { params });
    return response;
  };

  const detailJournal = async (id, params = {}) => {
    const response = await api.get(`/journals/${id}`, { params });
    return response;
  };

  // export siswa
  const exportStudentPdf = async (classId, params = {}) => {
    const response = await api.get(`/export/student-pdf/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  const exportStudentExcel = async (classId, params = {}) => {
    const response = await api.get(`/export/student-excel/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  // export jurnal
  const exportJournalPdf = async (classId, params = {}) => {
    const response = await api.get(`/export/jurnal-pdf/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  const exportJournalExcel = async (classId, params = {}) => {
    const response = await api.get(`/export/jurnal-excel/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  // tugas export
  const exportAssignmentPdf = async (classId, params = {}) => {
    const response = await api.get(`/export/assignment-pdf/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  const exportAssignmentExcel = async (classId, params = {}) => {
    const response = await api.get(`/export/assignment-excel/${classId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  // detail tugas export (tugas detail)
  const exportDetailAssignmentPdf = async (assignmentId, params = {}) => {
    const response = await api.get(`/export/detail-assignment-pdf/${assignmentId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  const exportDetailAssignmentExcel = async (assignmentId, params = {}) => {
    const response = await api.get(`/export/detail-assignment-excel/${assignmentId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  // attendance export (jurnal detail)
  const exportAttendancePdf = async (journalId, params = {}) => {
    const response = await api.get(`/export/attandance-pdf/${journalId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  const exportAttendanceExcel = async (journalId, params = {}) => {
    const response = await api.get(`/export/attandance-excel/${journalId}`, {
      params,
      responseType: 'blob'
    });
    return response;
  };

  return {
    list,
    detail,
    detailAssignment,
    detailJournal,
    exportStudentPdf,
    exportStudentExcel,
    exportJournalPdf,
    exportJournalExcel,
    exportAssignmentPdf,
    exportAssignmentExcel,
    exportDetailAssignmentPdf,
    exportDetailAssignmentExcel,
    exportAttendancePdf,
    exportAttendanceExcel
  };
};