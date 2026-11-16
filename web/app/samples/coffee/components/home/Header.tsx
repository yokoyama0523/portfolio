import { Link } from "react-router";
import { useCart } from "../../cart/CartContext";
import { home } from "../../content/home";
import { store } from "../../content/store";

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  return (
    <header className="hd">
      <Link className="logo" to={store.paths.home}>
        {store.name}
      </Link>
      <nav aria-label={home.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button type="button" className="cart" onClick={onOpenCart}>
        {home.cartLabel}
        <b className="count">{count}</b>
      </button>
    </header>
  );
}
