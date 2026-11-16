import { Img } from "~/samples/shared/Img";
import { image } from "../assets";
import { checkoutPage as text } from "../content/checkout";
import { priceOf, productById, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import type { Checkout } from "./useCheckout";

export function Summary({ form }: { form: Checkout }) {
  const { cart } = useShop();
  const t = form.totals;
  return (
    <aside className="sum">
      <h2>{text.summary.title(cart.count)}</h2>
      {cart.lines.map((line) => {
        const product = productById[line.id];
        const variant = product.variants.find((v) => v.color === line.color) ?? product.variants[0];
        return (
          <div key={`${line.id}|${line.color}|${line.size}`} className="it">
            <Img image={image(variant.images[0])} />
            <div>
              {product.name}
              <small>
                {line.color}／{line.size}　×{line.qty}
              </small>
            </div>
            <div>{yen(priceOf(product) * line.qty)}</div>
          </div>
        );
      })}
      <div className="row first">
        <span>{text.summary.subtotal}</span>
        <span>{yen(t.sub)}</span>
      </div>
      {t.discount > 0 && (
        <div className="row">
          <span>{text.summary.coupon(t.code)}</span>
          <span>−{yen(t.discount)}</span>
        </div>
      )}
      <div className="row">
        <span>{text.summary.shipping}</span>
        <span>{t.ship ? yen(t.ship) : text.summary.free}</span>
      </div>
      {t.cod > 0 && (
        <div className="row">
          <span>{text.summary.cod}</span>
          <span>{yen(t.cod)}</span>
        </div>
      )}
      {t.gift > 0 && (
        <div className="row">
          <span>{text.summary.gift}</span>
          <span>{yen(t.gift)}</span>
        </div>
      )}
      <div className="row t">
        <span>{text.summary.total}</span>
        <span>{yen(t.total)}</span>
      </div>
    </aside>
  );
}
