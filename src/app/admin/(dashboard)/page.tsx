import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [enquiries, content] = await Promise.all([
    prisma.enquiry.count(),
    prisma.contentItem.count({ where: { published: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Overview of your public site.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Enquiries</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{enquiries}</p>
          <Link href="/admin/enquiries" className="mt-4 inline-block text-sm text-teal-400 hover:underline">
            View all
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Published items</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{content}</p>
          <Link href="/admin/content" className="mt-4 inline-block text-sm text-teal-400 hover:underline">
            Manage content
          </Link>
        </div>
      </div>
    </div>
  );
}
