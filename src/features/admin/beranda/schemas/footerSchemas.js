import { z } from "zod";

export const footerSchema = z.object({
  logo: z
  .any()
  .refine((val) => val instanceof File || (typeof val === "string" && val.trim().length > 0), {
    message: "Logo wajib diisi",
  })
  .refine(
    (val) => {
      if (val instanceof File) {
        return ["image/png", "image/jpeg", "image/jpg"].includes(val.type);
      }
      return true;
    },
    { message: "Format logo tidak sesuai. Hanya PNG, JPG, JPEG" }
  ),
  description: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Deskripsi wajib diisi" });
    } else if (val.length < 5) {
      ctx.addIssue({ message: "Deskripsi minimal 5 karakter" });
    }
  }),
  address: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Alamat wajib diisi" });
    } else if (val.length < 3) {
      ctx.addIssue({ message: "Alamat minimal 3 karakter" });
    }
  }),
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
  phone: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "Nomor telepon wajib diisi" });
      return;
    }

    const phoneRegex = /^(?:\+62|62|08)(?:\d\-?){6,15}$/;

    if (!phoneRegex.test(val)) {
      ctx.addIssue({
        message:
          "Nomor telepon tidak valid. Gunakan format +62 atau 08",
      });
    }
  }),
  youtube: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "URL YouTube wajib diisi" });
      return;
    }

    try {
      new URL(val);
    } catch {
      ctx.addIssue({ message: "URL YouTube tidak valid" });
    }
  }),

  facebook: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "URL Facebook wajib diisi" });
      return;
    }

    try {
      new URL(val);
    } catch {
      ctx.addIssue({ message: "URL Facebook tidak valid" });
    }
  }),

  twitter: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "URL Twitter wajib diisi" });
      return;
    }

    try {
      new URL(val);
    } catch {
      ctx.addIssue({ message: "URL Twitter tidak valid" });
    }
  }),

  instagram: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "URL Instagram wajib diisi" });
      return;
    }

    try {
      new URL(val);
    } catch {
      ctx.addIssue({ message: "URL Instagram tidak valid" });
    }
  }),

  linkedln: z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({ message: "URL LinkedIn wajib diisi" });
      return;
    }

    try {
      new URL(val);
    } catch {
      ctx.addIssue({ message: "URL LinkedIn tidak valid" });
    }
  }),
});
