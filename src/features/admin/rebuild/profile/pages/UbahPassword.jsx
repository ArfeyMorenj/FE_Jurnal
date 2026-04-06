import React, { useState } from "react";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import InputField from "../../../../../components/common/InputField";
import ActionButtons from "../../../tentang/components/ActionButtons";
import { CARD_STYLES } from "../../../tentang/constants/tentangConstants";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/profileService";
import { Toasts } from "../../../../../utils/Toast";
import { passwordSchema } from "../schemas/passwordSchema";
import { validateForm } from "../helper/validation";

const UbahPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    // Validate form using Zod schema
    const validation = validateForm(passwordSchema, formData);
    
    if (!validation.success) {
      setErrors(validation.errors);
      Toasts("error", 3000, "Validasi Gagal", "Harap periksa kembali data yang diinput");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const passwordData = {
        password: formData.password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      };

      await updatePassword(passwordData);

      Toasts("success", 3000, "Berhasil", "Password berhasil diperbarui");
      
      // Clear form and navigate back
      setFormData({
        password: "",
        new_password: "",
        confirm_password: "",
      });
      
      setTimeout(() => {
        navigate("/admin/profile");
      }, 1000);
    } catch (error) {
      // Handle validation errors from API
      if (error.errors) {
        const backendErrors = {};
        Object.keys(error.errors).forEach((key) => {
          backendErrors[key] = Array.isArray(error.errors[key]) ? error.errors[key][0] : error.errors[key];
        });
        setErrors(backendErrors);
        Toasts("error", 3000, "Validasi Gagal", "Password lama salah. Silakan periksa kembali password Anda.");
      } else {
        Toasts("error", 3000, "Gagal", error.message || "Gagal memperbarui password. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <BreadCrumbs />

        <div
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-8 mt-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
                label="Masukkan Password Lama"
                type="password"
                name="password"
                placeholder="Ketikkan password lama anda"
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
            />

            <InputField
                label="Masukkan Password Baru"
                type="password"
                name="new_password"
                placeholder="Ketikkan password baru anda"
                value={formData.new_password}
                onChange={handleChange}
                required
                error={errors.new_password}
            />
            
            <InputField
                label="Konfirmasi Password"
                type="password"
                name="confirm_password"
                placeholder="Masukkan ulang password baru anda"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                error={errors.confirm_password}
            />
            </div>
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

export default UbahPassword;
