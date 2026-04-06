import { useState } from "react";
import { useTableHistory } from "./useTableHistory";
import { useHistoryApi } from "../api/apiTableHistory";
import { Toasts } from "../../../../../utils/Toast";
import { historyItemSchema } from "../schema/historyTableSchema";

export function useHistoryManager(sectionId) {
  const api = useHistoryApi(sectionId);
  const { list: serverList, loading, submitting, fetchData } = useTableHistory(sectionId);

  const [draftItems, setDraftItems] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const combinedList = [...serverList, ...draftItems];
  const hasChanges = draftItems.length > 0;

  const validateItem = (item) => {
    const result = historyItemSchema.safeParse(item);
    if (!result.success) {
      const errMap = {};
      result.error.issues.forEach((e) => {
        errMap[e.path[0]] = e.message;
      });
      setFormErrors(errMap);
      return false;
    }
    setFormErrors({});
    return true;
  };

  const handleOpenCreate = () => {
    if (combinedList.length >= 5) {
      Toasts("warning", 3000, "Maksimal 5 Items", "Tidak bisa menambah lebih dari 5 data");
      return;
    }
    setOpenCreate(true);
  };

  const handleCloseCreate = () => setOpenCreate(false);

  const handleCreate = (newItem) => {
    if (!validateItem(newItem)) return;

    if (combinedList.length >= 5) {
      Toasts("warning", 3000, "Maksimal 5 Items", "Tidak bisa menambah lebih dari 5 data");
      return;
    }

    setDraftItems((prev) => [...prev, newItem]);
    setOpenCreate(false);
    Toasts("success", 2000, "Berhasil", "Item ditambahkan (belum tersimpan)");
  };

  const handleOpenEdit = (item, index) => {
    if (index >= serverList.length) {
      Toasts("warning", 3000, "Peringatan", "Simpan draft terlebih dahulu");
      return;
    }
    setEditingItem(item);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setEditingItem(null);
    setOpenEdit(false);
  };

  const handleEdit = async (updatedItem) => {
    if (!editingItem?.id) return;
    if (!validateItem(updatedItem)) return;

    try {
      await api.update(editingItem.id, {
        histories: [{ year: updatedItem.year, description: updatedItem.description }],
      });

      Toasts("success", 2000, "Berhasil", "Data berhasil diupdate");
      handleCloseEdit();
      await fetchData();
    } catch (err) {
      console.error(err);
      Toasts("error", 3000, "Gagal", "Gagal mengupdate data");
    }
  };

  const handleOpenDelete = (item, index) => {
    if (combinedList.length <= 1) {
      Toasts("warning", 3000, "Minimal 1 Item", "Tidak bisa menghapus, minimal harus ada 1 data");
      return;
    }
    const isDraft = index >= serverList.length;
    setDeletingItem({ item, index, isDraft });
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeletingItem(null);
    setOpenDelete(false);
  };

  const handleConfirmDelete = async (item, index) => {
    if (combinedList.length <= 1) {
      Toasts("warning", 3000, "Minimal 1 Item", "Tidak bisa menghapus, minimal harus ada 1 data");
      return;
    }

    const isDraft = index >= serverList.length;

    if (isDraft) {
      const draftIdx = index - serverList.length;
      setDraftItems((prev) => prev.filter((_, i) => i !== draftIdx));
      Toasts("success", 2000, "Berhasil", "Draft item dihapus");
    } else {
      try {
        await api.delete(item.id);
        Toasts("success", 2000, "Berhasil", "Data berhasil dihapus");
        await fetchData();
      } catch (err) {
        console.error(err);
        Toasts("error", 3000, "Gagal", "Gagal menghapus data");
      }
    }

    handleCloseDelete();
  };

  const handleSaveDrafts = async () => {
    if (draftItems.length === 0) {
      Toasts("info", 2000, "Info", "Tidak ada data baru untuk disimpan");
      return false;
    }

    try {
      await api.save({
        histories: draftItems.map((item) => ({ year: item.year, description: item.description })),
      });

      setDraftItems([]);
      await fetchData();

      Toasts("success", 2000, "Berhasil", "Data baru tersimpan");
      return true;
    } catch (err) {
      console.error("SAVE FAILED:", err);
      Toasts("error", 3000, "Gagal", "Gagal menyimpan ke database");
      return false;
    }
  };

  return {
    list: combinedList,
    serverList,
    draftItems,
    loading,
    submitting,
    hasChanges,

    modals: {
      create: { isOpen: openCreate, open: handleOpenCreate, close: handleCloseCreate },
      edit: { isOpen: openEdit, open: handleOpenEdit, close: handleCloseEdit },
      delete: { isOpen: openDelete, open: handleOpenDelete, close: handleCloseDelete },
    },

    editingItem,
    deletingItem,
    formErrors,

    onCreate: handleCreate,
    onEdit: handleEdit,
    onDelete: handleConfirmDelete,
    onSaveDrafts: handleSaveDrafts,
  };
}
