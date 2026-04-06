import { useState, useCallback } from "react";
import { Toasts } from "../../../../../utils/Toast";

export function useSponsorForm() {
  const [form, setForm] = useState({
    description: "",
    images: [{ id: null, file: null, preview: null, isExisting: false }],
  });

  const [errors, setErrors] = useState({});

  const setFromApi = useCallback((data) => {
    if (!data) return;

    const newForm = {
      description: data.description || "",
      images:
        data.image && data.image.length > 0
          ? data.image.map((imgObj) => ({
              id: imgObj.id || null,
              file: null,
              preview: imgObj.image,
              isExisting: true,
            }))
          : [{ id: null, file: null, preview: null, isExisting: false }],
    };

    setForm(newForm);
  }, []);

  const setDescription = (v) => {
    setForm((prev) => ({ ...prev, description: v }));
    
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const setImageFile = (i, e) => {
    let file;

    if (e?.target?.value === null) {
      setForm((prev) => {
        const copy = [...prev.images];
        copy[i] = { file: null, preview: null, isExisting: false };
        return { ...prev, images: copy };
      });

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`image_${i}`];
        return newErrors;
      });
      return;
    }

    if (e?.target?.value instanceof File) {
      file = e.target.value;
    } else if (e?.target?.files?.[0]) {
      file = e.target.files[0];
    } else if (e instanceof File) {
      file = e;
    } else {
      return;
    }

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ 
        ...prev, 
        [`images.${i}`]: "Gambar maksimal 2MB" 
      }));
      Toasts("error", 3000, "Gambar maksimal 2MB");
      return;
    }

    const preview = URL.createObjectURL(file);

    setForm((prev) => {
      const copy = [...prev.images];
      copy[i] = { 
        id: copy[i]?.id || null, 
        file, 
        preview, 
        isExisting: false 
      };
      return { ...prev, images: copy };
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`images.${i}`];
      delete newErrors.images;
      return newErrors;
    });
  };

  const addImage = () =>
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { id: null, file: null, preview: null, isExisting: false }],
    }));

  const removeImage = (i) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`images.${i}`];
      return newErrors;
    });
  };

  const validate = () => {
    const err = {};

    if (!form.description.trim()) {
      err.description = "Deskripsi singkat wajib diisi";
    }

    const hasAnyImage = form.images.some((img) => img.file || img.preview);
    if (!hasAnyImage) {
      err.images = "Minimal 1 gambar wajib diupload";
    }

    form.images.forEach((img, i) => {
      if (!img.file && !img.preview) {
        err[`images.${i}`] = "Gambar wajib diupload";
      }
    });

    setErrors(err);

    if (Object.keys(err).length > 0) {
      Toasts("error", 3000, "Periksa kembali input Anda");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    const fd = new FormData();
    fd.append("description", form.description);
    fd.append("_method", "PUT"); 

    form.images.forEach((img, index) => {
      if (img.id) {
        fd.append(`image[${index}][id]`, img.id);
      }

      if (img.file) {
        fd.append(`image[${index}][file]`, img.file);
      } else if (img.preview && img.isExisting) {
        fd.append(`image[${index}][file]`, img.preview);
      }
    });

    return fd;
  };

  return {
    form,
    errors,
    setDescription,
    setImageFile,
    addImage,
    removeImage,
    setFromApi,
    validate,
    buildPayload,
  };
}