import { useState } from "react";
import { Img } from "~/samples/shared/Img";
import { image } from "../assets";
import { StatusPill } from "../components/StatusPill";
import { accountPage } from "../content/account";
import { longDate } from "../store/dates";
import { productById, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import type { Order } from "../store/types";
import { useToast } from "../ui/ToastContext";

const text = accountPage.orders;

function OrderCard({ order }: { order: Order }) {
  const { orders } = useShop();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const cancel = () => {
    if (!window.confirm(text.cancelConfirm)) return;
    orders.cancel(order.no);
    toast(text.cancelled);
  };
  const a = order.addr;
  return (
    <div className={open ? "od open" : "od"}>
      <div className="h">
        <div>
          <b>{order.no}</b>　<span>{longDate(order.at)}</span>
        </div>
        <StatusPill status={order.status} />
      </div>
      {order.items.map((item) => {
        const product = productById[item.id];
        const variant =
          product?.variants.find((v) => v.color === item.color) ?? product?.variants[0];
        return (
          <div key={`${item.id}|${item.color}|${item.size}`} className="it">
            {variant ? <Img image={image(variant.images[0])} /> : <span />}
            <div>
              {product ? product.name : item.id}
              <small>
                {item.color}／{item.size}　×{item.qty}
              </small>
            </div>
            <div>{yen(item.price * item.qty)}</div>
          </div>
        );
      })}
      <div className="ft">
        <span>
          {text.total}
          <b className="medium">{yen(order.total)}</b>
          {text.shipping(order.ship ? ` ${yen(order.ship)}` : text.free)}
          {order.tracking && (
            <>
              {text.tracking}
              <b className="tracking">{order.tracking}</b>
            </>
          )}
        </span>
        <div className="btns">
          <button type="button" className="btn g sm" onClick={() => setOpen(!open)}>
            {text.detail}
          </button>
          {order.status === text.cancellable ? (
            <button type="button" className="btn g sm" onClick={cancel}>
              {text.cancel}
            </button>
          ) : text.returnable.includes(order.status) ? (
            <button type="button" className="btn g sm" onClick={() => toast(text.returned)}>
              {text.returnLabel}
            </button>
          ) : null}
        </div>
      </div>
      <div className="det">
        <b>{text.labels.address}</b>
        <span>
          {a.name}　〒{a.zip} {a.pref}
          {a.addr1} {a.addr2}
        </span>
        <b>{text.labels.delivery}</b>
        <span>
          {order.delivery.date === text.noDate ? text.noDate : longDate(order.delivery.date)}　
          {order.delivery.time}
        </span>
        <b>{text.labels.payment}</b>
        <span>{text.payNames[order.pay]}</span>
        <b>{text.labels.breakdown}</b>
        <span>
          {text.breakdown.sub}
          {yen(order.sub)}
          {order.discount > 0 && `${text.breakdown.coupon}${yen(order.discount)}`}
          {text.breakdown.ship}
          {yen(order.ship)}
          {order.cod > 0 && `${text.breakdown.cod}${yen(order.cod)}`}
          {order.gift > 0 && `${text.breakdown.gift}${yen(order.gift)}`}
        </span>
      </div>
    </div>
  );
}

export function OrderHistory({ email }: { email: string }) {
  const { orders } = useShop();
  const mine = orders.mine(email);
  if (mine.length === 0) return <div className="empty">{text.empty}</div>;
  return (
    <>
      {mine.map((order) => (
        <OrderCard key={order.no} order={order} />
      ))}
    </>
  );
}
