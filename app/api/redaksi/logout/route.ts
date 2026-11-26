import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/security/auth";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}