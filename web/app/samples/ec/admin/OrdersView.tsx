import { useState } from "react";
import { adminPage } from "../content/admin";
import { orderStatus, orderStatuses } from "../content/orderStatus";
import { productById, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import type { Order, Payment } from "../store/types";
import { useToast } from "../ui/ToastContext";
import { CommitInput } from "./CommitInput";
import { newestFirst, ordersCsv, timeStamp } from "./stats";

const text = adminPage.orders;
const payments = Object.keys(text.payNames) as Payment[];

const download = (name: string, content: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
};

const csvRow = (order: Order) => [
  order.no,
  order.at,
  order.name,
  order.email,
  order.total,
  adminPage.payShort[order.pay],
  order.status,
  order.tracking,
  order.items
    .map(
      (item) => `${productById[item.id]?.name ?? item.id} ${item.color}/${item.size}×${item.qty}`,
    )
    .join("; "),
];

export function OrdersView({ onOpen }: { onOpen: (no: string) => void }) {
  const { orders } = useShop();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [pay, setPay] = useState("");
  const keyword = query.toLowerCase();
  const shown = newestFirst(orders.all).filter(
    (order) =>
      (!status || order.status === status) &&
      (!pay || order.pay === pay) &&
      (!keyword || `${order.no}${order.name}${order.email}`.toLowerCase().includes(keyword)),
  );

  const changeStatus = (order: Order, next: string) => {
    if (next === orderStatus.cancelled && order.status !== orderStatus.cancelled)
      orders.cancel(order.no);
    else orders.update(order.no, { status: next });
    toast(text.statusChanged(order.no, next));
  };

  return (
    <>
      <div className="tools">
        <input
          type="search"
          placeholder={text.search}
          aria-label={text.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          aria-label={text.allStatuses}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">{text.allStatuses}</option>
          {orderStatuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          aria-label={text.allPayments}
          value={pay}
          onChange={(event) => setPay(event.target.value)}
        >
          <option value="">{text.allPayments}</option>
          {payments.map((item) => (
            <option key={item} value={item}>
              {text.payNames[item]}
            </option>
          ))}
        </select>
        <span className="note">{text.count(shown.length)}</span>
        <button
          type="button"
          className="btn g sm push"
          onClick={() => download(text.csvName, ordersCsv(text.csvHead, orders.all.map(csvRow)))}
        >
          {text.csv}
        </button>
      </div>
      <div className="pnl">
        <table className="tb">
          <thead>
            <tr>
              {text.columns.map((column) => (
                <th key={column.label} className={"right" in column ? "r" : undefined}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((order) => (
              <tr key={order.no}>
                <td>
                  <button
                    type="button"
                    className="no underline-soft"
                    onClick={() => onOpen(order.no)}
                  >
                    {order.no}
                  </button>
                </td>
                <td>{timeStamp(order.at).replace(/-/g, "/")}</td>
                <td>{order.name}</td>
                <td>{order.items.reduce((sum, item) => sum + item.qty, 0)}</td>
                <td className="r">{yen(order.total)}</td>
                <td>{adminPage.payShort[order.pay]}</td>
                <td>
                  <select
                    aria-label={text.statusLabel}
                    value={order.status}
                    onChange={(event) => changeStatus(order, event.target.value)}
                  >
                    {orderStatuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <CommitInput
                    key={`${order.no}-${order.tracking}`}
                    type="text"
                    className="tracking"
                    aria-label={text.trackingPlaceholder}
                    defaultValue={order.tracking}
                    placeholder={text.trackingPlaceholder}
                    onCommit={(value) => {
                      orders.update(order.no, { tracking: value.trim() });
                      toast(text.trackingSaved);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
