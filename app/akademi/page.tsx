"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { academyModules, AcademyModule } from "@/data/ecosystem";
import { GraduationCap, BookOpen, CheckCircle2, X } from "lucide-react";

const tracks = [
  "Semua Jalur",
  "Dasar Ilmu Hukum",
  "Sejarah & Pergerakan",
  "Filsafat Sosial",
  "Teknik Sastra & Deklamasi",
] as const;

export default function AkademiPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("Semua Jalur");
  const [activeModule, setActiveModule] = useState<AcademyModule | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const visibleModules = academyModules.filter(
    (mod) => selectedTrack === "Semua Jalur" || mod.track === selectedTrack
  );

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0D]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] pb-10">
          <span className="font-mono text-xs tracking-[0.16em] text-[#4B5563] uppercase">
            RUANG EDUKASI TERBUKA & TERSTRUKTUR
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#0B0B0D] sm:text-4xl">
            Vexara Akademi
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
            Modul pembelajaran publik yang disusun secara bertahap untuk memperdalam
            nalar hukum, sejarah pergerakan, filsafat sosial, dan teknik kepenulisan.
          </p>
        </div>

        {/* Track Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {tracks.map((track) => (
            <button
              key={track}
              type="button"
              onClick={() => setSelectedTrack(track)}
              className={`rounded-sm px-3.5 py-1.5 text-xs font-medium transition ${
                selectedTrack === track
                  ? "bg-[#0B0B0D] text-[#FFFFFF]"
                  : "border border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:border-[#9CA3AF] hover:text-[#0B0B0D]"
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Module Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleModules.map((mod) => {
            const isDone = completedIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className="flex flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-7 transition hover:border-[#0B0B0D]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-sm bg-[#F1F3F5] px-2.5 py-1 font-mono text-[11px] font-medium text-[#0B0B0D]">
                      {mod.code} • {mod.chaptersCount} BAB
                    </span>
                    <span className="font-mono text-xs text-[#6B7280]">{mod.duration}</span>
                  </div>

                  <p className="mt-4 font-mono text-[11px] tracking-wider text-[#4B5563] uppercase">
                    {mod.track}
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-bold text-[#0B0B0D]">
                    {mod.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {mod.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModule(mod)}
                      className="inline-flex items-center gap-2 rounded-sm bg-[#0B0B0D] px-4 py-2 text-xs font-medium text-[#FFFFFF] transition hover:bg-[#374151]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Buka Silabus & Materi
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleComplete(mod.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium transition ${
                        isDone ? "text-[#0B0B0D]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isDone ? "Selesai Dibaca" : "Tandai Selesai"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Syllabus Reader Modal */}
      {activeModule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D]/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveModule(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-4">
              <div>
                <span className="font-mono text-[11px] text-[#4B5563]">
                  {activeModule.code} • {activeModule.track}
                </span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#0B0B0D]">
                  {activeModule.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModule(null)}
                className="rounded-sm border border-[#E5E7EB] p-1.5 text-[#4B5563] hover:text-[#0B0B0D]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#4B5563]">
                <GraduationCap className="h-4 w-4 text-[#0B0B0D]" />
                <span>STRUKTUR BAB PEMBELAJARAN</span>
              </div>

              {activeModule.chapters.map((chap) => (
                <div
                  key={chap.number}
                  className="rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] p-4"
                >
                  <p className="font-mono text-[11px] text-[#6B7280]">BAB {chap.number}</p>
                  <h3 className="mt-1 font-serif text-base font-bold text-[#0B0B0D]">
                    {chap.heading}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4B5563]">{chap.keyPoint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}