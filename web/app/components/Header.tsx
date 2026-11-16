import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { site } from "~/site";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-500 ease-out-soft md:px-12 ${
        scrolled
          ? "h-[76px] bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "h-24"
      }`}
    >
      <a href="/" aria-label="Saku² トップ">
        <Logo adaptive={!scrolled} />
      </a>
      <nav aria-label="メインメニュー" className="flex items-center gap-4 md:gap-10">
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={item.href === here ? "page" : undefined}
            className={`group relative hidden font-latin text-sm tracking-[0.04em] text-ink transition-colors duration-500 md:inline ${
              scrolled ? "" : "[[data-mv=dark]_&]:text-white"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 ease-out-soft group-hover:scale-100 group-aria-[current=page]:scale-100 ${
                scrolled ? "" : "[[data-mv=dark]_&]:bg-white"
              }`}
              aria-hidden="true"
            />
          </a>
        ))}
        <a
          href={site.crowdworks}
          target="_blank"
          rel="noopener"
          className={`grid place-items-center rounded-full bg-accent font-latin text-white transition-all duration-500 ease-out-soft hover:scale-105 ${
            scrolled
              ? "size-14 text-xs"
              : "size-14 text-xs md:size-[72px] md:text-[13px] [[data-mv=dark]_&]:bg-white [[data-mv=dark]_&]:text-[#333]"
          }`}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
