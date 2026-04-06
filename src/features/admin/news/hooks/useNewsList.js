import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { getNewsList } from "../services/newsService";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mapNewsItem = (item) => ({
  ...item,
  category: item.category?.title || item.category_id || "-",
  views: item.views ?? 0,
  uploadDate: formatDate(item.created_at),
  status: item.is_published ? "Dipublikasikan" : "Draft",
});

export const useNewsList = (initialPage = 1) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
  });

  // Load news function
  const loadNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.currentPage,
        per_page: pagination.perPage,
      };

      // Add search param if not empty
      if (filters.search && filters.search.trim()) {
        params.search = filters.search.trim();
      }

      // Add category_id param if not empty
      if (filters.categoryId && filters.categoryId.trim()) {
        params.category_id = filters.categoryId;
      }

      const { data, pagination: metaPagination } = await getNewsList(params);
      setNews(data.map(mapNewsItem));

      if (metaPagination) {
        setPagination((prev) => ({
          ...prev,
          currentPage: metaPagination.current_page || prev.currentPage,
          perPage: metaPagination.per_page || prev.perPage,
          total: metaPagination.total || 0,
          lastPage: metaPagination.last_page || 1,
        }));
      }
    } catch (err) {
      setError("Gagal memuat berita.");
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.currentPage, pagination.perPage]);

  // Track previous filter values
  const prevSearchRef = useRef(filters.search);
  const prevCategoryIdRef = useRef(filters.categoryId);

  // Reset to page 1 when filters change
  useEffect(() => {
    const searchChanged = prevSearchRef.current !== filters.search;
    const categoryChanged = prevCategoryIdRef.current !== filters.categoryId;

    if (searchChanged || categoryChanged) {
      prevSearchRef.current = filters.search;
      prevCategoryIdRef.current = filters.categoryId;
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [filters.search, filters.categoryId]);

  // Load news when filters or page changes
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const refresh = () => loadNews();

  const startIndex = useMemo(
    () => (pagination.currentPage - 1) * pagination.perPage,
    [pagination.currentPage, pagination.perPage]
  );

  return {
    news,
    isLoading,
    error,
    pagination,
    filters,
    setFilters,
    setPage,
    refresh,
    startIndex,
  };
};
