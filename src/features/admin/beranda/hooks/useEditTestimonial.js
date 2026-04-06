import { useState, useEffect } from "react";
import { z } from "zod";
import { testimonialSchema } from "../schemas/testimonialSchemas";
import useTestimonialSection from "../controller/useTestimonialSection";

export default function useEditTestimonial(sectionId, id, navigate) {
  const { getTestimonialById, updateTestimonial, loading } = useTestimonialSection(sectionId);
  const [formData, setFormData] = useState({
    user_name: "",
    review: "",
    app_name: "",
    gambar_profile: null,
  });
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const formatZodErrors = (issues) => {
    const formatted = {
      user_name: null,
      review: null,
      app_name: null,
      rating: null,
      gambar_profile: null,
    };
    issues.forEach((err) => {
      if (err.path.length) formatted[err.path[0]] = err.message;
    });
    return formatted;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestimonialById(id); 
        setFormData({
          user_name: data.name || "",
          review: data.comment || "",
          app_name: data.application || "",
          gambar_profile: null,
        });
        setRating(data.rating || 0);
        setPreview(data.photo || null);
      } catch (err) {
        console.error("Gagal fetch testimonial:", err);
      }
    };
    fetchData();
  }, [id, getTestimonialById]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setPreview(URL.createObjectURL(files[0]));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      testimonialSchema("edit").parse({ ...formData, rating });

      const payload = new FormData();
      payload.append("name", formData.user_name);
      payload.append("comment", formData.review);
      payload.append("application", formData.app_name);
      payload.append("rating", rating);
      
      if (formData.gambar_profile instanceof File) {
        payload.append("photo", formData.gambar_profile);
      }

      await updateTestimonial(id, payload);
      navigate(-1); // Navigate nalik setelah success
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = formatZodErrors(err.issues);
        setErrors(formattedErrors);
      } else {
        console.error("Gagal update testimonial:", err);
      }
    }
  };

  return {
    formData,
    setFormData,
    rating,
    setRating,
    preview,
    setPreview,
    loading,
    errors,
    handleChange,
    handleSubmit,
  };
}