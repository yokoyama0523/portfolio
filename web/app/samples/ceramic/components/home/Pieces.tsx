import { Fragment } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { Reveal } from "~/samples/shared/Reveal";
import { useCart } from "../../cart/CartContext";
import { home } from "../../content/home";
import { FEW_STOCK, items, store } from "../../content/store";

const { pieces } = home;
const specs = ["maker", "size", "weight"] as const;

export function Pieces() {
  const { add } = useCart();
  return (
    <section className="sec" id={pieces.id}>
      <Reveal className="head">
        <h2>{pieces.title}</h2>
        <p>{pieces.text}</p>
      </Reveal>
      <div className="pieces">
        {pieces.order.map((id) => {
          const item = items[id];
          return (
            <Reveal key={id} as="article" className="piece">
              <Link className="pic" to={store.paths.item(id)}>
                <Img image={item.image} alt={pieces.alts[id] ?? item.name} />
                {item.stock <= FEW_STOCK && (
                  <span className="sold">{pieces.remaining(item.stock)}</span>
                )}
              </Link>
              <div className="info">
                <div className="col">
                  <div className="kan">{item.no}</div>
                  <h3 className="vt v">
                    {item.name}
                    <small className="latin">{item.en}</small>
                  </h3>
                </div>
                <div className="txt">
                  <p>{item.short}</p>
                  <dl>
                    {specs.map((key) => (
                      <Fragment key={key}>
                        <dt>{pieces.terms[key]}</dt>
                        <dd>{item[key]}</dd>
                      </Fragment>
                    ))}
                  </dl>
                  <div className="buy">
                    <div className="price">
                      {item.price.toLocaleString("ja-JP")}
                      <small className="tax">{pieces.taxIncluded}</small>
                    </div>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => add(id, 1, home.cart.added(item.name))}
                    >
                      {pieces.add}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
