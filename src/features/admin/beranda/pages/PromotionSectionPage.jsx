import React from 'react';
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import InputField from '../../../../components/common/InputField';
import FormSectionWrapper from '../../../../components/FormSectionWrapper';
import Button from '../../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { usePromotionSection } from '../hooks/usePromotionSection';

const PromotionSectionPage = () => {
  const navigate = useNavigate();

  const {
    loading,
    formData,
    handleChange,
    handleSubmit,
    errors,
  } = usePromotionSection(navigate);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Promotion Section" }]} />

      <div className="bg-white p-7.5 rounded-[10px]">
        <InputField
          label="Masukkan Judul Promotion Section"
          name="judul_section"
          placeholder="Masukkan judul promotion section"
          value={formData.judul_section}
          onChange={handleChange}
          required
          error={errors.judul_section}
        />

        <InputField
          label="Masukkan Subjudul Promotion Section"
          name="subjudul_section"
          placeholder="Masukkan subjudul promotion section"
          value={formData.subjudul_section}
          onChange={handleChange}
          required
          error={errors.subjudul_section}
        />
      </div>

      <FormSectionWrapper title="Tombol (CTA Buttons)">
        <InputField
          label="Label Tombol 1"
          name="label_tombol"
          placeholder="Masukkan teks dalam tombol"
          value={formData.label_tombol}
          onChange={handleChange}
          error={errors.label_tombol}
        />
      </FormSectionWrapper>

      <FormSectionWrapper title="Angka Promosi (Di Bawah Hero)">
        <InputField
          label="Pengguna Aktif"
          name="active_user"
          placeholder="Masukkan nominal pengguna aktif"
          value={formData.active_user}
          onChange={handleChange}
          error={errors.active_user}
        />

        <InputField
          label="Pengguna Aplikasi"
          name="app_user"
          placeholder="Masukkan nominal pengguna aplikasi"
          value={formData.app_user}
          onChange={handleChange}
          error={errors.app_user}
        />

        <InputField
          label="Rating Aplikasi"
          name="app_rate"
          placeholder="Masukkan rating aplikasi"
          value={formData.app_rate}
          onChange={handleChange}
          error={errors.app_rate}
        />
      </FormSectionWrapper>

      <div className="flex justify-end p-5 bg-white rounded-[10px] gap-3">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
        >
          Kembali
        </Button>

        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-[#AA494E] text-[13px] font-bold rounded-lg hover:bg-[#B21E1E] text-white"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default PromotionSectionPage;
