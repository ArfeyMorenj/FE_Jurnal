import { useNavigate, useParams } from "react-router-dom";
import FaqTable from "../../beranda/components/FaqTable";
import AddFaqModal from "../../beranda/components/AddFaqModal";
import EditFaqModal from "../../beranda/components/EditFaqModal";
import useFaqs from "../hooks/useFaqsApps";
import { useFaqSectionForm } from "../hooks/useFaqsFormApps";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import InputField from "../../../../components/common/InputField";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import TextareaField from "../../../../components/common/TextareaField";
import Button from "../../../../components/common/Button";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";

export default function FaqSectionApps() {
  const navigate = useNavigate();
  
  const params = useParams();
  const sectionId = params.sectionId || params.id;

  const {
    faqs,
    recordMap,
    sectionData,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedFaq,
    handleAddFaq,
    handleConfirmAdd,
    handleEdit,
    handleConfirmEdit,
    handleDelete,
    refetchFaqs,
    editErrors,
    addErrors,
    clearAddError,
    clearEditError
  } = useFaqs(sectionId);

  const { formData, setFormData, errors, loading, submit } = useFaqSectionForm(
    sectionId,
    sectionData,
    faqs,
    recordMap
  );

  if (!sectionId) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl">
        <BreadCrumbs manual={[{ label: "FAQ Section" }]} />
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-red-500 text-lg mb-4">Section ID tidak ditemukan</p>
          <p className="text-sm text-gray-500 mb-4">URL: {window.location.pathname}</p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 rounded-[8px] text-white"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner text="Memuat data FAQ..." />;
  }

  const handleSaveAll = async () => {
    const success = await submit(faqs, recordMap);
    if (success) {
      await refetchFaqs();
      navigate(-1); 
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "FAQ Section" }]} />

      <FormSectionWrapper
        title="Judul FAQ Section"
        description="Judul akan tampil sebagai heading utama section FAQ"
      >
        <InputField
          label="Masukkan Judul FAQ Section"
          name="title"
          placeholder="Masukkan judul FAQ section"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          error={errors.title}
          required
        />
      </FormSectionWrapper>

      <FormSectionWrapper
        title="List FAQ"
        description="Maksimal 5 FAQ"
        showButton
        onButtonClick={handleAddFaq}
        buttonText="Tambah FAQ"
      >
        <FaqTable data={faqs} onEdit={handleEdit} onDelete={handleDelete} />
      </FormSectionWrapper>

      <FormSectionWrapper
        title="Call-to-Action (CTA) Box"
        description="Tambahkan point yang menjadi highlight untuk aplikasi-aplikasi pada MiJurnal"
      >
        <InputField
          label="Masukkan Judul box FAQ"
          name="cta_title"
          placeholder="Misalnya: Apakah Anda memiliki pertanyaan lebih lanjut?"
          value={formData.cta_title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cta_title: e.target.value }))
          }
          note="Headline akan tampil di bagian atas box FAQ"
          error={errors.cta_title}
        />

        <TextareaField
          label="Masukkan Deskripsi"
          name="cta_description"
          placeholder="Masukkan subheadline sebagai pendukung headline yang Anda buat"
          value={formData.cta_description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cta_description: e.target.value }))
          }
          inputStyle="!mb-0"
          note="Subheadline akan tampil di bagian bawah headline"
          error={errors.cta_description}
        />
      </FormSectionWrapper>

      <div className="flex justify-between items-center bg-white p-5 rounded-lg">
        <p className="text-[13px] text-[#8B8B8B]">
          FAQ ditambahkan: {faqs.length} / 5
        </p>

        <div className="flex gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 rounded-[8px] text-white"
          >
            Kembali
          </Button>

          <Button
            onClick={handleSaveAll}
            disabled={loading || faqs.length === 0}
            className="bg-[#AA494E] text-white rounded-[8px] disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <AddFaqModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleConfirmAdd}
        errors={addErrors}
        onClearError={clearAddError}
      />

      <EditFaqModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        faq={selectedFaq}
        onUpdate={handleConfirmEdit}
        errors={editErrors}
        onClearError={clearEditError}
      />

      <DeleteConfirmModal />
    </div>
  );
}