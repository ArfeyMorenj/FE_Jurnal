import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../../utils/Toast";
import { useTeacherApi } from "../api/apiTeacher";
import { downloadFile } from "../../../../../utils/downloadFile";

export function useTeacherController() {
  const teacherApi = useTeacherApi();
  const navigate = useNavigate();
  
  const [teachers, setTeachers] = useState([]);
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
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [allClassrooms, setAllClassrooms] = useState([]); // Raw data dari API
  const [classroomLoading, setClassroomLoading] = useState(false);
  const [classroomPage, setClassroomPage] = useState(1);
  const [classroomTotalPages, setClassroomTotalPages] = useState(1);
  const [classroomTotalItems, setClassroomTotalItems] = useState(0);
  
  const [classroomFilters, setClassroomFilters] = useState({
    start_date: "",
    end_date: "",
  });

  const [classroomSearch, setClassroomSearch] = useState("");


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

  const buildClassroomParams = (filterParams, search, page) => {
    const params = { page };

    if (search) {
      params.search = search;
    }

    if (filterParams.start_date) {
      params.start_date = filterParams.start_date;
    }
    if (filterParams.end_date) {
      params.end_date = filterParams.end_date;
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
      const res = await teacherApi.list(apiParams);

      const data = res?.data?.data || [];
      const pagination = res?.data?.meta?.pagination || {};

      const transformedData = data.map((teacher) => {
        const isPremium = teacher.profile?.is_premium === 1;
        const status = isPremium ? "Premium" : "Basic";

        return {
          id: teacher.id,
          nama: teacher.name,
          tanggal: teacher.profile?.create_at || "-",
          role: "Pengajar",
          status: status,
          profile: teacher.profile,
        };
      });

      setTeachers(transformedData);
      setLastPage(pagination.last_page || 1);
      setItemsPerPage(pagination.per_page || 10);
      setTotalItems(pagination.total || 0);
    } catch (error) {
      if (error.name !== "AbortError") {
        Toasts("danger", 3000, "Error", "Gagal mengambil data pengajar");
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleShowDetail = async (id, filterParams = {}, search = "") => {
    try {
      setLoading(true);
      setClassroomLoading(true);
      
      // Build params untuk filter
      const params = buildClassroomParams(filterParams, search, classroomPage);
      
      const res = await teacherApi.detail(id, params);
      const responseData = res?.data?.data || null;
      const teacher = responseData?.teacher || null;
      const classroomData = responseData?.classroom || [];
      const paginate = responseData?.paginate || {};
      
      if (teacher) {
        const transformedData = {
          id: teacher.id,
          nama: teacher.name,
          email: teacher.email,
          tanggal: teacher.premium_expired_at || "-",
          ttl: teacher.birthdate || "-",
          alamat: teacher.address || "-",
          identitas: teacher.identity_number || "-",
          jenisKelamin: teacher.gender === "male" ? "Laki-Laki" : teacher.gender === "female" ? "Perempuan" : "-",
          role: "Pengajar",
          status: teacher.premium_expired_at ? "Premium" : "Basic",
          totalClass: teacher.total_class || 0,
          totalAssignments: teacher.total_assignments || 0,
          totalJurnal: teacher.total_jurnal || 0,
          totalStudents: teacher.total_students || 0,
        };
        
        setSelectedTeacher(transformedData);
        
        // Set classroom data dari response
        const transformedClassrooms = classroomData.map((classroom) => ({
          id: classroom.id,
          nama_kelas: classroom.name || "-",
          jumlah_tugas: classroom.total_assignments || 0,
          jumlah_siswa: classroom.total_students || 0,
          tanggal: classroom.created_at || "-",
        }));
        
        setAllClassrooms(transformedClassrooms);
        setClassroomTotalPages(paginate.last_page || 1);
        setClassroomTotalItems(paginate.total || 0);
        
        return transformedData;
      }
      return null;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail pengajar");
      console.error("Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
      setClassroomLoading(false);
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
    navigate(`/sekolah/pengguna/pengajar/${id}`);
  };

  const handleExportPdf = async () => {
    setExportPdfLoading(true);
    try {
      const params = {};

      // Tambahkan page dari pagination yang aktif
      params.page = currentPage;

      // Build params dari filter yang aktif
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

      const response = await teacherApi.exportPdf(params);
      
      const filename = `Daftar_Pengajar_${new Date().getTime()}.pdf`;
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

      // Tambahkan page dari pagination yang aktif
      params.page = currentPage;

      // Build params dari filter yang aktif
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

      const response = await teacherApi.exportExcel(params);
      
      const filename = `Daftar_Pengajar_${new Date().getTime()}.xlsx`;
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
    teachers,
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
    selectedTeacher,

    classrooms: allClassrooms,
    classroomLoading,
    classroomFilters,
    setClassroomFilters,
    classroomSearch,
    setClassroomSearch,
    classroomPage,
    setClassroomPage,
    classroomTotalPages,
    classroomTotalItems,

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