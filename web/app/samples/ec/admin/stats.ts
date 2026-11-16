import { addDays, ymd } from "~/samples/shared/dates";
import { type Product, products } from "../content/catalog";
import { orderStatus } from "../content/orderStatus";
import { productById } from "../store/pricing";
import { type StockOverrides, stockOf } from "../store/stock";
import type { Order, User } from "../store/types";

const DAY_MS = 86_400_000;
const PERCENT = 100;

const dayOf = (iso: string) => iso.slice(0, 10);
const sumOf = (orders: Order[]) => orders.reduce((sum, order) => sum + order.total, 0);
const daysAgo = (now: Date, iso: string) => (now.getTime() - new Date(iso).getTime()) / DAY_MS;

export const liveOrders = (orders: Order[]) =>
  orders.filter((order) => order.status !== orderStatus.cancelled);

export const skus = (list: Product[] = products) =>
  list.flatMap((product) =>
    product.variants.flatMap((variant) =>
      product.sizes.map((size) => ({ product, variant, size })),
    ),
  );

export const kpis = (orders: Order[], overrides: StockOverrides, now: Date, days: number) => {
  const live = liveOrders(orders);
  const today = ymd(now);
  const yesterday = ymd(addDays(now, -1));
  const month = today.slice(0, 7);
  const todays = live.filter((order) => dayOf(order.at) === today);
  const monthly = live.filter((order) => order.at.slice(0, 7) === month);
  const recent = live.filter((order) => daysAgo(now, order.at) <= days);
  const previous = live.filter((order) => {
    const ago = daysAgo(now, order.at);
    return ago > days && ago <= days * 2;
  });
  const before = sumOf(previous);
  return {
    today: { total: sumOf(todays), count: todays.length },
    yesterday: sumOf(live.filter((order) => dayOf(order.at) === yesterday)),
    month: { total: sumOf(monthly), count: monthly.length },
    recent: { total: sumOf(recent), count: recent.length },
    change: before ? Math.round(((sumOf(recent) - before) / before) * PERCENT) : 0,
    average: recent.length ? sumOf(recent) / recent.length : 0,
    soldOut: skus().filter(
      (sku) => stockOf(overrides, sku.product.id, sku.variant.color, sku.size) === 0,
    ).length,
    recentOrders: recent,
  };
};

export const dailySales = (orders: Order[], now: Date, days: number) => {
  const live = liveOrders(orders);
  return Array.from({ length: days }, (_, i) => {
    const day = ymd(addDays(now, i - days + 1));
    return { day, total: sumOf(live.filter((order) => dayOf(order.at) === day)) };
  });
};

export const lowStockCount = (overrides: StockOverrides, limit: number) =>
  skus().filter((sku) => {
    const left = stockOf(overrides, sku.product.id, sku.variant.color, sku.size);
    return left > 0 && left <= limit;
  }).length;

export const bestSellers = (orders: Order[], count: number) => {
  const tally: Record<string, number> = {};
  for (const order of orders) {
    for (const item of order.items) tally[item.id] = (tally[item.id] ?? 0) + item.qty;
  }
  return Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([id, qty]) => ({ id, product: productById[id], qty }));
};

export const newestFirst = (orders: Order[]) =>
  [...orders].sort((a, b) => b.at.localeCompare(a.at));

export const customerRows = (users: Record<string, User>, orders: Order[]) =>
  Object.entries(users)
    .map(([email, user]) => {
      const mine = liveOrders(orders).filter((order) => order.email === email);
      return {
        email,
        user,
        count: mine.length,
        total: sumOf(mine),
        last: mine.length
          ? (mine
              .map((order) => order.at)
              .sort()
              .at(-1) ?? "")
          : "",
      };
    })
    .sort((a, b) => b.total - a.total);

const csvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

export const ordersCsv = (head: string[], rows: (string | number)[][]) =>
  `﻿${[head, ...rows].map((row) => row.map(csvCell).join(",")).join("\n")}`;

export const timeStamp = (iso: string) => iso.slice(0, 16).replace("T", " ");
