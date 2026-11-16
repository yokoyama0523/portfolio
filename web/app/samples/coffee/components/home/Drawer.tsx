import { useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../../cart/CartContext";
import { home } from "../../content/home";
import { store, yen } from "../../content/store";

const text = home.drawer;

export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, totals, change } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        className={open ? "dim on" : "dim"}
        tabIndex={-1}
        aria-label={text.close}
        onClick={onClose}
      />
      <aside className={open ? "drawer on" : "drawer"} aria-label={text.label} inert={!open}>
        <h2>{text.title}</h2>
        <button type="button" className="x" onClick={onClose}>
          {text.close}
        </button>
        <div className="items">
          {lines.length === 0 && <div className="empty">{text.empty}</div>}
          {lines.map((line) => (
            <div key={line.id} className="it">
              <div>
                <b>{line.name}</b>
                <small>
                  {line.jp}　{store.bagSize}
                </small>
              </div>
              <div className="p">{yen(line.price * line.count)}</div>
              <div className="q">
                <button
                  type="button"
                  aria-label={text.decrease}
                  onClick={() => change(line.id, -1)}
                >
                  −
                </button>
                <span>{line.count}</span>
                <button type="button" aria-label={text.increase} onClick={() => change(line.id, 1)}>
                  ＋
                </button>
              </div>
              <div />
            </div>
          ))}
        </div>
        <div className="tt">
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
        <p className="note">{text.note}</p>
        <Link className={lines.length ? "go" : "go off"} to={store.paths.checkout}>
          {text.checkout}
        </Link>
      </aside>
    </>
  );
}
