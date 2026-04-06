import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../../../lib/axios";
import { getApiUrl } from "../../../../../config/api";
import { Toasts } from "../../../../../utils/Toast";
import { SECTION_IDS } from "../../../../../constants/sections";

export const useTeamDevSection = () => {
  const [loading, setLoading] = useState(false);
  const [teamSectionId, setTeamSectionId] = useState(null);
  const [teamData, setTeamData] = useState({
    deskripsiSingkat: "",
    teamMembers: Array(5)
      .fill(null)
      .map((_, i) => ({
        localId: `row-${i}`,
        position: "",
        photo: null,
        isPlaceholder: true,
      })),
  });

  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const sectionId = SECTION_IDS.TENTANG_KAMI;

  const fetchTeam = useCallback(async () => {
    if (!sectionId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get(
        getApiUrl(`/sections/${sectionId}/teams`)
      );

      const listForSection =
        res.data?.data
          ?.filter((d) => d.section?.id === sectionId)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) || [];

      const latestEntry = listForSection[0] || {
        id: null,
        items: [],
        description: "",
      };

      setTeamSectionId(latestEntry.id || null);
      setIsEditing(!!latestEntry.id);

      // Map items berdasarkan index yang ada
      const allItems = latestEntry.items || [];

      // Create array 5 slot, isi dengan data yang ada
      const mapped = Array(5)
        .fill(null)
        .map((_, i) => {
          const existingItem = allItems.find(item => {
            // Cari berdasarkan localId yang match dengan row-{i}
            return item.localId === `row-${i}`;
          }) || allItems[i]; // Fallback ke index jika localId tidak match

          // Cek apakah item punya data (position ATAU photo)
          if (existingItem && (existingItem.position || existingItem.photo)) {
            return {
              localId: existingItem.localId || `row-${i}`,
              position: existingItem.position || "",
              photo: existingItem.photo || null,
              isPlaceholder: false,
            };
          }

          // Slot kosong
          return {
            localId: `row-${i}`,
            position: "",
            photo: null,
            isPlaceholder: true,
          };
        });

      setTeamData({
        deskripsiSingkat: latestEntry.description || "",
        teamMembers: mapped,
      });
    } catch (err) {
      console.error("fetchTeam err:", err);
      setError(err);
      Toasts("error", 3000, "Gagal", "Gagal mengambil data tim developer.");
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  useEffect(() => {
    if (dataVersion > 0) fetchTeam();
  }, [dataVersion, fetchTeam]);

  const submitTeamSection = async (formData) => {
    setLoading(true);

    try {
      let endpoint = "";

      if (teamSectionId) {
        // Update existing team
        formData.append("_method", "PUT");
        endpoint = `/sections/${sectionId}/teams/${teamSectionId}`;
      } else {
        // Create new team
        endpoint = `/sections/${sectionId}/teams`;
      }

      await apiClient.post(getApiUrl(endpoint), formData);

      Toasts("success", 2000, "Berhasil!", "Tim berhasil disimpan!");
      setDataVersion((v) => v + 1);
      return true;
    } catch (err) {
      console.error("submitTeamSection err:", err);
      Toasts("error", 3000, "Gagal!", "Gagal menyimpan data tim.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    teamData,
    setTeamData,
    loading,
    error,
    isEditing,
    teamSectionId,
    fetchTeam,
    submitTeamSection,
  };
};

export default useTeamDevSection;