import { ReactNode } from "react";

/**
 * PHOTOGRAPHY SLOTS.
 *
 * The brand brief calls for authentic photography of the mother, her hands, kairi,
 * Khandeshi spices, glass jars, bhakri and the family table. Until those photographs
 * exist, every slot renders a warm hand-composed SVG scene at the correct aspect ratio,
 * so the layout is final and nothing shifts when real images arrive.
 *
 * To swap in a real photograph, see README.md → "Replacing the illustrations".
 */

export type SceneName =
  | "hands"
  | "kairi"
  | "spices"
  | "mother"
  | "jars"
  | "bhakri"
  | "kitchen"
  | "khandesh"
  | "cutting"
  | "mixing"
  | "packing"
  | "table";

type Props = {
  name: SceneName;
  /** Describes the intended photograph — becomes the alt text when a real image lands. */
  alt: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Grain is a single 80x80 noise tile applied as a CSS background, not an SVG
 * filter on each scene. A per-scene feTurbulence over the full frame is
 * expensive to rasterise and there are a dozen scenes on the homepage — the
 * browser decodes this data URI once and repeats it for free.
 */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** Warm afternoon light, shared by every scene so the set feels shot on one day. */
function Sky({ from, to }: { from: string; to: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`sky-${from.slice(1)}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={`sun-${from.slice(1)}`} cx="0.76" cy="0.16" r="0.6">
          <stop offset="0%" stopColor="#FFF0C9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFF0C9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#sky-${from.slice(1)})`} />
      <rect width="800" height="600" fill={`url(#sun-${from.slice(1)})`} />
    </>
  );
}

function Jar({ x, y, s = 1, fill = "#E8A317" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* lid */}
      <rect x="-32" y="-14" width="64" height="16" rx="5" fill="#8A3315" />
      <rect x="-27" y="-19" width="54" height="8" rx="4" fill="#A8401C" />
      {/* glass body */}
      <path d="M-30 2 h60 v78 a14 14 0 0 1 -14 14 h-32 a14 14 0 0 1 -14 -14 z" fill="#F6E7CB" opacity="0.85" />
      {/* contents */}
      <path d="M-25 24 h50 v54 a11 11 0 0 1 -11 11 h-28 a11 11 0 0 1 -11 -11 z" fill={fill} />
      {/* mango chunks */}
      <circle cx="-11" cy="44" r="7" fill="#FFD07A" opacity="0.75" />
      <circle cx="9" cy="58" r="6" fill="#FFD07A" opacity="0.6" />
      <circle cx="-6" cy="70" r="5" fill="#C25A22" opacity="0.5" />
      {/* highlight */}
      <rect x="-24" y="8" width="7" height="72" rx="4" fill="#FFFFFF" opacity="0.35" />
      {/* cream label */}
      <rect x="-22" y="36" width="44" height="26" rx="3" fill="#FDFAF4" opacity="0.94" />
      <rect x="-15" y="44" width="30" height="3" rx="1.5" fill="#A8401C" />
      <rect x="-11" y="51" width="22" height="2" rx="1" fill="#6A5142" opacity="0.6" />
    </g>
  );
}

function Mango({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
      <ellipse cx="0" cy="0" rx="38" ry="30" fill="#8FA14B" />
      <ellipse cx="-8" cy="-7" rx="20" ry="14" fill="#B7C56B" opacity="0.65" />
      <path d="M-2 -28 q6 -12 16 -14" stroke="#5C6B3C" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M12 -42 q16 -4 22 6 q-14 8 -22 -6z" fill="#5C6B3C" />
    </g>
  );
}

function SpiceBowl({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="42" ry="13" fill="#8A6A4F" />
      <path d="M-42 0 a42 13 0 0 0 84 0 a42 26 0 0 1 -84 0z" fill="#6B4E3D" />
      <ellipse cx="0" cy="-2" rx="34" ry="10" fill={fill} />
      <ellipse cx="-8" cy="-5" rx="14" ry="4" fill="#FFFFFF" opacity="0.18" />
    </g>
  );
}

/**
 * One hand seen from above: palm, four fingers and a thumb, wrist trailing
 * off-frame. `flip` mirrors it so a pair reads as a left and a right hand.
 */
