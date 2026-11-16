import { Link } from "react-router";
import { categories, shop } from "../content/catalog";
import { paths } from "../content/paths";
import { shell } from "../content/shell";

const { footer } = shell;

export function Footer() {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div>
          <div className="logo">{shop.name}</div>
          <p>{shop.tagline}</p>
          <p className="sm">{footer.address}</p>
        </div>
        <div>
          <h3>{footer.shopping}</h3>
          {categories.map((category) => (
            <Link key={category.id} to={paths.list(`cat=${category.id}`)}>
              {category.name}
            </Link>
          ))}
          <Link to={paths.list("sale=1")}>{footer.sale}</Link>
        </div>
        <div>
          <h3>{footer.guide.title}</h3>
          {footer.guide.links.map((link) => (
            <Link key={link.hash} to={paths.guide(link.hash)}>
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{footer.account.title}</h3>
          {footer.account.links.map((link) => (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="copy">
        <span>{footer.copy}</span>
        <span>{footer.photos}</span>
      </div>
    </footer>
  );
}
