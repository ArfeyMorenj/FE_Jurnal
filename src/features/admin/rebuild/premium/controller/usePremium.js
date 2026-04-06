import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../../../lib/axios";
import { getApiUrl } from "../../../../../config/api";
import { Toasts } from "../../../../../utils/Toast";

const usePremium = () => {
  const [premiumData, setPremiumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // GET
  const fetchPremiumData = useCallback(async (page = 1, search = "") => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.get(getApiUrl("/premium-packages"), {
        params: {
          page,
          per_page: itemsPerPage,
          search,
        },
      });

      setPremiumData(
        data?.data.map((d) => ({
          id: d.id,
          nama: d.name || "",       
          harga: d.price || "",
          masa: d.duration || "",
        })) || []
      );

      setTotalData(data?.meta?.pagination?.total || 0);
      setCurrentPage(data?.meta?.pagination?.current_page || page);
    } catch (err) {
      setError(err);
      const message =
        err?.response?.data?.message || "Gagal memuat daftar paket premium.";
      Toasts("error", 3000, "Gagal", message);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  const getPremiumById = useCallback(async (id) => {
    try {
      const { data } = await apiClient.get(getApiUrl(`/premium-packages/${id}`));
      return data?.data || null;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal mengambil detail paket premium.";
      Toasts("error", 3000, "Gagal", message);
      throw err;
    }
  }, []);

  // CREATE
  const createPremium = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post(getApiUrl("/premium-packages"), payload);
      Toasts("success", 3000, "Berhasil", "Paket premium berhasil dibuat!");
      fetchPremiumData(1, searchTerm);
      return data?.data;
    } catch (err) {
      setError(err);
      const message =
        err?.response?.data?.errors?.[0] ||
        err?.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat menambahkan paket premium.";
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPremiumData, searchTerm]);

  // EDIT
  const updatePremium = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      const { data } = await apiClient.put(getApiUrl(`/premium-packages/${id}`), payload);
      Toasts("success", 3000, "Berhasil", "Paket premium berhasil diperbarui!");
      fetchPremiumData(currentPage, searchTerm);
      return data?.data;
    } catch (err) {
      setError(err);
      const message =
        err?.response?.data?.errors?.[0] ||
        err?.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat memperbarui paket premium.";
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPremiumData, currentPage, searchTerm]);

  // DELETE
  const deletePremium = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(getApiUrl(`/premium-packages/${id}`));
      Toasts("success", 3000, "Berhasil", "Paket premium berhasil dihapus!");
      fetchPremiumData(currentPage, searchTerm);
    } catch (err) {
      setError(err);
      const message =
        err?.response?.data?.message || "Terjadi kesalahan saat menghapus paket premium.";
      Toasts("error", 3000, "Gagal", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPremiumData, currentPage, searchTerm]);

  useEffect(() => {
    fetchPremiumData(currentPage, searchTerm);
  }, [fetchPremiumData, currentPage, searchTerm]);

  return {
    premiumData,
    loading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalData,
    searchTerm,
    setSearchTerm,
    fetchPremiumData,
    createPremium,
    updatePremium,
    deletePremium,
    getPremiumById,
  };
};

export default usePremium;
