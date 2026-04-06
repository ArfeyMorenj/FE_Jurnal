import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../../../../../utils/Toast";
import apiClient from "../../../../../lib/axios";
import { downloadFile } from "../../../../../utils/downloadFile";

export function useTransaksiList() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    package: "",
    start: "",
    end: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const abortControllerRef = useRef(null);
  const lastFiltersRef = useRef({});

  const buildApiParams = (filterParams, search, page) => {
    const params = { 
      page,
      per_page: itemsPerPage 
    };

    if (search) {
      params.search = search;
    }

    if (filterParams.status) {
      params.status = filterParams.status;
    }

    if (filterParams.start) {
      params.start_date = filterParams.start;
    }

    if (filterParams.end) {
      params.end_date = filterParams.end;
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
      const res = await apiClient.get("/payment/web/transaction", { 
        params: apiParams,
        signal: abortControllerRef.current.signal 
      });

      const responseData = res?.data?.data || {};
      const transactionList = responseData.data || [];
      const recordsTotal = responseData.total || 0;

      const parsedTransactions = transactionList.map(transaction => {
        let orderItems = [];

        if (transaction.order_items) {
          try {
            let orderItemsStr = transaction.order_items
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');

            orderItems = JSON.parse(orderItemsStr);
          } catch (e) {
            console.error("Failed to parse order_items:", transaction.id, e);
            orderItems = [];
          }
        }

        return {
          ...transaction,
          order_items: orderItems,
        };
      });

      setTransactions(parsedTransactions);
      setLastPage(Math.ceil(recordsTotal / itemsPerPage));
      setCurrentPage(page);
      setTotalItems(recordsTotal);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleShow = async (reference) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/payment/web/transaction/${reference}`);
      const data = res?.data?.data || null;
      setSelectedItem(data);
      return data;
    } catch (error) {
      Toasts("error", 3000, "Error", "Gagal mengambil detail transaksi");
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
    setShowFilterModal(false);
  };

  const handleResetFilter = (resetFilters) => {
    setFilters(resetFilters || {
      status: "",
      package: "",
      start: "",
      end: "",
    });
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (reference) => {
    if (!reference) {
      Toasts("error", 3000, "Error", "Reference tidak ditemukan!");
      return;
    }
    navigate(`/admin/riwayat-transaksi/${reference}`);
  };

  const handleExportPdf = async () => {
    setExportLoading(true);
    try {
      const apiParams = buildApiParams(filters, searchTerm, currentPage);

      const response = await apiClient.get("/export/transaction-pdf-admin", {
        params: apiParams,
        responseType: 'blob'
      });
      
      const filename = `Transaksi_${new Date().getTime()}.pdf`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      console.error("Export PDF error:", error);
      Toasts("danger", 3000, "Error", "Gagal export PDF");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const apiParams = buildApiParams(filters, searchTerm, currentPage);

      const response = await apiClient.get("/export/transaction-excel-admin", {
        params: apiParams,
        responseType: 'blob'
      });
      
      const filename = `Transaksi_${new Date().getTime()}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      console.error("Export Excel error:", error);
      Toasts("danger", 3000, "Error", "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
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
    transactions,
    loading,
    exportLoading,
    currentPage,
    itemsPerPage,
    lastPage,
    totalItems,
    showFilterModal,
    setShowFilterModal,
    filters,
    searchTerm,
    selectedItem,

    fetchData,
    handleShow,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    handlePageChange,
    handleView,
    handleExportExcel,
    handleExportPdf
  };
}