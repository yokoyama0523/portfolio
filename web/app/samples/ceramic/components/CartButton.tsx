import { useCart } from "../cart/CartContext";
import { home } from "../content/home";

export function CartButton({ className }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button type="button" className={className} onClick={() => setOpen(true)}>
      {home.cart.open(count)}
    </button>
  );
}
