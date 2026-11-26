import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";

const divisions = [
  {
    code: "01 / MEDIA",
    name: "Vexara Media",
    focus: "Produksi Video Esai, Musikalisasi Puisi & Siaran Literasi",
    description:
      "Mengalihwahanakan gagasan sastra, sejarah, dan diskusi pemikiran ke dalam format audio-visual sinematik di kanal YouTube dan media sosial.",
  },
  {
    code: "02 / STUDIO",
    name: "Vexara Studio",
    focus: "Pengembangan Web Modern, UI/UX & Identitas Visual",
    description:
      "Lini kreatif dan teknologi yang merancang sistem web interaktif, arsitektur antarmuka, dan desain identitas bagi proyek internal maupun mitra publik.",
  },
  {
    code: "03 / PRESS",
    name: "Vexara Press",
    focus: "Kurasi Antologi, Katalog Perpustakaan & Arsip Digital",
    description:
      "Mengelola penerbitan antologi karya kolektif, menyusun catatan kuratorial buku, serta merawat arsip literasi terbuka.",
  },
  {
    code: "04 / KOMUNITAS",
    name: "Balai Kolektif Vexara",
    focus: "Ruang Belajar Terbuka, Bedah Buku & Kolaborasi Penulis",
    description:
      "Ekosistem partisipatif tempat pembaca, mahasiswa, dan kreator bertukar gagasan secara setara tanpa sekat portofolio personal.",
  },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Manifesto Header */}
        <section className="max-w-3xl border-b border-[#E5E7EB] pb-12">
          <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
            MANIFESTO & STRUKTUR INSTITUSI
          </span>
          <h1 className="mt-3 font-serif text-3xl leading-tight font-bold text-[#0B0B0D] sm:text-5xl">
            Dari Ruang Personal Menjadi Ekosistem Literasi Kolektif.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4B5563]">
            VEXARA lahir dari reformasi gagasan untuk melampaui batas etalase karya
            individu. Nama ini memadukan semangat aksara, pemikiran kritis, dan era
            kolaborasi terbuka—menghadirkan ruang publik tempat siapa pun dapat membaca,
            belajar, dan menerbitkan karya bersama.
          </p>
        </section>

        {/* Four Divisions Grid */}
        <section className="mt-14">
          <h2 className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
            EMPAT PILAR EKOSISTEM VEXARA
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {divisions.map((div) => (
              <div
                key={div.code}
                className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-8"
              >
                <span className="font-mono text-xs text-[#6B7280]">{div.code}</span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#0B0B0D]">
                  {div.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#4B5563]">{div.focus}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                  {div.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration Callout (10% Dark Anchor) */}
        <section className="mt-16 rounded-sm bg-[#0B0B0D] p-8 text-[#E5E7EB] sm:p-12">
          <span className="font-mono text-xs tracking-[0.18em] text-[#9CA3AF] uppercase">
            KOLABORASI & KEMITRAAN
          </span>
          <h2 className="mt-3 max-w-2xl font-serif text-2xl font-bold text-[#FFFFFF] sm:text-3xl">
            Tertarik Berkolaborasi dengan Vexara Media, Studio, atau Press?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9CA3AF]">
            Kami membuka pintu kerja sama untuk bedah buku, penerbitan antologi bersama,
            serta pengembangan platform web dan identitas visual.
          </p>
          <div className="mt-6">
            <Link
              href="/komunitas"
              className="inline-flex items-center gap-2 rounded-sm bg-[#FFFFFF] px-5 py-3 text-xs font-semibold tracking-wider text-[#0B0B0D] uppercase transition hover:bg-[#E5E7EB]"
            >
              Terhubung Melalui Balai Komunitas
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}