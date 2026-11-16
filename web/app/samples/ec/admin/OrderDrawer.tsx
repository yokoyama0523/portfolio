import { useEffect } from "react";
import { Img } from "~/samples/shared/Img";
import { image } from "../assets";
import { StatusPill } from "../components/StatusPill";
import { adminPage } from "../content/admin";
import { productById, yen } from "../store/pricing";
import type { Order } from "../store/types";
import { timeStamp } from "./stats";

const text = adminPage.detail;

function Detail({ order }: { order: Order }) {
  const a = order.addr;
  return (
    <>
      <h2>{order.no}</h2>
      <dl>
        <dt>{text.at}</dt>
        <dd>{timeStamp(order.at)}</dd>
        <dt>{text.status}</dt>
        <dd>
          <StatusPill status={order.status} />
        </dd>
        <dt>{text.name}</dt>
        <dd>{order.name}</dd>
        <dt>{text.email}</dt>
        <dd>{order.email}</dd>
        <dt>{text.address}</dt>
        <dd>
          〒{a.zip} {a.pref}
          {a.addr1} {a.addr2}
          <br />
          {a.tel}
        </dd>
        <dt>{text.delivery}</dt>
        <dd>
          {order.delivery.date}　{order.delivery.time}
          {order.gift > 0 && text.gift}
        </dd>
        <dt>{text.payment}</dt>
        <dd>{adminPage.payShort[order.pay]}</dd>
        <dt>{text.tracking}</dt>
        <dd>{order.tracking || text.none}</dd>
      </dl>
      <div className="items">
        {order.items.map((item) => {
          const product = productById[item.id];
          const variant =
            product?.variants.find((v) => v.color === item.color) ?? product?.variants[0];
          return (
            <div key={`${item.id}|${item.color}|${item.size}`} className="it">
              {variant ? <Img image={image(variant.images[0])} /> : <span />}
              <div>
                {product?.name ?? item.id}
                <br />
                <span className="note">
                  {item.color}／{item.size}　×{item.qty}
                </span>
              </div>
              <div>{yen(item.price * item.qty)}</div>
            </div>
          );
        })}
      </div>
      <dl className="totals">
        <dt>{text.sub}</dt>
        <dd>{yen(order.sub)}</dd>
        {order.discount > 0 && (
          <>
            <dt>{text.coupon}</dt>
            <dd>
              −{yen(order.discount)}（{order.coupon ?? ""}）
            </dd>
          </>
        )}
        <dt>{text.ship}</dt>
        <dd>{yen(order.ship)}</dd>
        {order.cod > 0 && (
          <>
            <dt>{text.cod}</dt>
            <dd>{yen(order.cod)}</dd>
          </>
        )}
        {order.gift > 0 && (
          <>
            <dt>{text.wrap}</dt>
            <dd>{yen(order.gift)}</dd>
          </>
        )}
        <dt>
          <b>{text.total}</b>
        </dt>
        <dd>
          <b className="medium">{yen(order.total)}</b>
        </dd>
      </dl>
    </>
  );
}

type Props = { order: Order | null; open: boolean; onClose: () => void };

export function OrderDrawer({ order, open, onClose }: Props) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <aside className={open ? "dt on" : "dt"} aria-label={text.label} aria-hidden={!open}>
      <button type="button" className="x" onClick={onClose}>
        {text.close}
      </button>
      {order && <Detail order={order} />}
    </aside>
  );
}
