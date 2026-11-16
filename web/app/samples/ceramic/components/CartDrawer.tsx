import { useEffect } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { Toast } from "~/samples/shared/Toast";
import { useCart } from "../cart/CartContext";
import { home } from "../content/home";
import { store, yen } from "../content/store";
import "../styles/cart.css";

const text = home.cart;

export function CartDrawer() {
  const { lines, totals, change, open, setOpen, toast } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <>
      <button
        type="button"
        className={open ? "cdim on" : "cdim"}
        tabIndex={-1}
        aria-label={text.close}
        onClick={() => setOpen(false)}
      />
      <aside className={open ? "cdrawer on" : "cdrawer"} aria-label={text.label} inert={!open}>
        <h2>{text.title}</h2>
        <button type="button" className="cx" onClick={() => setOpen(false)}>
          {text.close}
        </button>
        <div className="citems">
          {lines.length === 0 && <div className="cempty">{text.empty}</div>}
          {lines.map((line) => (
            <div key={line.id} className="cit">
              <Link to={store.paths.item(line.id)} className="cim" onClick={() => setOpen(false)}>
                <Img image={line.image} />
              </Link>
              <div>
                <b className="cname">{line.name}</b>
                <small className="cmaker">{line.maker}</small>
                <div className="cq">
                  <button
                    type="button"
                    aria-label={text.decrease}
                    onClick={() => change(line.id, -1)}
                  >
                    −
                  </button>
                  <span>{line.count}</span>
                  <button
                    type="button"
                    aria-label={text.increase}
                    disabled={line.count >= line.stock}
                    onClick={() => change(line.id, 1)}
                  >
                    ＋
                  </button>
                </div>
              </div>
              <div className="cp">{yen(line.price * line.count)}</div>
            </div>
          ))}
        </div>
        <div className="ctt">
          {lines.length > 0 && (
            <>
              <div>
                <span>{text.subtotal}</span>
                <span>{yen(totals.subtotal)}</span>
              </div>
              <div>
                <span>{text.shipping}</span>
                <span>{totals.shipping ? yen(totals.shipping) : text.free}</span>
              </div>
              <div className="g">
                <span>{text.total}</span>
                <span>{yen(totals.total)}</span>
              </div>
            </>
          )}
        </div>
        <p className="cnote">{text.note}</p>
        <Link
          className={lines.length ? "cgo" : "cgo off"}
          to={store.paths.checkout}
          onClick={() => setOpen(false)}
        >
          {text.checkout}
        </Link>
      </aside>
      <Toast message={toast.message} stamp={toast.stamp} className="ctoast" />
    </>
  );
}
