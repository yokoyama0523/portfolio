import { Link } from "react-router";
import { company } from "../../content/company";
import { home } from "../../content/home";
import { Logo } from "./Logo";

export function Header({ solid }: { solid: boolean }) {
  return (
    <header className={solid ? "hd solid" : "hd"}>
      <Link className="logo" to={company.paths.home}>
        <Logo />
      </Link>
      <nav className="nav" aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link className="c" to={company.paths.quote}>
          {home.quoteLabel}
        </Link>
      </nav>
    </header>
  );
}
