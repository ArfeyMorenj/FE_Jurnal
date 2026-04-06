import { z } from "zod";

export const historyItemSchema = z.object({
  year: z
  .string()
  .trim()
  .nonempty("Tahun wajib diisi")
  .pipe(
    z
      .string()
      .regex(/^\d+$/, "Tahun harus berupa angka")
      .transform((val) => Number(val))
      .refine((val) => val >= 1900, { message: "Tahun minimal 1900" })
      .refine((val) => val <= new Date().getFullYear(), {
        message: `Tahun maksimal ${new Date().getFullYear()}`,
      })
  ),
  description: z.string().min(1, "Deskripsi wajib diisi")
});

export const historyArraySchema = z.object({
  histories: z
    .array(historyItemSchema)
    .min(1, "Minimal harus ada 1 histori")
    .max(5, "Maksimal 5 histori"),
});
