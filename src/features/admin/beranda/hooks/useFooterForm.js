import { useState, useEffect } from "react";
import { footerSchema } from "../schemas/footerSchemas";
import { Toasts } from "../../../../utils/Toast";
import { useFooterApi } from "../api/apiFooter";

export function useFooterForm(initialData = {}, footerId = null) {
  const api = useFooterApi();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const validate = () => {
    const result = footerSchema.safeParse(formData);
    if (!result.success) {
      const newErr = {};
      result.error.issues.forEach((e) => {
        newErr[e.path[0]] = e.message;
      });
      setErrors(newErr);
      return false;
    }
    setErrors({});
    return true;
  };

  const buildPayload = (isUpdate = false) => {
    const fd = new FormData();

    if (formData.section_id) {
      fd.append("section_id", formData.section_id);
    }

    Object.keys(formData).forEach((key) => {
      if (key === "logo") return; 
      if (formData[key] !== undefined && formData[key] !== null) {
        fd.append(key, formData[key]);
      }
    });

    if (formData.logo instanceof File) {
      fd.append("logo", formData.logo);
    }

    if (isUpdate) fd.append("_method", "PUT");

    return fd;
  };

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      let res;
      const payload = buildPayload(!!footerId);

      if (footerId) res = await api.update(footerId, payload);
      else res = await api.create(payload);

      Toasts("success", 2000, "Berhasil", "Footer berhasil disimpan!");
      return res.data;

    } catch (err) {
      const res = err.response;
      if (res?.status === 422 && res?.data?.errors) {
        const backendErrors = {};
        Object.keys(res.data.errors).forEach((key) => {
          backendErrors[key] = res.data.errors[key][0];
        });
        setErrors(backendErrors);
      }
      throw err;

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
    submit
  };
}
