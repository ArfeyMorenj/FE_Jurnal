import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(1, "Nama pengguna harus diisi")
    .trim(),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .min(1, "Alamat email wajib diisi"),
  phone_number: z
    .string()
    .trim()
    .min(12, "Nomor telepon minimal 12 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
    .min(1, "Nama pengguna wajib diisi")
    .trim(),
  email: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Alamat Email wajib diisi" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      ctx.addIssue({ message: "Format email tidak valid" });
    }
  }),
  phone_number: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Nomor telpon wajib diisi" });
      return;
    }

    const phoneRegex = /^(\+62|0)\d{9,12}$/;

    if (!phoneRegex.test(val)) {
      ctx.addIssue({
        message:
          "Nomor telepon harus diawali 0 atau +62 dan memiliki 10–13 digit angka.",
      });
    }
  }),
  office_address: z
    .string()
    .min(1, "Alamat wajib diisi")
    .trim(),
  image: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => {
        // If no file is provided, it's optional (user might not want to change photo)
        if (!file || file === null) return true;
        // If file is provided, it must be a File instance
        if (file instanceof File) {
          // Check file type
          const validTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!validTypes.includes(file.type)) {
            return false;
          }
          // Check file size (max 2MB)
          if (file.size > 2 * 1024 * 1024) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Format gambar tidak sesuai. Hanya PNG, JPG, atau JPEG. Maksimal 2MB.",
      }
    ),
});

