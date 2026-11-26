import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { sanitizePlainText } from "@/lib/security/sanitize";

const createBookSchema = z.object({
  title: z.string().min(2).max(200).transform(sanitizePlainText),
  author: z.string().min(2).max(160).transform(sanitizePlainText),
  publisher: z.string().min(2).max(160).transform(sanitizePlainText),
  year: z.coerce.number().int().min(1800).max(2100),
  pages: z.coerce.number().int().min(1).max(10000),
  isbn: z.string().min(5).max(40).transform(sanitizePlainText),
  category: z.enum([
    "Hukum & Politik",
    "Sejarah & Peradaban",
    "Sastra & Puisi",
    "Biografi Tokoh",
    "Filsafat Sosial",
  ]),
  status: z.enum(["Ringkasan Digital", "Arsip Fisik"]),
  synopsis: z.string().min(20).max(3000).transform(sanitizePlainText),
  curatorNote: z.string().min(15).max(2000).transform(sanitizePlainText),
  quote: z.string().min(10).max(1000).transform(sanitizePlainText),
});

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createBookSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Data buku tidak lengkap atau tidak valid.",
        },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(books)
      .values({
        ...parsed.data,
        slug: generateSlug(parsed.data.title),
        featured: false,
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan buku ke database." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, message: "ID buku tidak valid." },
        { status: 400 }
      );
    }

    await db.delete(books).where(eq(books.id, id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus buku dari arsip." },
      { status: 500 }
    );
  }
}