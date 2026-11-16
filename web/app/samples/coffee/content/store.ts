import { samplePath } from "~/samples/catalog";

const home = samplePath("coffee");

export const store = {
  name: "KUMO ROASTERY",
  paths: { home, beans: `${home}#beans`, checkout: `${home}checkout/` },
  cartKey: "kumo_cart",
  freeShippingFrom: 5000,
  shipping: 660,
  bagSize: "200g",
};

export const products = {
  eth: { name: "Ethiopia Guji", jp: "エチオピア グジ", price: 1480 },
  col: { name: "Colombia Huila", jp: "コロンビア ウイラ", price: 1380 },
  gua: { name: "Guatemala Antigua", jp: "グアテマラ アンティグア", price: 1280 },
  bra: { name: "Brazil Cerrado", jp: "ブラジル セラード", price: 1180 },
  kum: { name: "Kumo Blend", jp: "くもブレンド", price: 1280 },
  sum: { name: "Sumatra Mandheling", jp: "スマトラ マンデリン", price: 1380 },
};

export type ProductId = keyof typeof products;

export const isProductId = (value: string): value is ProductId => value in products;

export const yen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;
