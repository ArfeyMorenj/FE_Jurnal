import { z } from "zod";

export const heroSchemaLanding = z.object({
  title:  z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Headline wajib diisi",
      });
    } else if (val.length > 100) {
      ctx.addIssue({
        code: "too_small",
        maximum: 100,
        type: "string",
        inclusive: true,
        message: "Headline maksimal 100 karakter",
      });
    }
  }),
  description: z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Subheadline wajib diisi",
      });
    } else if (val.length > 255) {
      ctx.addIssue({
        code: "too_small",
        maximum: 255,
        type: "string",
        inclusive: true,
        message: "Subheadline maksimal 255 karakter",
      });
    }
  }),
  image: z
    .any()
    .refine((val) => val instanceof File || (typeof val === "string" && val.trim().length > 0), {
      message: "Gambar wajib diisi",
    })
    .refine(
      (val) => {
        if (val instanceof File) {
          return ["image/png", "image/jpeg", "image/jpg"].includes(val.type);
        }
        return true;
      },
      { message: "Format gambar tidak sesuai. Hanya PNG, JPG, JPEG" }
    ),
  button_link: z.string().min(1, "Link Tombol Call-to-Action (CTA) wajib diisi"),
});

export const heroSchemaBerita = z.object({
  title:  z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Headline wajib diisi",
      });
    } else if (val.length > 100) {
      ctx.addIssue({
        code: "too_small",
        maximum: 100,
        type: "string",
        inclusive: true,
        message: "Headline maksimal 100 karakter",
      });
    }
  }),
  description: z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Deskripsi wajib diisi",
      });
    } else if (val.length > 255) {
      ctx.addIssue({
        code: "too_small",
        maximum: 255,
        type: "string",
        inclusive: true,
        message: "Deskripsi maksimal 255 karakter",
      });
    }
  }),
  image: z
    .any()
    .refine((val) => val instanceof File || (typeof val === "string" && val.trim().length > 0), {
      message: "Gambar wajib diunggah",
    })
    .refine(
      (val) => {
        if (val instanceof File) {
          return ["image/png", "image/jpeg", "image/jpg"].includes(val.type);
        }
        return true;
      },
      { message: "Format gambar harus PNG, JPG, atau JPEG" }
    ),
  button_link: z.string().min(1, "Link Tombol CTA wajib diisi"),
});

