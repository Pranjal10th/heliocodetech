import type { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

export function LegalDoc({ title, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight text-white">{title}</h1>
      <p className="text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-400 [&_h2]:font-display [&_h2]:mt-0 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_strong]:text-slate-200">
        {children}
      </div>
    </article>
  );
}
