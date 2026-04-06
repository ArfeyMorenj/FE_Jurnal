import { useState, useEffect, useCallback } from "react";
import { fetchUserProfile } from "../services/profileService";

// Event name for profile refresh
const PROFILE_REFRESH_EVENT = "profileRefresh";

/**
 * Custom hook for managing user profile
 * @returns {Object} Profile data, loading state, error, and refresh function
 */
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const profileData = await fetchUserProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err.message || "Gagal memuat data profil");
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Listen for profile refresh events from other components
  useEffect(() => {
    const handleRefresh = () => {
      loadProfile();
    };

    window.addEventListener(PROFILE_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(PROFILE_REFRESH_EVENT, handleRefresh);
    };
  }, [loadProfile]);

  const refresh = useCallback(() => {
    loadProfile();
    // Dispatch event to notify other components
    window.dispatchEvent(new Event(PROFILE_REFRESH_EVENT));
  }, [loadProfile]);

  return {
    profile,
    isLoading,
    error,
    refresh,
  };
};

