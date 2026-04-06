import { useState, useEffect } from "react";
import { Toasts } from "../../../../../utils/Toast";
import apiClient from "../../../../../lib/axios";

export const usePremiumPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPremiumPackages = async () => {
    setLoading(true);

    try {
      const res = await apiClient.get("/premium-packages");
      // astagfirulah
      const json = res.data;

      if (json?.meta?.code !== 200) {
        throw new Error(json?.meta?.message || "Gagal mengambil data premium");
      }

      const cleaned = json.data.map((item) => {
        // convert html → plain text
        const html = document.createElement("div");
        html.innerHTML = item.benefits;
        const benefitsArr = html.innerText
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v);

        // split fitur 50:50
        const half = Math.ceil(benefitsArr.length / 2);

        return {
          id: item.id,
          title: item.name,
          subtitle: item.description.replace(/<\/?[^>]+(>|$)/g, ""),
          price: Number(item.price),
          masa: item.duration,
          featuresLeft: benefitsArr.slice(0, half),
          featuresRight: benefitsArr.slice(half),
        };
      });

      setPackages(cleaned);
    } catch (err) {
      Toasts("error", 3000, "Gagal", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumPackages();
  }, []);

  return {
    packages,
    loading,
  };
};
