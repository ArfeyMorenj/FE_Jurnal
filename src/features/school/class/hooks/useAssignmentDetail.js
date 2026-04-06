import { useState, useEffect, useRef } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { downloadFile } from "../../../../utils/downloadFile";

export function useAssignmentDetail(classId, taskId) {
  const classApi = useClassApi();
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    created_from: "",
    created_to: "",
  });

  const lastFiltersRef = useRef({});

  const fetchData = async (filterParams = {}, page = 1, search = "") => {
    setLoading(true);

    try {
      const params = { page };

      if (search) {
        params.search = search;
      }
      
      if (filterParams.created_from) {
        params.date_from = filterParams.created_from;
      }
      
      if (filterParams.created_to) {
        params.date_to = filterParams.created_to;
      }

      const response = await classApi.detailAssignment(taskId, params);
      const data = response?.data?.data;

      if (!data) {
        Toasts("danger", 3000, "Error", "Tugas tidak ditemukan");
        setLoading(false);
        return;
      }

      const studentsData = data.students || [];
      const paginationData = data.pagination || {};

      const transformedData = {
        id: data.id,
        title: data.title,
        description: data.description || "-",
        created_at: data.created_at || "-",
        students: studentsData.map((student) => ({
          id: student.id,
          name: student.name,
          identity_number: student.identity_number || "-",
          submitted_at: student.submitted_at || null,
          score: student.score !== undefined && student.score !== null ? student.score : null,
          status: student.status || "not_completed",
        })),
        pagination: {
          current_page: paginationData.current_page || page,
          last_page: paginationData.last_page || 1,
          per_page: paginationData.per_page || itemsPerPage,
          total: paginationData.total || studentsData.length,
        },
      };

      setAssignmentDetail(transformedData);
      setFilteredStudents(studentsData);
      setLastPage(paginationData.last_page || 1);
      setCurrentPage(paginationData.current_page || page);
      setTotalItems(paginationData.total || studentsData.length);
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal mengambil detail tugas");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleApplyFilter = (appliedFilters) => {
    setFilters(appliedFilters);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    const defaultFilters = {
      created_from: "",
      created_to: "",
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExportPdf = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (filters.created_from) {
        params.date_from = filters.created_from;
      }
      
      if (filters.created_to) {
        params.date_to = filters.created_to;
      }

      const response = await classApi.exportDetailAssignmentPdf(taskId, params);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      const filename = `Detail_Tugas_${taskId}_${new Date().getTime()}.pdf`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", error.response?.data?.message || "Gagal export PDF");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (filters.created_from) {
        params.date_from = filters.created_from;
      }
      
      if (filters.created_to) {
        params.date_to = filters.created_to;
      }

      const response = await classApi.exportDetailAssignmentExcel(taskId, params);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      const filename = `Detail_Tugas_${taskId}_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", error.response?.data?.message || "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    if (classId && taskId) {
      fetchData(filters, currentPage, searchTerm);
    }
  }, []);

  useEffect(() => {
    const currentState = {
      filters,
      searchTerm,
      currentPage,
    };

    const lastState = lastFiltersRef.current;

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      lastFiltersRef.current = currentState;
      if (classId && taskId) {
        fetchData(filters, currentPage, searchTerm);
      }
    }
  }, [filters, searchTerm, currentPage]);

  return {
    assignmentDetail,
    filteredStudents,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    filters,
    searchTerm,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleExportPdf,
    handleExportExcel,
    fetchData,
  };
}