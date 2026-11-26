"use client";

import dynamic from "next/dynamic";

const VexaraCanvas = dynamic(() => import("./VexaraCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <span className="font-mono text-[11px] tracking-[0.2em] text-[#9CA3AF] uppercase">
        MEMUAT RUANG 3D...
      </span>
    </div>
  ),
});

export default function VexaraHeroScene() {
  return (
    <div className="relative flex aspect-square w-full max-w-md flex-col justify-between overflow-hidden rounded-sm border border-[#E5E7EB] bg-[#0B0B0D] p-5">
      {/* Header Viewport */}
      <div className="z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-[#9CA3AF] uppercase">
        <span>VEXARA MONOLITH 3D</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB]" />
          INTERAKTIF
        </span>
      </div>

      {/* Kanvas 3D */}
      <div className="absolute inset-0">
        <VexaraCanvas />
      </div>

      {/* Footer Viewport */}
      <div className="z-10 flex items-center justify-between border-t border-[#1F2937] pt-3 font-mono text-[10px] text-[#6B7280]">
        <span>GERAKKAN KURSOR UNTUK EKSPLORASI</span>
        <span>WEBGL 2.0</span>
      </div>
    </div>
  );
}