function Hand({
  x,
  y,
  s = 1,
  r = 0,
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  r?: number;
  flip?: boolean;
}) {
  const SKIN = "#C08A5E";
  const SHADE = "#AD764A";

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${r})`}>
      {/* forearm running out of frame */}
      <path d="M-16 34 q-6 60 -4 120 h52 q2 -60 -4 -120z" fill={SHADE} />
      {/* palm */}
      <path d="M-30 22 q0 -26 30 -26 q30 0 30 26 q0 34 -12 46 q-18 12 -36 0 q-12 -12 -12 -46z" fill={SKIN} />
      {/* fingers, slightly fanned */}
      <g fill={SKIN}>
        <rect x="-30" y="-38" width="14" height="52" rx="7" transform="rotate(-11 -23 -12)" />
        <rect x="-13" y="-48" width="14" height="62" rx="7" transform="rotate(-3 -6 -17)" />
        <rect x="3" y="-46" width="14" height="60" rx="7" transform="rotate(4 10 -16)" />
        <rect x="18" y="-34" width="13" height="48" rx="6.5" transform="rotate(11 24 -10)" />
      </g>
      {/* thumb */}
      <rect
        x="26"
        y="6"
        width="14"
        height="40"
        rx="7"
        fill={SKIN}
        transform="rotate(38 33 26)"
      />
      {/* knuckle shading keeps it from reading flat */}
      <path d="M-26 20 q26 10 52 0 q-2 10 -6 14 q-20 8 -40 0z" fill={SHADE} opacity="0.35" />
    </g>
  );
}

/** The recurring motif of the brand: a pair of hands working over the mango. */
function Hands({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Hand x={-58} y={-6} s={0.95} r={-14} />
      <Hand x={58} y={4} s={0.95} r={14} flip />
    </g>
  );
}

function scene(name: SceneName): ReactNode {
  switch (name) {
    case "hands":
      return (
        <>
          <Sky from="#F3D8A8" to="#E7B678" />
          {/* wooden counter */}
          <rect y="360" width="800" height="240" fill="#8A5A36" />
          <rect y="360" width="800" height="14" fill="#A6714A" />
          <g opacity="0.25" stroke="#5E3B22" strokeWidth="3">
            <path d="M0 420 h800M0 480 h800M0 540 h800" />
          </g>
          {/* big brass basin of mango pieces */}
          <ellipse cx="400" cy="392" rx="212" ry="66" fill="#9C6B3E" />
          <ellipse cx="400" cy="380" rx="200" ry="60" fill="#C98F4E" />
          <ellipse cx="400" cy="374" rx="180" ry="50" fill="#E8A317" />
          {[...Array(16)].map((_, i) => (
            <rect
              key={i}
              x={250 + (i % 8) * 42}
              y={352 + Math.floor(i / 8) * 26}
              width="30"
              height="22"
              rx="6"
              fill={i % 3 === 0 ? "#FFD07A" : i % 3 === 1 ? "#F2B62E" : "#C25A22"}
              transform={`rotate(${(i * 37) % 40 - 20} ${265 + (i % 8) * 42} ${363 + Math.floor(i / 8) * 26})`}
            />
          ))}
          <Hands x={400} y={300} s={1.15} />
          <Jar x={706} y={276} s={0.9} />
          <Mango x={92} y={392} s={0.85} r={-12} />
        </>
      );

    case "kairi":
      return (
        <>
          <Sky from="#EFEAD2" to="#D8DCAE" />
          <rect y="400" width="800" height="200" fill="#8A5A36" />
          <ellipse cx="400" cy="404" rx="300" ry="52" fill="#6B4E3D" opacity="0.35" />
          <Mango x={250} y={368} s={1.5} r={-14} />
          <Mango x={412} y={392} s={1.7} r={6} />
          <Mango x={566} y={362} s={1.4} r={18} />
          <Mango x={330} y={300} s={1.15} r={-4} />
          <Mango x={492} y={296} s={1.05} r={12} />
          {/* a cut half showing the pale flesh */}
          <g transform="translate(148 400) rotate(-8)">
            <ellipse rx="46" ry="36" fill="#8FA14B" />
            <ellipse rx="38" ry="29" fill="#F3EBBF" />
            <ellipse rx="12" ry="20" fill="#DCD08A" />
          </g>
        </>
      );

    case "spices":
      return (
        <>
          <Sky from="#F0DCB4" to="#DDB483" />
          <rect y="330" width="800" height="270" fill="#7A4E2E" />
          <rect y="330" width="800" height="12" fill="#96603A" />
          <SpiceBowl x={180} y={430} s={1.25} fill="#B4261A" />
          <SpiceBowl x={400} y={468} s={1.45} fill="#D99A0B" />
          <SpiceBowl x={624} y={430} s={1.25} fill="#6B4E3D" />
          <SpiceBowl x={290} y={366} s={0.95} fill="#7C8C3C" />
          <SpiceBowl x={520} y={366} s={0.95} fill="#8A3315" />
          {/* scattered mustard + fenugreek */}
          <g fill="#4A3A1E" opacity="0.6">
            {[...Array(22)].map((_, i) => (
              <circle key={i} cx={90 + ((i * 71) % 640)} cy={510 + ((i * 43) % 70)} r={i % 3 === 0 ? 4 : 3} />
            ))}
          </g>
        </>
      );

    case "mother":
      return (
        <>
          <Sky from="#F2DFC0" to="#DFBE92" />
          {/* window light */}
          <rect x="470" y="40" width="270" height="250" rx="10" fill="#FFF3D2" opacity="0.75" />
          <path d="M605 40 v250 M470 165 h270" stroke="#B98A55" strokeWidth="8" />
          <rect y="430" width="800" height="170" fill="#7A4E2E" />
          {/* figure at the counter */}
          <g transform="translate(300 240)">
            {/* saree drape */}
            <path d="M-120 190 q10 -150 96 -178 q92 24 100 178 z" fill="#A8401C" />
            <path d="M-24 12 q40 -12 68 26 q-12 90 -20 152 h-40 z" fill="#C25A22" opacity="0.85" />
            {/* head + hair */}
            <circle cx="-6" cy="-30" r="46" fill="#C08A5E" />
            <path d="M-52 -34 q6 -52 46 -52 q42 0 48 52 q-16 -26 -48 -26 q-32 0 -46 26z" fill="#33241C" />
            <path d="M-6 16 q-26 4 -34 -12 q34 10 68 0 q-10 16 -34 12z" fill="#33241C" opacity="0.5" />
          </g>
          {/* bowl she is working over */}
          <ellipse cx="470" cy="452" rx="128" ry="38" fill="#C98F4E" />
          <ellipse cx="470" cy="444" rx="114" ry="30" fill="#E8A317" />
          <Jar x={690} y={370} s={0.85} />
        </>
      );

    case "jars":
      return (
        <>
          <Sky from="#EFDCBE" to="#D9BC96" />
          {/* shelf */}
          <rect y="452" width="800" height="20" rx="4" fill="#8A5A36" />
          <rect y="472" width="800" height="128" fill="#C9A87C" opacity="0.35" />
          <Jar x={140} y={332} s={1.15} fill="#E8A317" />
          <Jar x={330} y={332} s={1.15} fill="#C97A16" />
          <Jar x={520} y={332} s={1.15} fill="#A8401C" />
          <Jar x={694} y={348} s={0.95} fill="#8FA14B" />
        </>
      );

    case "bhakri":
      return (
        <>
          <Sky from="#EADCC2" to="#CDB392" />
          <rect y="300" width="800" height="300" fill="#7A4E2E" />
          {/* steel thali */}
          <ellipse cx="400" cy="420" rx="300" ry="150" fill="#B8B4AC" />
          <ellipse cx="400" cy="412" rx="286" ry="142" fill="#DAD6CE" />
          <ellipse cx="400" cy="412" rx="262" ry="128" fill="#CFCAC1" />
          {/* bhakri */}
          <g transform="translate(330 398)">
            <ellipse rx="150" ry="104" fill="#E4D2A6" />
            <ellipse rx="150" ry="104" fill="#D8C08A" opacity="0.5" />
            {[...Array(10)].map((_, i) => (
              <ellipse
                key={i}
                cx={-90 + ((i * 53) % 180)}
                cy={-50 + ((i * 37) % 100)}
                rx={i % 2 ? 14 : 9}
                ry={i % 2 ? 9 : 7}
                fill="#A97F45"
                opacity="0.35"
              />
            ))}
          </g>
          {/* the loncha beside it — the hero pairing */}
          <g transform="translate(588 434)">
            <ellipse rx="86" ry="52" fill="#8A3315" opacity="0.25" />
            <ellipse rx="78" ry="45" fill="#A8401C" />
            {[...Array(7)].map((_, i) => (
              <rect
                key={i}
                x={-52 + i * 16}
                y={-16 + ((i * 11) % 22)}
                width="20"
                height="15"
                rx="4"
                fill={i % 2 ? "#E8A317" : "#F2B62E"}
                transform={`rotate(${(i * 29) % 50 - 25} ${-42 + i * 16} ${-8 + ((i * 11) % 22)})`}
              />
            ))}
          </g>
          {/* onion + green chilli, the way it is actually served */}
          <ellipse cx="400" cy="530" rx="34" ry="20" fill="#E7DCEA" />
          <path d="M452 522 q30 -12 54 4 q-28 12 -54 -4z" fill="#5C6B3C" />
        </>
      );

    case "kitchen":
      return (
        <>
          <Sky from="#F1DDBB" to="#D7B183" />
          <rect x="80" y="60" width="250" height="220" rx="8" fill="#FFF3D2" opacity="0.7" />
          <path d="M205 60 v220 M80 170 h250" stroke="#B98A55" strokeWidth="7" />
          <rect y="392" width="800" height="208" fill="#7A4E2E" />
          <rect y="392" width="800" height="14" fill="#96603A" />
          {/* hanging shelf of jars */}
          <rect x="420" y="180" width="360" height="14" rx="4" fill="#8A5A36" />
          <Jar x={492} y={92} s={0.7} fill="#E8A317" />
          <Jar x={604} y={92} s={0.7} fill="#A8401C" />
          <Jar x={714} y={92} s={0.7} fill="#C97A16" />
          {/* counter still life */}
          <SpiceBowl x={186} y={452} s={1.05} fill="#B4261A" />
          <SpiceBowl x={330} y={478} s={1.15} fill="#D99A0B" />
          <Mango x={520} y={452} s={1.05} r={-10} />
          <Mango x={612} y={470} s={0.9} r={14} />
          <Jar x={716} y={396} s={0.95} />
        </>
      );

    case "khandesh":
      return (
        <>
          <Sky from="#F6E3B8" to="#E0C58E" />
          {/* low hills */}
          <path d="M0 372 q150 -76 300 -20 q160 60 300 -26 q120 -50 200 -6 v280 H0z" fill="#9AA55E" opacity="0.55" />
          <path d="M0 430 q180 -56 340 -6 q170 52 460 -24 v200 H0z" fill="#7E8B47" opacity="0.7" />
          {/* fields */}
          <rect y="486" width="800" height="114" fill="#8A6A3A" />
          <g stroke="#6E5129" strokeWidth="3" opacity="0.5">
            {[...Array(9)].map((_, i) => (
              <path key={i} d={`M${-60 + i * 110} 600 L${120 + i * 76} 486`} />
            ))}
          </g>
          {/* mango tree */}
          <path d="M604 486 v-96" stroke="#6B4E3D" strokeWidth="16" strokeLinecap="round" />
          <circle cx="604" cy="352" r="78" fill="#5C6B3C" />
          <circle cx="556" cy="376" r="52" fill="#6E7F46" />
          <circle cx="652" cy="380" r="46" fill="#6E7F46" />
          <circle cx="580" cy="392" r="9" fill="#E8A317" />
          <circle cx="628" cy="378" r="8" fill="#E8A317" />
          <circle cx="606" cy="410" r="7" fill="#E8A317" />
          {/* distant home */}
          <path d="M150 486 v-52 h96 v52z" fill="#C9A87C" />
          <path d="M138 434 l60 -40 l60 40z" fill="#A8401C" />
        </>
      );

    case "cutting":
      return (
        <>
          <Sky from="#EFE0C4" to="#D5B98F" />
          <rect y="340" width="800" height="260" fill="#8A5A36" />
          {/* wooden board */}
          <rect x="150" y="356" width="500" height="180" rx="18" fill="#B98A55" />
          <rect x="150" y="356" width="500" height="14" rx="7" fill="#CDA070" />
          {/* cut kairi pieces in a row */}
          {[...Array(9)].map((_, i) => (
            <rect
              key={i}
              x={196 + i * 50}
              y={410 + ((i * 13) % 26)}
              width="38"
              height="30"
              rx="8"
              fill={i % 2 ? "#B7C56B" : "#8FA14B"}
              transform={`rotate(${(i * 31) % 30 - 15} ${215 + i * 50} ${425 + ((i * 13) % 26)})`}
            />
          ))}
          {/* vili / traditional blade */}
          <path d="M600 356 q78 -34 108 22 q-58 26 -108 -22z" fill="#B8B4AC" />
          <rect x="560" y="352" width="60" height="16" rx="8" fill="#6B4E3D" />
          <Hands x={330} y={286} s={0.78} />
        </>
      );

    case "mixing":
      return (
        <>
          <Sky from="#F0D7A6" to="#DBA96E" />
          <rect y="392" width="800" height="208" fill="#7A4E2E" />
          {/* wide mixing vessel */}
          <ellipse cx="400" cy="416" rx="256" ry="82" fill="#9C6B3E" />
          <ellipse cx="400" cy="402" rx="242" ry="74" fill="#C98F4E" />
          <ellipse cx="400" cy="396" rx="222" ry="64" fill="#A8401C" />
          {[...Array(22)].map((_, i) => (
            <rect
              key={i}
              x={210 + ((i * 67) % 380)}
              y={360 + ((i * 41) % 62)}
              width="30"
              height="23"
              rx="7"
              fill={i % 3 === 0 ? "#E8A317" : i % 3 === 1 ? "#F2B62E" : "#C25A22"}
              transform={`rotate(${(i * 53) % 60 - 30} ${225 + ((i * 67) % 380)} ${371 + ((i * 41) % 62)})`}
            />
          ))}
          <Hands x={400} y={306} s={1.05} />
        </>
      );

    case "packing":
      return (
        <>
          <Sky from="#EFE1C7" to="#D6BE99" />
          <rect y="404" width="800" height="196" fill="#7A4E2E" />
          <Jar x={250} y={288} s={1.2} fill="#E8A317" />
          <Jar x={430} y={288} s={1.2} fill="#C97A16" />
          {/* jar being closed by hands */}
          <Jar x={610} y={288} s={1.2} fill="#A8401C" />
          <Hands x={610} y={238} s={0.62} />
          {/* twine + tag */}
          <path d="M120 470 q40 -26 84 -6" stroke="#8A6A4F" strokeWidth="4" fill="none" />
          <rect x="96" y="452" width="44" height="30" rx="4" fill="#FDFAF4" transform="rotate(-12 118 467)" />
        </>
      );

    case "table":
      return (
        <>
          <Sky from="#EEDDC0" to="#CFB48E" />
          <rect y="270" width="800" height="330" fill="#7A4E2E" />
          <rect y="270" width="800" height="14" fill="#96603A" />
          {/* three thalis set for a family meal */}
          {[
            { cx: 190, cy: 400, r: 118 },
            { cx: 430, cy: 470, r: 138 },
            { cx: 654, cy: 392, r: 110 },
          ].map((t, i) => (
            <g key={i}>
              <ellipse cx={t.cx} cy={t.cy + 8} rx={t.r} ry={t.r * 0.5} fill="#B8B4AC" />
              <ellipse cx={t.cx} cy={t.cy} rx={t.r} ry={t.r * 0.5} fill="#DAD6CE" />
              <ellipse cx={t.cx - t.r * 0.2} cy={t.cy} rx={t.r * 0.52} ry={t.r * 0.28} fill="#E4D2A6" />
              <ellipse cx={t.cx + t.r * 0.45} cy={t.cy - t.r * 0.1} rx={t.r * 0.2} ry={t.r * 0.12} fill="#A8401C" />
              <ellipse cx={t.cx + t.r * 0.42} cy={t.cy + t.r * 0.2} rx={t.r * 0.2} ry={t.r * 0.12} fill="#D99A0B" />
            </g>
          ))}
          <Jar x={740} y={196} s={0.72} />
        </>
      );
  }
}

export default function Scene({ name, alt, className = "", children }: Props) {
  return (
    <div className={`relative overflow-hidden bg-ivory-100 ${className}`}>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={alt}
        data-photo-slot={name}
      >
        {scene(name)}
      </svg>
      {/* Film grain, so the scenes do not read as flat vector clip-art. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_TILE }}
      />
      {children}
    </div>
  );
}
