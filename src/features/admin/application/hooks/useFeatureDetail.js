import { useState, useEffect, useCallback } from 'react';
import { getFeatureById } from '../services/applicationService';

/**
 * Custom hook for managing feature detail
 * @param {string} featureId - Feature ID
 * @returns {Object} Feature data, loading state, and helper functions
 */
export const useFeatureDetail = (featureId) => {
  const [feature, setFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeature = useCallback(async () => {
    if (!featureId) {
      setError('Feature ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getFeatureById(featureId);
      if (result.feature) {
        setFeature(result.feature);
      } else {
        setError('Feature tidak ditemukan');
        setFeature(null);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat detail feature');
      setFeature(null);
    } finally {
      setIsLoading(false);
    }
  }, [featureId]);

  useEffect(() => {
    if (featureId) {
      loadFeature();
    }
  }, [featureId, loadFeature]);

  const refresh = () => loadFeature();

  return {
    feature,
    isLoading,
    error,
    refresh,
  };
};

