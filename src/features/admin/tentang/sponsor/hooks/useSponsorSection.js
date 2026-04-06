import { useCallback, useState } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { useSponsorApi } from "../api/apiSponsor";
import { useNavigate } from "react-router-dom";

export function useSponsorSection(sectionId) {
  const api = useSponsorApi(sectionId);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sponsorId, setSponsorId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get();

      const sponsors = res.data?.data;

      if (sponsors && sponsors.length > 0) {
        const firstSponsor = sponsors[0];
        setSponsorId(firstSponsor.id);
        return firstSponsor;
      }

      return null;
    } catch (err) {
      Toasts("error", 3000, "Gagal mengambil data sponsor");
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createSponsor = async (payload) => {
    try {
      setLoading(true);
      await api.create(payload);
      Toasts("success", 3000, "Sponsor berhasil dibuat");
      return true;
    } catch (err) {
      Toasts("error", 3000, "Gagal membuat sponsor");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateSponsor = async (payload) => {
    if (!sponsorId) {
      Toasts("error", 3000, "Sponsor ID tidak ditemukan");
      return false;
    }

    try {
      setLoading(true);
      await api.update(sponsorId, payload);
      Toasts("success", 3000, "Sponsor berhasil diperbarui");

      navigate("/admin/tentang");

      return true;
    } catch (err) {
      Toasts("error", 3000, "Gagal mengupdate sponsor");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sponsorId,
    fetchData,
    createSponsor,
    updateSponsor,
  };
}
