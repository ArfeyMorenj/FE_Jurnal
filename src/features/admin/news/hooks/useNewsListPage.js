import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsList } from "./useNewsList";
import { useNewsCategories } from "./useNewsCategories";
import { useDeleteModal } from "../../../../store/useDeleteModal";
import { deleteNews } from "../services/newsService";
import { Toasts } from "../../../../utils/Toast";

/**
 * Custom hook for managing news list page logic
 * @returns {Object} Page state, handlers, and computed values
 */
export const useNewsListPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { openDeleteModal } = useDeleteModal();

  const {
    options: categoryOptions,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useNewsCategories();

  const {
    news,
    isLoading,
    error,
    pagination,
    filters,
    setFilters,
    setPage,
    refresh,
    startIndex,
  } = useNewsList();

  // Debounce search input
  const searchTimeoutRef = useRef(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce: update filter after 500ms of no typing
    searchTimeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 500);
  };

  // Sync searchValue with filters.search on mount and when filters are reset externally
  useEffect(() => {
    if (filters.search !== searchValue) {
      setSearchValue(filters.search || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleView = (item) => {
    navigate(`/admin/berita/${item.id}`);
  };

  const handleEdit = (item) => {
    navigate(`/admin/berita/${item.id}/edit`);
  };

  const handleDelete = (item) => {
    openDeleteModal(item.id, async () => {
      try {
        await deleteNews(item.id);
        Toasts("success", 2000, "Berhasil", "Berita berhasil dihapus.");
        refresh();
      } catch (error) {
        const message =
          error.response?.data?.message || "Gagal menghapus berita.";
        Toasts("error", 3000, "Gagal", message);
      }
    });
  };

  const totalData = pagination.total || news.length;

  const categoryMap = useMemo(() => {
    const map = {};
    categoryOptions.forEach((option) => {
      map[option.value] = option.label;
    });
    return map;
  }, [categoryOptions]);

  const mappedNews = useMemo(
    () =>
      news.map((item) => ({
        ...item,
        category: categoryMap[item.category_id] || item.category || "-",
      })),
    [news, categoryMap]
  );

  const categoryId = filters.categoryId || "";

  return {
    searchValue,
    categoryOptions,
    isCategoriesLoading,
    categoryError,
    news: mappedNews,
    isLoading,
    error,
    pagination,
    categoryId,
    handleCategoryChange,
    handleSearchChange,
    handleView,
    handleEdit,
    handleDelete,
    setPage,
    startIndex,
    totalData,
  };
};

