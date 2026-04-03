import { ContentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createContentItem, updateContentItem } from "@/app/actions/admin";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DeleteContentButton } from "@/components/admin/DeleteContentButton";

const types: ContentType[] = ["SOFTWARE", "UPCOMING", "VIDEO", "POST"];

function typeLabel(t: ContentType) {
  switch (t) {
    case "SOFTWARE":
      return "Software (top section)";
    case "UPCOMING":
      return "Upcoming (top section)";
    case "VIDEO":
      return "Video";
    case "POST":
      return "Post / update";
    default:
      return t;
  }
}

export default async function AdminContentPage() {
  const items = await prisma.contentItem.findMany({
    orderBy: [{ sortOrder: "desc" }, { updatedAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Content</h1>
      <p className="mt-1 text-sm text-slate-400">
        Software and upcoming items appear at the top of the homepage. Add videos (YouTube URL) and posts for lower sections.
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold text-teal-300">New item</h2>
        <form action={createContentItem} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-400">Type</label>
            <select
              name="type"
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
              required
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {typeLabel(t)}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-400">Title</label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-400">Description</label>
            <textarea
              name="description"
              rows={3}
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField />
          </div>
          <div>
            <label className="text-xs text-slate-400">Video URL (YouTube)</label>
            <input
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">External link</label>
            <input
              name="externalLink"
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Sort order (higher first)</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="published" value="true" defaultChecked className="rounded border-white/20" />
              Published
            </label>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-helio-950 hover:opacity-95"
            >
              Create
            </button>
          </div>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold text-white">All items</h2>
        <ul className="mt-6 space-y-10">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-white/10 bg-helio-900/40 p-6">
              <form action={updateContentItem.bind(null, item.id)} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">ID: {item.id}</span>
                  <span className="text-xs text-slate-500">Updated {item.updatedAt.toLocaleString()}</span>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400">Type</label>
                  <select
                    name="type"
                    defaultValue={item.type}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {typeLabel(t)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400">Title</label>
                  <input
                    name="title"
                    required
                    defaultValue={item.title}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={item.description}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <ImageUploadField key={item.id} defaultUrl={item.imageUrl} />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Video URL</label>
                  <input
                    name="videoUrl"
                    defaultValue={item.videoUrl ?? ""}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">External link</label>
                  <input
                    name="externalLink"
                    defaultValue={item.externalLink ?? ""}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Sort order</label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-helio-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="published"
                      value="true"
                      defaultChecked={item.published}
                      className="rounded border-white/20"
                    />
                    Published
                  </label>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-teal-500/90 px-5 py-2 text-sm font-semibold text-helio-950 hover:opacity-95"
                  >
                    Save changes
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <DeleteContentButton id={item.id} />
              </div>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p className="mt-6 text-sm text-slate-500">No items yet.</p>}
      </section>
    </div>
  );
}
