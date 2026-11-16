import { image } from "../assets";
import { store } from "./store";

export const itemPage = {
  title: (name: string) => `${name}｜${store.name}`,
  nav: [
    { href: `${store.paths.home}#pieces`, label: "うつわ" },
    { href: `${store.paths.home}#makers`, label: "作り手" },
    { href: `${store.paths.home}#care`, label: "手入れ" },
    { href: `${store.paths.home}#guide`, label: "ご案内" },
  ],
  navLabel: "メニュー",
  crumbLabel: "パンくずリスト",
  crumbSeparator: "　／　",
  piecesLabel: "うつわ",
  extraImages: [image("maker-hands.jpg"), image("hero.jpg")],
  thumbLabel: (n: number) => `写真 ${n}`,
  taxIncluded: "円（税込）",
  stock: (count: number) => (count <= 2 ? `残り ${count}点` : `在庫あり（${count}点）`),
  quantityLabel: "数量",
  decrease: "減らす",
  increase: "増やす",
  add: "かごに入れる",
  terms: { maker: "作り手", size: "寸法", weight: "重さ", delivery: "お届け" },
  delivery: "ご注文から3営業日以内に発送",
  carePrefix: "手入れ：",
  related: "ほかのうつわ",
  relatedCount: 5,
  notFound: {
    title: `見つかりません｜${store.name}`,
    text: "このうつわは見つかりませんでした。",
    back: "うつわの一覧へ",
  },
  legacy: { title: `うつわ｜${store.name}`, slug: "item/", lead: "うつわの一覧" },
};
