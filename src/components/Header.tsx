"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { BagIcon, CloseIcon, MenuIcon } from "./icons";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/from-khandesh", label: "From Khandesh" },
  { href: "/how-its-made", label: "How It's Made" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, openCart, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-terracotta focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>

      {/* A small line from the kitchen, above everything else */}
      <div className="bg-terracotta text-center text-[0.8125rem] text-white">
        <p className="px-4 py-2">
          Made today, just like at home &nbsp;·&nbsp; Free delivery on orders above &#8377;999
        </p>
      </div>

      <header
        className={`sticky top-0 z-nav border-b transition-[background-color,border-color,box-shadow] duration-enter ease-out ${
          scrolled
            ? "border-sand bg-ivory-50/95 shadow-e1 backdrop-blur-md"
            : "border-transparent bg-ivory-50"
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between gap-4" aria-label="Main">
          <Link
            href="/"
            className="inline-flex min-h-[44px] cursor-pointer items-center text-terracotta transition-opacity duration-enter hover:opacity-80"
          >
            <Logo />
            <span className="sr-only">AaiChi Barni — home</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative inline-flex min-h-[44px] cursor-pointer items-center rounded-lg px-3.5 text-[0.9375rem] transition-colors duration-enter ease-out ${
                    isActive(item.href)
                      ? "font-medium text-terracotta"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3.5 bottom-2 h-0.5 rounded-full bg-terracotta" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link href="/shop" className="btn-primary hidden h-11 sm:inline-flex">
              Shop Now
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors duration-enter hover:bg-ivory-100"
              aria-label={`Cart, ${ready ? count : 0} ${count === 1 ? "item" : "items"}`}
            >
              <BagIcon />
              {ready && count > 0 && (
                <span className="tabular absolute right-1 top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-semibold leading-none text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors duration-enter hover:bg-ivory-100 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-drawer lg:hidden">
          <button
            type="button"
            className="absolute inset-0 animate-fade cursor-default bg-ink/50"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm animate-slideIn flex-col bg-ivory-50 shadow-e4">
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-sand px-5">
              <span className="font-serif text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink hover:bg-ivory-100"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-[52px] cursor-pointer items-center rounded-lg px-4 text-base transition-colors duration-enter ${
                      isActive(item.href)
                        ? "bg-terracotta-tint font-medium text-terracotta"
                        : "text-ink hover:bg-ivory-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="shrink-0 border-t border-sand p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link href="/shop" className="btn-primary w-full">
                Shop Khandeshi Loncha
              </Link>
              <p className="note mt-4 text-center">From our kitchen to your table.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
