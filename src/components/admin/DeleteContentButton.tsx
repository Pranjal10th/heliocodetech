"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteContentItem } from "@/app/actions/admin";

export function DeleteContentButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
      onClick={() => {
        if (!confirm("Delete this item?")) return;
        start(async () => {
          await deleteContentItem(id);
          router.refresh();
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
