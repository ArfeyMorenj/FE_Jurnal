import { useState, useEffect, useRef } from "react";
import useTeamDevSection from "../controller/useTeamDevSection";
import { teamFormSchema } from "../schemas/teamSchemas";
import { Toasts } from "../../../../../utils/Toast";

export const useTeamDevForm = () => {
  const { teamData, loading, error, submitTeamSection, fetchTeam } =
    useTeamDevSection();

  const [teamForm, setTeamForm] = useState({
    deskripsiSingkat: "",
    members: [],
  });

  const [errors, setErrors] = useState({
    deskripsiSingkat: null,
    members: [],
    globalMembersError: null,
  });

  const prevPreviewRef = useRef({});

  useEffect(() => {
    if (!teamData) return;

    const mapped = teamData.teamMembers.map((m) => ({
      localId: m.localId,
      position: m.position || "",
      photo: null, // File object untuk upload baru
      preview: m.photo || null, // URL dari BE atau blob URL
      isPlaceholder: m.isPlaceholder,
    }));

    setTeamForm({
      deskripsiSingkat: teamData.deskripsiSingkat || "",
      members: mapped,
    });

    mapped.forEach((m) => {
      prevPreviewRef.current[m.localId] = m.preview;
    });
  }, [teamData]);

  const handleChange = (localId, field, value) => {
    if (localId === "deskripsiSingkat") {
      setTeamForm((p) => ({ ...p, deskripsiSingkat: value }));
      return;
    }

    setTeamForm((p) => ({
      ...p,
      members: p.members.map((m) =>
        m.localId === localId
          ? { ...m, [field]: value, isPlaceholder: false }
          : m
      ),
    }));
  };

  const handleFile = (localId, e) => {
    const file = e.target.files?.[0] || null;
    const previewUrl = file ? URL.createObjectURL(file) : null;

    setTeamForm((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.localId === localId
          ? { ...m, photo: file, preview: previewUrl, isPlaceholder: false }
          : m
      ),
    }));

    if (file) prevPreviewRef.current[localId] = previewUrl;
  };

  const handleDeleteMember = async (localId) => {
    setTeamForm((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.localId === localId
          ? {
              localId,
              position: "",
              photo: null,
              preview: null,
              isPlaceholder: true,
            }
          : m
      ),
    }));
  };

  const validateForm = () => {
    const activeMembers = teamForm.members.filter(
      (m) => !m.isPlaceholder && (m.position?.trim() || m.photo || m.preview)
    );

    const payload = {
      deskripsiSingkat: teamForm.deskripsiSingkat,
      members: activeMembers.map((m) => ({
        position: m.position,
        photo: m.photo instanceof File ? m.photo : m.preview || null,
      })),
    };

    const result = teamFormSchema.safeParse(payload);

    if (!result.success) {
      const formatted = result.error.format();

      const descErr = formatted.deskripsiSingkat?._errors?.[0] || null;

      const memberIndexErrors =
        formatted.members &&
        Object.keys(formatted.members)
          .filter((k) => !isNaN(Number(k)))
          .map((idx) => ({
            index: Number(idx),
            position: formatted.members[idx]?.position?._errors?.[0] || null,
            photo: formatted.members[idx]?.photo?._errors?.[0] || null,
          }));

      setErrors({
        deskripsiSingkat: descErr,
        members: memberIndexErrors || [],
        globalMembersError: formatted.members?._errors?.[0] || null,
      });

      Toasts("error", 2000, "Validasi gagal", "Pastikan Deskripsi dan Data terisi!");
      return false;
    }

    setErrors({
      deskripsiSingkat: null,
      members: [],
      globalMembersError: null,
    });

    return true;
  };

  const handleSubmitAll = async () => {
    if (!validateForm()) return false;

    const payload = new FormData();
    payload.append("title", "Meet Our Team");
    payload.append("description", teamForm.deskripsiSingkat || "");

    // Ambil semua members (termasuk yang kosong untuk maintain index)
    teamForm.members.forEach((m, i) => {
      // Selalu kirim localId dan position
      payload.append(`items[${i}][localId]`, m.localId);
      payload.append(`items[${i}][position]`, m.position || "");

      // Kirim photo HANYA jika ada file baru yang di-upload
      if (m.photo instanceof File) {
        payload.append(`items[${i}][photo]`, m.photo);
      }
      // Jika tidak ada file baru, backend akan maintain photo lama (jika ada)
      // atau kosongkan jika memang dihapus (position kosong)
    });

    const res = await submitTeamSection(payload);
    if (res) fetchTeam();
    return res;
  };

  return {
    teamForm,
    errors,
    loading,
    error,
    handleChange,
    handleFile,
    handleDeleteMember,
    handleSubmitAll,
    prevPreviewRef,
    fetchTeam,
  };
};

export default useTeamDevForm;