import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAdminSessionValid } from "@/lib/session";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof Blob) || !file.size) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    if (file.size > MAX) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }
    const type = file.type;
    if (!ALLOWED.has(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : type === "image/gif" ? "gif" : "jpg";
    const buf = Buffer.from(await file.arrayBuffer());
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const fsPath = path.join(dir, name);
    await writeFile(fsPath, buf);
    const url = `/uploads/${name}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
