import { Link, useLocation } from "react-router";
import { demoSwitch as text } from "../content/chrome";
import { clinic } from "../content/clinic";

export function DemoSwitch() {
  const { pathname } = useLocation();
  const trim = (path: string) => path.replace(/\/$/, "");
  const staff = trim(pathname).startsWith(trim(clinic.paths.admin));
  const items = [
    { to: clinic.paths.home, label: text.patient, active: !staff },
    { to: clinic.paths.admin, label: text.staff, active: staff },
  ];
  return (
    <nav className="demo-switch" aria-label={text.label}>
      {items.map((item) => (
        <Link key={item.label} to={item.to} aria-current={item.active ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
