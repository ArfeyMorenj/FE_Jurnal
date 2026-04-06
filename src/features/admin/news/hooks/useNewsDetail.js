import { useCallback, useEffect, useState } from "react";
import { getNewsDetail } from "../services/newsService";
import { getImageUrl } from "../../../../utils/image";

const parseHashtags = (hashtags) => {
  if (!hashtags) return [];

  // kalau array → langsung bersihin & return
  if (Array.isArray(hashtags)) {
    return hashtags.map(tag => tag.replace(/^#/, "").trim()).filter(Boolean);
  }

  // fallback: kalau string lama
  return String(hashtags)
    .split(/\s+/)
    .map(tag => tag.replace(/^#/, "").trim())
    .filter(Boolean);
};


export const useNewsDetail = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    try {
      const detail = await getNewsDetail(id);
      if (detail?.thumbnail) {
        detail.thumbnail_url = getImageUrl(detail.thumbnail);
      }
      detail.tagsArray = parseHashtags(detail.hashtags);
      setData(detail);
    } catch (err) {
      setError("Gagal memuat detail berita.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  return {
    data,
    isLoading,
    error,
    reload: loadDetail,
  };
};


