import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../../../lib/axios";
import { getApiUrl } from "../../../../../config/api";
import { SECTION_IDS } from "../../../../../constants/sections";
import { Toasts } from "../../../../../utils/Toast";

export const useAboutSection = () => {
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setSectionId(SECTION_IDS.TENTANG_KAMI || null);
  }, []);

  const normalizeList = (raw) => (Array.isArray(raw?.data) ? raw.data : []);

  const fetchAbout = useCallback(async () => {
    if (!sectionId) return;

    try {
      setLoading(true);
      const aboutRes = await apiClient.get(
        getApiUrl(`/sections/${sectionId}/abouts`)
      );
      const list = normalizeList(aboutRes.data);
      if (list.length === 0) {
        setAboutData(null);
        return;
      }

      const latest = list[0];
      setAboutData({
        ...latest,
        image_about_us: latest.image_about_us || null,
        image_story_us: latest.image_story_us || null,
      });
    } catch (err) {
      console.error("fetchAbout error:", err);
      Toasts("error", 3000, "Error", "Gagal mengambil data About Section!");
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) fetchAbout();
  }, [sectionId, fetchAbout]);

  useEffect(() => {
    if (refresh > 0) fetchAbout();
  }, [refresh, fetchAbout]);

  const createOrUpdate = async (id, form, isUpdate = false) => {
    if (!sectionId) {
      Toasts("error", 3000, "Error", "Section ID tidak ditemukan!");
      return false;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("section_id", sectionId);
      payload.append("description_about_us", form.description_about_us);
      payload.append("description_story_us", form.description_story_us);
      payload.append("description_achievement", form.description_achievement);
      payload.append("is_active", "1");
      
      if (form.image_about_us instanceof File) {
        payload.append("image_about_us", form.image_about_us);
      }

      if (form.image_story_us instanceof File) {
        payload.append("image_story_us", form.image_story_us);
      }

      const url = isUpdate
        ? getApiUrl(`/sections/${sectionId}/abouts/${id}?_method=PUT`)
        : getApiUrl(`/sections/${sectionId}/abouts`);

      await apiClient.post(url, payload);

      setRefresh((v) => v + 1);

      Toasts(
        "success",
        2000,
        "Berhasil",
        `Description Section Berhasil ${isUpdate ? "diperbarui" : "dibuat"}!`
      );

      return true;
    } catch (err) {
      console.error("createOrUpdate error:", err);
      Toasts("error", 3000, "Error", "Gagal membuat/memperbarui About Section!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    aboutData,
    loading,
    sectionId,
    createAbout: (form) => createOrUpdate(null, form, false),
    updateAbout: (id, form) => createOrUpdate(id, form, true),
  };
};

export default useAboutSection;
