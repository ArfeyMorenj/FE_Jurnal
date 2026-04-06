import { useCallback, useEffect, useState } from "react";
import { fetchBannerBySlug } from "../services/bannerService";

export const useHeroBanner = ({ sectionId, slug, enabled = true }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBanner = useCallback(async () => {
    if (!enabled || !slug || !sectionId) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const banner = await fetchBannerBySlug({ sectionId, slug });
      setData(banner);
      return banner;
    } catch (err) {
      console.error("Failed to fetch hero banner:", err);
      setError("Gagal memuat hero section.");
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [enabled, sectionId, slug]);

  useEffect(() => {
    loadBanner();
  }, [loadBanner]);

  return {
    data,
    isLoading,
    error,
    reload: loadBanner,
  };
};


