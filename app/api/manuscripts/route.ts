import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { manuscripts } from "@/db/schema";
import { manuscriptSubmissionSchema } from "@/lib/security/sanitize";
import { checkRateLimit } from "@/lib/security/rate-limit";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // 1. Identifikasi IP & terapkan Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";
    const rateStatus = checkRateLimit(`manuscript:${clientIp}`, 5, 10 * 60 * 1000);

    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Terlalu banyak pengiriman dalam waktu singkat. Coba lagi 10 menit mendatang.",
        },
        { status: 429 }
      );
    }

    // 2. Parsing & validasi skema Zod + sanitasi anti-XSS di server
    const body = await request.json();
    const parsed = manuscriptSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Data naskah tidak valid.",
        },
        { status: 400 }
      );
    }

    // 3. Buat kode tiket kriptografis acak (aman dari tebakan berurutan)
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const ticketCode = `VXR-${randomHex}`;

    // 4. Simpan ke PostgreSQL via Drizzle ORM (Parameterized Query)
    await db.insert(manuscripts).values({
      ticketCode,
      authorName: parsed.data.authorName,
      email: parsed.data.email,
      category: parsed.data.category,
      title: parsed.data.title,
      content: parsed.data.content,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        ticketCode,
        message: "Naskah berhasil disimpan dan masuk ke antrean meja redaksi.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API_MANUSCRIPTS_POST_ERROR]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi gangguan pada server saat menyimpan naskah.",
      },
      { status: 500 }
    );
  }
}