import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Izinkan halaman login dan endpoint autentikasi diakses publik
  if (pathname === "/redaksi/login" || pathname === "/api/redaksi/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Sesi redaksi tidak valid." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/redaksi/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/redaksi/:path*", "/api/redaksi/:path*"],
};