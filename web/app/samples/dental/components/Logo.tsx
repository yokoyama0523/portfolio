import { Link } from "react-router";
import { header } from "../content/chrome";
import { clinic } from "../content/clinic";
import { WindowMark } from "./Icons";

export function Logo() {
  return (
    <Link className="logo" to={clinic.paths.home} aria-label={header.homeLabel}>
      <WindowMark />
      <span className="logo-text">
        <b>{clinic.name}</b>
        <small>{clinic.tagline}</small>
      </span>
    </Link>
  );
}
