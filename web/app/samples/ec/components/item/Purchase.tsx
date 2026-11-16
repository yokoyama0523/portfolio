import { type Product, swatchOf } from "../../content/catalog";
import { itemPage as text } from "../../content/item";
import { useShop } from "../../store/ShopContext";

type Props = {
  product: Product;
  colorIndex: number;
  size: string | null;
  quantity: number;
  soldOutNotice: boolean;
  onColor: (index: number) => void;
  onSize: (size: string) => void;
  onQuantity: (quantity: number) => void;
  onSoldOut: () => void;
  onAdd: () => void;
  onGuide: () => void;
};

export function Purchase(props: Props) {
  const { product, colorIndex, size, quantity } = props;
  const { stock } = useShop();
  const color = product.variants[colorIndex].color;
  const left = size ? stock(product.id, color, size) : null;
  const status = props.soldOutNotice
    ? { className: "stk few", text: text.soldOutSize }
    : left === null
      ? { className: "stk", text: text.pickSize }
      : left <= text.fewAt
        ? { className: "stk few", text: text.few(left) }
        : { className: "stk ok", text: text.inStock };
  const clamp = (value: number) => Math.min(text.maxQuantity, Math.max(1, value));
  return (
    <>
      <div className="lb">
        {text.colorLabel}
        <b>{color}</b>
      </div>
      <fieldset className="sw" aria-label={text.colorLabel}>
        {product.variants.map((variant, i) => (
          <button
            key={variant.color}
            type="button"
            aria-pressed={i === colorIndex}
            aria-label={variant.color}
            className={i === colorIndex ? "on" : undefined}
            style={{ background: swatchOf(variant.color), backgroundClip: "content-box" }}
            title={variant.color}
            onClick={() => props.onColor(i)}
          />
        ))}
      </fieldset>
      <div className="lb">
        {text.sizeLabel}
        <b>{size ?? ""}</b>
      </div>
      <fieldset className="sz" aria-label={text.sizeLabel}>
        {product.sizes.map((option) => {
          const n = stock(product.id, color, option);
          const classes = [option === size ? "on" : "", n === 0 ? "out" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={option}
              type="button"
              aria-pressed={option === size}
              aria-disabled={n === 0 || undefined}
              className={classes || undefined}
              onClick={() => (n === 0 ? props.onSoldOut() : props.onSize(option))}
            >
              {option}
              {n > 0 && n <= text.fewAt && <small>{text.fewBadge(n)}</small>}
            </button>
          );
        })}
      </fieldset>
      <button type="button" className="guide" onClick={props.onGuide}>
        {text.sizeGuide}
      </button>
      <div className={status.className}>{status.text}</div>
      <div className="act">
        <div className="qty">
          <button
            type="button"
            aria-label={text.decrease}
            onClick={() => props.onQuantity(clamp(quantity - 1))}
          >
            −
          </button>
          <input
            type="text"
            inputMode="numeric"
            aria-label={text.quantity}
            value={quantity}
            onChange={(event) => props.onQuantity(clamp(Number(event.target.value) || 1))}
          />
          <button
            type="button"
            aria-label={text.increase}
            onClick={() => props.onQuantity(clamp(quantity + 1))}
          >
            ＋
          </button>
        </div>
        <button type="button" className="btn" disabled={!(size && left)} onClick={props.onAdd}>
          {size && left === 0 ? text.soldOut : text.add}
        </button>
      </div>
    </>
  );
}
