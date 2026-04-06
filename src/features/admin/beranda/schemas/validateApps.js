export const validateApps = (leadText, appIds) => {
  const errors = {};

  if (!leadText || leadText.trim() === "") {
    errors.lead_in_text = "Lead-in text harus diisi";
  }

  if (!appIds || appIds.length === 0) {
    errors.application_id = "Minimal 1 aplikasi harus dipilih";
  } else if (appIds.length > 3) {
    errors.application_id = "Maksimal 3 aplikasi";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors: errors,
  };
};