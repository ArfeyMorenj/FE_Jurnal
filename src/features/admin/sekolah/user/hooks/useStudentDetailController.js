import { useState, useEffect, useMemo } from "react";
import { useStudentApi } from "../api/apiStudent";
import { Toasts } from "../../../../../utils/Toast";

export function useStudentDetailController(studentId) {
  const studentApi = useStudentApi();
  
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const [classroomSearch, setClassroomSearch] = useState("");
  const [classroomFilters, setClassroomFilters] = useState({ start: "", end: "" });
  const [classroomPage, setClassroomPage] = useState(1);
  const classroomPerPage = 6;
  const [showClassroomFilter, setShowClassroomFilter] = useState(false);
  const [classroomPagination, setClassroomPagination] = useState(null);

  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [assignmentPage, setAssignmentPage] = useState(1);
  const assignmentPerPage = 5;
  const [assignmentPagination, setAssignmentPagination] = useState(null);

  const [attendancePage, setAttendancePage] = useState(1);
  const attendancePerPage = 7;
  const [attendanceFilters, setAttendanceFilters] = useState({ status: "" });
  const [attendancePagination, setAttendancePagination] = useState(null);

  const fetchStudentDetail = async (params = {}) => {
    if (!studentId) return;

    try {
      setLoading(true);
      const res = await studentApi.detail(studentId, params);
      // Backend shape: { student: {...}, classroom: { data, pagination }, assignment: { data, pagination }, attendance: { data, pagination } }
      const payload = res?.data?.data || null;
      const studentData = payload?.student;
      const classroomsData = payload?.classroom?.data || [];
      const assignmentsData = payload?.assignment?.data || [];
      const attendancesData = payload?.attendance?.data || payload?.attandances || [];
      const classroomPaginationData = payload?.classroom?.pagination || null;
      const assignmentPaginationData = payload?.assignment?.pagination || null;
      const attendancePaginationData = payload?.attendance?.pagination || null;
      
      if (studentData) {
        const transformedData = {
          id: studentData.id,
          nama: studentData.name,
          email: studentData.email,
          tanggal: studentData.premium_expired_at || "-",
          ttl: studentData.birthdate || "-",
          alamat: studentData.address || "-",
          identitas: studentData.identity_number || "-",
          jenisKelamin: studentData.gender === "male" ? "Laki-Laki" : "Perempuan",
          role: "Siswa",
          status: studentData.premium_expired_at ? "Premium" : "Basic",
          
          rawClassrooms: classroomsData,
          rawAssignments: assignmentsData,
          rawAttendances: attendancesData,
        };
        
        setStudent(transformedData);
      }
      
      if (classroomPaginationData) {
        setClassroomPagination(classroomPaginationData);
      }
      
      if (assignmentPaginationData) {
        setAssignmentPagination(assignmentPaginationData);
      }
      
      if (attendancePaginationData) {
        setAttendancePagination(attendancePaginationData);
      }
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail siswa");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildDetailParams = () => {
    const params = {};

    if (classroomSearch) {
      params.search_class = classroomSearch;
    }

    if (classroomFilters.start) {
      params.start_date = classroomFilters.start;
    }

    if (classroomFilters.end) {
      params.end_date = classroomFilters.end;
    }

    // Kirim page untuk classroom pagination
    // Asumsi: API menggunakan parameter classroom_page untuk classroom pagination
    // Jika berbeda, sesuaikan dengan dokumentasi API
    params.classroom_page = classroomPage;

    if (assignmentSearch) {
      params.search_assignment = assignmentSearch;
    }

    // Kirim page untuk assignment pagination
    // Asumsi: API menggunakan parameter assignment_page untuk assignment pagination
    // Jika berbeda, sesuaikan dengan dokumentasi API
    params.assignment_page = assignmentPage;

    if (attendanceFilters.status) {
      params.status = attendanceFilters.status;
    }

    // Kirim page untuk attendance pagination
    params.page = attendancePage;

    return params;
  };

  useEffect(() => {
    const params = buildDetailParams();
    fetchStudentDetail(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    studentId,
    classroomSearch,
    classroomFilters,
    classroomPage,
    assignmentSearch,
    assignmentPage,
    attendanceFilters,
    attendancePage,
  ]);

  const processedClassrooms = useMemo(() => {
    if (!student?.rawClassrooms) return [];

    let data = student.rawClassrooms.map(c => ({
      id: c.id,
      nama_kelas: c.name || "-",
      tanggal_bergabung: c.created_at ? c.created_at.split('T')[0] : "-",
      jumlah_tugas: c.total_assignments || 0,
      jumlah_siswa: c.total_students || 0,
      code: c.code || "-",
    }));

    // Tidak ada sorting (API tidak support sorting)
    return data;
  }, [student]);

  // Pagination sudah by API, jadi tidak perlu slice lagi
  const paginatedClassrooms = processedClassrooms;
  
  // Gunakan pagination dari API
  const classroomTotalPages = classroomPagination?.last_page || 1;
  const classroomTotal = classroomPagination?.total || 0;

  const classroomHandlers = {
    resetFilter: () => {
      setClassroomFilters({ start: "", end: "" });
      setClassroomPage(1);
    },
    applyFilter: () => {
      setShowClassroomFilter(false);
      setClassroomPage(1);
    },
  };

  const processedAssignments = useMemo(() => {
    if (!student?.rawAssignments) return [];

    // Transform
    let data = student.rawAssignments.map(a => ({
      id: a.id,
      tugas: a.title || a.name || "-",
      kelas: a.classroom_name || a.class_name || "-",
      tanggal_upload: a.created_at ? a.created_at.split('T')[0] : "-",
      status: a.status || "pending",
      deadline: a.deadline || "-",
    }));

    // Tidak ada sorting dan limit (semua by API)
    return data;
  }, [student]);

  // Assignment tidak ada handlers (tidak ada sorting)

  const processedAttendances = useMemo(() => {
    if (!student?.rawAttendances) return [];

    let data = student.rawAttendances.map(att => ({
      id: att.id,
      tanggal: att.date || att.created_at?.split('T')[0] || "-",
      status: att.status || "unknown",
      keterangan: att.description || att.note || "-",
      journal_id: att.journal_id || "-",
    }));

    // Tidak ada sorting (API tidak support sorting)
    return data;
  }, [student]);

  // Pagination sudah by API, jadi tidak perlu slice lagi
  const paginatedAttendances = processedAttendances;
  
  // Gunakan pagination dari API
  const attendanceTotalPages = attendancePagination?.last_page || 1;
  const attendanceTotal = attendancePagination?.total || 0;

  // Assignment pagination dari API
  const assignmentTotalPages = assignmentPagination?.last_page || 1;
  const assignmentTotal = assignmentPagination?.total || 0;

  return {
    loading,
    student,
    
    classrooms: {
      data: paginatedClassrooms,
      total: classroomTotal,
      search: classroomSearch,
      setSearch: setClassroomSearch,
      filters: classroomFilters,
      setFilters: setClassroomFilters,
      page: classroomPage,
      setPage: setClassroomPage,
      totalPages: classroomTotalPages,
      perPage: classroomPerPage,
      showFilter: showClassroomFilter,
      setShowFilter: setShowClassroomFilter,
      handlers: classroomHandlers,
    },

    assignments: {
      data: processedAssignments,
      total: assignmentTotal,
      search: assignmentSearch,
      setSearch: setAssignmentSearch,
      page: assignmentPage,
      setPage: setAssignmentPage,
      totalPages: assignmentTotalPages,
      perPage: assignmentPerPage,
    },

    attendances: {
      data: paginatedAttendances,
      total: attendanceTotal,
      filters: attendanceFilters,
      setFilters: setAttendanceFilters,
      page: attendancePage,
      setPage: setAttendancePage,
      totalPages: attendanceTotalPages,
      perPage: attendancePerPage,
    },
  };
}