import { useState, useEffect } from "react";
import useHighlight from "../controller/useHighlight";
import { highlightSchema } from "../schemas/highlightSchemas";
import { Toasts } from "../../../../utils/Toast";

export const useHighlightForm = () => {
  const { highlight, points, loading, submitHighlight, deletePoint } =
    useHighlight();

  const [highlightForm, setHighlightForm] = useState({
    judul_section: "",
    deskripsi: "",
    rows: Array.from({ length: 4 }, () => ({
      id: null,
      text: "",
      image: null,
      preview: null,
    })),
  });

  const [errors, setErrors] = useState({
    judul_section: null,
    deskripsi: null,
    rows: Array.from({ length: 4 }, () => ({
      text: null,
      image: null,
    })),
  });

  const formatZodErrors = (issues) => {
    const formatted = {
      judul_section: null,
      deskripsi: null,
      rows: Array.from({ length: 4 }, () => ({
        text: null,
        image: null,
      })),
    };

    issues.forEach((err) => {
      const path = err.path;

      if (path.length === 1) {
        formatted[path[0]] = err.message;
      }

      if (path[0] === "rows" && path.length === 3) {
        const index = path[1];
        const field = path[2];
        if (formatted.rows[index]) {
          formatted.rows[index][field] = err.message;
        }
      }
    });

    return formatted;
  };

  // MAP HEADER
  useEffect(() => {
    if (highlight) {
      setHighlightForm((prev) => ({
        ...prev,
        judul_section: highlight.title || "",
        deskripsi: highlight.description || "",
      }));
    }
  }, [highlight]);

  // MAP POINTS
  useEffect(() => {
    if (!points) return;

    const mapped = points.map((p) => ({
      id: p.id,
      text: p.point_title || "",
      preview: p.icon || null,
      image: null,
    }));

    while (mapped.length < 4) {
      mapped.push({
        id: null,
        text: "",
        image: null,
        preview: null,
      });
    }

    setHighlightForm((prev) => ({ ...prev, rows: mapped }));
  }, [points]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHighlightForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const updateRow = (index, newRow) => {
    setHighlightForm((prev) => {
      const currentRows = Array.isArray(prev.rows) ? prev.rows : [];
      const copy = [...currentRows];
      copy[index] = newRow;
      return { ...prev, rows: copy };
    });
    
    setErrors((prev) => {
      const currentRows = Array.isArray(prev.rows) ? prev.rows : [];
      const copyRows = [...currentRows];
      copyRows[index] = { text: null, image: null };
      return { ...prev, rows: copyRows };
    });
  };

  const updateRowArray = (newRows) => {
    setHighlightForm((prev) => ({ ...prev, rows: newRows }));
  };

  const handleSubmit = async () => {
    if (!highlightForm.judul_section?.trim() || !highlightForm.deskripsi?.trim()) {
      setErrors({
        judul_section: !highlightForm.judul_section?.trim() ? "Judul section wajib diisi" : null,
        deskripsi: !highlightForm.deskripsi?.trim() ? "Deskripsi wajib diisi" : null,
        rows: Array.from({ length: 4 }, () => ({ text: null, image: null })),
      });

      return false;
    }

    const validation = highlightSchema.safeParse(highlightForm);

    if (!validation.success) {
      const issues = validation.error.issues;

      const formattedErrors = formatZodErrors(issues);
      
      setErrors(formattedErrors);
      return false;
    }

    setErrors({
      judul_section: null,
      deskripsi: null,
      rows: Array.from({ length: 4 }, () => ({
        text: null,
        image: null,
      })),
    });

    return await submitHighlight(highlightForm);
  };

  return {
    highlightForm,
    handleChange,
    updateRow,
    updateRowArray,
    handleSubmit,
    deletePoint,
    loading,
    errors,
    setErrors,
  };
};