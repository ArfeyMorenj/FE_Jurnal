import { z } from "zod";

const stripHtml = (value) => value.replace(/<[^>]*>/g, "").trim();

const newsFormSchema = z
  .object({
    category_id: z
      .string()
      .min(1, "Kategori berita wajib dipilih."),
    title: z
      .string()
      .trim()
      .min(1, "Judul berita wajib diisi."),
    tags: z
      .array(z.string())
      .min(1, "Minimal satu hashtag harus ditambahkan."),
    content: z
      .string()
      .refine(
        (value) => stripHtml(value).length > 0,
        "Konten berita tidak boleh kosong."
      ),
    thumbnailFile: z.any(),
  })
  .superRefine((data, ctx) => {
    if (!data.thumbnailFile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Thumbnail wajib diunggah.",
        path: ["thumbnailFile"],
      });
    }
  });
  
/**
 * Validate form and return errors per field
 * @param {Object} formData - Form data object
 * @param {File} thumbnailFile - Thumbnail file
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateForm = (formData, thumbnailFile) => {
  const result = newsFormSchema.safeParse({
    ...formData,
    thumbnailFile,
  });

  if (result.success) {
    return {};
  }

  // Format errors per field
  const errors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  });

  return errors;
};
