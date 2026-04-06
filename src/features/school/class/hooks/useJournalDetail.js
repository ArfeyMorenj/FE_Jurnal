import { useState, useEffect, useRef } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { STATUS_MAP } from "../../../../helper/statusOption";
import { downloadFile } from "../../../../utils/downloadFile";

export function useJournalDetail(classId, journalId) {
  const classApi = useClassApi();
  const [journalDetail, setJournalDetail] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const isMountedRef = useRef(false);

  const fetchData = async (search = "", status = "", page = 1) => {
    setLoading(true);

    try {
      const params = { page };
      
      if (search) {
        params.search = search;
      }
      
      if (status) {
        params.status = status;
      }

      const response = await classApi.detailJournal(journalId, params);
      const data = response?.data?.data;

      if (!data) {
        Toasts("danger", 3000, "Error", "Jurnal tidak ditemukan");
        setLoading(false);
        return;
      }

      const attendanceData = data.attendance?.data || [];
      const attendancePagination = data.attendance?.pagination || {};

      const transformedData = {
        id: data.id,
        title: data.title,
        description: data.description || "-",
        date: data.date || data.created_at || "-",
        created_at: data.created_at || "-",
        lesson: data.lesson || { id: null, name: "-" },
        classroom: data.classroom || { id: classId, name: "-" },
        attendance: {
          data: attendanceData.map((student) => ({
            id: student.student_id,
            student_id: student.student_id,
            student_name: student.student_name,
            nisn: student.nisn,
            status: STATUS_MAP[student.status?.toLowerCase()] || student.status,
            status_raw: student.status, 
          })),
          pagination: {
            current_page: attendancePagination.current_page || page,
            last_page: attendancePagination.last_page || 1,
            per_page: attendancePagination.per_page || itemsPerPage,
            total: attendancePagination.total || attendanceData.length,
          },
        },
      };

      setJournalDetail(transformedData);
      setFilteredStudents(transformedData.attendance.data);
      setLastPage(attendancePagination.last_page || 1);
      setCurrentPage(attendancePagination.current_page || page);
      setTotalItems(attendancePagination.total || attendanceData.length);
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal mengambil detail jurnal");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setStatusFilter("");
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
      
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await classApi.exportAttendancePdf(journalId, params);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      const filename = `Kehadiran_${journalId}_${new Date().getTime()}.pdf`;
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
      
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await classApi.exportAttendanceExcel(journalId, params);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      const filename = `Kehadiran_${journalId}_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", error.response?.data?.message || "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    if (!classId || !journalId) return;

    if (!isMountedRef.current) {
      isMountedRef.current = true;
      fetchData(searchTerm, statusFilter, currentPage);
      return;
    }

    fetchData(searchTerm, statusFilter, currentPage);
  }, [searchTerm, statusFilter, currentPage, classId, journalId]);

  return {
    journalDetail,
    filteredStudents,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    searchTerm,
    statusFilter,
    
    handleSearch,
    handleStatusFilter,
    handleResetFilter,
    handlePageChange,
    handleExportPdf,
    handleExportExcel,
    fetchData,
  };
}