import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { PublicHeader } from "@/components/PublicHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SiteFooter } from "@/components/SiteFooter";
import { COMPANY } from "@/lib/defaults";
import { youtubeEmbedUrl } from "@/lib/video";

export const dynamic = "force-dynamic";

const serviceGroups = [
  {
    title: "IT & Software Development",
    items: ["Custom Software Development", "ERP & CRM Solutions", "Cloud-based Applications"],
  },
  {
    title: "Website & App Development",
    items: ["Business Websites", "E-commerce Platforms", "Android & iOS Apps"],
  },
  {
    title: "AI & Automation",
    items: ["AI-based Solutions", "Chatbots & Automation", "Data Analytics"],
  },
  {
    title: "Solar & Green Energy",
    items: ["Rooftop Solar Installation", "Solar Consultancy", "Maintenance Services"],
  },
  {
    title: "Skill Development & Training",
    items: ["IT Training Programs", "Digital Skills Development", "Government Project Implementation"],
  },
];

const whyChoose = [
  "Experienced & Professional Team",
  "Innovative & Customized Solutions",
  "Affordable Pricing",
  "End-to-End Services",
  "Focus on Quality & Customer Satisfaction",
];

export default async function Home() {
  const settings = await getSiteSettings();
  const recent = await prisma.contentItem.findMany({
    where: {
      published: true,
      type: { in: ["SOFTWARE", "UPCOMING"] },
    },
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    take: 12,
  });
  const posts = await prisma.contentItem.findMany({
    where: { published: true, type: "POST" },
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    take: 8,
  });
  const videos = await prisma.contentItem.findMany({
    where: { published: true, type: "VIDEO" },
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <>
      <PublicHeader />
      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-400/90">{COMPANY.name}</p>
                <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {settings.hero_title}
                </h1>
                <p className="mt-6 text-lg text-slate-400 sm:text-xl">{settings.hero_subtitle}</p>
                <p className="mt-4 inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-200/95">
                  {settings.hero_kicker}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-helio-950 shadow-lg shadow-teal-500/25 hover:opacity-95"
                  >
                    Our products
                  </a>
                  <a
                    href="#software"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Latest software
                  </a>
                  <a
                    href={COMPANY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#25D366]/40 bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/25"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>
              <div className="relative mx-auto flex max-w-[min(100%,420px)] justify-center lg:mx-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/25 via-teal-500/15 to-blue-600/20 blur-3xl" />
                <Image
                  src={COMPANY.logoPath}
                  alt={`${COMPANY.name} logo`}
                  width={480}
                  height={280}
                  className="relative z-[1] h-auto w-full max-w-[400px] object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-helio-900/25 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{settings.section_intro_title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400">{settings.section_intro_body}</p>
          </div>
        </section>

        <section id="software" className="border-y border-white/5 bg-helio-900/30 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {settings.section_software_label}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  New releases and roadmap highlights—managed from your admin panel.
                </p>
              </div>
            </div>
            {recent.length === 0 ? (
              <p className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-16 text-center text-slate-500">
                No items yet. Sign in to the admin panel to publish software or upcoming products.
              </p>
            ) : (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recent.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-helio-900/60 transition hover:border-teal-400/30 hover:shadow-lg hover:shadow-teal-500/5"
                  >
                    <div className="relative aspect-[16/10] bg-helio-950">
                      {item.imageUrl?.startsWith("/") ? (
                        <Image
                          src={item.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-4xl text-white/10">◇</div>
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-300 backdrop-blur">
                        {item.type === "UPCOMING" ? "Upcoming" : "Software"}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                      {item.description && (
                        <p className="mt-2 line-clamp-3 text-sm text-slate-400">{item.description}</p>
                      )}
                      {item.externalLink && (
                        <a
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-sm font-medium text-teal-400 hover:text-teal-300"
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {videos.length > 0 && (
          <section className="px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Videos</h2>
              <p className="mt-1 text-sm text-slate-400">Demos and walkthroughs you publish from the admin panel.</p>
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                {videos.map((v) => {
                  const embed = v.videoUrl ? youtubeEmbedUrl(v.videoUrl) : null;
                  return (
                    <div key={v.id} className="overflow-hidden rounded-2xl border border-white/10 bg-helio-900/40">
                      {embed ? (
                        <div className="aspect-video w-full">
                          <iframe
                            title={v.title}
                            src={embed}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-video items-center justify-center bg-helio-950 text-slate-500">
                          Add a YouTube URL in admin
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-display font-semibold text-white">{v.title}</h3>
                        {v.description && <p className="mt-2 text-sm text-slate-400">{v.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="border-t border-white/5 bg-helio-900/20 px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Updates</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/20"
                  >
                    <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-3 text-sm text-slate-400">{p.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="about" className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{settings.section_about_title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400">{settings.section_about_body}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-500/10 to-transparent p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400/90">Our mission</p>
                <p className="mt-3 text-slate-200">{settings.section_mission}</p>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300/90">Our vision</p>
                <p className="mt-3 text-slate-200">{settings.section_vision}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="border-t border-white/5 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {settings.section_services_title}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">{settings.section_services_subtitle}</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {serviceGroups.map((g) => (
                <div
                  key={g.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
                >
                  <h3 className="font-display text-base font-semibold text-amber-200/95">{g.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-teal-400" aria-hidden>
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {settings.section_features_title}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyChoose.map((line) => (
                <div key={line} className="glass rounded-2xl p-5 glow-ring">
                  <p className="text-sm font-medium text-white">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-white/5 bg-helio-900/20 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {settings.section_projects_title}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-400">{settings.section_projects_body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["Website development", "Software solutions", "Skill development programs", "Renewable energy projects"].map(
                (label) => (
                  <li
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-slate-300"
                  >
                    {label}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-teal-400/20 bg-gradient-to-br from-teal-500/10 via-helio-900 to-helio-950 px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{settings.section_cta_title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">{settings.section_cta_subtitle}</p>
            <p className="mx-auto mt-4 text-sm text-slate-500">
              {COMPANY.address} ·{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-teal-400 hover:underline">
                {COMPANY.email}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${COMPANY.email}?subject=Heliocode%20enquiry`}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-helio-950 hover:bg-slate-100"
              >
                Email us
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter tagline={settings.footer_tagline} />
      <WhatsAppFloat />
    </>
  );
}
