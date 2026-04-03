import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/defaults";

type Props = { tagline: string };

export function SiteFooter({ tagline }: Props) {
  return (
    <footer id="contact" className="border-t border-white/10 bg-slate-800/35">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src={COMPANY.logoPath}
              alt={`${COMPANY.name} logo`}
              width={280}
              height={96}
              className="h-16 w-auto max-w-[260px] object-contain object-left sm:h-20 sm:max-w-[300px]"
            />
            <p className="mt-4 max-w-sm text-sm text-slate-400">{tagline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="text-slate-400">{COMPANY.address}</li>
              <li>
                <a href={`tel:+91${COMPANY.phone}`} className="hover:text-teal-400">
                  +91 {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-teal-400">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.emailAlt}`} className="hover:text-teal-400">
                  {COMPANY.emailAlt}
                </a>
              </li>
              <li>
                <a href={COMPANY.website} className="hover:text-teal-400" target="_blank" rel="noreferrer">
                  heliocode.in
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Legal</p>
            <p className="mt-3 text-sm text-slate-400">{COMPANY.name}</p>
            <p className="mt-2 text-xs text-slate-500">
              Technology, AI, digital solutions & renewable energy for businesses and communities.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-teal-400/90 hover:text-teal-300 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-teal-400/90 hover:text-teal-300 hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
