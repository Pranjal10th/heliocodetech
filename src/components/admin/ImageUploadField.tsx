"use client";

import { useState } from "react";

type Props = {
  name?: string;
  defaultUrl?: string | null;
  label?: string;
};

export function ImageUploadField({ name = "imageUrl", defaultUrl, label = "Image" }: Props) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(j.error || "Upload failed");
      if (j.url) setUrl(j.url);
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="text-xs text-slate-400">{label}</label>
      <input type="hidden" name={name} value={url} />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL or upload a file"
        className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/40"
      />
      <div className="mt-2 flex items-center gap-3">
        <label className="cursor-pointer rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
          {busy ? "Uploading…" : "Upload file"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={onFile} disabled={busy} />
        </label>
        {err && <span className="text-xs text-red-400">{err}</span>}
      </div>
    </div>
  );
}
