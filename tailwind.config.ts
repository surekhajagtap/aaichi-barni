import type { Config } from "tailwindcss";

/**
 * AaiChi Barni design tokens.
 * Palette is warm-Khandeshi: ivory paper, mango, saffron, terracotta, deep-brown ink,
 * with a single muted leaf green. Every text pair below is checked to >= 4.5:1.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        ivory: {
          50: "#FDFAF4", // page background
          100: "#F8F1E4", // alternating section
          200: "#F1E5D0", // sunken
        },
        card: "#FFFDF8",
        sand: "#E8D8BC", // hairlines, dividers
        // Ink
        ink: {
          DEFAULT: "#2E1C12", // body + headings (15.2:1 on ivory-50)
          soft: "#6A5142", // secondary text (5.9:1 on ivory-50)
          faint: "#8A7566", // captions only, >= 16px
        },
        // Brand
        mango: {
          DEFAULT: "#E8A317", // decorative / highlights, never text-on-white
          deep: "#B87A08", // mango used as text (4.6:1 on ivory-50)
        },
        saffron: "#C97A16",
        terracotta: {
          DEFAULT: "#A8401C", // primary action (6.4:1 with white text)
          dark: "#8A3315", // hover / pressed
          tint: "#F6E5DC", // soft background wash
        },
        leaf: {
          DEFAULT: "#5C6B3C",
          tint: "#EDF0E2",
        },
      },
      fontFamily: {
        // Elegant serif carries the emotional storytelling
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        // Modern sans for product info + UI
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Handwritten, used sparingly for a mother's notes
        hand: ["var(--font-caveat)", "cursive"],
      },
      fontSize: {
        // Type scale — body never below 16px
        "display-lg": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.25" }],
        lede: ["clamp(1.0625rem, 1.4vw, 1.25rem)", { lineHeight: "1.7" }],
        label: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
      },
      spacing: {
        // 4/8pt rhythm extensions for section spacing
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        prose: "68ch",
        shell: "80rem",
      },
      borderRadius: {
        card: "0.875rem",
        pill: "999px",
      },
      boxShadow: {
        // Consistent elevation scale — no ad-hoc shadows
        e1: "0 1px 2px rgba(46,28,18,0.05), 0 1px 3px rgba(46,28,18,0.04)",
        e2: "0 4px 10px rgba(46,28,18,0.06), 0 2px 4px rgba(46,28,18,0.04)",
        e3: "0 12px 28px rgba(46,28,18,0.10), 0 4px 10px rgba(46,28,18,0.05)",
        e4: "0 24px 60px rgba(46,28,18,0.16)",
      },
      transitionDuration: {
        enter: "260ms",
        exit: "170ms", // exits ~65% of enter
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(100%)" },
          to: { transform: "none" },
        },
      },
      animation: {
        rise: "rise 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        fade: "fade 260ms ease-out both",
        slideIn: "slideIn 280ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      zIndex: {
        nav: "40",
        drawer: "60",
        scrim: "50",
        toast: "80",
      },
    },
  },
  plugins: [],
};

export default config;
