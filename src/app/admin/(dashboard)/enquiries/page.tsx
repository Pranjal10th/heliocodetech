import { prisma } from "@/lib/prisma";

export default async function EnquiriesPage() {
  const list = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Enquiries</h1>
      <p className="mt-1 text-sm text-slate-400">Submissions from the site enquiry form.</p>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  No enquiries yet.
                </td>
              </tr>
            ) : (
              list.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {e.createdAt.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-white">{e.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${e.email}`} className="text-teal-400 hover:underline">
                      {e.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{e.phone}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-400" title={e.message}>
                    {e.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
