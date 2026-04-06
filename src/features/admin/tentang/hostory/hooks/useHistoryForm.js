import { useState } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { useHistoryApi } from "../api/apiHistory";
import { historySchema } from "../schema/historySchemas";
import { SECTION_IDS } from "../../../../../constants/sections";

export function useHistoryForm(initialData = {}, historyId = null) {
  const api = useHistoryApi(SECTION_IDS.TENTANG_KAMI);

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const result = historySchema.safeParse(formData);

    if (!result.success) {
      const newErr = {};
      result.error.issues.forEach((e) => {
        const fieldName = e.path[0];
        newErr[fieldName] = e.message;
      });

      setErrors(newErr);
      return false;
    }

    setErrors({});
    return true;
  };

  const buildPayload = (isUpdate = false) => {
    const fd = new FormData();

    Object.keys(formData).forEach((k) => {
      if (formData[k] !== undefined && formData[k] !== null) {
        fd.append(k, formData[k]);
      }
    });

    if (isUpdate) {
      fd.append("_method", "PUT");
    }

    return fd;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (!validate()) return false;

    setLoading(true);

    try {
      const payload = buildPayload(!!historyId);

      let res;
      if (historyId) {
        res = await api.update(historyId, payload);
      } else {
        res = await api.create(payload);
      }

      Toasts("success", 2000, "Berhasil", "History berhasil disimpan!");
      return true;

    } catch (err) {
      const res = err.response;

      if (res?.status === 422 && res?.data?.errors) {
        const backendErr = {};
        Object.keys(res.data.errors).forEach((key) => {
          backendErr[key] = res.data.errors[key][0];
        });
        setErrors(backendErr);
      } else {
        Toasts("error", 3000, "Gagal", "Tidak dapat menyimpan data");
      }

      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    setErrors,
    errors,
    loading,
    submit,
    handleChange,
  };
}
