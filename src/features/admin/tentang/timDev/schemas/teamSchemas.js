export const validatePosition = (value) => {
  if (!value.trim()) {
    return { valid: false, error: "Jabatan wajib diisi" };
  }
  
  if (/\d/.test(value)) {
    return { valid: false, error: "Jabatan tidak boleh mengandung angka" };
  }
  
  return { valid: true };
};

export const validatePhotoFile = (file) => {
  if (file.size > 2 * 1024 * 1024) {
    return { valid: false, error: "Foto maksimal 2MB" };
  }
  
  return { valid: true };
};

export const validateDescription = (value) => {
  if (!value.trim()) {
    return { valid: false, error: "Deskripsi singkat wajib diisi" };
  }
  
  return { valid: true };
};

export const validatePhoto = (file, preview) => {
  if (!file && !preview) {
    return { valid: false, error: "Foto wajib diupload" };
  }
  
  return { valid: true };
};

export const validateTeamForm = (form) => {
  const errors = {};

  // Validasi description
  const descValidation = validateDescription(form.description);
  if (!descValidation.valid) {
    errors.description = descValidation.error;
  }

  // Validasi setiap team
  form.teams.forEach((t, i) => {
    //  posisi
    const posValidation = validatePosition(t.position);
    if (!posValidation.valid) {
      errors[`teams.${i}.position`] = posValidation.error;
    }

    // foto
    const photoValidation = validatePhoto(t.file, t.preview);
    if (!photoValidation.valid) {
      errors[`teams.${i}.photo`] = photoValidation.error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};