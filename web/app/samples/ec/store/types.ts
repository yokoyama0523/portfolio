import type { Coupon } from "../content/catalog";

export type CartLine = { id: string; color: string; size: string; qty: number };

export type Address = {
  name: string;
  kana: string;
  zip: string;
  pref: string;
  addr1: string;
  addr2: string;
  tel: string;
  main?: boolean;
};

export type User = {
  pw: string;
  name: string;
  kana: string;
  tel: string;
  since: string;
  addresses: Address[];
};

export type OrderItem = { id: string; color: string; size: string; qty: number; price: number };

export type Payment = "card" | "cvs" | "cod";

export type Order = {
  no: string;
  at: string;
  status: string;
  email: string;
  name: string;
  items: OrderItem[];
  sub: number;
  discount: number;
  ship: number;
  cod: number;
  gift: number;
  total: number;
  coupon?: string;
  pay: Payment;
  addr: Omit<Address, "kana" | "main">;
  delivery: { date: string; time: string };
  tracking: string;
};

export type Settings = {
  shipping: number;
  freeShippingFrom: number;
  coupons: Record<string, Coupon>;
};

export type Totals = {
  sub: number;
  discount: number;
  ship: number;
  cod: number;
  gift: number;
  total: number;
  code: string;
};
