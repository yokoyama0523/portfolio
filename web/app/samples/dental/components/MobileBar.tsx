import { Link } from "react-router";
import { mobileBar } from "../content/chrome";
import { clinic } from "../content/clinic";
import { CalendarIcon, PhoneIcon, PinIcon } from "./Icons";

export function MobileBar({ onHome }: { onHome: boolean }) {
  return (
    <nav className="bar" aria-label={mobileBar.label}>
      <a href={clinic.telHref}>
        <PhoneIcon />
        {mobileBar.tel}
      </a>
      <Link className="y" to={clinic.paths.reserve}>
        <CalendarIcon />
        {mobileBar.reserve}
      </Link>
      {onHome ? (
        <a href="#access">
          <PinIcon />
          {mobileBar.access}
        </a>
      ) : (
        <Link to={clinic.paths.section("access")}>
          <PinIcon />
          {mobileBar.access}
        </Link>
      )}
    </nav>
  );
}
