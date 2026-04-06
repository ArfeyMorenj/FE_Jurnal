import { useState } from "react";
import { z } from "zod";
import { testimonialSchema } from "../schemas/testimonialSchemas";
import useTestimonialSection from "../controller/useTestimonialSection";

export default function useAddTestimonial(sectionId) {
  const { createTestimonial, loading } = useTestimonialSection(sectionId);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    user_name: "",
    review: "",
    app_name: "",
    gambar_profile: null,
  });
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
      if (err.path.length) {
        formatted[err.path[0]] = err.message;
      }
    });

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    setErrors({});

    try {
      testimonialSchema("add").parse({ ...formData, rating });

      const payload = new FormData();
      payload.append("name", formData.user_name);
      payload.append("comment", formData.review);
      payload.append("application", formData.app_name);
      payload.append("rating", rating);

      if (formData.gambar_profile instanceof File) {
        payload.append("photo", formData.gambar_profile);
      }

      await createTestimonial(payload); 
      navigate(-1);  // navigate balik setelah success
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = formatZodErrors(err.issues);
        setErrors(formattedErrors);
      } else {
        console.error("Gagal menambahkan testimonial:", err);
      }
    }
  };

  return {
    formData,
    setFormData,
    rating,
    setRating,
    loading,
    handleChange,
    handleSubmit,
    errors,
  };
}