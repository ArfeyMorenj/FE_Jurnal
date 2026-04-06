import { useCallback, useEffect, useState } from "react";
import { fetchApplications } from "../services/applicationService";

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { applications: data } = await fetchApplications();
      setApplications(data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setApplications([]);
      
      // More specific error messages
      if (err.code === 'TIMEOUT') {
        setError('Server tidak merespons. Periksa koneksi internet atau coba lagi nanti.');
      } else if (err.code === 'NETWORK_ERROR') {
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        setError(err.message || 'Gagal memuat daftar aplikasi.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return {
    applications,
    isLoading,
    error,
    reload: loadApplications,
  };
};

