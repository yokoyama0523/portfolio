import { Link } from "react-router";
import { reserveTab } from "../content/chrome";
import { clinic } from "../content/clinic";
import { CalendarIcon } from "./Icons";

export function ReserveTab() {
  return (
    <Link className="rtab" to={clinic.paths.reserve}>
      <CalendarIcon />
      <span>{reserveTab.label}</span>
      <small>
        <span className="tcy">{reserveTab.hours}</span>
        {reserveTab.note}
      </small>
    </Link>
  );
}
