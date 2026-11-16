import { useState } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { sampleMeta } from "~/samples/shared/meta";
import { image } from "../assets";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { cartPage as text } from "../content/cart";
import { paths } from "../content/paths";
import { priceOf, productById, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import "../styles/cart.css";

export const meta = () => sampleMeta("ec", text.meta);

const PERCENT = 100;

export default function EcCart() {
  const { cart, stock, settings, recent } = useShop();
  const [code, setCode] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const totals = cart.totals();
  const afterDiscount = totals.sub - totals.discount;
  const rest = Math.max(0, settings.freeShippingFrom - afterDiscount);
  const progress = Math.min(
    PERCENT,
    Math.round((afterDiscount / settings.freeShippingFrom) * PERCENT),
  );

  const applyCoupon = () => {
    const entered = (code ?? cart.coupon).trim().toUpperCase();
    if (!entered || settings.coupons[entered]) {
      cart.setCoupon(entered);
      setInvalid(false);
      return;
    }
    setInvalid(true);
  };

  return (
    <>
      <Header />
      <main className="wrap">
        <Breadcrumb items={[{ label: text.title }]} />
        <h1 className="ttl">{text.title}</h1>
        <div className="lay">
          <div>
            {cart.lines.map((line, i) => {
              const product = productById[line.id];
              const variant =
                product.variants.find((v) => v.color === line.color) ?? product.variants[0];
              const left = stock(line.id, line.color, line.size);
              return (
                <div key={`${line.id}|${line.color}|${line.size}`} className="it">
                  <Link to={paths.item(product.id, line.color)}>
                    <Img image={image(variant.images[0])} />
                  </Link>
                  <div>
                    <Link className="nm" to={paths.item(product.id)}>
                      {product.name}
                    </Link>
                    <div className="va">
                      {text.variant(line.color, line.size, yen(priceOf(product)))}
                    </div>
                    <span className="q">
                      <button
                        type="button"
                        aria-label={text.decrease}
                        onClick={() =>
                          line.qty <= 1 ? cart.remove(i) : cart.update(i, line.qty - 1)
                        }
                      >
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button
                        type="button"
                        aria-label={text.increase}
                        onClick={() => cart.update(i, line.qty + 1)}
                      >
                        ＋
                      </button>
                    </span>
                    <button type="button" className="rm" onClick={() => cart.remove(i)}>
                      {text.remove}
                    </button>
                    {left < line.qty ? (
                      <div className="warn">{text.fixed(left)}</div>
                    ) : left <= text.fewAt ? (
                      <div className="warn">{text.few(left)}</div>
                    ) : null}
                  </div>
                  <div className="pr">
                    {yen(priceOf(product) * line.qty)}
                    <small>{text.taxIncluded}</small>
                  </div>
                </div>
              );
            })}
            {cart.lines.length === 0 && (
              <div className="empty">
                {text.empty[0]}
                <br />
                <Link className="btn g sm empty-link" to={paths.list("new=1")}>
                  {text.emptyLink}
                </Link>
              </div>
            )}
          </div>
          {cart.lines.length > 0 && (
            <aside className="sum">
              <h2>{text.summaryTitle}</h2>
              <div className="row">
                <span>{text.subtotal(cart.count)}</span>
                <span>{yen(totals.sub)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="row">
                  <span>{text.coupon(totals.code)}</span>
                  <span className="off">−{yen(totals.discount)}</span>
                </div>
              )}
              <div className="row">
                <span>{text.shipping}</span>
                <span>{totals.ship ? yen(totals.ship) : text.free}</span>
              </div>
              <div className="row t">
                <span>{text.total}</span>
                <span>{yen(totals.total)}</span>
              </div>
              <div className="free">
                {rest > 0 ? (
                  <>
                    {text.remaining.before}
                    <b>{yen(rest)}</b>
                    {text.remaining.after}
                  </>
                ) : (
                  <>
                    <b>{text.qualified.strong}</b>
                    {text.qualified.after}
                  </>
                )}
              </div>
              <div className="bar">
                <i style={{ width: `${progress}%` }} />
              </div>
              <div className="cp">
                <input
                  type="text"
                  placeholder={text.couponPlaceholder}
                  aria-label={text.couponPlaceholder}
                  value={code ?? cart.coupon}
                  onChange={(event) => setCode(event.target.value)}
                />
                <button type="button" className="btn w sm" onClick={applyCoupon}>
                  {text.apply}
                </button>
              </div>
              <div className="msg">
                {invalid ? (
                  <span className="ng">{text.invalid}</span>
                ) : totals.code ? (
                  <span className="ok">{text.applied(settings.coupons[totals.code].label)}</span>
                ) : null}
              </div>
              <Link className="btn full" to={paths.checkout}>
                {text.checkout}
              </Link>
              <p className="note methods">{text.methods}</p>
            </aside>
          )}
        </div>
        {recent.length > 0 && (
          <section className="sec">
            <div className="h">
              <h2 className="small-title">{text.recentTitle}</h2>
            </div>
            <div className="grid">
              {recent.slice(0, text.recentCount).map((id) => (
                <ProductCard key={id} product={productById[id]} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
