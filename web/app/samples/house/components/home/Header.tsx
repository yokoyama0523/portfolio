import { Link } from "react-router";
import { builder } from "../../content/builder";
import { home } from "../../content/home";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={builder.paths.home}>
        {builder.name}
      </Link>
      <nav aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link className="c" to={builder.paths.openhouse}>
          {home.openhouseLabel}
        </Link>
      </nav>
    </header>
  );
}
