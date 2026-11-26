import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { manuscripts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export async function GET() {
  try {
    const list = await db
      .select()
      .from(manuscripts)
      .orderBy(desc(manuscripts.submittedAt));
    return NextResponse.json({ success: true, data: list }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal memuat daftar naskah masuk." },
      { status: 500 }
    );
  }
}

const updateStatusSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["pending", "reviewed", "published", "rejected"]),
});

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Parameter status kurasi tidak valid." },
        { status: 400 }
      );
    }

    await db
      .update(manuscripts)
      .set({ status: parsed.data.status })
      .where(eq(manuscripts.id, parsed.data.id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui status naskah." },
      { status: 500 }
    );
  }
}