import React from 'react';
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import FormSectionWrapper from '../../../../components/FormSectionWrapper';
import InputField from '../../../../components/common/InputField';
import TextareaField from '../../../../components/common/TextareaField';
import { Toasts } from '../../../../utils/Toast';
import Button from '../../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useBenefitSection } from '../hooks/useBenefitSection';
import { IoAlertCircleOutline } from 'react-icons/io5';

const BenefitSectionPage = () => {
  const navigate = useNavigate();
  const {
    loading,
    formData,
    setFormData,
    benefits,
    setBenefits,
    saveBenefitSection,
    errors,
  } = useBenefitSection();

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBenefit = () => {
    if (benefits.length >= 4) {
      Toasts(
        'warning',
        3000,
        'Maksimal Benefit tercapai!',
        'Kamu hanya bisa menambahkan 4 Benefit.'
      );
      return;
    }
    setBenefits([...benefits, { id: Date.now(), value: '' }]);
  };

  const handleChange = (id, value) => {
    setBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, value } : b))
    );
  };

  const handleRemove = (id) => {
    if (benefits.length === 1) return;
    setBenefits((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSubmit = () => {
    const payload = {
      description: formData.deskripsi,
      benefit: benefits.map((b) => b.value).join(', '),
    };

    saveBenefitSection(() => navigate(-1), payload);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: 'Benefit Section' }]} />

      <FormSectionWrapper
        title="Benefit"
        description="Jelaskan apa benefit / keuntungan menggunakan apikasi-aplikasi yang ada di MiJurnal."
      >
        <TextareaField
          label="Masukkan Deskripsi"
          name="deskripsi"
          placeholder="Masukkan deskripsi"
          value={formData.deskripsi}
          onChange={handleChangeDescription}
          inputStyle="!mb-0"
          required
        />

        {errors?.description && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <IoAlertCircleOutline /> {errors.description}
          </p>
        )}
      </FormSectionWrapper>

      <FormSectionWrapper
        title="List Point Benefit Section"
        description="Tambahkan point yang menjadi benefit MiJurnal."
        showButton
        onButtonClick={handleAddBenefit}
        buttonText="Tambah Benefit"
      >
        {benefits.map((benefit, index) => (
          <div key={benefit.id}>
            <InputField
              label={`Masukkan Benefit ${index + 1}`}
              name={`benefit_${index + 1}`}
              placeholder="Masukkan keterangan benefit"
              value={benefit.value}
              onChange={(e) => handleChange(benefit.id, e.target.value)}
              required
              showRemove={benefits.length > 1}
              onRemove={() => handleRemove(benefit.id)}
            />

            {errors?.[`benefits.${index}.value`] && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <IoAlertCircleOutline /> {errors[`benefits.${index}.value`]}
              </p>
            )}
          </div>
        ))}
      </FormSectionWrapper>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
        <p className="text-[13px] font-medium inter text-[#8B8B8B]">
          Banyak Benefit: {benefits.length} Benefit
        </p>

        <div className="flex gap-3 self-end sm:self-auto">
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
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BenefitSectionPage;
