import Link from "next/link";
import VexaraLogo from "@/components/brand/VexaraLogo";

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0B0D] text-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Manifesto */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <VexaraLogo size={20} showWordmark theme="dark" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9CA3AF]">
              Ekosistem kolektif literasi, arsip perpustakaan terbuka, ruang edukasi
              lintas disiplin, dan jaringan media kreatif yang dikelola bersama.
            </p>
            <p className="mt-6 font-mono text-xs tracking-wider text-[#6B7280] uppercase">
              Eksplorasi Kata, Dunia, dan Karya.
            </p>
          </div>

          {/* Navigasi Portal */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs tracking-[0.16em] text-[#9CA3AF] uppercase">
              Portal Publik
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/perpustakaan" className="transition hover:text-[#FFFFFF]">
                  Perpustakaan Vexara
                </Link>
              </li>
              <li>
                <Link href="/pustaka-karya" className="transition hover:text-[#FFFFFF]">
                  Pustaka Karya Kolektif
                </Link>
              </li>
              <li>
                <Link href="/akademi" className="transition hover:text-[#FFFFFF]">
                  Ruang Akademi
                </Link>
              </li>
              <li>
                <Link href="/komunitas" className="transition hover:text-[#FFFFFF]">
                  Balai Diskusi & Kirim Karya
                </Link>
              </li>
            </ul>
          </div>

          {/* Divisi Ekosistem */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs tracking-[0.16em] text-[#9CA3AF] uppercase">
              Jaringan Ekosistem
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D1D5DB]">
              <li className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                <span>Vexara Media</span>
                <span className="font-mono text-[11px] text-[#6B7280]">YOUTUBE & ESAI</span>
              </li>
              <li className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                <span>Vexara Studio</span>
                <span className="font-mono text-[11px] text-[#6B7280]">WEB & KREATIF</span>
              </li>
              <li className="flex items-center justify-between pb-1">
                <span>Vexara Press</span>
                <span className="font-mono text-[11px] text-[#6B7280]">ANTOLOGI & ARSIP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1F2937] pt-8 text-xs text-[#6B7280] sm:flex-row">
          <p>© {new Date().getFullYear()} VEXARA Collective. Seluruh hak cipta dilindungi.</p>
          <p className="font-mono text-[11px]">MONOCHROME EDITORIAL SYSTEM v1.0</p>
        </div>
      </div>
    </footer>
  );
}