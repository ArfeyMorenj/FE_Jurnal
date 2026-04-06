import { useState, useEffect } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useAppsApi } from "../api/apiApps";
import { validateApps } from "../schemas/validateApps"; 

export function useAppsSectionForm(initialLead, initialApps, recordMap) {
  const api = useAppsApi();

  const [formData, setFormData] = useState({
    lead_in_text: initialLead || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      lead_in_text: initialLead || "",
    });
  }, [initialLead]);

  const submit = async (currentApps, currentRecordMap) => {
    const leadText = formData.lead_in_text;
    const appIds = currentApps.map((app) => app.id);

    const validation = validateApps(leadText, appIds);

    if (!validation.success) {
      setErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      Toasts("error", 2000, "Validasi Gagal", firstError);
      return false;
    }

    setErrors({});
    setLoading(true);

    try {
      const updatePromises = [];
      const createPromises = [];

      for (const app of currentApps) {
        const recordId = currentRecordMap[app.id];

        if (recordId) {
          updatePromises.push(
            api.updateRecord(recordId, {
              lead_in_text: leadText,
              application_id: [app.id],
            })
          );
        } else {
          createPromises.push(
            api.createRecord({
              lead_in_text: leadText,
              application_id: [app.id],
            })
          );
        }
      }

      await Promise.all([...updatePromises, ...createPromises]);

      Toasts("success", 2000, "Berhasil", "Apps section berhasil disimpan!");
      return true;
    } catch (err) {
      if (err?.response?.status === 422) {
        const backendErrors = err.response.data.errors || {};
        const firstError = Object.values(backendErrors)[0]?.[0] || "Validasi gagal";
        Toasts("error", 3000, "Validasi Gagal", firstError);
      } else {
        Toasts("error", 3000, "Gagal menyimpan data");
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
  };
}