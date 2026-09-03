import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell max-w-2xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 text-display">This shelf is empty.</h1>
        <p className="mt-5 text-lede text-ink-soft">
          Whatever you were looking for is not here. The jars, however, are exactly where we left
          them.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary">
            Shop Khandeshi Loncha
          </Link>
          <Link href="/" className="btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
