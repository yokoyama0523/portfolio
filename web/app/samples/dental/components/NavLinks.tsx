import { Link } from "react-router";
import { type NavItem, nav } from "../content/chrome";
import { clinic } from "../content/clinic";

type Props = { onHome: boolean; onPick?: () => void };

function NavLink({ item, onHome, onPick }: Props & { item: NavItem }) {
  if (item.to) {
    return (
      <Link to={item.to} onClick={onPick}>
        {item.label}
      </Link>
    );
  }
  const id = item.id ?? "";
  if (onHome) {
    return (
      <a href={`#${id}`} onClick={onPick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link to={clinic.paths.section(id)} onClick={onPick}>
      {item.label}
    </Link>
  );
}

export function NavLinks({ onHome, onPick }: Props) {
  return (
    <ul>
      {nav.map((item) => (
        <li key={item.label}>
          <NavLink item={item} onHome={onHome} onPick={onPick} />
        </li>
      ))}
    </ul>
  );
}
