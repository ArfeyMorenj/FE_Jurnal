import { useEffect, useState, useCallback } from "react";
import { getApplicationBySlug } from "../services/applicationService";
import { useSectionContext } from "../../../../contexts/useSectionContext";

/**
 * Ambil applicationId berdasarkan slug.
 * Menggunakan Section ID dari context untuk API call.
 */
export const useApplicationIdBySlug = (slug) => {
  const { currentSectionId } = useSectionContext();
  const [applicationId, setApplicationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!slug) {
      setError("Slug aplikasi tidak ditemukan");
      setApplicationId(null);
      return;
    }

    if (!currentSectionId) {
      setError("Section ID tidak ditemukan. Pastikan navigasi dari halaman aplikasi.");
      setApplicationId(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await getApplicationBySlug(slug, currentSectionId);
      const id = result?.application?.id;
      if (id) {
        setApplicationId(id);
      } else {
        setError("Aplikasi tidak ditemukan");
        setApplicationId(null);
      }
    } catch (err) {
      setError(err?.message || "Gagal memuat aplikasi");
      setApplicationId(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug, currentSectionId]);

  useEffect(() => {
    load();
  }, [load]);

  return { applicationId, isLoading, error, reload: load };
};