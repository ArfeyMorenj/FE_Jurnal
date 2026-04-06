import { z } from "zod";
import { cleanHTML } from "../../../../helper/cleanHtml";

export const aboutSchema = (mode = "add") =>
  z
    .object({
      deskripsiHalaman1: z
        .string()
        .refine((v) => cleanHTML(v).length > 0, "Deskripsi Tentang Kami wajib diisi"),
      gambarHalaman1: z.any(),
      deskripsiHalaman2: z
        .string()
        .refine((v) => cleanHTML(v).length > 0, "Deskripsi Cerita Kami wajib diisi"),
      gambarHalaman2: z.any(),
      deskripsiPencapaian: z
        .string()
        .refine((v) => cleanHTML(v).length > 0, "Deskripsi Pencapaian wajib diisi"),
    })
    .superRefine((data, ctx) => {
      if (mode === "add") {
        if (!(data.gambarHalaman1 instanceof File)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["gambarHalaman1"],
            message: "Gambar Tentang Kami wajib diisi",
          });
        }
      } else {
        if (data.gambarHalaman1 === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["gambarHalaman1"],
            message: "Gambar Tentang Kami wajib diisi",
          });
        }
      }

      if (mode === "add") {
        if (!(data.gambarHalaman2 instanceof File)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["gambarHalaman2"],
            message: "Gambar Cerita Kami wajib diisi",
          });
        }
      } else {
        if (data.gambarHalaman2 === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["gambarHalaman2"],
            message: "Gambar Cerita Kami wajib diisi",
          });
        }
      }
    });