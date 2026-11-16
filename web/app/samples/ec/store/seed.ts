import { ymd } from "~/samples/shared/dates";
import { demoAccount, products, shop } from "../content/catalog";
import { orderStatus } from "../content/orderStatus";
import { priceOf } from "./pricing";
import type { Order, Payment, User } from "./types";

const customers: [string, string][] = [
  ["田中 健", "tanaka@example.com"],
  ["鈴木 美咲", "suzuki@example.com"],
  ["高橋 蓮", "takahashi@example.com"],
  ["伊藤 さくら", "ito@example.com"],
  ["渡辺 大輔", "watanabe@example.com"],
  ["山本 結衣", "yamamoto@example.com"],
  ["中村 悠真", "nakamura@example.com"],
  ["小林 陽菜", "kobayashi@example.com"],
  ["加藤 翔", "kato@example.com"],
  ["吉田 美月", "yoshida@example.com"],
];

const SEED_DAYS = 45;
const payments: Payment[] = ["card", "cvs", "cod"];
const shopAddress = {
  zip: "150-0001",
  pref: "東京都",
  addr1: "渋谷区神宮前 3-12-8",
  addr2: "",
  tel: "090-0000-0000",
};

export const seedUsers = (): Record<string, User> => {
  const users: Record<string, User> = {
    [demoAccount.email]: {
      pw: demoAccount.password,
      name: demoAccount.name,
      kana: demoAccount.kana,
      tel: "090-1234-5678",
      since: "2025-04-12",
      addresses: [
        {
          name: demoAccount.name,
          kana: demoAccount.kana,
          zip: "150-0001",
          pref: "東京都",
          addr1: "渋谷区神宮前 3-12-8",
          addr2: "レジデンス神宮前 402",
          tel: "090-1234-5678",
          main: true,
        },
        {
          name: demoAccount.name,
          kana: demoAccount.kana,
          zip: "390-0811",
          pref: "長野県",
          addr1: "松本市中央 2-4-1",
          addr2: "",
          tel: "0263-12-3456",
          main: false,
        },
      ],
    },
  };
  for (const [name, email] of customers) {
    users[email] = {
      pw: demoAccount.password,
      name,
      kana: "",
      tel: "",
      since: `2025-0${1 + (name.length % 9)}-10`,
      addresses: [],
    };
  }
  return users;
};

const statusFor = (day: number) =>
  day > 7
    ? orderStatus.done
    : day > 3
      ? orderStatus.shipped
      : day > 1
        ? orderStatus.preparing
        : orderStatus.received;

export const seedOrders = (today: Date): Order[] => {
  const orders: Order[] = [];
  let seq = 1;
  const pick = (i: number) => products[(i * 7) % products.length];
  for (let day = SEED_DAYS; day >= 1; day--) {
    const count = ((day * 13) % 4) + (day % 5 === 0 ? 2 : 0);
    for (let k = 0; k < count; k++) {
      const at = new Date(today);
      at.setDate(today.getDate() - day);
      at.setHours(9 + ((k * 5) % 12), (day * 7) % 60);
      const [name, email] =
        (day + k) % 9 === 0
          ? [demoAccount.name, demoAccount.email]
          : customers[(day * 3 + k) % customers.length];
      const items = Array.from({ length: 1 + ((day + k) % 3) }, (_, j) => {
        const product = pick(day + k + j * 5);
        const variant = product.variants[(day + j) % product.variants.length];
        return {
          id: product.id,
          color: variant.color,
          size: product.sizes[(k + j) % product.sizes.length],
          qty: 1 + ((day + j) % 2),
          price: priceOf(product),
        };
      });
      const sub = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const ship = sub >= shop.freeShippingFrom ? 0 : shop.shipping;
      orders.push({
        no: `AS-${ymd(at).replace(/-/g, "")}-${String(1000 + seq++).slice(-4)}`,
        at: at.toISOString(),
        status: statusFor(day),
        email,
        name,
        items,
        sub,
        discount: 0,
        ship,
        cod: 0,
        gift: 0,
        total: sub + ship,
        pay: payments[(day + k) % payments.length],
        addr: { name, ...shopAddress },
        delivery: { date: "指定なし", time: "指定なし" },
        tracking: day <= 7 && day > 1 ? `YM${String(1000000000 + day * 7919).slice(-10)}` : "",
      });
    }
  }
  return orders;
};
