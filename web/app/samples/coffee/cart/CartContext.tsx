import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { isProductId, type ProductId, products, store } from "../content/store";

export type Cart = Partial<Record<ProductId, number>>;

const read = (): Cart => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(store.cartKey) ?? "{}");
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([id, count]) => isProductId(id) && typeof count === "number" && count > 0,
      ),
    );
  } catch {
    return {};
  }
};

const write = (cart: Cart) => {
  try {
    window.localStorage.setItem(store.cartKey, JSON.stringify(cart));
  } catch {
    return;
  }
};

export const cartTotals = (cart: Cart) => {
  const subtotal = Object.entries(cart).reduce(
    (sum, [id, count]) => sum + products[id as ProductId].price * (count ?? 0),
    0,
  );
  const shipping = subtotal === 0 || subtotal >= store.freeShippingFrom ? 0 : store.shipping;
  return { subtotal, shipping, total: subtotal + shipping };
};

const useCartState = () => {
  const [cart, setCart] = useState<Cart>({});
  useEffect(() => setCart(read()), []);

  const change = (id: ProductId, delta: number) =>
    setCart((current) => {
      const count = (current[id] ?? 0) + delta;
      const next = { ...current, [id]: count };
      if (count <= 0) delete next[id];
      write(next);
      return next;
    });

  const clear = () => {
    write({});
    setCart({});
  };

  const lines = (Object.keys(cart) as ProductId[]).map((id) => ({
    id,
    ...products[id],
    count: cart[id] ?? 0,
  }));
  const count = lines.reduce((sum, line) => sum + line.count, 0);

  return { cart, lines, count, totals: cartTotals(cart), change, clear };
};

type CartValue = ReturnType<typeof useCartState>;

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContext value={useCartState()}>{children}</CartContext>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
