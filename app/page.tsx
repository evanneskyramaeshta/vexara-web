import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VexaraHeroScene from "@/components/three/VexaraHeroScene";
import { vexaraBooks } from "@/data/books";
import { ArrowUpRight, BookOpen, Feather, GraduationCap, Tv } from "lucide-react";

export default function HomePage() {
  const featuredBook = vexaraBooks[0];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main>
        {/* Split Hero Section */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-center lg:col-span-7">
            <span className="mb-4 inline-block font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
              KOLEKTIF LITERASI, PERPUSTAKAAN & MEDIA KREATIF
            </span>
            <h1 className="font-serif text-4xl leading-[1.15] font-bold tracking-tight text-[#0B0B0D] sm:text-5xl">
              Ruang Tumbuh Kata, Pemikiran, dan Karya Kolektif.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4B5563]">
              VEXARA membuka ruang baca publik, arsip koleksi buku kuratorial,
              modul edukasi lintas disiplin, serta jaringan produksi kreatif yang
              dikelola bersama.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/perpustakaan"
                className="inline-flex items-center gap-2 rounded-sm bg-[#0B0B0D] px-6 py-3.5 text-sm font-medium text-[#FFFFFF] transition hover:bg-[#374151]"
              >
                <BookOpen className="h-4 w-4" />
                Jelajahi Perpustakaan
              </Link>
              <Link
                href="/pustaka-karya"
                className="inline-flex items-center gap-2 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-6 py-3.5 text-sm font-medium text-[#0B0B0D] transition hover:border-[#0B0B0D]"
              >
                <Feather className="h-4 w-4" />
                Baca Pustaka Karya
                <ArrowUpRight className="h-4 w-4 text-[#9CA3AF]" />
              </Link>
            </div>
          </div>

          {/* Interactive 3D Monogram Viewport */}
          <div className="flex items-center justify-center lg:col-span-5">
            <VexaraHeroScene />
          </div>
        </section>

        {/* Bento Grid Ekosistem VEXARA */}
        <section className="border-t border-[#E5E7EB] bg-[#F8F9FA] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
                  ARSITEKTUR EKOSISTEM
                </span>
                <h2 className="mt-1 font-serif text-3xl font-bold text-[#0B0B0D]">
                  Pilar Gerakan VEXARA
                </h2>
              </div>
              <p className="font-mono text-xs text-[#6B7280]">
                TERBUKA UNTUK PEMBACA, PENULIS & KREATOR
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Modul 1: Sorotan Perpustakaan Vexara (7 Cols) */}
              <div className="flex flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-8 lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-[#4B5563] uppercase">
                      SOROTAN PERPUSTAKAAN VEXARA
                    </span>
                    <BookOpen className="h-4 w-4 text-[#9CA3AF]" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#0B0B0D]">
                    {featuredBook.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#6B7280]">
                    {featuredBook.author} • {featuredBook.category}
                  </p>
                  <blockquote className="mt-4 border-l-2 border-[#0B0B0D] pl-4 font-serif text-base text-[#4B5563]">
                    “{featuredBook.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 pt-4">
                  <Link
                    href="/perpustakaan"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B0D] hover:underline"
                  >
                    Buka Katalog Perpustakaan
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Modul 2: Pustaka Karya Kolektif (5 Cols) */}
              <div className="flex flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-[#4B5563] uppercase">
                      PUSTAKA KARYA PUBLIK
                    </span>
                    <Feather className="h-4 w-4 text-[#9CA3AF]" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#0B0B0D]">
                    Antologi & Esai Kolektif
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                    Wadah publikasi bagi kontributor luar untuk menerbitkan puisi,
                    esai kritik sosial, dan resensi buku melalui proses kurasi redaksi.
                  </p>
                </div>
                <div className="mt-6 pt-4">
                  <Link
                    href="/pustaka-karya"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B0D] hover:underline"
                  >
                    Kirim & Baca Naskah
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Modul 3: Ruang Akademi (5 Cols) */}
              <div className="flex flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-[#4B5563] uppercase">
                      RUANG AKADEMI
                    </span>
                    <GraduationCap className="h-4 w-4 text-[#9CA3AF]" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#0B0B0D]">
                    Modul Pemikiran & Kepenulisan
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                    Materi belajar gratis dan terstruktur seputar pengantar ilmu
                    hukum, sejarah pergerakan, filsafat sosial, dan teknik sastra.
                  </p>
                </div>
                <div className="mt-6 pt-4">
                  <Link
                    href="/akademi"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B0D] hover:underline"
                  >
                    Mulai Jalur Belajar
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Modul 4: Jaringan Vexara Media & Studio (7 Cols - Dark Anchor) */}
              <div className="flex flex-col justify-between rounded-sm bg-[#0B0B0D] p-8 text-[#E5E7EB] lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-[#9CA3AF] uppercase">
                      JARINGAN MEDIA & INDUSTRI KREATIF
                    </span>
                    <Tv className="h-4 w-4 text-[#9CA3AF]" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#FFFFFF]">
                    Vexara Media & Vexara Studio
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
                    Memperluas daya jangkau gagasan melalui produksi video esai,
                    musikalisasi puisi sinematik, serta layanan pengembangan web
                    modern dan identitas visual bagi mitra publik.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/tentang"
                    className="inline-flex items-center gap-1.5 rounded-sm bg-[#E5E7EB] px-4 py-2 text-xs font-medium text-[#0B0B0D] transition hover:bg-[#FFFFFF]"
                  >
                    Kenali Divisi VEXARA
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}