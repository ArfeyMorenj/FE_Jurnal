import { useState } from "react";
import { useHeroApi } from "../api/apiHero";
import { heroSchemaLanding, heroSchemaBerita } from "../schemas/heroSchemas";
import { Toasts } from "../../../../utils/Toast";
import { SECTION_IDS } from "../../../../constants/sections";

export function useHeroForm(initialData = {}, heroId = null, sectionId) {
  const api = useHeroApi(sectionId);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const schema = sectionId === SECTION_IDS.LANDING_PAGE
  ? heroSchemaLanding
  : heroSchemaBerita;

  const validate = () => {
    const result = schema.safeParse(formData);
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

  const buildPayload = () => {
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "image") {
        if (value instanceof File) {
          fd.append("image", value);
        }
        return; 
      }

      fd.append(key, value);
    });

    return fd;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      let res;
      const payload = buildPayload(!!heroId);

      if (heroId) res = await api.update(heroId, payload);
      else res = await api.create(payload);

      Toasts("success", 2000, "Berhasil", "Data berhasil disimpan!");
      return res.data;
    } catch (err) {
      const res = err.response;

      if (res?.status === 422 && res?.data?.errors) {
        const backendErrors = res.data.errors;
        const formatted = {};

        Object.keys(backendErrors).forEach((key) => {
          formatted[key] = backendErrors[key][0];
        });

        setErrors(formatted);
        Toasts("error", 3000, "Validasi Gagal", "Periksa kembali data yang kamu isi.");
      } else {
        Toasts("error", 3000, "Gagal", res?.data?.message || "Terjadi kesalahan.");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialData);
    setErrors({});
  };

  return { formData, setFormData, errors, loading, submit, reset };
}
