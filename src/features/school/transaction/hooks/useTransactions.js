import { useState, useEffect, useCallback } from "react";
import { Toasts } from "../../../../utils/Toast";
import apiClient from "../../../../lib/axios";
import { downloadFile } from "../../../../utils/downloadFile"; 

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false); 
  const [error, setError] = useState(null);
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalRecords: 0,
    totalPages: 0,
  });
  
  const [filters, setFilters] = useState({
    status: "",
    start: "",
    end: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const buildApiParams = (page = pagination.currentPage) => {
    const params = {
      page,
      per_page: pagination.perPage,
    };

    if (searchTerm) params.search = searchTerm;
    if (filters.status) params.status = filters.status;
    if (filters.start) params.start_date = filters.start;
    if (filters.end) params.end_date = filters.end;

    return params;
  };

  const loadTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = buildApiParams();
      const response = await apiClient.get("/payment/mobile/transaction", { params });

      const paginationPayload = response?.data?.data || {};
      const transactionList = Array.isArray(paginationPayload.data) 
        ? paginationPayload.data 
        : [];

      const total = paginationPayload.total || 0;
      const currentPage = paginationPayload.current_page || params.page || 1;
      const perPage = Number(paginationPayload.per_page) || pagination.perPage;
      const lastPage = paginationPayload.last_page || Math.ceil(total / perPage) || 0;

      const parsedData = transactionList.map(transaction => {
        // order_items bentuk array, ambil nama paket dari premium_package.name
        const orderItems = Array.isArray(transaction.order_items) 
          ? transaction.order_items 
          : [];

        return {
          ...transaction,
          order_items: orderItems,
          reference: transaction.reference || transaction.id,
          status: transaction.status || "unknown",
          paket: transaction.premium_package?.name || orderItems[0]?.name || "-",
          start_date: transaction.start_date || transaction.created_at,
          end_date: transaction.end_date || transaction.expired_time,
        };
      });

      setTransactions(parsedData);
      setPagination((prev) => ({
        ...prev,
        currentPage,
        perPage,
        totalRecords: total,
        totalPages: lastPage,
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gagal memuat data transaksi";
      setError(errorMsg);
      setTransactions([]);
      console.error("Fetch transactions error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, filters, searchTerm]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);  
    setPagination((prev) => ({ ...prev, currentPage: 1 })); 
  };

  const handleFilterChange = (filterValues) => {
    setFilters((prev) => ({ ...prev, ...filterValues }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const params = buildApiParams();
      
      const response = await apiClient.get("/export/transaction-excel-school", {
        params,
        responseType: 'blob'
      });
      
      const filename = `Transaksi_${new Date().toISOString().split('T')[0]}.xlsx`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export Excel berhasil diunduh");
    } catch (error) {
      console.error("Export Excel error:", error);
      Toasts("danger", 3000, "Error", "Gagal export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportPDF = async () => {
    setExportLoading(true);
    try {
      const params = buildApiParams();
  
      const response = await apiClient.get("/export/transaction-pdf-school", {
        params,
        responseType: 'blob'
      });
      
      const filename = `Transaksi_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadFile(response.data, filename);
      
      Toasts("success", 3000, "Berhasil", "Export PDF berhasil diunduh");
    } catch (error) {
      console.error("Export PDF error:", error);
      Toasts("danger", 3000, "Error", "Gagal export PDF");
    } finally {
      setExportLoading(false);
    }
  };

  return {
    transactions,
    isLoading,
    exportLoading,
    error,
    pagination,
    filters,
    searchTerm,
    handlePageChange,
    handleSearch,
    handleFilterChange,
    handleExportExcel,
    handleExportPDF,
  };
};