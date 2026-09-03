export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        {/* A jar — the barni the brand is named for */}
        <rect x="12" y="4" width="16" height="4" rx="1.6" fill="currentColor" />
        <path
          d="M11 9h18v20a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5V9Z"
          fill="currentColor"
          opacity="0.16"
        />
        <path
          d="M11 9h18v20a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5V9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <path d="M14 18h12v11a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V18Z" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.3125rem] font-semibold tracking-tight">
          AaiChi Barni
        </span>
        <span className="mt-1 text-[0.625rem] uppercase tracking-[0.22em] text-ink-soft">
          Khandeshi Loncha
        </span>
      </span>
    </span>
  );
}
