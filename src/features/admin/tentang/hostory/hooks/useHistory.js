import { useState, useEffect } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { useHistoryApi } from "../api/apiHistory";

export function useHistory(sectionId) {
  const api = useHistoryApi(sectionId);
  
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      console.warn("useHistory: sectionId is required");
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      try {   
        const res = await api.list();        
        setHistory(res.data.data[0] || null);
      } catch (err) {
        console.error("Fetch history error:", err);
        Toasts("error", 3000, "Gagal", "Tidak dapat memuat data history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [sectionId]); 

  const handleTableHistoryClick = () => {
    navigate("/admin/tentang/history/table");
  };

  return { history, loading, handleTableHistoryClick };
}