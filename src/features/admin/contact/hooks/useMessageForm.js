import { useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useMessageApi } from "../api/apiMessage";
import { messageSchema } from "../schemas/MessageSchema"; 

export function useMessageForm() {
  const api = useMessageApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    recaptcha: "", 
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const result = messageSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErr = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] ?? "_form";
      if (!newErr[key]) newErr[key] = issue.message;
    });

    setErrors(newErr);
    return false;
  };

  const submit = async () => {
    if (!validate()) {
      Toasts("error", 2500, "Gagal", "Periksa kembali inputan Anda");
      return false;
    }
    setLoading(true);
    try {
      await api.create(formData);

      Toasts("success", 2000, "Terkirim", "Pesan berhasil dikirim");

      setFormData({
        name: "",
        email: "",
        message: "",
        recaptcha: "",
      });

      setErrors({});
      return true;
    } catch (err) {
      const backendErrors = err.response?.data?.errors || {};
      if (Object.keys(backendErrors).length) {
        const mapped = {};
        Object.keys(backendErrors).forEach((k) => {
          mapped[k] = backendErrors[k][0];
        });
        setErrors(mapped);
      } else {
        Toasts("error", 3000, "Gagal", "Pesan tidak terkirim");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    submit,
    validate,
  };
}
