import { useEffect, useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useFooterApi } from "../api/apiFooter";

export function useFooter() {
  const api = useFooterApi();
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFooter = async () => {
    setLoading(true);
    try {
      const res = await api.get();
      setFooter(res.data.data[0] || null);
    } catch {
      Toasts("error", 3000, "Gagal", "Tidak dapat memuat data footer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return { footer, loading, fetchFooter };
}
