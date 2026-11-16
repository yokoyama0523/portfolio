import { Fragment } from "react";
import { Link } from "react-router";
import { paths } from "../content/paths";
import { shell } from "../content/shell";

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="bc" aria-label={shell.crumbs.label}>
      <Link to={paths.home}>{shell.crumbs.home}</Link>
      {items.map((item) => (
        <Fragment key={item.label}>
          <span>{shell.crumbs.separator}</span>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
