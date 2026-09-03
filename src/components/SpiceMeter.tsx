/**
 * Spice level never relies on colour alone — the filled count, the label
 * and the accessible text all carry the same meaning.
 */
export default function SpiceMeter({
  level,
  label,
  className = "",
}: {
  level: 1 | 2 | 3;
  label: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`h-1.5 w-5 rounded-full ${
              step <= level ? "bg-terracotta" : "bg-sand"
            }`}
          />
        ))}
      </span>
      <span className="text-sm text-ink-soft">
        <span className="sr-only">Spice level {level} of 3, </span>
        {label}
      </span>
    </span>
  );
}
