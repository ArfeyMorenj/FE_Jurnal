import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../../utils/Toast";
import { downloadFile } from "../../../../../utils/downloadFile";
import { useStudentApi } from "../api/apiStudent";

export function useStudentController() {
  const studentApi = useStudentApi();
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportPdfLoading, setExportPdfLoading] = useState(false);
  const [exportExcelLoading, setExportExcelLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    start: "",
    end: "",
  });

  const [sortConfig, setSortConfig] = useState({ 
    key: "", 
    direction: "" 
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const abortControllerRef = useRef(null);
  const lastFiltersRef = useRef({});

  const buildApiParams = (filterParams, sortParams, search, page) => {
    const params = { page };

    if (search) {
      params.search = search;
    }

    if (sortParams.key && sortParams.direction) {
      params.sort_direction = sortParams.direction;
    }

    if (filterParams.status) {
      params.status = filterParams.status.toLowerCase();
    }

    if (filterParams.start) {
      params.date_from = filterParams.start;
    }
    if (filterParams.end) {
      params.date_to = filterParams.end;
    }

    return params;
  };

  const resetAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  };

  const fetchData = async (filterParams = {}, sortParams = {}, search = "", page = 1) => {
    resetAbortController();
    setLoading(true);

    try {
      const apiParams = buildApiParams(filterParams, sortParams, search, page);
      const res = await studentApi.list(apiParams);

      const data = res?.data?.data || [];
      const pagination = res?.data?.meta?.pagination || {};

      const transformedData = data.map((student) => {
        const isPremium = student.profile?.is_premium === 1;
        const status = isPremium ? "Premium" : "Basic";

        return {
          id: student.id,
          nama: student.name,
          tanggal: student.profile?.create_at || "-",
          role: "Siswa",
          status: status,
          profile: student.profile,
        };
      });

      setStudents(transformedData);
      setLastPage(pagination.last_page || 1);
      setItemsPerPage(pagination.per_page || 10);
      setTotalItems(pagination.total || 0);
    } catch (error) {
      if (error.name !== "AbortError") {
        Toasts("danger", 3000, "Error", "Gagal mengambil data siswa");
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleShowDetail = async (id) => {
    try {
      setLoading(true);
      const res = await studentApi.detail(id);
      const data = res?.data?.data || null;
      
      if (data) {
        const transformedData = {
          id: data.id,
          nama: data.name,
          email: data.email,
          tanggal: data.premium_expired_at || "-",
          ttl: data.birthdate || "-",
          alamat: data.address || "-",
          identitas: data.identity_number || "-",
          jenisKelamin: data.gender === "male" ? "Laki-Laki" : "Perempuan",
          role: "Siswa",
          status: data.premium_expired_at ? "Premium" : "Basic",
          
          // Transform classrooms
          classrooms: (data.classrooms || []).map(classroom => ({
            id: classroom.id,
            nama_kelas: classroom.name || "-",
            tanggal_bergabung: classroom.created_at ? classroom.created_at.split('T')[0] : "-",
            jumlah_tugas: classroom.total_assignments || 0,
            jumlah_siswa: classroom.total_students || 0,
          })),

          // Transform assignments
          assignments: (data.assignments || []).map(assignment => ({
            id: assignment.id,
            tugas: assignment.title || "-",
            kelas: assignment.classroom_name || "-",
            tanggal_upload: assignment.created_at ? assignment.created_at.split('T')[0] : "-",
            status: assignment.status || "pending",
          })),

          // Transform attendances
          attendances: (data.attandances || []).map(attendance => ({
            id: attendance.id,
            tanggal: attendance.date || "-",
            status: attendance.status || "unknown",
            keterangan: attendance.description || "-",
          })),
        };
        
        setSelectedStudent(transformedData);
        return transformedData;
      }
      return null;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail siswa");
      console.error("Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      
      if (prev.direction === "") {
        return { key, direction: "asc" };
      } else if (prev.direction === "asc") {
        return { key, direction: "desc" };
      } else {
        return { key: "", direction: "" };
      }
    });
    setCurrentPage(1);
  };

  const handleApplyFilter = (appliedFilters) => {
    setFilters(appliedFilters);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setFilters({
      status: "",
      start: "",
      end: "",
    });
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (id) => {
    navigate(`/sekolah/pengguna/siswa/${id}`);
  };

  const handleExportPdf = async () => {
    setExportPdfLoading(true);
    try {
      const params = {};

      params.page = currentPage;

      if (filters.status) {
        params.status = filters.status.toLowerCase();
      }
      if (filters.start) {
        params.date_from = filters.start;
      }
      if (filters.end) {
        params.date_to = filters.end;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await studentApi.exportPdf(params);
      const filename = `Daftar_Siswa_${new Date().getTime()}.pdf`;
      downloadFile(response.data, filename);
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", error.response?.data?.message || "Gagal export PDF");
      console.error("Export PDF error:", error);
    } finally {
      setExportPdfLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportExcelLoading(true);
    try {
      const params = {};

      params.page = currentPage;

      if (filters.status) {
        params.status = filters.status.toLowerCase();
      }
      if (filters.start) {
        params.date_from = filters.start;
      }
      if (filters.end) {
        params.date_to = filters.end;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await studentApi.exportExcel(params);
      const filename = `Daftar_Siswa_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", error.response?.data?.message || "Gagal export Excel");
      console.error("Export Excel error:", error);
    } finally {
      setExportExcelLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters, sortConfig, searchTerm, currentPage);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const currentState = {
      filters,
      sortConfig,
      searchTerm,
      currentPage,
    };

    const lastState = lastFiltersRef.current;

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      lastFiltersRef.current = currentState;
      fetchData(filters, sortConfig, searchTerm, currentPage);
    }
  }, [filters, sortConfig, searchTerm, currentPage]);

  return {
    students,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    setFilters,
    sortConfig,
    searchTerm,
    selectedStudent,

    fetchData,
    handleShowDetail,
    handleSearch,
    handleSort,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportPdf,
    exportPdfLoading,
    handleExportExcel,
    exportExcelLoading,
  };
}