import { z } from "zod";

const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#([0-9a-fA-F]{6})$/, "Warna harus dalam format hex, contoh: #FFFFFF");

  const buildSchema = (options = {}) => {
  const { requireImages = false } = options;

  return z
    .object({
      name: z.string().trim().min(1, "Nama fitur wajib diisi"),
      description: z.string().trim().min(1, "Deskripsi fitur wajib diisi"),
      gradientFrom: hexColorSchema,
      gradientTo: hexColorSchema,
      featureImage: z.any().optional().nullable(),
      iconImage: z.any().optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (requireImages) {
        if (!(data.featureImage instanceof File)) {
          ctx.addIssue({
            path: ["featureImage"],
            message: "Gambar fitur wajib diunggah",
            code: z.ZodIssueCode.custom,
          });
        }

        if (!(data.iconImage instanceof File)) {
          ctx.addIssue({
            path: ["iconImage"],
            message: "Icon fitur wajib diunggah",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    });
};

export const validateFeatureForm = (formData, options = {}) => {
  try {
    const schema = buildSchema(options);
    schema.parse(formData);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};

      error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!field) return;
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


