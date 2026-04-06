import { useEffect, useState } from "react";
import { fetchApplications } from "../services/applicationService";

/**
 * Hook untuk mengambil semua aplikasi aktif untuk halaman user
 * Mengambil langsung dari endpoint applications tanpa melalui landing-apps
 */
export const useAllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchApplications();
        const apps = response.applications || [];
        
        setApplications(apps);
        
      } catch (err) {
        setApplications([]);
        
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
    };

    loadApplications();
  }, []); 

  return {
    applications,
    isLoading,
    error,
  };
};