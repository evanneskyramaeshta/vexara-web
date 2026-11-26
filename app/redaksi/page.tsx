"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VexaraLogo from "@/components/brand/VexaraLogo";
import {
  CheckCircle2,
  XCircle,
  BookPlus,
  FileText,
  LogOut,
  Trash2,
  Eye,
  X,
} from "lucide-react";

interface ManuscriptRecord {
  id: number;
  ticketCode: string;
  authorName: string;
  email: string;
  category: string;
  title: string;
  content: string;
  status: "pending" | "reviewed" | "published" | "rejected";
  submittedAt: string;
}

interface BookRecord {
  id: number;
  title: string;
  author: string;
  year: number;
  isbn: string;
  category: string;
  status: string;
}

export default function RedaksiDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"manuscripts" | "books">("manuscripts");
  const [manuscriptList, setManuscriptList] = useState<ManuscriptRecord[]>([]);
  const [bookList, setBookList] = useState<BookRecord[]>([]);
  const [selectedManuscript, setSelectedManuscript] = useState<ManuscriptRecord | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    year: 2026,
    pages: 200,
    isbn: "",
    category: "Hukum & Politik",
    status: "Ringkasan Digital",
    synopsis: "",
    curatorNote: "",
    quote: "",
  });

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [mRes, bRes] = await Promise.all([
        fetch("/api/redaksi/manuscripts"),
        fetch("/api/books"),
      ]);
      const mData = await mRes.json();
      const bData = await bRes.json();

      if (mData.success) setManuscriptList(mData.data);
      if (bData.success) setBookList(bData.data);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleStatusChange = async (
    id: number,
    status: "pending" | "reviewed" | "published" | "rejected"
  ) => {
    const res = await fetch("/api/redaksi/manuscripts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (res.ok) {
      setManuscriptList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      if (selectedManuscript?.id === id) {
        setSelectedManuscript({ ...selectedManuscript, status });
      }
      notify(`Status naskah diperbarui menjadi: ${status.toUpperCase()}`);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/redaksi/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      notify(data.message || "Gagal menambahkan buku.");
      return;
    }

    setBookList((prev) => [data.data, ...prev]);
    setNewBook({
      title: "",
      author: "",
      publisher: "",
      year: 2026,
      pages: 200,
      isbn: "",
      category: "Hukum & Politik",
      status: "Ringkasan Digital",
      synopsis: "",
      curatorNote: "",
      quote: "",
    });
    notify("Buku baru berhasil diarsipkan ke Perpustakaan Vexara.");
  };

  const handleDeleteBook = async (id: number) => {
    const res = await fetch(`/api/redaksi/books?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setBookList((prev) => prev.filter((b) => b.id !== id));
      notify("Buku dihapus dari arsip database.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/redaksi/logout", { method: "POST" });
    router.push("/redaksi/login");
    router.refresh();
  };

  const pendingCount = manuscriptList.filter((m) => m.status === "pending").length;
  const publishedCount = manuscriptList.filter((m) => m.status === "published").length;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      {/* Top Bar Redaksi */}
      <header className="border-b border-[#E5E7EB] bg-[#FFFFFF]">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <VexaraLogo size={24} showWordmark={true} theme="light" />
            <span className="rounded-sm bg-[#0B0B0D] px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#FFFFFF] uppercase">
              MEJA REDAKSI
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3.5 py-2 text-xs font-medium text-[#0B0B0D] transition hover:border-[#0B0B0D]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        {feedback && (
          <div className="mb-6 rounded-sm bg-[#0B0B0D] px-4 py-3 font-mono text-xs text-[#FFFFFF]">
            {feedback}
          </div>
        )}

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-5">
            <p className="font-mono text-xs text-[#4B5563] uppercase">Menunggu Kurasi</p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#0B0B0D]">{pendingCount}</p>
          </div>
          <div className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-5">
            <p className="font-mono text-xs text-[#4B5563] uppercase">Naskah Terbit</p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#0B0B0D]">{publishedCount}</p>
          </div>
          <div className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-5">
            <p className="font-mono text-xs text-[#4B5563] uppercase">Koleksi Buku DB</p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#0B0B0D]">{bookList.length}</p>
          </div>
        </div>

        {/* Navigasi Tab */}
        <div className="mt-8 flex gap-3 border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("manuscripts")}
            className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium transition ${
              activeTab === "manuscripts"
                ? "bg-[#0B0B0D] text-[#FFFFFF]"
                : "border border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:text-[#0B0B0D]"
            }`}
          >
            <FileText className="h-4 w-4" />
            Kurasi Naskah Masuk ({manuscriptList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("books")}
            className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium transition ${
              activeTab === "books"
                ? "bg-[#0B0B0D] text-[#FFFFFF]"
                : "border border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:text-[#0B0B0D]"
            }`}
          >
            <BookPlus className="h-4 w-4" />
            Kelola Perpustakaan Vexara
          </button>
        </div>

        {/* TAB 1: KURASI NASKAH */}
        {activeTab === "manuscripts" && (
          <section className="mt-8">
            {loadingData ? (
              <p className="font-mono text-xs text-[#6B7280]">Memuat antrean naskah...</p>
            ) : manuscriptList.length === 0 ? (
              <div className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-10 text-center">
                <p className="font-serif text-lg font-bold">Belum ada naskah masuk</p>
                <p className="mt-1 text-xs text-[#4B5563]">
                  Naskah yang dikirim melalui halaman /komunitas akan muncul di sini.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB]">
                {manuscriptList.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 bg-[#FFFFFF] p-5 lg:flex-row lg:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                        <span className="font-bold text-[#0B0B0D]">{item.ticketCode}</span>
                        <span className="text-[#9CA3AF]">•</span>
                        <span className="text-[#4B5563]">{item.category}</span>
                        <span className="rounded-sm bg-[#F1F3F5] px-2 py-0.5 text-[#0B0B0D] uppercase">
                          {item.status}
                        </span>
                      </div>
                      <h2 className="mt-1.5 font-serif text-lg font-bold text-[#0B0B0D]">
                        {item.title}
                      </h2>
                      <p className="text-xs text-[#4B5563]">
                        Oleh {item.authorName} ({item.email})
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedManuscript(item)}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-1.5 text-xs font-medium text-[#0B0B0D] hover:border-[#0B0B0D]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Baca Naskah
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "published")}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-[#0B0B0D] px-3 py-1.5 text-xs font-medium text-[#FFFFFF] hover:bg-[#374151]"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Terbitkan
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Tolak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: TAMBAH & KELOLA BUKU PERPUSTAKAAN */}
        {activeTab === "books" && (
          <section className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <form
              onSubmit={handleAddBook}
              className="space-y-4 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-6 lg:col-span-6"
            >
              <h2 className="font-serif text-xl font-bold text-[#0B0B0D]">
                Arsipkan Koleksi Buku Baru
              </h2>

              <input
                type="text"
                required
                placeholder="Judul Buku"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nama Penulis"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                />
                <input
                  type="text"
                  required
                  placeholder="Penerbit"
                  value={newBook.publisher}
                  onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  required
                  placeholder="Tahun"
                  value={newBook.year}
                  onChange={(e) => setNewBook({ ...newBook, year: Number(e.target.value) })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                />
                <input
                  type="number"
                  required
                  placeholder="Halaman"
                  value={newBook.pages}
                  onChange={(e) => setNewBook({ ...newBook, pages: Number(e.target.value) })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                />
                <input
                  type="text"
                  required
                  placeholder="ISBN"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3.5 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                >
                  <option value="Hukum & Politik">Hukum & Politik</option>
                  <option value="Sejarah & Peradaban">Sejarah & Peradaban</option>
                  <option value="Sastra & Puisi">Sastra & Puisi</option>
                  <option value="Biografi Tokoh">Biografi Tokoh</option>
                  <option value="Filsafat Sosial">Filsafat Sosial</option>
                </select>

                <select
                  value={newBook.status}
                  onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                  className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-sm outline-none focus:border-[#0B0B0D]"
                >
                  <option value="Ringkasan Digital">Ringkasan Digital</option>
                  <option value="Arsip Fisik">Arsip Fisik</option>
                </select>
              </div>

              <textarea
                rows={3}
                required
                placeholder="Sinopsis buku (minimal 20 karakter)..."
                value={newBook.synopsis}
                onChange={(e) => setNewBook({ ...newBook, synopsis: e.target.value })}
                className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-3 text-sm outline-none focus:border-[#0B0B0D]"
              />

              <textarea
                rows={2}
                required
                placeholder="Catatan kuratorial Vexara..."
                value={newBook.curatorNote}
                onChange={(e) => setNewBook({ ...newBook, curatorNote: e.target.value })}
                className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-3 text-sm outline-none focus:border-[#0B0B0D]"
              />

              <textarea
                rows={2}
                required
                placeholder="Kutipan pilihan dari dalam buku..."
                value={newBook.quote}
                onChange={(e) => setNewBook({ ...newBook, quote: e.target.value })}
                className="w-full rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-3 text-sm outline-none focus:border-[#0B0B0D]"
              />

              <button
                type="submit"
                className="w-full rounded-sm bg-[#0B0B0D] py-3 text-xs font-medium tracking-wider text-[#FFFFFF] uppercase transition hover:bg-[#374151]"
              >
                Simpan ke Perpustakaan Vexara
              </button>
            </form>

            {/* Daftar Buku di Database */}
            <div className="lg:col-span-6">
              <h2 className="font-serif text-xl font-bold text-[#0B0B0D]">
                Koleksi Tersimpan di PostgreSQL ({bookList.length})
              </h2>
              <div className="mt-4 divide-y divide-[#E5E7EB] border border-[#E5E7EB]">
                {bookList.length === 0 ? (
                  <p className="p-6 text-xs text-[#6B7280]">
                    Belum ada buku tambahan di database. Gunakan formulir di samping untuk
                    menambah koleksi baru.
                  </p>
                ) : (
                  bookList.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <div>
                        <p className="font-serif text-base font-bold text-[#0B0B0D]">
                          {book.title}
                        </p>
                        <p className="text-xs text-[#4B5563]">
                          {book.author} • {book.year} ({book.category})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteBook(book.id)}
                        className="rounded-sm border border-[#E5E7EB] p-2 text-[#6B7280] hover:border-[#0B0B0D] hover:text-[#0B0B0D]"
                        aria-label="Hapus buku"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal Pratinjau Isi Naskah */}
      {selectedManuscript && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D]/75 p-4"
          onClick={() => setSelectedManuscript(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <span className="font-mono text-xs text-[#4B5563]">
                  {selectedManuscript.ticketCode} • {selectedManuscript.category}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#0B0B0D]">
                  {selectedManuscript.title}
                </h3>
                <p className="text-xs text-[#4B5563]">
                  {selectedManuscript.authorName} ({selectedManuscript.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedManuscript(null)}
                className="rounded-sm border border-[#E5E7EB] p-1.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#0B0B0D]">
              {selectedManuscript.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}