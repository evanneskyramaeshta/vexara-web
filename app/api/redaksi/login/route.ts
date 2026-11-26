import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  verifyRedaksiAccessKey,
} from "@/lib/security/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";

const loginSchema = z.object({
  accessKey: z.string().min(1, "Kunci akses redaksi wajib diisi.").max(128),
});

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";
    const rate = checkRateLimit(`redaksi-login:${clientIp}`, 5, 15 * 60 * 1000);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Terlalu banyak percobaan masuk. Tunggu 15 menit sebelum mencoba lagi.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success || !(await verifyRedaksiAccessKey(parsed.data.accessKey))) {
      return NextResponse.json(
        { success: false, message: "Kunci akses redaksi tidak valid." },
        { status: 401 }
      );
    }

    const token = await createSessionToken("curator");
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 jam
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memproses autentikasi." },
      { status: 500 }
    );
  }
}