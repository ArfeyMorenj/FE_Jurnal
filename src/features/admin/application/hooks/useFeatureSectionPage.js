import { useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";
import { useFeatures } from "./useFeatures";
import {
  createFeature,
  deleteFeature,
  updateFeature,
} from "../services/applicationService";

export const useFeatureSectionPage = (applicationId) => {
  const { features, isLoading, error, refresh } = useFeatures(applicationId);
  const { openDeleteModal } = useDeleteModal();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleView = () => {};

  const handleAddFeature = () => {
    setIsAddOpen(true);
  };

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setIsEditOpen(true);
  };

  const handleSaveFeature = async (featureData) => {
    if (!applicationId) return;

    setIsSubmitting(true);
    try {
      await createFeature({
        application_id: applicationId,
        name: featureData.name,
        description: featureData.description,
        feature_image: featureData.featureImage,
        icon_image: featureData.iconImage,
        color_gradient_start: featureData.gradientFrom,
        color_gradient_end: featureData.gradientTo,
      });

      Toasts("success", 3000, "Berhasil", "Fitur berhasil ditambahkan");
      setIsAddOpen(false);
      refresh();
    } catch (error) {
      const errorMessage = error.message || "Gagal menambahkan fitur";
      Toasts("error", 3000, "Gagal", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFeature = async (updatedData) => {
    if (!selectedFeature || !applicationId) return;

    setIsUpdating(true);
    try {
      await updateFeature(selectedFeature.id, {
        application_id: applicationId,
        name: updatedData.name,
        description: updatedData.description,
        feature_image: updatedData.featureImage,
        icon_image: updatedData.iconImage,
        color_gradient_start: updatedData.gradientFrom,
        color_gradient_end: updatedData.gradientTo,
      });

      Toasts("success", 3000, "Berhasil", "Fitur berhasil diperbarui");
      setIsEditOpen(false);
      setSelectedFeature(null);
      refresh();
    } catch (error) {
      const errorMessage = error.message || "Gagal memperbarui fitur";
      Toasts("error", 3000, "Gagal", errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = (featureId) => {
    if (!featureId) return;

    openDeleteModal(featureId, async () => {
      try {
        await deleteFeature(featureId);
        Toasts("success", 3000, "Berhasil", "Fitur berhasil dihapus");
        refresh();
      } catch (error) {
        const errorMessage = error.message || "Gagal menghapus fitur";
        Toasts("error", 3000, "Gagal", errorMessage);
      }
    });
  };

  const closeAddModal = () => setIsAddOpen(false);
  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedFeature(null);
  };

  return {
    features,
    isLoading,
    error,
    isAddOpen,
    isEditOpen,
    isSubmitting,
    isUpdating,
    selectedFeature,
    handleView,
    handleAddFeature,
    handleEdit,
    handleDelete,
    handleSaveFeature,
    handleUpdateFeature,
    closeAddModal,
    closeEditModal,
  };
};

