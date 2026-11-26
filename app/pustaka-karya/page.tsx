"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { literaryWorks, LiteraryWork } from "@/data/ecosystem";
import { Feather, ArrowUpRight, Search, X, Clock } from "lucide-react";

const workCategories = ["Semua", "Puisi", "Esai Kritis", "Resensi Buku", "Prosa"] as const;

interface PublishedApiManuscript {
  id: number;
  ticketCode: string;
  authorName: string;
  category: LiteraryWork["category"];
  title: string;
  content: string;
  submittedAt: string;
}

export default function PustakaKaryaPage() {
  const [worksData, setWorksData] = useState<LiteraryWork[]>(literaryWorks);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWork, setActiveWork] = useState<LiteraryWork | null>(null);

  useEffect(() => {
    async function loadPublishedManuscripts() {
      try {
        const res = await fetch("/api/manuscripts", { cache: "no-store" });
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const mappedWorks: LiteraryWork[] = result.data.map(
            (m: PublishedApiManuscript) => {
              const paragraphs = m.content
                .split(/\n+/)
                .map((p) => p.trim())
                .filter(Boolean);
              const wordCount = m.content.split(/\s+/).filter(Boolean).length;
              const minutes = Math.max(1, Math.ceil(wordCount / 200));

              return {
                id: `db-${m.id}`,
                slug: m.ticketCode.toLowerCase(),
                title: m.title,
                author: m.authorName,
                authorRole: "Kontributor Publik Vexara",
                category: m.category,
                publishedAt: new Date(m.submittedAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                readTime: `${minutes} MENIT BACA`,
                excerpt:
                  m.content.length > 185
                    ? `${m.content.slice(0, 185).trim()}...`
                    : m.content,
                content: paragraphs.length > 0 ? paragraphs : [m.content],
              };
            }
          );

          setWorksData([...mappedWorks, ...literaryWorks]);
        }
      } catch {
        // Tetap gunakan antologi awal jika offline
      }
    }
    loadPublishedManuscripts();
  }, []);

  const featuredWork = worksData.find((w) => w.featured) || worksData[0];

  const filteredWorks = useMemo(() => {
    return worksData.filter((work) => {
      const matchCat =
        selectedCategory === "Semua" || work.category === selectedCategory;
      const matchSearch =
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [worksData, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        <div className="flex flex-col justify-between gap-6 border-b border-[#E5E7EB] pb-10 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
              ANTOLOGI & JURNAL KOLEKTIF PUBLIK
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0B0B0D] sm:text-4xl">
              Pustaka Karya Kolektif
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Ruang publikasi terbuka untuk puisi, esai kritis, resensi buku, dan prosa
              yang dikirimkan oleh pembaca maupun kontributor Vexara.
            </p>
          </div>

          <Link
            href="/komunitas"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#0B0B0D] px-5 py-3 text-xs font-medium tracking-wider text-[#FFFFFF] uppercase transition hover:bg-[#374151]"
          >
            <Feather className="h-4 w-4" />
            Kirim Naskah Anda
          </Link>
        </div>

        {/* Featured Banner */}
        <section
          onClick={() => setActiveWork(featuredWork)}
          className="mt-10 cursor-pointer rounded-sm bg-[#0B0B0D] p-8 text-[#E5E7EB] transition hover:bg-[#131317] sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] tracking-[0.18em] text-[#9CA3AF] uppercase">
              KARYA PILIHAN REDAKSI • {featuredWork.category}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#9CA3AF]">
              <Clock className="h-3.5 w-3.5" />
              {featuredWork.readTime}
            </span>
          </div>

          <h2 className="mt-4 max-w-3xl font-serif text-2xl leading-snug font-bold text-[#FFFFFF] sm:text-3xl">
            {featuredWork.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            {featuredWork.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1F2937] pt-5">
            <div>
              <p className="text-sm font-medium text-[#FFFFFF]">{featuredWork.author}</p>
              <p className="font-mono text-[11px] text-[#6B7280]">
                {featuredWork.authorRole} • {featuredWork.publishedAt}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FFFFFF] underline">
              Baca Naskah Lengkap
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </section>

        {/* Filter & Search */}
        <div className="mt-12 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {workCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-sm px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#0B0B0D] text-[#FFFFFF]"
                    : "border border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:border-[#9CA3AF] hover:text-[#0B0B0D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau penulis..."
              className="w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] py-2 pr-3 pl-9 text-xs text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
            />
          </div>
        </div>

        {/* Anthology Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work) => (
            <article
              key={work.id}
              onClick={() => setActiveWork(work)}
              className="group flex cursor-pointer flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition hover:border-[#0B0B0D]"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#4B5563]">
                  <span className="uppercase">{work.category}</span>
                  <span>{work.readTime}</span>
                </div>

                <h3 className="mt-3 font-serif text-xl leading-snug font-bold text-[#0B0B0D] group-hover:underline">
                  {work.title}
                </h3>

                <p
                  className={`mt-3 text-sm leading-relaxed text-[#4B5563] ${
                    work.category === "Puisi" ? "font-serif italic" : ""
                  }`}
                >
                  {work.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                <div>
                  <p className="text-xs font-semibold text-[#0B0B0D]">{work.author}</p>
                  <p className="font-mono text-[10px] text-[#6B7280]">{work.publishedAt}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#9CA3AF] transition group-hover:text-[#0B0B0D]" />
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Full Reading Modal */}
      {activeWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D]/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveWork(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 sm:p-10"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-5">
              <div>
                <span className="font-mono text-[11px] tracking-wider text-[#4B5563] uppercase">
                  {activeWork.category} • {activeWork.readTime}
                </span>
                <h2 className="mt-2 font-serif text-2xl leading-snug font-bold text-[#0B0B0D] sm:text-3xl">
                  {activeWork.title}
                </h2>
                <p className="mt-2 text-xs text-[#4B5563]">
                  Oleh <strong className="text-[#0B0B0D]">{activeWork.author}</strong> (
                  {activeWork.authorRole}) • {activeWork.publishedAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveWork(null)}
                className="rounded-sm border border-[#E5E7EB] p-1.5 text-[#4B5563] hover:text-[#0B0B0D]"
                aria-label="Tutup naskah"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className={`mt-6 space-y-4 text-base leading-loose text-[#0B0B0D] ${
                activeWork.category === "Puisi" ? "font-serif italic" : "font-sans"
              }`}
            >
              {activeWork.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}