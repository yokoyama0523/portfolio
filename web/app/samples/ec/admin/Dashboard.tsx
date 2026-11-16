import { useEffect, useState } from "react";
import { Link } from "react-router";
import { StatusPill } from "../components/StatusPill";
import { adminPage } from "../content/admin";
import { orderStatus } from "../content/orderStatus";
import { yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import { productStock } from "../store/stock";
import { SalesChart } from "./SalesChart";
import { bestSellers, dailySales, kpis, lowStockCount, newestFirst } from "./stats";

const text = adminPage.dash;
const c = text.columns;

type Props = { now: Date; onOpen: (no: string) => void };

export function Dashboard({ onOpen }: { onOpen: (no: string) => void }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  return now ? <Overview now={now} onOpen={onOpen} /> : null;
}

function Overview({ now, onOpen }: Props) {
  const { orders, stockOverrides } = useShop();
  const all = orders.all;
  const k = kpis(all, stockOverrides, now, text.days);
  const days = dailySales(all, now, text.days);
  const cards = [
    {
      title: text.kpis.today,
      value: yen(k.today.total),
      note: text.kpis.todayNote(k.today.count, yen(k.yesterday)),
    },
    { title: text.kpis.month, value: yen(k.month.total), note: text.kpis.count(k.month.count) },
    {
      title: text.kpis.last30,
      value: yen(k.recent.total),
      note: (
        <>
          <i className={k.change < 0 ? "dn" : undefined}>
            {k.change >= 0 ? "+" : ""}
            {k.change}%
          </i>
          {text.kpis.compare}
        </>
      ),
    },
    { title: text.kpis.average, value: yen(k.average), note: text.kpis.averageNote },
    {
      title: text.kpis.soldOut,
      value: text.kpis.sku(k.soldOut),
      note: (
        <Link className="underline-soft" to={{ hash: "stock" }}>
          {text.kpis.seeStock}
        </Link>
      ),
    },
  ];
  const todo = [
    {
      label: text.todo.received,
      count: all.filter((o) => o.status === orderStatus.received).length,
      hash: "orders",
    },
    {
      label: text.todo.preparing,
      count: all.filter((o) => o.status === orderStatus.preparing).length,
      hash: "orders",
    },
    {
      label: text.todo.awaitingPayment,
      count: all.filter((o) => o.pay === "cvs" && o.status === orderStatus.received).length,
      hash: "orders",
    },
    {
      label: text.todo.lowStock,
      count: lowStockCount(stockOverrides, adminPage.lowStock),
      hash: "stock",
    },
  ];
  return (
    <>
      <div className="kpis">
        {cards.map((card) => (
          <div key={card.title} className="kpi">
            <small>{card.title}</small>
            <b>{card.value}</b>
            <small>{card.note}</small>
          </div>
        ))}
      </div>
      <div className="two">
        <div className="pnl">
          <h2>
            {text.chartTitle}
            <span className="note">
              {text.chartTotal(yen(days.reduce((sum, d) => sum + d.total, 0)))}
            </span>
          </h2>
          <SalesChart days={days} />
        </div>
        <div className="pnl">
          <h2>{text.todoTitle}</h2>
          <table className="tb">
            <tbody>
              {todo.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td className="r">
                    <Link className="count" to={{ hash: row.hash }}>
                      {row.count}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="two">
        <div className="pnl">
          <h2>
            {text.recentTitle}
            <Link className="all" to={{ hash: "orders" }}>
              {text.all}
            </Link>
          </h2>
          <table className="tb">
            <thead>
              <tr>
                <th>{c.no}</th>
                <th>{c.at}</th>
                <th>{c.name}</th>
                <th className="r">{c.total}</th>
                <th>{c.status}</th>
              </tr>
            </thead>
            <tbody>
              {newestFirst(all)
                .slice(0, text.recentCount)
                .map((order) => (
                  <tr key={order.no}>
                    <td>
                      <button type="button" className="no" onClick={() => onOpen(order.no)}>
                        {order.no}
                      </button>
                    </td>
                    <td>{order.at.slice(5, 16).replace("T", " ").replace("-", "/")}</td>
                    <td>{order.name}</td>
                    <td className="r">{yen(order.total)}</td>
                    <td>
                      <StatusPill status={order.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pnl">
          <h2>{text.bestTitle}</h2>
          <table className="tb">
            <thead>
              <tr>
                <th>{c.product}</th>
                <th className="r">{c.qty}</th>
                <th className="r">{c.stock}</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers(k.recentOrders, text.bestCount).map((row) => (
                <tr key={row.id}>
                  <td>{row.product?.name ?? row.id}</td>
                  <td className="r">{row.qty}</td>
                  <td className="r">
                    {row.product ? productStock(stockOverrides, row.product) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
