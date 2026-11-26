interface VexaraLogoProps {
  size?: number;
  showWordmark?: boolean;
  theme?: "light" | "dark";
}

export default function VexaraLogo({
  size = 26,
  showWordmark = true,
  theme = "light",
}: VexaraLogoProps) {
  const textColor = theme === "light" ? "text-[#0B0B0D]" : "text-[#E5E7EB]";
  const badgeBorder = theme === "dark" ? "border border-[#27272A]" : "";

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-[#0B0B0D] p-1.5 ${badgeBorder}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width={size}
          height={size}
          fill="none"
          aria-hidden="true"
        >
          <g transform="translate(50, 50) scale(0.92) translate(-50, -50)">
            {/* Sayap Luar */}
            <polygon points="14,20 16.5,45 31,61" fill="#8E96A0" />
            <polygon points="86,20 83.5,45 69,61" fill="#D1D5DB" />

            {/* Bilah Utama Huruf V & Siluet Mata Pena */}
            <polygon
              points="14,15 39,26 45,39 41,56 50,75 50,92"
              fill="#9CA3AF"
            />
            <polygon
              points="86,15 61,26 55,39 59,56 50,75 50,92"
              fill="#E5E7EB"
            />

            {/* Celah & Lubang Mata Pena */}
            <line
              x1="50"
              y1="75"
              x2="50"
              y2="55"
              stroke="#E5E7EB"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="54.5" r="2.8" fill="#E5E7EB" />
          </g>
        </svg>
      </span>

      {showWordmark && (
        <span
          className={`font-serif text-xl font-bold tracking-[0.18em] ${textColor}`}
        >
          VEXARA
        </span>
      )}
    </span>
  );
}