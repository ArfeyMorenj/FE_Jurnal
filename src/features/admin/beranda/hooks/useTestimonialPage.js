import { useNavigate } from "react-router-dom";
import useTestimonialSection from "../controller/useTestimonialSection";
import { useDeleteModal } from "../../../../store/useDeleteModal";
import { Toasts } from "../../../../utils/Toast";

export default function useTestimonialSectionPage(sectionId) {
  const navigate = useNavigate();
  const {
    testimonials,
    leadInText,
    setLeadInText,
    updateLeadInText,
    deleteTestimonial,
    loading,
    currentPage,
    lastPage,
    totalItems,
    handlePageChange,
  } = useTestimonialSection(sectionId);

  const { openDeleteModal } = useDeleteModal(); 

  const handleSave = async () => {
    if (!leadInText.trim()) {
      Toasts("error", 3000, "Gagal Simpan", "Lead-in text wajib diisi"); 
      return;
    }
    await updateLeadInText(leadInText);
    navigate("/admin/beranda");
  };

  const handleAddTestimonial = () => {
    navigate(`/admin/beranda/testimonial-add/${sectionId}`);
  };

  const handleDeleteClick = (testimonial) => {
    const id = typeof testimonial === "string" ? testimonial : testimonial.id;
    if (!id) return;

    openDeleteModal(id, async () => {
      await deleteTestimonial(id);
    });
  };

  const handleView = (item) => {
    const id = typeof item === "string" ? item : item.id;
    if (!id) return;
    navigate(`/admin/beranda/testimonial-detail/${sectionId}/${id}`);
  };

  const handleEditTestimonial = (item) => {
    const id = typeof item === "string" ? item : item.id;
    navigate(`/admin/beranda/testimonial-edit/${sectionId}/${id}`);
  };

  return {
    testimonials,
    leadInText,
    setLeadInText,
    loading,
    currentPage,
    lastPage,
    totalItems,
    handlePageChange,
    handleSave,
    handleAddTestimonial,
    handleDeleteClick,
    handleView,
    handleEditTestimonial,
  };
}