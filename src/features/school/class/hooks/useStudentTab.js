import { useState, useEffect, useRef } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { downloadFile } from "../../../../utils/downloadFile";

export function useStudentTabController(classId) {
  const classApi = useClassApi();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const lastFiltersRef = useRef({});

  const fetchData = async (search = "", page = 1) => {
    setLoading(true);

    try {
      const params = { page };

      if (search) {
        params.search_student = search;
      }

      const response = await classApi.detail(classId, params);
      const studentsData = response?.data?.data?.students;

      if (!studentsData) {
        setStudents([]);
        setFilteredStudents([]);
        setTotalItems(0);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setStudents(studentsData.data || []);
      setFilteredStudents(studentsData.data || []);
      setTotalItems(studentsData.total || 0);
      setCurrentPage(studentsData.current_page || page);
      setTotalPages(studentsData.last_page || 1);
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal mengambil data siswa");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewStudent = (studentId, navigate) => {
    navigate(`/sekolah/pengguna/siswa/${studentId}`);
  };

  const handleExportPdf = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search_student = searchTerm;
      }

      const response = await classApi.exportStudentPdf(classId, params);
      
      const filename = `Daftar_Siswa_${classId}_${new Date().getTime()}.pdf`;
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
        params.search_student = searchTerm;
      }

      const response = await classApi.exportStudentExcel(classId, params);
      
      const filename = `Daftar_Siswa_${classId}_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchData(searchTerm, currentPage);
    }
  }, []);

  useEffect(() => {
    const currentState = {
      searchTerm,
      currentPage,
    };

    const lastState = lastFiltersRef.current;

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      lastFiltersRef.current = currentState;
      if (classId) {
        fetchData(searchTerm, currentPage);
      }
    }
  }, [searchTerm, currentPage]);

  return {
    students,
    filteredStudents,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    searchTerm,

    handleSearch,
    handlePageChange,
    handleViewStudent,
    handleExportPdf,
    handleExportExcel,
  };
}