import { Link } from "react-router";
import { home } from "../../content/home";
import { salon } from "../../content/salon";

export function Header() {
  return (
    <>
      <header className="hd">
        <Link className="logo" to={salon.paths.home}>
          {salon.mark}
        </Link>
        <nav aria-label={home.navLabel}>
          {home.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <div className="book">
        <a className="tel" href={salon.telHref}>
          {salon.tel}
        </a>
        <Link to={salon.paths.reserve}>{home.bookLabel}</Link>
      </div>
    </>
  );
}
