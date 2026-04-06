import { useEffect, useState } from "react";
import useAboutSection from "../controller/useAboutSection";
import { aboutSchema } from "../../../beranda/schemas/aboutSchema";
import { fixUrl } from "../../../../../utils/fixUrl";

export const useAboutForm = () => {
  const { loading, aboutData, createAbout, updateAbout, sectionId } =
    useAboutSection();

  const [form, setForm] = useState({
    deskripsiHalaman1: "",
    gambarHalaman1: null,
    deskripsiHalaman2: "",
    gambarHalaman2: null,
    deskripsiPencapaian: "",
  });

  const [errors, setErrors] = useState({});

  const formatZodErrors = (issues) => {
    const formatted = {
      deskripsiHalaman1: null,
      gambarHalaman1: null,
      deskripsiHalaman2: null,
      gambarHalaman2: null,
      deskripsiPencapaian: null,
    };

    issues.forEach((err) => {
      if (err.path.length) {
        formatted[err.path[0]] = err.message;
      }
    });

    return formatted;
  };

  useEffect(() => {
    if (!aboutData) return;

    setForm({
      deskripsiHalaman1: aboutData.description_about_us || "",
      deskripsiHalaman2: aboutData.description_story_us || "",
      deskripsiPencapaian: aboutData.description_achievement || "",
      gambarHalaman1: aboutData.image_about_us || null,
      gambarHalaman2: aboutData.image_story_us || null,
    });
  }, [aboutData]);

  const handleChange = (name, valueOrEvent) => {
    if (valueOrEvent?.target?.files?.[0]) {
      setForm((prev) => ({
        ...prev,
        [name]: valueOrEvent.target.files[0],
      }));
      return;
    }

    if (valueOrEvent?.target?.value !== undefined) {
      setForm((prev) => ({
        ...prev,
        [name]: valueOrEvent.target.value,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: valueOrEvent,
    }));

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async () => {
    if (!sectionId) return false;

    const mode = aboutData?.id ? "edit" : "add";
    const schema = aboutSchema(mode);
    
    setErrors({}); 

    const result = schema.safeParse(form);

    if (!result.success) {
      const formatted = formatZodErrors(result.error.issues);
      setErrors(formatted);

      return false;
    }

    const payload = {
      description_about_us: form.deskripsiHalaman1,
      description_story_us: form.deskripsiHalaman2,
      description_achievement: form.deskripsiPencapaian,
      image_about_us:
        form.gambarHalaman1 instanceof File ? form.gambarHalaman1 : undefined,
      image_story_us:
        form.gambarHalaman2 instanceof File ? form.gambarHalaman2 : undefined,
    };

    const ok = aboutData?.id
      ? await updateAbout(aboutData.id, payload)
      : await createAbout(payload);

    return ok;
  };

  return {
    loading,
    form,
    errors,
    handleChange,
    handleSubmit,
    aboutData,
    fixUrl,
  };
};