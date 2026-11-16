import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { type ItemId, isItemId, items, store } from "../content/store";

export type Cart = Partial<Record<ItemId, number>>;

const read = (): Cart => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(store.cartKey) ?? "{}");
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([id, count]) => isItemId(id) && typeof count === "number" && count > 0,
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

const useCartState = () => {
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", stamp: 0 });
  useEffect(() => setCart(read()), []);

  const change = (id: ItemId, delta: number) =>
    setCart((current) => {
      const count = Math.min((current[id] ?? 0) + delta, items[id].stock);
      const next = { ...current, [id]: count };
      if (count <= 0) delete next[id];
      write(next);
      return next;
    });

  const add = (id: ItemId, count = 1, message = "") => {
    change(id, count);
    if (message) setToast({ message, stamp: Date.now() });
  };

  const clear = () => {
    write({});
    setCart({});
  };

  const lines = (Object.keys(cart) as ItemId[]).map((id) => ({
    id,
    ...items[id],
    count: cart[id] ?? 0,
  }));
  const count = lines.reduce((sum, line) => sum + line.count, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.count, 0);
  const shipping = subtotal === 0 || subtotal >= store.freeShippingFrom ? 0 : store.shipping;

  return {
    lines,
    count,
    totals: { subtotal, shipping, total: subtotal + shipping },
    change,
    add,
    clear,
    open,
    setOpen,
    toast,
  };
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
