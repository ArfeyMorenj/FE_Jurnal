import { z } from "zod";

const stripHtml = (value) => (typeof value === "string" ? value.replace(/<[^>]*>/g, "").trim() : "");

export const namaSchema = z.string().trim().min(1, "Nama paket wajib diisi!");
export const hargaSchema = z.string().trim().min(1, "Harga paket wajib diisi!");
export const masaSchema = z.string().min(1, "Masa berlaku wajib dipilih!");
export const keteranganSchema = z
  .string()
  .refine((val) => stripHtml(val).length > 0, "Keterangan paket wajib diisi!");
export const benefitSchema = z
  .string()
  .refine((val) => stripHtml(val).length > 0, "Benefit paket wajib diisi!");


export const premiumSchema = z.object({
  nama: namaSchema,
  harga: hargaSchema,
  masa: masaSchema,
  keterangan: keteranganSchema,
  benefit: benefitSchema,
});


export const validatePremiumForm = (formData) => {
  const result = premiumSchema.safeParse(formData);
  if (result.success) return {};
  const errors = {};
  result.error.issues.forEach((issue) => {
    const key = issue.path[0];
    if (key && !errors[key]) errors[key] = issue.message;
  });
  return errors;
};
