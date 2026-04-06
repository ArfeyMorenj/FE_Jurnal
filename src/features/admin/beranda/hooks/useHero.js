import { useEffect, useState } from "react";
import { useHeroApi } from "../api/apiHero";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";

export function useHero(sectionId) {
  const api = useHeroApi(sectionId);
  const { openDeleteModal } = useDeleteModal();

  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const MAX_SLIDES = 5;
  const MIN_SLIDES = 1;

  const fetchHero = async () => {
    try {
      setLoading(true);
      const res = await api.list();     
      setHeroes(res.data?.data || []);
    } catch {
      Toasts("error", 3000, "Error", "Gagal memuat data hero");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (heroes.length >= MAX_SLIDES)
      return Toasts("warning", 3000, "Batas Tercapai", "Maksimal 5 slide");

    setSelected(null);
    setShowModal(true);
  };

  const handleShow = async (sectionId, bannerId) => {
    try {
      const res = await api.detail(sectionId, bannerId); 
      const data = res?.data?.data || null;
      setSelected(data);
      return data;
    } catch {
      Toasts("error", 3000, "Error", "Gagal memuat detail hero");
      return null;
    }
  };

  const handleEdit = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (heroes.length <= MIN_SLIDES)
      return Toasts("warning", 3000, "Tidak Bisa Dihapus", "Minimal 1 slide");

    openDeleteModal(item.id, async () => {
      try {
        await api.remove(item.id);
        Toasts("success", 3000, "Berhasil", "Slide dihapus");
        fetchHero();
      } catch {
        Toasts("error", 3000, "Gagal", "Tidak dapat menghapus hero");
      }
    });
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return {
    heroes,
    loading,
    selected,
    showModal,
    setShowModal,
    handleCreate,
    handleEdit,
    handleDelete,
    fetchHero,
    handleShow,
  };
}

