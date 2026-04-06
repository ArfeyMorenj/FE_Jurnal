import { z } from "zod";

export const sponsorSchema = z.object({
  description: z.string().min(1, "Deskripsi singkat wajib diisi"),
  images: z
    .array(
      z.object({
        file: z.any().optional(),
        preview: z.string().nullable(),
      })
    )
    .min(1, "Minimal 1 gambar"),
});
