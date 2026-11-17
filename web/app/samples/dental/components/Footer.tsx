import { Link } from "react-router";
import { adminPage } from "../content/admin";
import { footer } from "../content/chrome";
import { clinic, reserveLabel } from "../content/clinic";
import { Address } from "./Address";
import { HoursNotes, HoursTable } from "./HoursTable";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Footer({ onHome }: { onHome: boolean }) {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-about">
          <Logo />
          <p>
            <Address withZip />
            <br />
            {clinic.station}
          </p>
          <p className="ft-tel">
            <small>{footer.telLabel}</small>
            <a href={clinic.telHref}>{clinic.tel}</a>
          </p>
          <Link className="btn" to={clinic.paths.reserve}>
            {reserveLabel}
          </Link>
        </div>
        <div className="ft-hours">
          <HoursTable caption={footer.hoursTitle} />
          <HoursNotes />
        </div>
        <nav className="ft-nav" aria-label={footer.menuTitle}>
          <NavLinks onHome={onHome} />
        </nav>
      </div>
      <div className="ft-bottom">
        <div>
          <p>{footer.note}</p>
          <p className="ft-links">
            <Link to={clinic.paths.admin}>{adminPage.footerLink}</Link>
            <small>{clinic.copyright}</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
