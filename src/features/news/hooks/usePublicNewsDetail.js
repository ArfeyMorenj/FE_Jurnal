import { useCallback, useEffect, useMemo, useState } from "react";
import { getNewsDetailBySlug } from "../../admin/news/services/newsService";
import { useNewsCategories } from "../../admin/news/hooks/useNewsCategories";

const parseHashtags = (hashtags) => {
  if (!hashtags) return [];

  // Backend sekarang mengirimkan hashtags sebagai array (lihat admin newsService)
  // tapi tetap dukung format string lama sebagai fallback.
  if (Array.isArray(hashtags)) {
    return hashtags
      .map((tag) => (tag || "").toString().replace(/^#/, "").trim())
      .filter(Boolean);
  }

  if (typeof hashtags === "string") {
    return hashtags
      .split(/\s+/)
      .map((tag) => tag.replace(/^#/, "").trim())
      .filter(Boolean);
  }

  return [];
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

export const usePublicNewsDetail = (slug) => {
  const [rawData, setRawData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { options: categoryOptions } = useNewsCategories();
  const categoryMap = useMemo(() => {
    const map = {};
    categoryOptions.forEach((opt) => (map[opt.value] = opt.label));
    return map;
  }, [categoryOptions]);

  const loadDetail = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);

    try {
      const detail = await getNewsDetailBySlug(slug);
      if (!detail) {
        setRawData(null);
        setError("Berita tidak ditemukan.");
        return;
      }

      setRawData(detail);
    } catch (err) {
      console.error(`Failed to fetch public news detail (${slug}):`, err);
      setError("Gagal memuat detail berita.");
      setRawData(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const data = useMemo(() => {
    if (!rawData) return null;
    return {
      ...rawData,
      category: categoryMap[rawData.category_id] || "Berita",
      thumbnail_url: rawData.thumbnail || "/images/default.jpg",
      tagsArray: parseHashtags(rawData.hashtags),
      dateFormatted: formatDate(rawData.created_at),
      views: rawData.views ?? 0,
      author: "Admin MiJurnal",
    };
  }, [rawData, categoryMap]);

  return {
    data,
    isLoading,
    error,
    reload: loadDetail,
  };
};


