import { useCallback, useState } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { useTeamApi } from "../api/apiTeams";

export function useTeamSection(sectionId) {
  const api = useTeamApi(sectionId);

  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get();
      const teams = res?.data?.data ?? [];

      if (teams.length > 0) {
        setTeamId(teams[0].id);
        return teams[0];
      }

      return null;
    } catch {
      Toasts("error", 3000, "Gagal mengambil data teams");
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createTeam = async (payload) => {
    setLoading(true);
    try {
      await api.create(payload);
      Toasts("success", 3000, "Team berhasil dibuat");
      return true;
    } catch {
      Toasts("error", 3000, "Gagal membuat team");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (payload) => {
    if (!teamId) {
      Toasts("error", 3000, "ID team tidak ditemukan");
      return false;
    }

    setLoading(true);
    try {
      await api.update(teamId, payload);
      Toasts("success", 3000, "Team berhasil diperbarui");
      return true;
    } catch {
      Toasts("error", 3000, "Gagal memperbarui team");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, teamId, fetchData, createTeam, updateTeam };
}
