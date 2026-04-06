import { useCallback, useEffect, useMemo, useState } from "react";
import { getNewsList } from "../../admin/news/services/newsService";
import { useNewsCategories } from "../../admin/news/hooks/useNewsCategories";

const stripHtml = (html = "") => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

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

const mapNewsItem = (item, categoryMap) => {
  const textContent = stripHtml(item.content);
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    image: item.thumbnail || "/images/default.jpg",
    category: categoryMap[item.category_id] || "Berita",
    date: formatDate(item.created_at),
    views: item.views ?? 0,
    excerpt: textContent.slice(0, 200),
    description: textContent.slice(0, 200),
    content: item.content,
    author: "Admin MiJurnal",
  };
};

export const usePublicNewsList = (initialPage = 1, perPage = 6) => {
  const [rawNews, setRawNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    perPage,
    total: 0,
    lastPage: 1,
  });

  const { options: categoryOptions } = useNewsCategories();
  const categoryMap = useMemo(() => {
    const map = {};
    categoryOptions.forEach((opt) => (map[opt.value] = opt.label));
    return map;
  }, [categoryOptions]);

  const loadNews = useCallback(
    async (page = pagination.currentPage) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = {
          page,
          per_page: pagination.perPage,
        };
        const { data, pagination: metaPagination } = await getNewsList(params);
        setRawNews(data);
        if (metaPagination) {
          setPagination((prev) => ({
            ...prev,
            currentPage: metaPagination.currentPage,
            perPage: metaPagination.perPage,
            total: metaPagination.total,
            lastPage: metaPagination.lastPage,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch public news list:", err);
        setError("Gagal memuat berita.");
        setRawNews([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.currentPage, pagination.perPage]
  );

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const news = useMemo(
    () => rawNews.map((item) => mapNewsItem(item, categoryMap)),
    [rawNews, categoryMap]
  );

  return {
    news,
    isLoading,
    error,
    pagination,
    setPage,
  };
};


