import type { Metadata } from "next";
import { Domine, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const domine = Domine({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-domine",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vexara — Kolektif Literasi, Perpustakaan Digital & Media Kreatif",
    template: "%s | VEXARA",
  },
  description:
    "Ruang tumbuh publik untuk literasi sastra, arsip Perpustakaan Vexara, edukasi pemikiran, dan jaringan industri kreatif kolektif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${domine.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FFFFFF] font-sans text-[#0B0B0D] antialiased selection:bg-[#0B0B0D] selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}