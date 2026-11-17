import { useEffect, useState } from "react";
import { Link } from "react-router";
import { header } from "../content/chrome";
import { clinic } from "../content/clinic";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Header({ onHome }: { onHome: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={open ? "hd open" : "hd"}>
      <Logo />
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="dental-nav"
        aria-label={open ? header.menuClose : header.menuOpen}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <nav id="dental-nav" className="gnav" aria-label={header.menu}>
        <NavLinks onHome={onHome} onPick={() => setOpen(false)} />
        <div className="gnav-tel">
          <small>{header.telLabel}</small>
          <a href={clinic.telHref}>{clinic.tel}</a>
        </div>
        <Link className="btn" to={clinic.paths.reserve}>
          {header.reserve}
        </Link>
      </nav>
    </header>
  );
}
