import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "heliocode_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(payload: string) {
  const h = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${h}`;
}

function verify(signed: string) {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot < 0) return null;
  const payload = signed.slice(0, lastDot);
  const sig = signed.slice(lastDot + 1);
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (sig.length !== expected.length) return null;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return payload;
}

export async function setAdminSession() {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const token = sign(payload);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdminSessionValid(): Promise<boolean> {
  try {
    const raw = (await cookies()).get(COOKIE)?.value;
    if (!raw) return false;
    const payload = verify(raw);
    if (!payload) return false;
    try {
      const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp: number };
      return typeof exp === "number" && exp > Date.now();
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}
