import { Link } from "react-router";
import { home } from "../../content/home";
import { store } from "../../content/store";
import { CartButton } from "../CartButton";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={store.paths.home}>
        {store.name}
        <small className="latin">{store.latin}</small>
      </Link>
      <nav aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <CartButton className="cart" />
    </header>
  );
}
