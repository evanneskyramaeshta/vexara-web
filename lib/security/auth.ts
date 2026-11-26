import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "vexara_redaksi_session";

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET di .env.local wajib diisi minimal 32 karakter.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Membandingkan kunci akses secara aman menggunakan digest SHA-256
 * agar kebal terhadap timing attack maupun perbedaan panjang string.
 */
export async function verifyRedaksiAccessKey(inputKey: string): Promise<boolean> {
  const expectedKey = process.env.REDAKSI_ACCESS_KEY;
  if (!expectedKey || !inputKey) return false;

  const encoder = new TextEncoder();
  const inputHash = await crypto.subtle.digest("SHA-256", encoder.encode(inputKey));
  const expectedHash = await crypto.subtle.digest("SHA-256", encoder.encode(expectedKey));
  const inputBytes = new Uint8Array(inputHash);
  const expectedBytes = new Uint8Array(expectedHash);

  if (inputBytes.length !== expectedBytes.length) return false;

  let different = 0;
  for (let i = 0; i < inputBytes.length; i += 1) {
    different |= inputBytes[i] ^ expectedBytes[i];
  }

  return different === 0;
}

export async function createSessionToken(role = "curator"): Promise<string> {
  return await new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getJwtSecretKey());
}

export async function verifySessionToken(token: string): Promise<{ role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return { role: (payload.role as string) || "curator" };
  } catch {
    return null;
  }
}