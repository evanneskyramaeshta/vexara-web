"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VexaraLogo from "@/components/brand/VexaraLogo";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function RedaksiLoginPage() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/redaksi/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Gagal memverifikasi kunci akses.");
        return;
      }

      router.push("/redaksi");
      router.refresh();
    } catch {
      setError("Koneksi ke server terganggu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-6 text-[#0B0B0D]">
      <div className="w-full max-w-md rounded-sm border border-[#E5E7EB] bg-[#FFFFFF] p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <VexaraLogo size={28} showWordmark={true} theme="light" />
          <span className="mt-5 font-mono text-[11px] tracking-[0.18em] text-[#4B5563] uppercase">
            GERBANG KURATOR & REDAKSI
          </span>
          <h1 className="mt-2 font-serif text-2xl font-bold text-[#0B0B0D]">
            Masuk ke Meja Redaksi
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">
            Masukkan kunci otorisasi internal untuk meninjau kiriman naskah dan
            mengelola katalog Perpustakaan Vexara.
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-sm border border-[#0B0B0D] bg-[#F8F9FA] p-3.5 text-xs font-medium text-[#0B0B0D]">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="block font-mono text-xs text-[#4B5563] uppercase">
              Kunci Akses Redaksi
            </label>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="password"
                required
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] py-2.5 pr-4 pl-10 text-sm text-[#0B0B0D] outline-none focus:border-[#0B0B0D] focus:bg-[#FFFFFF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#0B0B0D] py-3 text-xs font-medium tracking-wider text-[#FFFFFF] uppercase transition hover:bg-[#374151] disabled:opacity-60"
          >
            <span>{loading ? "Memverifikasi..." : "Buka Ruang Kurasi"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-center">
          <Link
            href="/"
            className="font-mono text-xs text-[#6B7280] transition hover:text-[#0B0B0D]"
          >
            ← Kembali ke Beranda Publik
          </Link>
        </div>
      </div>
    </div>
  );
}