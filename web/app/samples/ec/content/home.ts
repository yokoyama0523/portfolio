import { shop } from "./catalog";
import { amount } from "./format";

export const home = {
  meta: {
    title: `${shop.name}｜${shop.tagline}`,
    description: `${shop.name} 公式オンラインストア。日本製の定番の服と小物。${amount(shop.freeShippingFrom)}以上で送料無料。`,
  },
  promises: [
    `${amount(shop.freeShippingFrom)}以上で送料無料`,
    "15時までのご注文は当日発送",
    "返品・交換は到着後14日以内",
  ],
  hero: {
    label: "新作",
    images: [
      { name: "look-3", alt: "白いニットにダウンジャケットを持つ女性" },
      { name: "look-25", alt: "黒いダウンジャケットを羽織った女性" },
    ],
    title: "2026 秋冬　ニットとダウンが入荷しました。",
    link: "新着をすべて見る",
  },
  newTitle: "新着",
  newCount: 8,
  seeAll: "すべて見る",
  categoriesTitle: "カテゴリー",
  categoryImages: {
    tops: "om-knit-white",
    bottoms: "om-jeans-blue",
    outer: "om-down-black",
    onepiece: "om-dress-white",
    acc: "pk-tote-natural",
    shoes: "pk-sneaker-navy",
  } as Record<string, string>,
  rankingTitle: "ランキング",
  rankingCount: 5,
  looksId: "looks",
  looksTitle: "ルックブック",
  member: {
    title: "会員登録で、初回10%OFF。",
    before: "登録のあと、レジでクーポンコード ",
    code: "WELCOME10",
    after: " を入れてください。注文履歴とお届け先の保存も使えます。",
    button: "会員登録（無料）",
  },
  newsTitle: "お知らせ",
};
