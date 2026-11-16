import { useState } from "react";
import { useCart } from "../../cart/CartContext";
import { home } from "../../content/home";
import { itemPage } from "../../content/item";
import { type ItemId, items } from "../../content/store";

export function Purchase({ id }: { id: ItemId }) {
  const item = items[id];
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const clamp = (value: number) => Math.min(Math.max(value, 1), item.stock);
  return (
    <div className="buy">
      <div className="qty">
        <button
          type="button"
          className="step"
          aria-label={itemPage.decrease}
          onClick={() => setQuantity(clamp(quantity - 1))}
        >
          −
        </button>
        <input
          type="number"
          aria-label={itemPage.quantityLabel}
          min={1}
          max={item.stock}
          value={quantity}
          onChange={(event) => setQuantity(clamp(Number(event.target.value) || 1))}
        />
        <button
          type="button"
          className="step"
          aria-label={itemPage.increase}
          onClick={() => setQuantity(clamp(quantity + 1))}
        >
          ＋
        </button>
      </div>
      <button
        type="button"
        className="add"
        onClick={() => add(id, quantity, home.cart.added(item.name))}
      >
        {itemPage.add}
      </button>
    </div>
  );
}
