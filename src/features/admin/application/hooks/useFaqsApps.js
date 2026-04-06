import { useCallback, useEffect, useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { fetchFaqs, createFaq, updateFaq, deleteFaq } from "../services/faqsService";
import { useDeleteModal } from "../../../../store/useDeleteModal";

export default function useFaqs(sectionId) {
  const [faqs, setFaqs] = useState([]);
  const [recordMap, setRecordMap] = useState({});
  const [sectionData, setSectionData] = useState({
    title: "",
    cta_title: "",
    cta_description: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const [addErrors, setAddErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const { openDeleteModal, setLoading: setDeleteLoading, closeDeleteModal } = useDeleteModal();

  const fetchInitialData = useCallback(async () => {
    if (!sectionId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchFaqs(sectionId);
      const faqList = response || [];

      if (faqList.length > 0) {
        const firstFaq = faqList[0];
        setSectionData({
          title: firstFaq.title || "",
          cta_title: firstFaq.cta_title || "",
          cta_description: firstFaq.cta_description || "",
        });

        const uniqueFaqs = [];
        const mapping = {};

        faqList.forEach((faq) => {
          uniqueFaqs.push({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
          });
          mapping[faq.id] = faq.id;
        });

        setFaqs(uniqueFaqs);
        setRecordMap(mapping);
      }
    } catch (err) {
      Toasts("error", 3000, "Gagal", "Gagal memuat data FAQ");
    } finally {
      setIsLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleAddFaq = () => {
    if (faqs.length >= 5) {
      Toasts("warning", 2000, "Peringatan", "Maksimal 5 FAQ");
      return;
    }
    setAddErrors({});
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (newFaq) => {
    if (faqs.length >= 5) {
      Toasts("warning", 2000, "Peringatan", "Maksimal 5 FAQ");
      return;
    }

    const errors = {};
    if (!newFaq.question?.trim()) {
      errors.question = "Pertanyaan wajib diisi";
    }
    if (!newFaq.answer?.trim()) {
      errors.answer = "Jawaban wajib diisi";
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setFaqs((prev) => [
      ...prev,
      {
        id: tempId,
        question: newFaq.question.trim(),
        answer: newFaq.answer.trim(),
      },
    ]);

    setAddErrors({});
    setIsModalOpen(false);
    Toasts("success", 1500, "Berhasil", "FAQ ditambahkan (belum disimpan)");
  };

  const clearAddError = (fieldName) => {
    setAddErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const clearEditError = (fieldName) => {
    setEditErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = (updatedFaq) => {
    const errors = {};
    if (!updatedFaq.question?.trim()) {
      errors.question = "Pertanyaan wajib diisi";
    }
    if (!updatedFaq.answer?.trim()) {
      errors.answer = "Jawaban wajib diisi";
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    setFaqs((prev) =>
      prev.map((f) =>
        f.id === selectedFaq.id
          ? {
              ...f,
              question: updatedFaq.question.trim(),
              answer: updatedFaq.answer.trim(),
            }
          : f
      )
    );

    setEditErrors({});
    setIsEditModalOpen(false);
    Toasts("success", 1500, "Berhasil", "FAQ diperbarui (belum disimpan)");
  };

  const handleDelete = (faq) => {
    openDeleteModal(faq.question, async () => {
      setDeleteLoading(true);

      try {
        const recordId = recordMap[faq.id];

        if (recordId) {
          await deleteFaq(sectionId, recordId);

          setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
          setRecordMap((prev) => {
            const updated = { ...prev };
            delete updated[faq.id];
            return updated;
          });

          Toasts("success", 1500, "Berhasil", "FAQ berhasil dihapus");
        } else {
          setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
          Toasts("success", 1500, "Berhasil", "FAQ dibatalkan");
        }

        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete FAQ:", error);
        Toasts("error", 2000, "Gagal", "Gagal menghapus FAQ");
      } finally {
        setDeleteLoading(false);
      }
    });
  };

  return {
    faqs,
    recordMap,
    sectionData,
    sectionId,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedFaq,
    addErrors,
    editErrors,
    clearAddError,
    clearEditError,
    handleAddFaq,
    handleConfirmAdd,
    handleEdit,
    handleConfirmEdit,
    handleDelete,
    refetchFaqs: fetchInitialData,
  };
}