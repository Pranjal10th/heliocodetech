import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/defaults";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | AI & Business Messaging`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Heliocode Technology LLP — IT & software, AI, web & app development, solar & green energy, and skill development. Lucknow, India.",
  metadataBase: new URL(COMPANY.website),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
