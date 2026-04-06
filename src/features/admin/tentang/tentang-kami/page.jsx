import React from 'react';
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import FormSection from '../components/FormSection';
import ActionButtons from '../components/ActionButtons';
import { CARD_STYLES } from '../constants/tentangConstants';
import { useAboutForm } from './hooks/useAboutForm';

const Tentang = () => {
  const navigate = useNavigate();
  const {
  loading,
  form,
  errors,
  handleChange,
  handleSubmit,
  aboutData,
} = useAboutForm();

 const submitAndBack = async () => {
  const ok = await handleSubmit();
  if (ok) navigate("/admin/tentang");
};

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Section Tentang, Cerita Kami & Pencapaian
        </h1>
        <BreadCrumbs manual={[{ label: "Description Section" }]} />
      </div>

      <div className="space-y-8">
        {/* Section Tentang Kami */}
        <FormSection
          title="Section Tentang Kami"
          description="Akan tampil di awal halaman tentang kami."
          richTextProps={{
            label: "Deskripsi Tentang Kami",
            name: "deskripsiHalaman1",
            value: form?.deskripsiHalaman1 || "",
            onChange: (e) => handleChange("deskripsiHalaman1", e.target?.value || e),
            required: true,
            height: "200px",
            error: errors?.deskripsiHalaman1,
          }}
          fileInputProps={{
            label: "Masukkan Gambar",
            name: "gambarHalaman1",
            value: form?.gambarHalaman1||"",
            onChange: (e) => handleChange("gambarHalaman1", e),
            required: !aboutData,
            showPreview: true,
            error : errors?.gambarHalaman1,
          }}
        />

        {/* Section Cerita Kami */}
        <FormSection
          title="Section Cerita Kami"
          description="Akan tampil di halaman ke-2 tentang kami."
          richTextProps={{
            label: "Deskripsi Cerita Kami",
            name: "deskripsiHalaman2",
            value: form?.deskripsiHalaman2||"",
            onChange: (e) => handleChange("deskripsiHalaman2", e.target?.value || e),
            required: true,
            height: "200px",
            error : errors?.deskripsiHalaman2,
          }}
          fileInputProps={{
            label: "Masukkan Gambar",
            name: "gambarHalaman2",
            value: form?.gambarHalaman2||"",
            onChange: (e) => handleChange("gambarHalaman2", e),
            required: !aboutData,
            showPreview: true,
            error : errors?.gambarHalaman2,
          }}
        />

        {/* Section Pencapaian */}
        <FormSection
          title="Section Pencapaian"
          description="Akan tampil di halaman ke-3 tentang kami."
          richTextProps={{
            label: "Deskripsi Pencapaian",
            name: "deskripsiPencapaian",
            value: form?.deskripsiPencapaian||"",
            onChange: (e) => handleChange("deskripsiPencapaian", e.target?.value || e),
            required: true,
            rows: 6,
            error : errors?.deskripsiPencapaian,
          }}
        />
      </div>

      <div className={`${CARD_STYLES.ACTION} mt-6`}>
        <ActionButtons
          onSave={submitAndBack}
          onCancel={() => navigate(-1)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Tentang;