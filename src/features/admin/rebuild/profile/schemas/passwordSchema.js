import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password lama harus diisi")
      .trim(),
    new_password: z
      .string()
      .min(1, "Password baru harus diisi")
      .min(6, "Password baru minimal 6 karakter")
      .trim(),
    confirm_password: z
      .string()
      .min(1, "Konfirmasi password harus diisi")
      .trim(),
  })
  .refine(
    (data) => {
      // Skip validasi ini jika new_password atau confirm_password masih kosong
      if (!data.new_password || data.new_password.trim() === "" || 
          !data.confirm_password || data.confirm_password.trim() === "") {
        return true;
      }
      return data.new_password === data.confirm_password;
    },
    {
      message: "Konfirmasi password tidak sama dengan password baru",
      path: ["confirm_password"],
    }
  )
  .refine(
    (data) => {
      // Skip validasi ini jika password atau new_password masih kosong
      if (!data.password || data.password.trim() === "" || 
          !data.new_password || data.new_password.trim() === "") {
        return true;
      }
      return data.password !== data.new_password;
    },
    {
      message: "Password baru harus berbeda dengan password lama",
      path: ["new_password"],
    }
  );

