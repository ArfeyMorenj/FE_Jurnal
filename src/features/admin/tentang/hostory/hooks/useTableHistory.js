import { useState, useEffect, useCallback } from "react";
import { useHistoryApi } from "../api/apiTableHistory";
import { Toasts } from "../../../../../utils/Toast";

export function useTableHistory(sectionId) {
  const api = useHistoryApi(sectionId);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    if (!sectionId) return;
    setLoading(true);
    try {
      const res = await api.get();
      const data = res.data.data ?? [];
      setList(data);
    } catch (err) {
      console.error(err);
      Toasts("error", 3000, "Gagal", "Tidak dapat memuat data");
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    list,
    loading,
    submitting,
    setSubmitting,
    fetchData,
  };
}