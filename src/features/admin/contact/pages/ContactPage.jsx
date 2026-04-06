import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../components/FormSectionWrapper";
import InputField from "../../../../components/common/InputField";
import Button from "../../../../components/common/Button";
import TextareaField from "../../../../components/common/TextareaField";
import { useContact } from "../hooks/useContact";
import { useContactForm } from "../hooks/useContactForm";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const ContactPage = () => {
  const navigate = useNavigate();

  const initialForm = useMemo(
    () => ({
      email: "",
      phone_number: "",
      office_address: "",
      google_maps_link: "",
    }),
    []
  );

  const { contact, loading: loadingContact } = useContact();
  const {
    formData,
    setFormData,
    setErrors,
    errors,
    loading: submitting,
    submit,
    handleChange,
  } = useContactForm(initialForm, contact?.id || null);

  useEffect(() => {
    if (!contact) return;
    
    setFormData({
      email: contact.email ?? "",
      phone_number: contact.phone_number ?? "",
      office_address: contact.office_address ?? "",
      google_maps_link: contact.google_maps_link ?? "",
    });
  }, [contact, setFormData]);

  const handleSubmit = async () => {
    const success = await submit();
    if (success) {
      
    };
  };

  if (loadingContact) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs />

        <FormSectionWrapper
          title="Setting Kontak"
          description="Menampilkan informasi agar pengunjung dapat menghubungi kami dengan mudah dan cepat."
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Masukkan alamat email Anda"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <InputField
            label="No.Telp"
            name="phone_number"
            type="tel"
            placeholder="Masukkan nomor telepon Anda"
            value={formData.phone_number}
            onChange={handleChange}
            required
            error={errors.phone_number}
          />

          <TextareaField
            label="Alamat Kantor"
            name="office_address"
            placeholder="Masukkan alamat kantor Anda"
            value={formData.office_address}
            onChange={handleChange}
            required
            error={errors.office_address}
          />

          <TextareaField
            label="Maps Kantor"
            name="google_maps_link"
            placeholder="Masukkan link embed dari Google Maps"
            value={formData.google_maps_link}
            onChange={handleChange}
            required
            inputStyle="!mb-0"
            error={errors.google_maps_link}
          />
        </FormSectionWrapper>

        <div className="flex justify-end gap-3 bg-white p-5 rounded-[10px] mt-6">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
          >
            Kembali
          </Button>

          <Button
          onClick={handleSubmit}
            type="button"
            className="bg-[#AA494E] text-[13px] font-bold rounded-lg hover:bg-[#B21E1E] text-white"
          >
            Simpan
          </Button>
        </div>
    </div>
  );
};

export default ContactPage;
