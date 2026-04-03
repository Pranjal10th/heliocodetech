"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EnquiryModal } from "./EnquiryModal";
import { COMPANY } from "@/lib/defaults";

export function PublicHeader() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-800/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 shrink items-center">
            <Image
              src={COMPANY.logoPath}
              alt={`${COMPANY.name} logo`}
              width={480}
              height={160}
              className="h-[4.5rem] w-auto max-h-[5.5rem] object-contain object-left sm:h-[5.5rem] sm:max-h-[7rem] md:h-[6.5rem] md:max-h-[8.5rem]"
              priority
              sizes="(max-width: 768px) 60vw, 420px"
            />
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            <Link href="/#about" className="hover:text-white">
              About
            </Link>
            <Link href="/#software" className="hover:text-white">
              Software
            </Link>
            <Link href="/#products" className="hover:text-white">
              Products
            </Link>
            <Link href="/#projects" className="hover:text-white">
              Projects
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="rounded-xl border border-teal-400/40 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300 hover:bg-teal-400/20"
            >
              Enquiry
            </button>
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white sm:inline-block hover:opacity-90"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
