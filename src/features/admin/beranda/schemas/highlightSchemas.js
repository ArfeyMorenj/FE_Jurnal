import { z } from "zod";

export const highlightSchema = z
  .object({
    judul_section: z.string().min(1, "Judul section wajib diisi"),
    deskripsi: z.string().min(1, "Deskripsi wajib diisi"),

    rows: z
      .array(
        z.object({
          id: z.string().nullable(),
          text: z.string().nullable(),
          image: z.any().nullable(),
          preview: z.string().nullable(),
        })
      )
      .length(4),
  })
  .superRefine((data, ctx) => {
    const rows = data.rows;
    rows.forEach((row, index) => {
      const hasText = row.text?.trim() !== "";
      const hasImg = Boolean(row.image || row.preview);

      if (hasText && !hasImg) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Gambar wajib diisi",
          path: ["rows", index, "image"],
        });
      }

      if (!hasText && hasImg) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Keterangan wajib diisi",
          path: ["rows", index, "text"],
        });
      }

      if (!hasText && !hasImg) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Keterangan wajib diisi",
          path: ["rows", index, "text"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Gambar wajib diisi",
          path: ["rows", index, "image"],
        });
      }
    });
  });