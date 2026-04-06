import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../../lib/axios";
import { getApiUrl } from "../../../../config/api";
import { Toasts } from "../../../../utils/Toast";

const generateSlug = (base, index) => {
  const slugBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slugBase}-row-${index + 1}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export const useHighlight = () => {
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(null);
  const [points, setPoints] = useState([]);
  const [sectionId, setSectionId] = useState(null);


  // GET
  const fetchHighlight = useCallback(async () => {
    setLoading(true);
    try {
      const secRes = await apiClient.get(getApiUrl("/sections"));
      const sectionData = secRes.data?.data?.[0];

      if (!sectionData?.id) {
        Toasts("error", 3000, "Gagal", "Tidak ada section dari backend.");
        return;
      }
      setSectionId(sectionData.id);

      const res = await apiClient.get(getApiUrl("/highlights"));
      const records = res.data?.data || [];

      const header = records.find((item) => item.is_main === true) || null;
      const pts = records.filter((item) => item.is_main === false && !item.deleted_at);

      setHighlight({
        id: header?.id || null,
        title: header?.title || "",
        description: header?.description || "",
      });

      setPoints(
        pts.map((p) => ({
          id: p.id,
          point_title: p.point_title,
          icon: p.icon,
        }))
      );
    } catch (err) {
      console.error("Error fetching highlight:", err);
      Toasts("error", 3000, "Gagal", "Gagal mengambil data highlight.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHighlight();
  }, [fetchHighlight]);

  
  // CREATE/UPDATE
  const submitHighlight = async (form) => {
    if (!sectionId) {
      Toasts("error", 3000, "Gagal", "Section ID tidak ditemukan.");
      return false;
    }

    setLoading(true);
    try {
      const headerFD = new FormData();
      headerFD.append("title", form.judul_section.trim());
      headerFD.append("description", form.deskripsi.trim());
      headerFD.append("slug", form.judul_section.toLowerCase().replace(/\s+/g, "-"));
      headerFD.append("is_main", 1);
      headerFD.append("is_active", 1);
      headerFD.append("section_id", sectionId);

      let isUpdateHeader = false;

      if (highlight?.id) {
        headerFD.append("_method", "PUT");
        await apiClient.post(getApiUrl(`/highlights/${highlight.id}`), headerFD);
        isUpdateHeader = true;
      } else {
        const createRes = await apiClient.post(getApiUrl("/highlights"), headerFD);
        setHighlight({
          id: createRes.data?.data?.id || null,
          title: form.judul_section.trim(),
          description: form.deskripsi.trim(),
        });
      }

      for (let i = 0; i < form.rows.length; i++) {
      const row = form.rows[i];

      const text = row?.text?.trim() ?? "";
      const hasImg = Boolean(row?.image || row?.preview);
      if (!row.id && text === "" && !row.image && !row.preview) {
        continue;
      }

        const fd = new FormData();
        fd.append("section_id", sectionId);
        fd.append("point_title", row.text.trim());
        fd.append("point_description", row.text.trim());
        fd.append("is_main", 0);
        fd.append("is_active", 1);

        if (row.image instanceof File) {
          fd.append("icon", row.image);
        }

        if (!row.id) {
          fd.append("slug", generateSlug(form.judul_section, i));
          await apiClient.post(getApiUrl("/highlights"), fd);
        } else {
          fd.append("_method", "PUT");
          await apiClient.post(getApiUrl(`/highlights/${row.id}`), fd);
        }
      }


      if (isUpdateHeader) {
        Toasts("success", 3000, "Berhasil", "Highlight berhasil diperbarui!");
      } else {
        Toasts("success", 3000, "Berhasil", "Highlight berhasil disimpan!");
      }

      await fetchHighlight();
      return true;
    } catch (err) {
      console.error("Gagal submit highlight:", err);
      Toasts("error", 3000, "Gagal", "Gagal menyimpan highlight.");
      return false;
    } finally {
      setLoading(false);
    }
  };


  // DELETE POINT
  const deletePoint = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(getApiUrl(`/highlights/${id}`));
      setPoints((prev) => prev.filter((p) => p.id !== id));
      Toasts("success", 3000, "Berhasil", "Point dihapus.");
    } catch (err) {
      console.error("Error deleting:", err);
      Toasts("error", 3000, "Gagal", "Gagal menghapus point.");
    } finally {
      setLoading(false);
    }
  };

  return {
    highlight,
    points,
    loading,
    fetchHighlight,
    submitHighlight,
    deletePoint,
  };
};

export default useHighlight;
