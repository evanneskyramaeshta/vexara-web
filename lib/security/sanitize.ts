import { z } from "zod";

/**
 * Membersihkan string dari tag HTML dan karakter berbahaya untuk mencegah XSS
 * sebelum data diproses atau disimpan ke database.
 */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Hapus seluruh tag HTML
    .replace(/javascript:/gi, "") // Blokir skema javascript:
    .replace(/on\w+\s*=/gi, "") // Blokir inline event handler seperti onclick=
    .trim();
}

export const manuscriptSubmissionSchema = z.object({
  authorName: z
    .string()
    .min(3, "Nama penulis minimal 3 karakter.")
    .max(80, "Nama penulis maksimal 80 karakter.")
    .transform(sanitizePlainText),
  email: z
    .string()
    .email("Format alamat email tidak valid.")
    .max(120, "Email terlalu panjang.")
    .transform((val) => val.toLowerCase().trim()),
  category: z.enum(["Puisi", "Esai Kritis", "Resensi Buku", "Prosa"], {
    message: "Pilih salah satu kategori karya yang valid.",
  }),
  title: z
    .string()
    .min(5, "Judul karya minimal 5 karakter.")
    .max(150, "Judul karya maksimal 150 karakter.")
    .transform(sanitizePlainText),
  content: z
    .string()
    .min(50, "Isi naskah minimal 50 karakter agar dapat dikurasi redaksi.")
    .max(15000, "Isi naskah maksimal 15.000 karakter.")
    .transform(sanitizePlainText),
});

export type ManuscriptSubmissionInput = z.infer<typeof manuscriptSubmissionSchema>;