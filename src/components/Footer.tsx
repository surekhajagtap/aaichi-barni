import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop/sweet-mango-loncha", label: "Sweet Mango Loncha" },
      { href: "/shop/medium-spicy-mango-loncha", label: "Medium Spicy Mango Loncha" },
      { href: "/shop/spicy-mango-loncha", label: "Spicy Mango Loncha" },
      { href: "/shop/upvas-mango-loncha", label: "Fasting / Upvas Loncha" },
    ],
  },
  {
    title: "The Brand",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/from-khandesh", label: "From Khandesh" },
      { href: "/how-its-made", label: "How It's Made" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-ivory-100">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-2 lg:max-w-sm">
          <span className="text-terracotta">
            <Logo />
          </span>
          <p className="mt-5 text-ink-soft">
            Homemade Khandeshi mango loncha, prepared by hand in small batches using a traditional
            family recipe.
          </p>
          <p className="note mt-5">A little extra love goes into every jar.</p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label font-medium uppercase tracking-[0.14em] text-ink-soft">
              {column.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] cursor-pointer items-center text-[0.9375rem] text-ink transition-colors duration-enter hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-sand">
        <div className="shell flex flex-col gap-3 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AaiChi Barni. Made in Khandesh, Maharashtra.</p>
          <p>Rooted in Khandesh. Made for everyone.</p>
        </div>
      </div>
    </footer>
  );
}
