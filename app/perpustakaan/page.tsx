"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { vexaraBooks, BookItem } from "@/data/books";
import {
  Search,
  LayoutGrid,
  List,
  BookOpen,
  X,
  Copy,
  Check,
} from "lucide-react";

type ExtendedBookItem = BookItem & {
  coverUrl?: string | null;
};

export default function PerpustakaanPage() {
  const [booksData, setBooksData] = useState<ExtendedBookItem[]>(vexaraBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeBook, setActiveBook] = useState<ExtendedBookItem | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    async function loadLiveBooks() {
      try {
        const res = await fetch("/api/books", { cache: "no-store" });
        const result = await res.json();

        if (!result.success) {
          console.error("Gagal memuat /api/books:", result.error || result);
          return;
        }

        if (Array.isArray(result.data) && result.data.length > 0) {
          const dbBooks: ExtendedBookItem[] = result.data.map(
            (item: Record<string, unknown>) => {
              const rawCover = (item.coverImage ??
                item.cover_image ??
                item.coverUrl ??
                item.cover_url) as string | null | undefined;

              const resolvedCover = rawCover
                ? rawCover.startsWith("http") || rawCover.startsWith("/")
                  ? rawCover
                  : `/uploads/books/${rawCover}`
                : null;

              const rawStatus = String(item.status || "");
              const normalizedStatus =
                rawStatus === "Arsip Fisik" || rawStatus === "physical"
                  ? "Arsip Fisik"
                  : "Ringkasan Digital";

              const title = String(item.title || "Tanpa Judul");
              const synopsis = String(
                item.synopsis ??
                  item.description ??
                  "Arsip koleksi literasi Vexara."
              );

              return {
                id: `db-${item.id}`,
                title,
                author: String(item.author ?? item.author_name ?? "Anonim"),
                publisher: String(
                  item.publisher ?? item.publisher_name ?? "Arsip Vexara"
                ),
                year: Number(
                  item.year ??
                    item.publicationYear ??
                    item.publication_year ??
                    2024
                ),
                pages: Number(
                  item.pages ?? item.totalPages ?? item.total_pages ?? 0
                ),
                isbn: String(item.isbn || "-"),
                category: String(item.category || "Umum"),
                status: normalizedStatus,
                synopsis,
                curatorNote: String(
                  item.curatorNote ??
                    item.curator_note ??
                    `Koleksi terarsip dalam katalog literasi Vexara (${String(
                      item.bookCode ?? item.book_code ?? "VXR"
                    )}).`
                ),
                quote: String(
                  item.quote ??
                    synopsis.slice(0, 180) + (synopsis.length > 180 ? "..." : "")
                ),
                coverUrl: resolvedCover,
              };
            }
          );

          setBooksData([...dbBooks, ...vexaraBooks]);
        }
      } catch (err) {
        console.error("Koneksi ke /api/books gagal:", err);
      }
    }
    loadLiveBooks();
  }, []);

  const dynamicCategories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(booksData.map((b) => b.category).filter(Boolean))
    );
    return ["Semua", ...uniqueCats];
  }, [booksData]);

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "Semua" || book.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "Semua Status" || book.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [booksData, searchQuery, selectedCategory, selectedStatus]);

  const handleCopyQuote = (quote: string, title: string, author: string) => {
    navigator.clipboard.writeText(
      `"${quote}" — ${author} (${title}, Arsip Vexara)`
    );
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Header Katalog */}
        <div className="border-b border-[#E5E7EB] pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
              ARSIP LITERASI & REFERENSI PUBLIK
            </span>
            <span className="rounded-sm border border-[#E5E7EB] bg-[#F1F3F5] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#0B0B0D]">
              {booksData.length} KOLEKSI TERARSIP
            </span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0B0B0D] sm:text-4xl">
            Perpustakaan Vexara
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
            Katalog kuratorial buku hukum, sejarah, sastra, biografi, dan
            filsafat sosial yang menjadi rujukan diskusi serta ruang baca publik
            Vexara.
          </p>

          <div className="relative mt-8 max-w-2xl">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul buku, nama penulis, atau topik kajian..."
              className="w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] py-3 pr-4 pl-11 text-sm text-[#0B0B0D] placeholder-[#9CA3AF] transition outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
            />
          </div>
        </div>

        {/* Filter & View Controls */}
        <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {dynamicCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-sm px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-[#0B0B0D] text-[#FFFFFF]"
                      : "border border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:border-[#9CA3AF] hover:text-[#0B0B0D]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter status ketersediaan"
              className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-1.5 text-xs font-medium text-[#0B0B0D] outline-none focus:border-[#0B0B0D]"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Ringkasan Digital">Ringkasan Digital</option>
              <option value="Arsip Fisik">Arsip Fisik</option>
            </select>

            <div className="flex rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Tampilan Grid"
                className={`rounded-sm p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-[#0B0B0D] text-[#FFFFFF]"
                    : "text-[#6B7280] hover:text-[#0B0B0D]"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Tampilan Daftar"
                className={`rounded-sm p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-[#0B0B0D] text-[#FFFFFF]"
                    : "text-[#6B7280] hover:text-[#0B0B0D]"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Book Catalog Display */}
        {filteredBooks.length === 0 ? (
          <div className="mt-12 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-12 text-center">
            <p className="font-serif text-lg font-semibold text-[#0B0B0D]">
              Koleksi tidak ditemukan
            </p>
            <p className="mt-1 text-sm text-[#4B5563]">
              Coba gunakan kata kunci lain atau atur ulang filter kategori.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="group cursor-pointer rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-5 transition hover:border-[#0B0B0D]"
              >
                <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-sm bg-[#F1F3F5] p-5 transition group-hover:bg-[#E5E7EB]/70">
                  {book.coverUrl && (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale transition group-hover:opacity-30"
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider text-[#4B5563] uppercase">
                      {book.category}
                    </span>
                    <span
                      className={`rounded-sm px-2 py-0.5 font-mono text-[10px] ${
                        book.status === "Ringkasan Digital"
                          ? "bg-[#0B0B0D] text-[#FFFFFF]"
                          : "border border-[#9CA3AF] bg-[#FFFFFF] text-[#0B0B0D]"
                      }`}
                    >
                      {book.status === "Ringkasan Digital"
                        ? "DIGITAL"
                        : "ARSIP FISIK"}
                    </span>
                  </div>

                  <div className="relative z-10 my-auto border-l-2 border-[#0B0B0D] pl-3">
                    <p className="line-clamp-2 font-serif text-lg leading-snug font-bold text-[#0B0B0D]">
                      {book.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#4B5563]">
                      {book.year} • {book.pages} HLM
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium text-[#4B5563]">
                    {book.author}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4B5563]">
                    {book.synopsis}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                    <span className="font-mono text-[11px] text-[#9CA3AF]">
                      ISBN {book.isbn}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0B0B0D] group-hover:underline">
                      <BookOpen className="h-3.5 w-3.5" />
                      Detail & Catatan
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="flex cursor-pointer flex-col justify-between gap-4 py-5 transition hover:bg-[#F8F9FA] sm:flex-row sm:items-center sm:px-4"
              >
                <div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[#4B5563]">
                    <span>{book.category}</span>
                    <span>•</span>
                    <span>{book.year}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-bold text-[#0B0B0D]">
                    {book.title}
                  </h2>
                  <p className="text-sm text-[#4B5563]">{book.author}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#6B7280]">
                    {book.status}
                  </span>
                  <span className="rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#0B0B0D]">
                    Buka Catatan
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Book Detail & Curatorial Modal */}
      {activeBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D]/70 p-4 backdrop-blur-xs"
          onClick={() => setActiveBook(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-4">
              <div>
                <span className="font-mono text-[11px] tracking-wider text-[#4B5563] uppercase">
                  {activeBook.category} • {activeBook.year}
                </span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#0B0B0D]">
                  {activeBook.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#4B5563]">
                  {activeBook.author} —{" "}
                  <span className="text-[#9CA3AF]">{activeBook.publisher}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveBook(null)}
                className="rounded-sm border border-[#E5E7EB] p-1.5 text-[#4B5563] hover:text-[#0B0B0D]"
                aria-label="Tutup detail buku"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-mono text-xs tracking-wider text-[#4B5563] uppercase">
                  Sinopsis Koleksi
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0B0B0D]">
                  {activeBook.synopsis}
                </p>
              </div>

              <div className="rounded-sm border-l-2 border-[#0B0B0D] bg-[#F8F9FA] p-4">
                <h3 className="font-mono text-xs tracking-wider text-[#0B0B0D] uppercase">
                  Catatan Kuratorial Vexara
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">
                  {activeBook.curatorNote}
                </p>
              </div>

              <div className="rounded-sm bg-[#0B0B0D] p-6 text-[#E5E7EB]">
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#9CA3AF] uppercase">
                  KUTIPAN PILIHAN ARSIP
                </span>
                <blockquote className="mt-3 font-serif text-lg leading-relaxed text-[#FFFFFF]">
                  “{activeBook.quote}”
                </blockquote>
                <div className="mt-4 flex items-center justify-between border-t border-[#1F2937] pt-3">
                  <span className="font-mono text-[11px] text-[#9CA3AF]">
                    ISBN: {activeBook.isbn}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyQuote(
                        activeBook.quote,
                        activeBook.title,
                        activeBook.author
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-sm border border-[#374151] bg-[#131317] px-3 py-1.5 text-xs font-medium text-[#E5E7EB] transition hover:border-[#E5E7EB]"
                  >
                    {copiedQuote ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Salin Kutipan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}