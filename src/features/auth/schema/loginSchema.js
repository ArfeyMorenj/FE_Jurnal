import z from "zod";

export const loginSchema = z.object({
  email: z.string().superRefine((val, ctx) => {
      if (!val.trim()) {
        ctx.addIssue({ message: "Email wajib diisi" });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        ctx.addIssue({ message: "Format email tidak valid" });
      }
    }),
  
  password: z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({ message: "Password wajib diisi" });
    return; 
  }
  if (val.length < 8) {
    ctx.addIssue({ message: "Password minimal 8 karakter" });
  }
})
});