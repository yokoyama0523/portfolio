import { Link } from "react-router";
import { subHeader } from "../../content/chrome";
import { clinic, reserveLabel } from "../../content/clinic";
import { CalendarIcon } from "../Icons";
import { Mark } from "../Mark";
import { NavLink } from "../NavLink";

export function Header() {
  return (
    <header className="hd">
      <div className="in">
        <Link className="logo" to={clinic.paths.home}>
          <Mark />
          <span>
            <b>{clinic.name}</b>
            <small>{clinic.latin}</small>
          </span>
        </Link>
        <nav className="nav" aria-label={subHeader.navLabel}>
          {subHeader.nav.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>
        <div className="cta">
          <div className="tel">
            <small>{subHeader.telLabel}</small>
            <b>{clinic.tel}</b>
          </div>
          <Link className="btn" to={clinic.paths.reserve}>
            <CalendarIcon />
            {reserveLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
