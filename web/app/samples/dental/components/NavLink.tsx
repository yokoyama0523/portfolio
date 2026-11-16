import { Link } from "react-router";
import type { NavItem } from "../content/chrome";

export function NavLink({ item, className }: { item: NavItem; className?: string }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  );
}
