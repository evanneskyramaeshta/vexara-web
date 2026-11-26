import { NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allBooks = await db.select().from(books).orderBy(desc(books.id));
    return NextResponse.json({ success: true, data: allBooks }, { status: 200 });
  } catch (error) {
    console.error("[API_BOOKS_GET_ERROR]:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data koleksi perpustakaan." },
      { status: 500 }
    );
  }
}