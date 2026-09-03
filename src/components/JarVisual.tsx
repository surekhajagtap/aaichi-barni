/**
 * The packaging, drawn to the brief: elegant glass jar, cream/ivory label,
 * mango yellow contents, terracotta lid, one restrained Khandeshi motif.
 * Replace with product photography on the same 3:4 frame when it is shot.
 */

const CONTENTS: Record<string, { fill: string; chunk: string }> = {
  mango: { fill: "#E8A317", chunk: "#FFD07A" },
  saffron: { fill: "#C97A16", chunk: "#F2B62E" },
  terracotta: { fill: "#A8401C", chunk: "#E8A317" },
  leaf: { fill: "#8FA14B", chunk: "#D6DE9C" },
};

export default function JarVisual({
  hue = "mango",
  name,
  className = "",
}: {
  hue?: string;
  name: string;
  className?: string;
}) {
  const c = CONTENTS[hue] ?? CONTENTS.mango;

  return (
    <svg
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label={`A glass jar of ${name}`}
    >
      <defs>
        <linearGradient id={`glass-${hue}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#7A5A3A" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`lid-${hue}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A3315" />
          <stop offset="45%" stopColor="#A8401C" />
          <stop offset="100%" stopColor="#7A2C11" />
        </linearGradient>
      </defs>

      {/* soft shadow on the surface */}
      <ellipse cx="150" cy="374" rx="86" ry="14" fill="#2E1C12" opacity="0.14" />

      {/* lid */}
      <rect x="98" y="34" width="104" height="30" rx="8" fill={`url(#lid-${hue})`} />
      <rect x="104" y="26" width="92" height="14" rx="7" fill="#B84A24" />
      <g opacity="0.25" stroke="#2E1C12" strokeWidth="2">
        {[...Array(9)].map((_, i) => (
          <path key={i} d={`M${108 + i * 11} 38 v22`} />
        ))}
      </g>

      {/* neck + body */}
      <path d="M106 64h88v10h-6v10h-76V74h-6z" fill="#EFE3CB" />
      <path
        d="M84 84h132v240a42 42 0 0 1-42 42h-48a42 42 0 0 1-42-42z"
        fill="#F3E6CD"
      />

      {/* contents */}
      <path
        d="M96 148h108v176a30 30 0 0 1-30 30h-48a30 30 0 0 1-30-30z"
        fill={c.fill}
      />
      {[
        [124, 190, 15],
        [172, 214, 13],
        [140, 246, 12],
        [186, 280, 14],
        [116, 292, 11],
        [156, 322, 13],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c.chunk} opacity={i % 2 ? 0.5 : 0.7} />
      ))}
      {/* the oil line */}
      <path d="M96 148h108v12H96z" fill="#FFFFFF" opacity="0.18" />

      {/* cream label */}
      <rect x="92" y="192" width="116" height="112" rx="6" fill="#FDFAF4" />
      <rect x="99" y="199" width="102" height="98" rx="3" fill="none" stroke="#C97A16" strokeWidth="1.2" />
      {/* one restrained motif — a mango leaf pair */}
      <g transform="translate(150 224)" fill="#A8401C">
        <path d="M0 0c-9-4-16-12-16-20 9 1 16 8 16 20z" />
        <path d="M0 0c9-4 16-12 16-20-9 1-16 8-16 20z" />
        <path d="M-1 0h2v10h-2z" />
      </g>
      <rect x="112" y="244" width="76" height="4" rx="2" fill="#2E1C12" opacity="0.82" />
      <rect x="122" y="256" width="56" height="3" rx="1.5" fill="#6A5142" opacity="0.7" />
      <rect x="130" y="278" width="40" height="2.5" rx="1.25" fill="#C97A16" />

      {/* glass sheen last, over everything */}
      <path
        d="M84 84h132v240a42 42 0 0 1-42 42h-48a42 42 0 0 1-42-42z"
        fill={`url(#glass-${hue})`}
      />
      <rect x="100" y="104" width="12" height="230" rx="6" fill="#FFFFFF" opacity="0.32" />
    </svg>
  );
}
