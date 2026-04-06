import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { downloadFile } from "../../../../utils/downloadFile";

export function useTaskTabController(classId) {
  const classApi = useClassApi();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState({
    created_from: "",
    created_to: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const lastFiltersRef = useRef({});

  const fetchData = async (filterParams = {}, search = "", page = 1) => {
    setLoading(true);

    try {
      const params = { page };

      if (search) {
        params.search_assignment = search;
      }

      if (filterParams.created_from) {
        params.start_assignment = filterParams.created_from;
      }

      if (filterParams.created_to) {
        params.end_assignment = filterParams.created_to;
      }

      const response = await classApi.detail(classId, params);
      const assignmentsData = response?.data?.data?.assignments;

      if (!assignmentsData) {
        setTasks([]);
        setFilteredTasks([]);
        setTotalItems(0);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setTasks(assignmentsData.data || []);
      setFilteredTasks(assignmentsData.data || []);
      setTotalItems(assignmentsData.total || 0);
      setCurrentPage(assignmentsData.current_page || page);
      setTotalPages(assignmentsData.last_page || 1);
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal mengambil data tugas");
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
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setFilters({
      created_from: "",
      created_to: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (taskId) => {
    navigate(`/sekolah/kelas/${classId}/tugas/${taskId}`);
  };

  const handleExportPdf = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search_assignment = searchTerm;
      }
      
      if (filters.created_from) {
        params.start_assignment = filters.created_from;
      }
      
      if (filters.created_to) {
        params.end_assignment = filters.created_to;
      }

      const response = await classApi.exportAssignmentPdf(classId, params);
      
      const filename = `Tugas_${classId}_${new Date().getTime()}.pdf`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal export PDF");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search_assignment = searchTerm;
      }
      
      if (filters.created_from) {
        params.start_assignment = filters.created_from;
      }
      
      if (filters.created_to) {
        params.end_assignment = filters.created_to;
      }

      const response = await classApi.exportAssignmentExcel(classId, params);
      
      const filename = `Tugas_${classId}_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportGrades = (taskId) => {
    console.log("Export grades for task:", taskId);
    Toasts("success", 3000, "Success", "Export nilai berhasil");
  };

  useEffect(() => {
    if (classId) {
      fetchData(filters, searchTerm, currentPage);
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
      if (classId) {
        fetchData(filters, searchTerm, currentPage);
      }
    }
  }, [filters, searchTerm, currentPage]);

  return {
    tasks,
    filteredTasks,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    searchTerm,

    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportGrades,
    handleExportPdf,
    handleExportExcel,
  };
}