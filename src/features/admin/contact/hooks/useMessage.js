import { useEffect, useRef, useState } from "react";
import { useMessageApi } from "../api/apiMessage";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";

export function useMessage() {
  const api = useMessageApi();
  const abortControllerRef = useRef(null);
  const { openDeleteModal } = useDeleteModal();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sortBy: "created_at",
    direction: "desc",
  });

  // format params
  const buildApiParams = (params) => {
    const query = {};

    if (params.search) query.search = params.search;
    if (params.status !== "" && params.status !== null) query.status = params.status;
    if (params.sortBy) query.sort_by = params.sortBy;
    if (params.direction) query.direction = params.direction;

    return query;
  };

  const resetAbortController = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  const loadItems = async (page = 1, incomingFilters = filters) => {
    resetAbortController();
    setLoading(true);

    try {
      const queryParams = {
        ...buildApiParams(incomingFilters),
        page,
      };

      const res = await api.list(queryParams, abortControllerRef.current);

      const data = res?.data?.data || [];
      const meta = res?.data?.meta?.pagination || {};

      setItems(data);
      setLastPage(meta.last_page || 1);
      setPerPage(meta.per_page || 10);
      setTotalItems(meta.total || data.length);

    } catch (err) {
      const isAbort =
        err.name === "AbortError" ||
        err.code === "ERR_CANCELED" ||
        err.message?.toLowerCase().includes("canceled");

      if (!isAbort) {
        Toasts("error", 3000, "Gagal", "Tidak dapat memuat pesan");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(currentPage, filters);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    loadItems(1, filters);
  }, [filters.search, filters.status, filters.sortBy, filters.direction]);

  const remove = async (id, onSuccess) => {
    openDeleteModal(id, async () => {
      try {
        await api.delete(id);
        Toasts("success", 2000, "Berhasil", "Pesan dihapus");

        loadItems(currentPage, filters);

        if (onSuccess) onSuccess();

      } catch {
        Toasts("error", 3000, "Gagal", "Tidak dapat menghapus pesan");
      }
    });
  };

  const show = async (id) => {
    try {
      const res = await api.get(id);
      return res?.data?.data || null;
    } catch {
      Toasts("error", 3000, "Gagal", "Tidak dapat memuat detail pesan");
      return null;
    }
  };

  return {
    items,
    loading,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    lastPage,
    perPage,
    totalItems,
    loadItems,
    remove,
    show,
  };
}
