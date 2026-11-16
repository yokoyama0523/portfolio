import { Link } from "react-router";
import { clinic } from "../../content/clinic";
import { home } from "../../content/home";
import { Mark } from "../Mark";
import { NavLink } from "../NavLink";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={clinic.paths.home}>
        <Mark />
        {clinic.name}
      </Link>
      <nav className="nav" aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
        <Link className="bk" to={clinic.paths.reserve}>
          {home.reserveLabel}
        </Link>
      </nav>
    </header>
  );
}
