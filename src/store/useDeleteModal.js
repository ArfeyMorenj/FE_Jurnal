import { create } from "zustand"

export const useDeleteModal = create((set) => ({
  isOpen: false,
  targetId: null,
  onConfirm: null,
  isLoading: false,

  openDeleteModal: (id, confirmHandler) =>
    set({
      isOpen: true,
      targetId: id,
      onConfirm: confirmHandler,
      isLoading: false, 
    }),

  setLoading: (value) => set({ isLoading: value }),

  closeDeleteModal: () =>
    set({
      isOpen: false,
      targetId: null,
      onConfirm: null,
      isLoading: false,
    }),
}))
