import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./common/Button";
import { useDeleteModal } from "../store/useDeleteModal";

const DeleteConfirmModal = () => {
  const { isOpen, closeDeleteModal, onConfirm, isLoading, setLoading } = useDeleteModal();


  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (onConfirm) await onConfirm();  
      closeDeleteModal();
    } finally {
      setLoading(false);
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex justify-center mb-3">
              <img
                src="/images/trash.png"
                alt="Hapus"
                className="w-20 h-20 object-contain"
              />
            </div>

            <h2 className="inter text-xl font-semibold text-[#000405] mb-1">
              Hapus Data?
            </h2>
            <p className="inter text-[11px] text-[#00040560] mb-5">
              Data yang Anda pilih akan dihapus secara{" "}
              <span className="text-primary-red">permanen</span> dan
              tidak dapat dikembalikan.
            </p>

            <div className="flex gap-3 w-full">
              <Button
                onClick={closeDeleteModal}
                className="flex-1 border border-primary-red text-primary-red inter text-sm font-semibold rounded-lg hover:bg-[#FFF5F5] transition bg-transparent"
              >
                Batalkan
              </Button>

              <Button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`flex-1 bg-primary-red text-white inter text-sm font-semibold rounded-lg transition 
                  ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#B71C1C]"}`}
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;