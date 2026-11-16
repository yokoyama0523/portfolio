import { Link } from "react-router";
import { home } from "../../content/home";
import { office } from "../../content/office";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={office.paths.home}>
        {office.name}
      </Link>
      <nav aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link className="c" to={office.paths.consult}>
          {home.consultLabel}
        </Link>
      </nav>
    </header>
  );
}
