import { getSiteSettings } from "@/lib/settings";
import { defaultSettings } from "@/lib/defaults";
import { saveHomepageSettingsForm } from "@/app/actions/admin";

export default async function SettingsPage() {
  const current = await getSiteSettings();
  const keys = Object.keys(defaultSettings) as (keyof typeof defaultSettings)[];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Site text</h1>
      <p className="mt-1 text-sm text-slate-400">Customize headlines and copy on the homepage.</p>
      <form action={saveHomepageSettingsForm} className="mt-8 max-w-2xl space-y-6">
        {keys.map((key) => (
          <div key={key}>
            <label className="text-xs font-medium uppercase tracking-wider text-slate-500">{key}</label>
            {key.includes("subtitle") ||
            key.includes("tagline") ||
            key.includes("sub") ||
            key.includes("body") ||
            key.includes("mission") ||
            key.includes("vision") ? (
              <textarea
                name={key}
                rows={3}
                defaultValue={current[key] ?? defaultSettings[key]}
                className="mt-2 w-full rounded-xl border border-white/10 bg-helio-900 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/40"
              />
            ) : (
              <input
                name={key}
                defaultValue={current[key] ?? defaultSettings[key]}
                className="mt-2 w-full rounded-xl border border-white/10 bg-helio-900 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/40"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-helio-950 hover:opacity-95"
        >
          Save
        </button>
      </form>
    </div>
  );
}
