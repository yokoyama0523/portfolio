import { Link } from "react-router";
import { reserve } from "../content/reserve";
import { salon } from "../content/salon";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={salon.paths.home}>
        {salon.mark}
      </Link>
      <div className="tel">
        {reserve.telLabel}
        <b className="number">{salon.tel}</b>
      </div>
    </header>
  );
}
