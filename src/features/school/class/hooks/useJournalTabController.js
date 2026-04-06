import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../utils/Toast";
import { useClassApi } from "../api/apiClass";
import { downloadFile } from "../../../../utils/downloadFile";

export function useJournalTabController(classId) {
  const classApi = useClassApi();
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
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
        params.search_journal = search;
      }

      if (filterParams.created_from) {
        params.start_journal = filterParams.created_from;
      }

      if (filterParams.created_to) {
        params.end_journal = filterParams.created_to;
      }

      const response = await classApi.detail(classId, params);
      const journalsData = response?.data?.data?.journals;

      if (!journalsData) {
        setJournals([]);
        setFilteredJournals([]);
        setTotalItems(0);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setJournals(journalsData.data || []);
      setFilteredJournals(journalsData.data || []);
      setTotalItems(journalsData.total || 0);
      setCurrentPage(journalsData.current_page || page);
      setTotalPages(journalsData.last_page || 1);
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal mengambil data jurnal");
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

  const handleView = (journalId) => {
    navigate(`/sekolah/kelas/${classId}/jurnal/${journalId}`);
  };

  const handleExportPdf = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search_journal = searchTerm;
      }
      
      if (filters.created_from) {
        params.start_journal = filters.created_from;
      }
      
      if (filters.created_to) {
        params.end_journal = filters.created_to;
      }

      const response = await classApi.exportJournalPdf(classId, params);
      
      const filename = `Jurnal_${classId}_${new Date().getTime()}.pdf`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal export PDF");
      console.error("Export PDF error:", error);
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const params = {};
      
      if (searchTerm) {
        params.search_journal = searchTerm;
      }
      
      if (filters.created_from) {
        params.start_journal = filters.created_from;
      }
      
      if (filters.created_to) {
        params.end_journal = filters.created_to;
      }

      const response = await classApi.exportJournalExcel(classId, params);
      
      const filename = `Jurnal_${classId}_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      Toasts("danger", 3000, "Error", "Gagal export Excel");
      console.error("Export Excel error:", error);
    } finally {
      setExportLoading(false);
    }
  };

  const handlePrintReport = () => {
    Toasts("success", 3000, "Success", "Cetak laporan jurnal berhasil");
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
    journals,
    filteredJournals,
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
    handlePrintReport,
    handleExportPdf,
    handleExportExcel,
  };
}