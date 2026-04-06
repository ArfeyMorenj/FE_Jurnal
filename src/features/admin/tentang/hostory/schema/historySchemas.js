import { z } from "zod";
import { cleanHTML } from "../../../../../helper/cleanHtml";

export const historySchema = z.object({
  history_title: z.string().min(1, "Judul Perjalanan wajib diisi"),

  presentation_description: z.string().min(1, "Deskripsi singkat presentase wajib diisi"),
  presentation_value: z
    .string()
    .min(1, "Nilai presentase wajib diisi")
    .regex(/^\d+$/, "Harus berupa angka"),

  commitment_short_description: z
    .string()
    .min(1, "Deskripsi singkat komitmen wajib diisi"),

  commitment_long_description: z.string().refine(
  (v) => cleanHTML(v).length > 0,
  "Deskripsi Utama & Tambahan wajib diisi"
)
})