import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../assets";
import { type Product, swatchOf } from "../content/catalog";
import { paths } from "../content/paths";
import { shell } from "../content/shell";
import { yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import { productStock } from "../store/stock";
import { WishButton } from "./WishButton";

const text = shell.card;

export function ProductCard({ product }: { product: Product }) {
  const { stockOverrides } = useShop();
  const variant = product.variants[0];
  const left = productStock(stockOverrides, product);
  const tags = [
    product.sale ? { key: "sale", label: text.sale, className: "tag sale" } : null,
    product.isNew ? { key: "new", label: text.isNew, className: "tag" } : null,
    left === 0
      ? { key: "out", label: text.soldOut, className: "tag out" }
      : left <= text.fewAt
        ? { key: "few", label: text.few, className: "tag few" }
        : null,
  ].filter((tag) => tag !== null);
  return (
    <article className="card">
      <Link className="im" to={paths.item(product.id)}>
        <Img image={image(variant.images[0])} alt={`${product.name} ${variant.color}`} />
        {tags.map((tag) => (
          <i key={tag.key} className={tag.className}>
            {tag.label}
          </i>
        ))}
      </Link>
      <WishButton id={product.id} className="wish" />
      <div className="cl">
        {product.variants.slice(0, text.swatchLimit).map((item) => (
          <i key={item.color} style={{ background: swatchOf(item.color) }} title={item.color} />
        ))}
        {product.variants.length > text.swatchLimit && (
          <small>+{product.variants.length - text.swatchLimit}</small>
        )}
      </div>
      <Link className="nm" to={paths.item(product.id)}>
        {product.name}
      </Link>
      <div className="pr">
        {product.sale ? (
          <>
            <s>{yen(product.price)}</s> <b className="sale">{yen(product.sale)}</b>
          </>
        ) : (
          <b>{yen(product.price)}</b>
        )}
        <small>{text.taxIncluded}</small>
      </div>
    </article>
  );
}
