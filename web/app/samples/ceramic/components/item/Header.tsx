import { Link } from "react-router";
import { itemPage } from "../../content/item";
import { store } from "../../content/store";
import { CartButton } from "../CartButton";

export function Header() {
  return (
    <header className="hd">
      <Link className="logo" to={store.paths.home}>
        {store.name}
      </Link>
      <nav aria-label={itemPage.navLabel}>
        {itemPage.nav.map((item) => (
          <Link key={item.href} to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <CartButton />
    </header>
  );
}
