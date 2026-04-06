import { useState, useEffect } from "react";
import apiClient from "../../../../../lib/axios";

export default function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get("/auth/profile");
        const payload = res.data || {};
        
        // Handle different response structures
        // Could be: { meta: {...}, data: {...} } or just { ... }
        let profileData;
        if (payload.meta?.code === 200 && payload.data) {
          profileData = payload.data;
        } else if (payload.data) {
          profileData = payload.data;
        } else {
          profileData = payload;
        }
        
        console.log("Profile data:", profileData); 
        setData(profileData);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err?.response?.data?.message || "Gagal mengambil data profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, loading, error };
}