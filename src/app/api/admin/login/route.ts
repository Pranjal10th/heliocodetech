import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { setAdminSession } from "@/lib/session";

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  try {
    const { password: input } = (await req.json()) as { password?: string };
    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const ok =
      password.startsWith("$2")
        ? await compare(input, password)
        : input === password;
    if (!ok) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
