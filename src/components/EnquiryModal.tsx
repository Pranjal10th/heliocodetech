"use client";

import { useState } from "react";

type Props = { open: boolean; onClose: () => void };

export function EnquiryModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setMsg("");
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let data: { error?: string } = {};
      try {
        data = (await res.json()) as { error?: string };
      } catch {
        throw new Error(`Invalid response (${res.status})`);
      }
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setStatus("ok");
      setMsg("Thanks — we will get back to you shortly.");
      form.reset();
    } catch (err) {
      setStatus("err");
      const fallback = "Something went wrong. Please try again or use WhatsApp.";
      if (err instanceof Error && err.message) {
        const m = err.message;
        if (m.startsWith("Invalid response")) setMsg(fallback);
        else setMsg(m.length > 160 ? fallback : m);
      } else setMsg(fallback);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-helio-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="enquiry-title" className="font-display text-xl font-semibold text-white">
          Send an enquiry
        </h2>
        <p className="mt-1 text-sm text-slate-400">We will respond to your email or phone.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400">Phone</label>
            <input
              name="phone"
              type="tel"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400">How can we help?</label>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/50"
            />
          </div>
          {msg && (
            <p className={status === "ok" ? "text-sm text-teal-400" : "text-sm text-red-400"}>{msg}</p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-2.5 text-sm font-semibold text-helio-950 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
