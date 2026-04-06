import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { getImageUrl } from "../../../../utils/image";

export function useClassController() {
  const classApi = useClassApi();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    teacher: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [allTeacherOptions, setAllTeacherOptions] = useState([]); // TAMBAHAN INI

  const abortControllerRef = useRef(null);
  const lastFiltersRef = useRef({});

  const buildApiParams = (filterParams, search, page) => {
    const params = { page };

    if (search) {
      params.search = search;
    }

    if (filterParams.teacher) {
      params.teacher_id = filterParams.teacher;
    }

    return params;
  };

  const resetAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  };

  const fetchData = async (filterParams = {}, search = "", page = 1) => {
    resetAbortController();
    setLoading(true);

    try {
      const apiParams = buildApiParams(filterParams, search, page);
      const res = await classApi.list(apiParams);

      const data = res?.data?.data || [];
      const pagination = res?.data?.meta?.pagination || {};

      const transformedData = data.map((item) => ({
        id: item.id,
        title: item.name,
        kodeKelas: item.code,
        limit: item.limit,
        isLocked: item.is_locked,
        totalStudents: item.total_students,
        totalAssignments: item.total_assignments,
        totalJournals: item.total_journals,
        image: getImageUrl(item.background?.image), 
        teacher: {
          id: item.teacher?.id || null,
          name: item.teacher?.name || "-",
        },
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      const uniqueTeachers = Array.from(
        new Map(
          data
            .filter(item => item.teacher?.id && item.teacher?.name)
            .map(item => [item.teacher.id, {
              value: item.teacher.id,
              label: item.teacher.name
            }])
        ).values()
      );

      setClasses(transformedData);
      setFilteredClasses(transformedData);
      setTeacherOptions(uniqueTeachers);
      
      if (!filterParams.teacher && !search) {
        setAllTeacherOptions(uniqueTeachers);
      }
      
      setLastPage(pagination.last_page || 1);
      setCurrentPage(pagination.current_page || 1);
      setItemsPerPage(pagination.per_page || 6);
      setTotalItems(pagination.total || transformedData.length || 0);
    } catch (error) {
      if (error.name !== "AbortError") {
        Toasts("danger", 3000, "Error", "Gagal mengambil data kelas");
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleShow = async (id) => {
    try {
      setLoading(true);
      const res = await classApi.detail(id);
      const classroomData = res?.data?.data?.classroom || null;
      
      if (!classroomData) {
        Toasts("error", 3000, "Error", "Kelas tidak ditemukan");
        return null;
      }

      const transformedData = {
        id: classroomData.id,
        name: classroomData.name,
        code: classroomData.code,
        limit: classroomData.limit,
        is_locked: classroomData.is_locked,
        total_students: classroomData.total_students,
        total_assignments: classroomData.total_assignments,
        total_journals: classroomData.total_journals,
        background: {
          id: classroomData.background?.id || null,
          name: classroomData.background?.name || null,
          image: getImageUrl(classroomData.background?.image), 
        },
        teacher: classroomData.teacher || { id: null, name: "-" },
        students: classroomData.students || [],
        assignments: classroomData.assignments || [],
        journals: classroomData.journals || [],
        created_at: classroomData.created_at || "-",
        updated_at: classroomData.updated_at || "-",
      };

      setSelectedItem(transformedData);
      return transformedData;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail kelas");
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

  const handleApplyFilter = (appliedFilters) => {
    setFilters(appliedFilters);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilters({
      teacher: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (id) => {
    navigate(`/sekolah/kelas/${id}`);
  };

  useEffect(() => {
    fetchData(filters, searchTerm, currentPage);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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
      fetchData(filters, searchTerm, currentPage);
    }
  }, [filters, searchTerm, currentPage]);

  return {
    classes,
    filteredClasses,
    loading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    filters,
    setFilters,
    searchTerm,
    selectedItem,
    teacherOptions: allTeacherOptions.length > 0 ? allTeacherOptions : teacherOptions, // UBAH BARIS INI

    fetchData,
    handleShow,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
  };
}