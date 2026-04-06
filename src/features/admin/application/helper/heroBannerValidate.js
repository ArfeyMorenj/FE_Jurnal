import { z } from "zod";

// Schema untuk form hero banner aplikasi (detail per aplikasi)
export const heroBannerSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Headline wajib diisi"),
  subtitle: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(1, "Description wajib diisi"),
  buttonText: z
    .string()
    .trim()
    .min(1, "Label CTA wajib diisi"),
  buttonLink: z
    .string()
    .trim()
    .min(1, "Link CTA wajib diisi")
    .url("Link CTA harus berupa URL yang valid"),
  image: z.any().optional().nullable(),
  published: z.boolean().optional(),
});

/**
 * Validasi form hero banner aplikasi dengan Zod.
 * Mengembalikan object error per field, misalnya:
 * { title: "Title wajib diisi", description: "Description wajib diisi" }
 */
export const validateHeroBannerForm = (formData) => {
  try {
    heroBannerSchema.parse(formData);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};

      error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!field) return;
        // Simpan hanya pesan pertama per field
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });

      return errors;
    }

    return {
      _form: "Terjadi kesalahan saat memvalidasi formulir.",
    };
  }
};


