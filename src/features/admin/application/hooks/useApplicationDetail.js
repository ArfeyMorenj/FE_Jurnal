import { useState, useEffect, useCallback } from 'react';
import { getApplicationById } from '../services/applicationService';

/**
 * Custom hook for managing application detail
 * @param {string} applicationId - Application ID
 * @returns {Object} Application data, loading state, and helper functions
 */
export const useApplicationDetail = (applicationId) => {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplication = useCallback(async () => {
    if (!applicationId) {
      setError('Application ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getApplicationById(applicationId);
      if (result.application) {
        setApplication(result.application);
      } else {
        setError('Aplikasi tidak ditemukan');
        setApplication(null);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat detail aplikasi');
      setApplication(null);
    } finally {
      setIsLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const refresh = () => loadApplication();

  return {
    application,
    isLoading,
    error,
    refresh,
  };
};

