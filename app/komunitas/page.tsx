"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { communityEvents } from "@/data/ecosystem";
import { manuscriptSubmissionSchema } from "@/lib/security/sanitize";
import { ShieldCheck, Send, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function KomunitasPage() {
  const [formData, setFormData] = useState({
    authorName: "",
    email: "",
    category: "Puisi" as "Puisi" | "Esai Kritis" | "Resensi Buku" | "Prosa",
    title: "",
    content: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmittedCode(null);

    const parsed = manuscriptSubmissionSchema.safeParse(formData);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || "Periksa kembali isian formulir.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/manuscripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMsg(result.message || "Gagal mengirimkan naskah ke server.");
        return;
      }

      setSubmittedCode(result.ticketCode);
      setFormData({
        authorName: "",
        email: "",
        category: "Puisi",
        title: "",
        content: "",
      });
    } catch {
      setErrorMsg("Koneksi terputus. Pastikan server berjalan dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] pb-10">
          <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
            BALAI DISKUSI, AGENDA & REDAKSI PUBLIK
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0B0B0D] sm:text-4xl">
            Komunitas & Kirim Karya
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
            Ikuti agenda bedah buku, diskusi terbuka, atau kirimkan naskah sastra dan
            esai pemikiranmu untuk dikurasi ke dalam Pustaka Karya Vexara.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Kolom Kiri: Formulir Pengiriman Naskah Terproteksi (7 Cols) */}
          <section className="lg:col-span-7">
            <div className="rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0B0B0D]">
                    Portal Submisi Naskah
                  </h2>
                  <p className="mt-1 text-xs text-[#4B5563]">
                    Setiap naskah akan ditinjau oleh tim kurator sebelum diterbitkan.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-sm bg-[#F1F3F5] px-2.5 py-1 font-mono text-[10px] text-[#0B0B0D]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  ZOD & XSS PROTECTED
                </span>
              </div>

              {submittedCode && (
                <div className="mt-6 rounded-sm bg-[#0B0B0D] p-5 text-[#E5E7EB]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#FFFFFF]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Naskah Berhasil Diterima Meja Redaksi</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                    Naskahmu telah melalui validasi keamanan dan masuk ke antrean kurasi.
                    Simpan kode pelacakan berikut:
                  </p>
                  <p className="mt-3 inline-block rounded-sm border border-[#374151] bg-[#131317] px-3 py-1 font-mono text-xs font-bold text-[#FFFFFF]">
                    TIKET KURASI: {submittedCode}
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="mt-6 flex items-center gap-2 rounded-sm border border-[#0B0B0D] bg-[#F8F9FA] p-4 text-xs font-medium text-[#0B0B0D]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-[#4B5563] uppercase">
                      Nama Penulis / Pena
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.authorName}
                      onChange={(e) =>
                        setFormData({ ...formData, authorName: e.target.value })
                      }
                      placeholder="Contoh: Evannesky Ramaeshta"
                      className="mt-1.5 w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3.5 py-2.5 text-sm text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#4B5563] uppercase">
                      Email Konfirmasi
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="penulis@domain.com"
                      className="mt-1.5 w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3.5 py-2.5 text-sm text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block font-mono text-xs text-[#4B5563] uppercase">
                      Kategori Karya
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as
                            | "Puisi"
                            | "Esai Kritis"
                            | "Resensi Buku"
                            | "Prosa",
                        })
                      }
                      className="mt-1.5 w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
                    >
                      <option value="Puisi">Puisi</option>
                      <option value="Esai Kritis">Esai Kritis</option>
                      <option value="Resensi Buku">Resensi Buku</option>
                      <option value="Prosa">Prosa</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-[#4B5563] uppercase">
                      Judul Naskah
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Tuliskan judul karya..."
                      className="mt-1.5 w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3.5 py-2.5 text-sm text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#4B5563] uppercase">
                    Isi Naskah (Minimal 50 Karakter)
                  </label>
                  <textarea
                    rows={7}
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Tuliskan bait puisi, esai, atau resensi bukumu di sini..."
                    className="mt-1.5 w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-3.5 text-sm leading-relaxed text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
                  />
                </div>
<button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#0B0B0D] px-6 py-3 text-xs font-medium tracking-wider text-[#FFFFFF] uppercase transition hover:bg-[#374151] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? "Mengirim ke Server..." : "Kirim ke Meja Redaksi"}
                </button>
              </form>
            </div>
          </section>

          {/* Kolom Kanan: Agenda & Pengumuman Resmi (5 Cols) */}
          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-[#4B5563] uppercase">
                <Calendar className="h-4 w-4 text-[#0B0B0D]" />
                <span>AGENDA & PENGUMUMAN RESMI</span>
              </div>

              <div className="mt-6 space-y-4">
                {communityEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-5"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-semibold text-[#0B0B0D]">{ev.date}</span>
                      <span className="rounded-sm bg-[#F1F3F5] px-2 py-0.5 text-[#4B5563]">
                        {ev.type}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-base font-bold text-[#0B0B0D]">
                      {ev.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#4B5563]">{ev.format}</p>
                    <p className="mt-3 font-mono text-[10px] tracking-wider text-[#0B0B0D] uppercase">
                      STATUS: {ev.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}