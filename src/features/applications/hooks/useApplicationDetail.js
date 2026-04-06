import { useCallback, useEffect, useState } from "react";
import { fetchApplicationBySlug } from "../services/applicationService";

export const useApplicationDetail = ({ slug, sectionId, enabled = true }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplication = useCallback(async () => {
    if (!enabled || !slug) {
      setIsLoading(false);
      return null;
    }

    if (!sectionId) {
      setIsLoading(false);
      setData(null);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const application = await fetchApplicationBySlug(sectionId, slug);
      setData(application);
      return application;
    } catch (err) {
      console.error("Failed to fetch application detail:", err);
      setError("Gagal memuat detail aplikasi.");
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [enabled, slug, sectionId]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  return {
    data,
    isLoading,
    error,
    reload: loadApplication,
  };
};