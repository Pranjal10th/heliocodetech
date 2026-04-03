import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/session";
import { logoutAdmin } from "@/app/actions/admin";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminSessionValid())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-white/10 bg-helio-900/80 px-4 py-4 md:w-56 md:border-b-0 md:border-r md:py-8">
        <p className="font-display text-sm font-semibold text-teal-400">Heliocode Admin</p>
        <nav className="mt-6 flex flex-wrap gap-2 md:flex-col md:gap-1">
          <Link href="/admin" className="rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            Dashboard
          </Link>
          <Link href="/admin/content" className="rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            Content
          </Link>
          <Link href="/admin/enquiries" className="rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            Enquiries
          </Link>
          <Link href="/admin/settings" className="rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            Site text
          </Link>
          <Link href="/" className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white/10 hover:text-slate-300">
            View site
          </Link>
        </nav>
        <form action={logoutAdmin} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-lg border border-white/15 px-3 py-2 text-left text-sm hover:bg-white/5"
          >
            Log out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
