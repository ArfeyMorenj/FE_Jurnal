import { useCallback, useEffect, useState } from 'react';
import { fetchApplications } from './applicationService';

export const useApplications = (initialPage = 1, searchTerm = '') => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });

  const loadApplications = useCallback(
    async (page = pagination.currentPage, search = searchTerm) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = { page };
        if (search && search.trim()) {
          params.search = search.trim();
        }
        
        const { applications, pagination: paginationMeta } = await fetchApplications(params);
        setApps(applications);
        setPagination((prev) => ({
          currentPage: paginationMeta?.currentPage || page,
          perPage: paginationMeta?.perPage || prev.perPage,
          total: paginationMeta?.total ?? applications.length,
          lastPage: paginationMeta?.lastPage || 1,
        }));
      } catch (err) {
        setApps([]);
        
        // More specific error messages
        if (err.code === 'TIMEOUT') {
          setError('Server tidak merespons. Periksa koneksi internet atau coba lagi nanti.');
        } else if (err.code === 'NETWORK_ERROR') {
          setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        } else {
          setError(err.message || 'Gagal memuat data aplikasi.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.currentPage, searchTerm]
  );

  useEffect(() => {
    // Reset ke page 1 saat search berubah, atau load dengan initialPage saat pertama kali
    const pageToLoad = searchTerm && searchTerm.trim() ? 1 : initialPage;
    loadApplications(pageToLoad, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, initialPage]);

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    loadApplications(page, searchTerm);
  };

  const refresh = () => loadApplications(pagination.currentPage, searchTerm);

  return {
    apps,
    isLoading,
    error,
    pagination,
    setPage,
    refresh,
  };
};


