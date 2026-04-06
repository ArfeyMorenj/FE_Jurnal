import { useState, useCallback } from "react";
import { Toasts } from "../../../../../utils/Toast";
import { 
  validatePhotoFile, 
  validateTeamForm 
} from "../schemas/teamSchemas";

export function useTeamForm() {

  const EMPTY_ROW = { 
    id: null, 
    position: "", 
    file: null, 
    preview: null, 
    isExisting: false 
  };

  const [form, setForm] = useState({
    description: "",
    teams: Array(5).fill(null).map(() => ({ ...EMPTY_ROW })),
  });

  const [errors, setErrors] = useState({});

  const mapIndex = (i) => i;

  const setFromApi = useCallback((data) => {
    if (!data) return;

    let teams = [];

    if (data.items && data.items.length > 0) {
      teams = data.items.map((t) => ({
        id: t.id || null, 
        position: t.position || "",
        file: null,
        preview: t.photo,
        isExisting: true,
      }));
    }

    while (teams.length < 5) {
      teams.push({ ...EMPTY_ROW });
    }

    setForm({
      description: data.description || "",
      teams: teams.slice(0, 5),
    });
  }, []);

  const setDescription = (v) => {
    setForm((prev) => ({ ...prev, description: v }));
    
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const setPosition = (i, v) => {
    setForm((prev) => {
      const copy = [...prev.teams];
      copy[i].position = v;
      return { ...prev, teams: copy };
    });
    
    if (errors[`teams.${i}.position`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`teams.${i}.position`];
        return newErrors;
      });
    }
  };

  const setPhotoFile = (i, e) => {
    const idx = mapIndex(i);

    if (e === null) {
      setForm((prev) => {
        const copy = [...prev.teams];
        copy[idx].file = null;
        copy[idx].preview = null;
        copy[idx].isExisting = false;
        return { ...prev, teams: copy };
      });
      
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`teams.${idx}.photo`];
        return newErrors;
      });
      return;
    }

    let file;
    if (e?.target?.files?.[0]) {
      file = e.target.files[0];
    } else if (e instanceof File) {
      file = e;
    } else {
      return;
    }

    const validation = validatePhotoFile(file);
    if (!validation.valid) {
      setErrors((prev) => ({ 
        ...prev, 
        [`teams.${idx}.photo`]: validation.error 
      }));
      Toasts("error", 3000, validation.error);
      return;
    }

    const preview = URL.createObjectURL(file);

    setForm((prev) => {
      const copy = [...prev.teams];
      copy[idx].file = file;
      copy[idx].preview = preview;
      copy[idx].isExisting = false;
      return { ...prev, teams: copy };
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`teams.${idx}.photo`];
      return newErrors;
    });
  };

  const resetTeam = (i) => {
    setForm((prev) => {
      const copy = [...prev.teams];
      copy[i] = { ...EMPTY_ROW };
      return { ...prev, teams: copy };
    });
    
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`teams.${i}.position`];
      delete newErrors[`teams.${i}.photo`];
      return newErrors;
    });
  };

  const validate = () => {
    const { isValid, errors: validationErrors } = validateTeamForm(form);
    
    setErrors(validationErrors);

    if (!isValid) {
      Toasts("error", 3000, "Periksa kembali input Anda");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    const fd = new FormData();

    fd.append("description", form.description);

    form.teams.forEach((t, i) => {
      if (t.id) {
        fd.append(`items[${i}][id]`, t.id);
      }
      
      fd.append(`items[${i}][position]`, t.position);
      
      if (t.file) {
        fd.append(`items[${i}][photo]`, t.file);
      } else if (t.preview && t.isExisting) {
        fd.append(`items[${i}][photo]`, t.preview);
      }
    });

    return fd;
  };

  return {
    form,
    errors,
    setDescription,
    setPosition,
    setPhotoFile,
    resetTeam,
    setFromApi,
    validate,
    buildPayload,
  };
}