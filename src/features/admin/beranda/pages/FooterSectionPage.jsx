import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import InputField from "../../../../components/common/InputField";
import TextareaField from "../../../../components/common/TextareaField";
import Button from "../../../../components/common/Button";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useFooter } from "../hooks/useFooter";
import { useFooterForm } from "../hooks/useFooterForm";
import CustomFileInput from "../../../../components/common/CustomFileInput";

const FooterSectionPage = () => {
  const navigate = useNavigate();
  const { footer, loading: loadingFooter } = useFooter();
  const initialForm = useMemo(
    () => ({
      logo: null,
      description: "",
      address: "",
      email: "",
      phone: "",
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedln: "",
      section_id: "",
    }),
    []
  );
  const {
    formData,
    setFormData,
    setErrors,
    errors,
    loading: submitting,
    submit,
  } = useFooterForm(initialForm, footer?.id || null);

  useEffect(() => {
  if (!footer) return;

  setFormData({
    logo: footer.logo ?? null,   
    description: footer.description ?? "",
    address: footer.address ?? "",
    email: footer.email ?? "",
    phone: footer.phone ?? "",
    youtube: footer.youtube ?? "",
    facebook: footer.facebook ?? "",
    twitter: footer.twitter ?? "",
    instagram: footer.instagram ?? "",
    linkedln: footer.linkedln ?? "",
    section_id: footer.section?.id ?? "",
  });
  }, [footer, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const success = await submit();

    if (success) {
      navigate(-1);
    }
  };

  if (loadingFooter) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Footer Section" }]} />

      <FormSectionWrapper
        title="Footer"
        description="Kustomisasi footer Anda dengan mengisi form di bawah ini."
      >
        <CustomFileInput
          label="Logo"
          name="logo"
          value={formData.logo}     
          error={errors.logo}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value, 
            }));

            setErrors((prev) => ({
              ...prev,
              [e.target.name]: e.target.error,
            }));
          }}
        />

        <hr className="border-[#D9D9D9]/80 my-6" />

        <label className="block text-sm font-semibold inter mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:description" width="20" className="text-primary-red" />
          <span>Tentang Website</span>
        </label>

        <TextareaField
          name="description"
          placeholder="Masukkan deskripsi website"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />

        <hr className="border-[#D9D9D9]/80 my-6" />

        <label className="block text-sm font-semibold inter mb-6 flex items-center gap-2">
          <Icon icon="flowbite:address-book-solid" width="20" className="text-primary-red" />
          <span>Alamat Kami</span>
        </label>

        <TextareaField
          label="Alamat"
          name="address"
          placeholder="Masukkan alamat kantor"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="No Telp."
            name="phone"
            placeholder="Masukkan nomor telepon"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        <hr className="border-[#D9D9D9]/80 my-6" />

        <label className="block text-sm font-semibold inter mb-6 flex items-center gap-2">
          <Icon icon="material-symbols-light:media-link" width="20" className="text-primary-red" />
          <span>Platform Media</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Youtube" name="youtube" value={formData.youtube} onChange={handleChange} error={errors.youtube} />
          <InputField label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} error={errors.facebook} />
          <InputField label="X" name="twitter" value={formData.twitter} onChange={handleChange} error={errors.twitter} />
          <InputField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} error={errors.instagram} />
          <InputField label="LinkedIn" name="linkedln" value={formData.linkedln} onChange={handleChange} error={errors.linkedln} />
        </div>
      </FormSectionWrapper>

      <div className="flex justify-end p-5 bg-white rounded-[10px] gap-3">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
        >
          Kembali
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-[#AA494E] text-[13px] font-bold rounded-lg hover:bg-[#B21E1E] text-white"
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default FooterSectionPage;
