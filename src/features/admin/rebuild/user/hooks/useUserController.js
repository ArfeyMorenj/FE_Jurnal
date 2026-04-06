import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../../utils/Toast";
import { useUserApi } from "../api/apiUser";

export function useUserController() {
  const userApi = useUserApi();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState({
    role: "",
    status: "",
    start: "",
    end: "",
  });

  const [sortConfig, setSortConfig] = useState({ 
    key: "", 
    direction: "" 
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

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

    if (filterParams.role) {
      const roleMapping = {
        "Siswa": "student",
        "Pengajar": "teacher",
        "Sekolah": "school"
      };
      params.role = roleMapping[filterParams.role] || filterParams.role;
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
      const res = await userApi.list(apiParams);

      const data = res?.data?.data || [];
      const pagination = res?.data?.meta?.pagination || {};

      const transformedData = data.map((user) => {
        // Mapping role dari API ke UI
        const roleMapping = {
          "student": "Siswa",
          "teacher": "Pengajar",
          "school": "Sekolah",
          "admin": "Admin"
        };

        const isPremium = user.profile?.is_premium === 1;
        const status = isPremium ? "Premium" : "Basic";

        return {
          id: user.id,
          nama: user.name,
          email: user.email,
          tanggal: user.profile?.create_at || "-",
          role: roleMapping[user.role[0]] || user.role[0],
          status: status,
          profile: user.profile,
        };
      });

      setUsers(transformedData);
      setFilteredUsers(transformedData);
      setLastPage(pagination.last_page || 1);
      setCurrentPage(pagination.current_page || 1);
      setItemsPerPage(pagination.per_page || 10);
      setTotalItems(pagination.total || transformedData.length || 0);
    } catch (error) {
      if (error.name !== "AbortError") {
        Toasts("danger", 3000, "Error", "Gagal mengambil data pengguna");
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
      const res = await userApi.detail(id);
      const data = res?.data?.data || null;
      setSelectedItem(data);
      return data;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail pengguna");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleShowByRole = async (id, role) => {
    try {
      setLoading(true);
      let res;

      if (role === "Pengajar" || role === "teacher") {
        res = await userApi.detailTeacher(id);
      } else if (role === "Siswa" || role === "student") {
        res = await userApi.detailStudent(id);
      } else {
        res = await userApi.detail(id);
      }

      const data = res?.data?.data || null;
      setSelectedItem(data);
      return data;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail pengguna");
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

  const handleResetFilter = (resetFilters) => {
    setFilters(resetFilters || {
      role: "",
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

  const handleView = (id, role) => {
    navigate(`/admin/user/${id}`, { state: { role } });
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

  const handleExportExcel = async () => {
  try {
    setLoading(true);
    const apiParams = buildApiParams(filters, sortConfig, searchTerm, currentPage);
    
    const response = await userApi.exportExcel(apiParams);
    
    // Download file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `user_list_${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    Toasts("success", 3000, "Berhasil", "Data berhasil diexport ke Excel");
  } catch (error) {
    Toasts("danger", 3000, "Error", "Gagal mengexport data ke Excel");
    console.error("Export Excel error:", error);
  } finally {
    setLoading(false);
  }
};

const handleExportPDF = async () => {
  try {
    setLoading(true);
    const apiParams = buildApiParams(filters, sortConfig, searchTerm, currentPage);
    
    const response = await userApi.exportPDF(apiParams);
    
    // Download file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `user_list_${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    Toasts("success", 3000, "Berhasil", "Data berhasil diexport ke PDF");
  } catch (error) {
    Toasts("danger", 3000, "Error", "Gagal mengexport data ke PDF");
    console.error("Export PDF error:", error);
  } finally {
    setLoading(false);
  }
};


  return {
    users,
    filteredUsers,
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
    selectedItem,

    fetchData,
    handleShow,
    handleShowByRole,
    handleSearch,
    handleSort,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportExcel,
  handleExportPDF,
  };
}