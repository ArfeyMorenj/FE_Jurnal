import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePremium from "../controller/usePremium";
import { Toasts } from "../../../../../utils/Toast";

export default function useDetailPremium(id) {
  const navigate = useNavigate();
  const { getPremiumById } = usePremium();
  const [premiumData, setPremiumData] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeBenefits = (benefits) => {
    if (!benefits) return [];
    if (Array.isArray(benefits)) return benefits;

    const text = benefits.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");

    return text
      .split(/[\n,]+/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
  };

  const normalizeDescription = (desc) => {
    if (!desc) return "";
    return desc.replace(/<[^>]+>/g, "").trim();
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    return Number(price).toLocaleString("id-ID", { maximumFractionDigits: 0 });
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getPremiumById(id)
      .then((data) => {
        if (!data) {
          Toasts("error", 3000, "Gagal", "Data paket tidak ditemukan.");
          return navigate("/admin/premium");
        }

        setPremiumData({
          nama: data.name || "",
          harga: formatPrice(data.price),
          masa: `Paket ${data.duration || "1 Bulan"}`,
          keterangan: normalizeDescription(data.description),
          benefit: normalizeBenefits(data.benefits),
        });
      })
      .catch((err) => {
        Toasts("error", 3000, "Gagal", err?.message || "Gagal mengambil data paket.");
        navigate("/admin/premium");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { premiumData, loading };
}
