import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { nav, site } from "~/config";
import { layoutCopy } from "~/site/data/layout";
import { Logo } from "./Logo";

const SCROLLED_AT = 8;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-500 ease-out-soft md:px-12 ${
        scrolled ? "h-19 bg-white/90 shadow-hairline backdrop-blur-md" : "h-24"
      }`}
    >
      <Link to={site.paths.home} aria-label={layoutCopy.homeLabel}>
        <Logo adaptive={!scrolled} />
      </Link>
      <nav aria-label={layoutCopy.mainNavLabel} className="flex items-center gap-4 md:gap-10">
        {nav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={item.href === here ? "page" : undefined}
            className={`group relative hidden font-latin text-md leading-5 tracking-4 text-ink transition-colors duration-500 md:inline ${
              scrolled ? "" : "mv-dark:text-white"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 ease-out-soft group-hover:scale-100 in-current-page:scale-100 ${
                scrolled ? "" : "mv-dark:bg-white"
              }`}
              aria-hidden="true"
            />
          </Link>
        ))}
        <a
          href={site.crowdworks}
          target="_blank"
          rel="noopener"
          className={`grid place-items-center rounded-full bg-accent font-latin font-bold text-white transition-all duration-500 ease-out-soft hover:scale-105 ${
            scrolled
              ? "size-14 text-xs leading-label"
              : "size-14 text-xs leading-label md:size-18 md:text-sm mv-dark:bg-white mv-dark:text-charcoal"
          }`}
        >
          {layoutCopy.contact}
        </a>
      </nav>
    </header>
  );
}
