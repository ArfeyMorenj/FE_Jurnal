import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string()
    .min(2, "Nama harus terdiri dari minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Email wajib diisi" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(val)) {
      ctx.addIssue({ message: "Format email tidak valid" });
    }
  }),
  message: z
    .string()
    .min(5, "Pesan minimal 5 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
  recaptcha: z.string().optional(),
});
