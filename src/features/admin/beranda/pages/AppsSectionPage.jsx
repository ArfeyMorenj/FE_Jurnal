import { useNavigate } from "react-router-dom";

import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import InputField from "../../../../components/common/InputField";
import ApplicationTable from "../components/ApplicationTable";
import Button from "../../../../components/common/Button";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";

import ChooseAppModal from "../components/ChooseAppModal";
import EditAppModal from "../components/EditAppModal";

import { useAppsSection } from "../hooks/useAppsSection";
import { useAppsSectionForm } from "../hooks/useAppsSectionForm";
import { SECTION_IDS } from "../../../../constants/sections";

const AppsSectionPage = () => {
  const navigate = useNavigate();
  const SECTION_ID = SECTION_IDS.APPLICATION_HERO_SECTION;

  const {
    apps,
    recordMap,
    appOptions,
    leadInText,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedApp,
    handleAddApp,
    handleConfirmAdd,
    handleEdit,
    handleConfirmEdit,
    handleDelete,
  } = useAppsSection(SECTION_ID);

  const {
    formData,
    setFormData,
    errors,
    loading,
    submit,
  } = useAppsSectionForm(leadInText, apps, recordMap);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleView = (appId) => {
    const app = apps.find(a => a.id === appId);

    const sectionId = app.section?.id;
    
    navigate(`/admin/aplikasi/detail/${appId}`, {
      state: {
        sectionId,
        applicationId: appId,
        applicationName: app.name
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Apps Section" }]} />

      <FormSectionWrapper
        title="Lead-in Text Apps Section"
        description="Lead-in text akan tampil sebagai judul utama"
      >
        <InputField
          label="Masukkan Teks Pengantar"
          name="lead_in_text"
          placeholder="Masukkan teks pengantar"
          value={formData.lead_in_text}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lead_in_text: e.target.value }))
          }
          error={errors.lead_in_text}
        />
      </FormSectionWrapper>

      <FormSectionWrapper
        title="List Aplikasi"
        description="Maksimal 3 aplikasi"
        showButton
        onButtonClick={handleAddApp}
        buttonText="Pilih Aplikasi"
      >
        <ApplicationTable
          data={apps}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </FormSectionWrapper>

      <div className="flex justify-between items-center bg-white p-5 rounded-lg">
        <p className="text-[13px] text-[#8B8B8B]">
          Aplikasi ditambahkan: {apps.length} / 3
        </p>

        <div className="flex gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 rounded-[8px] text-white"
          >
            Kembali
          </Button>

          <Button
            onClick={async () => {
              const saved = await submit(apps, recordMap);
              if (saved) navigate(-1);
            }}
            disabled={loading || apps.length === 0}
            className="bg-[#AA494E] text-white rounded-[8px] disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <ChooseAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
        options={appOptions}
      />

      <EditAppModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleConfirmEdit}
        defaultValue={
          appOptions.find((opt) => opt.label === selectedApp?.name)?.value || ""
        }
        options={appOptions}
      />

      <DeleteConfirmModal />
    </div>
  );
};

export default AppsSectionPage;