import z from "zod";

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email tidak valid" }),

  phone_number: z
    .string()
    .trim()
    .regex(/^(?:\+62|62|0)8[1-9][0-9]{6,12}$/, { 
      message: "Nomor telepon Indonesia tidak valid (format: 08xxxx, +62xxxx, atau 62xxxx)" 
    }),

  office_address: z
    .string()
    .trim()
    .min(1, { message: "Alamat kantor tidak boleh kosong" })
    .max(255, { message: "Alamat terlalu panjang" }),

  google_maps_link: z
    .string()
    .trim()
    .url({ message: "Link tidak valid" })
    .refine((v) => v.includes("google.com/maps/embed"), {
    message: "Link harus berupa embed URL Google Maps",
    })

});
