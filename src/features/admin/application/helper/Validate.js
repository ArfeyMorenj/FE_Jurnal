import { z } from "zod";

const heroSectionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Headline wajib diisi")
    .min(3, "Headline minimal 3 karakter")
    .max(200, "Headline maksimal 200 karakter"),
  
  description: z
    .string()
    .trim()
    .min(1, "Deskripsi wajib diisi")
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi maksimal 1000 karakter"),

  button_text: z
    .string()
    .trim()
    .min(1, "Label tombol CTA wajib diisi")
    .max(50, "Label tombol CTA maksimal 50 karakter"),

  button_link: z
    .string()
    .trim()
    .min(1, "Link tombol CTA wajib diisi"),
  
  image: z
    .any()
    .refine((val) => val instanceof File || (typeof val === "string" && val.trim().length > 0), {
      message: "Gambar Hero wajib diunggah",
    })
    .refine(
      (val) => {
        if (val instanceof File) {
          return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(val.type);
        }
        return true;
      },
      { message: "Format gambar harus PNG, JPG, JPEG, atau WebP" }
    )
    .refine(
      (val) => {
        if (val instanceof File) {
          return val.size <= 5 * 1024 * 1024;
        }
        return true;
      },
      { message: "Ukuran file maksimal 5MB" }
    ),
});

export const validateHeroSectionForm = (
  formData, 
  isEditMode = false, 
  existingImage = null,
  imageRemoved = false
) => {
  const errors = {};

  let imageValue = formData.image;
  
  if (isEditMode) {
    if (imageRemoved && !formData.image) {
      imageValue = null;
    } else if (!formData.image && existingImage) {
      imageValue = "existing";
    }
  }

  const dataToValidate = {
    ...formData,
    image: imageValue,
  };

  try {
    heroSectionSchema.parse(dataToValidate);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });     
    }
  }

  return errors;
};