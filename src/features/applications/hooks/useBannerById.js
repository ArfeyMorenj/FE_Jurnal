import { useEffect, useState } from "react";
import { useHeroApi } from "../../admin/beranda/api/apiHero";

export function useBannerById(sectionId) {
  const api = useHeroApi(sectionId);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sectionId) {
      return;
    }

    const loadHero = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await api.list();
        const heroes = res.data?.data || [];
        const firstHero = heroes.length > 0 ? heroes[0] : null;
        setData(firstHero);
      } catch (err) {
        console.error("Failed to fetch hero:", err);
        setError("Gagal memuat hero.");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadHero();
  }, [sectionId]); 

  return {
    data,
    isLoading,
    error,
  };
}