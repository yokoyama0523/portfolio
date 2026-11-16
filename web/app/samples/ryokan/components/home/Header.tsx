import { Link } from "react-router";
import { home } from "../../content/home";
import { inn } from "../../content/inn";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={inn.paths.home}>
        {inn.name}
        <small className="latin">{inn.latin}</small>
      </Link>
      <nav aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link className="bk" to={inn.paths.reserve}>
          {home.reserveLabel}
        </Link>
      </nav>
    </header>
  );
}
