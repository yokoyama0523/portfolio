import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import type { Product } from "../../content/catalog";
import { itemPage as text } from "../../content/item";
import { paths } from "../../content/paths";
import { priceOf, yen } from "../../store/pricing";

export type Added = { colorIndex: number; size: string; quantity: number };

type Props = { product: Product; added: Added | null; open: boolean; onClose: () => void };

export function MiniCart({ product, added, open, onClose }: Props) {
  const variant = product.variants[added?.colorIndex ?? 0];
  return (
    <aside className={open ? "mini on" : "mini"} aria-label={text.mini.label} inert={!open}>
      <button type="button" className="x" onClick={onClose}>
        {text.mini.close}
      </button>
      <h2>{text.mini.title}</h2>
      {added && (
        <div className="it">
          <Img image={image(variant.images[0])} />
          <div>
            <b className="name">{product.name}</b>
            <br />
            {variant.color}　{added.size}　×{added.quantity}
            <br />
            {yen(priceOf(product) * added.quantity)}
          </div>
        </div>
      )}
      <div className="mini-actions">
        <Link className="btn" to={paths.cart}>
          {text.mini.cart}
        </Link>
        <button type="button" className="btn w" onClick={onClose}>
          {text.mini.keep}
        </button>
      </div>
    </aside>
  );
}
