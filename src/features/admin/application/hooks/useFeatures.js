import { useState, useEffect, useCallback } from 'react';
import { getFeaturesByApplicationId } from '../services/applicationService';

/**
 * Custom hook for managing features by application ID
 * @param {string} applicationId - Application ID
 * @returns {Object} Features data, loading state, and helper functions
 */
export const useFeatures = (applicationId) => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeatures = useCallback(async () => {
    if (!applicationId) {
      setError('Application ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getFeaturesByApplicationId(applicationId);
      setFeatures(result.features || []);
    } catch (err) {
      setError(err.message || 'Gagal memuat data features');
      setFeatures([]);
    } finally {
      setIsLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    loadFeatures();
  }, [loadFeatures]);

  return {
    features,
    isLoading,
    error,
    refresh: loadFeatures,
  };
};

