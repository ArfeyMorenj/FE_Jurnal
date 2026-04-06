import { z } from "zod";

export const testimonialSchema = (mode = "add") =>
  z.object({
    user_name: z.string().min(1, "Nama user wajib diisi"),
    review: z.string().min(1, "Alasan pengguna wajib diisi"),
    app_name: z.string().min(1, "Nama aplikasi wajib diisi"),
    rating: z.number().min(1, "Rating minimal 1 bintang"),
    gambar_profile: z.any().nullable(),
  })
  .superRefine((data, ctx) => {
    if (mode === "add") {
      if (!(data.gambar_profile instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gambar_profile"],
          message: "Foto profil wajib diupload",
        });
      }
    }
  });
