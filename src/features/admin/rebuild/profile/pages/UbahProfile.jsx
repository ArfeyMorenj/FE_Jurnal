import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import InputField from "../../../../../components/common/InputField";
import TextareaField from "../../../../../components/common/TextareaField";
import FileInput from "../../../../../components/common/FileInput";
import { CARD_STYLES } from "../../../tentang/constants/tentangConstants";
import ActionButtons from "../../../tentang/components/ActionButtons";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { updateProfile } from "../services/profileService";
import { Toasts } from "../../../../../utils/Toast";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { profileSchema } from "../schemas/profileSchema";
import { validateForm } from "../helper/validation";

const UbahProfile = () => {
  const navigate = useNavigate();
  const { profile, isLoading: isLoadingProfile, error: profileError, refresh } = useProfile();

  const [formData, setFormData] = useState({
    image: null,
    email: "",
    phone_number: "",
    office_address: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        image: null, // Keep as null, user needs to select new image if they want to update
        email: profile.email || "",
        phone_number: profile.phone || "",
        office_address: profile.address || "",
        username: profile.name || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target?.value;
    
    if (file instanceof File) {
      setFormData((prev) => ({ ...prev, image: file }));
    } else if (file === null) {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
    
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async () => {
    // Validate form using Zod schema
    const validation = validateForm(profileSchema, formData);
    
    if (!validation.success) {
      setErrors(validation.errors);
      Toasts("error", 3000, "Validasi Gagal", "Harap periksa kembali data yang diinput");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("address", formData.office_address);
      formDataToSend.append("_method", "PUT"); // Laravel method spoofing

      if (formData.image instanceof File) {
        formDataToSend.append("photo", formData.image);
      } else if (formData.image === "") {
        formDataToSend.append("photo", "");
      }

      const updatedProfile = await updateProfile(formDataToSend);

      if (updatedProfile) {
        Toasts("success", 3000, "Berhasil", "Profil berhasil diperbarui");
        await refresh();
        setTimeout(() => {
          navigate("/admin/profile");
        }, 1000);
      }
    } catch (error) {
      if (error.errors) {
        const backendErrors = {};
        Object.keys(error.errors).forEach((key) => {
          // Map API field names to form field names
          if (key === "name") {
            backendErrors.username = Array.isArray(error.errors[key]) ? error.errors[key][0] : error.errors[key];
          } else if (key === "photo") {
            backendErrors.image = Array.isArray(error.errors[key]) ? error.errors[key][0] : error.errors[key];
          } else if (key === "address") {
            backendErrors.office_address = Array.isArray(error.errors[key]) ? error.errors[key][0] : error.errors[key];
          } else {
            backendErrors[key] = Array.isArray(error.errors[key]) ? error.errors[key][0] : error.errors[key];
          }
        });
        setErrors(backendErrors);
        Toasts("error", 3000, "Validasi Gagal", "Harap periksa kembali data yang diinput");
      } else {
        Toasts("error", 3000, "Gagal", error.message || "Gagal memperbarui profil. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col">
        <BreadCrumbs />
        <LoadingSpinner text="Memuat data profil..." />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex flex-col">
        <BreadCrumbs />
        <div className="bg-white p-6 mt-6 rounded-xl shadow-sm">
          <div className="text-center py-8">
            <p className="text-red-500 font-semibold">Error: {profileError}</p>
            <p className="text-gray-500 text-sm mt-2">
              Gagal memuat data profil. Silakan coba lagi nanti.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbs />

      <div className="bg-white p-6 mt-6 rounded-xl shadow-sm flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput
            label="Masukkan Foto Profil"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            error={errors.image}
            note={profile?.photo ? "Kosongkan jika tidak ingin mengubah foto" : ""}
            value={profile?.image}
          />

          <InputField
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="Masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <InputField
            label="Nama Pengguna"
            name="username"
            type="text"
            placeholder="Masukkan nama anda"
            value={formData.username}
            onChange={handleChange}
            required
            error={errors.username}
          />

          <InputField
            label="Nomor Telpon"
            name="phone_number"
            type="tel"
            placeholder="Masukkan nomor telpon anda"
            value={formData.phone_number}
            onChange={handleChange}
            required
            error={errors.phone_number}
          />
        </div>

        <TextareaField
          label="Alamat"
          name="office_address"
          placeholder="Masukkan alamat anda"
          value={formData.office_address}
          onChange={handleChange}
          required
          error={errors.office_address}
        />    
      </div>
      
      <div className={`${CARD_STYLES.ACTION}`}>
        <ActionButtons
          onCancel={() => navigate(-1)}
          cancelText="Batal"
          saveText="Ubah"
          onSave={handleSubmit}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default UbahProfile;