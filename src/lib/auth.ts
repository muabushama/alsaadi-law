import { SignJWT, jwtVerify } from "jose";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export { SESSION_COOKIE };
const SESSION_HOURS = 12;

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("SESSION_SECRET must be set to at least 24 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyAdminPassword(password: string) {
  const username = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD;
  if (!username) return false;
  if (hash) return compare(password, hash);
  if (!plain) return false;
  if (plain.length !== password.length) {
    await compare(password, "$2a$10$invalidhashinvalidhashinvalidho7l3nC");
    return false;
  }
  return timingSafeEqual(plain, password);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSessionToken() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value ?? null;
}

export async function isAuthenticated(token?: string | null) {
  const value = token ?? (await getSessionToken());
  if (!value) return false;
  try {
    await jwtVerify(value, secretKey());
    return true;
  } catch {
    return false;
  }
}

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME ?? "";
}
