import { products, shop } from "./catalog";
import { amount } from "./format";
import { paths } from "./paths";

const deepestCut = Math.max(
  ...products.flatMap((product) =>
    product.sale ? [Math.floor(((product.price - product.sale) * 100) / product.price)] : [],
  ),
);

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
  promisesLabel: "ご利用のご案内",
  hero: {
    heading: `${shop.name} 公式オンラインストア`,
    season: "2026 秋冬",
    link: "新作を見る",
    to: paths.list("new=1"),
    images: {
      left: { name: "look-2", alt: "白いニットにデニムを合わせた女性" },
      center: { name: "look-3", alt: "白いニットにダウンジャケットを持つ女性" },
      right: { name: "look-24", alt: "ピンクのシアーシャツに白いロングスカートの女性" },
    },
  },
  statement: [
    "毎日着る服だから、",
    "素材と縫製を、ひとつずつ選びました。",
    "日本の工場で仕立てた、長く着られる定番です。",
  ],
  sale: {
    title: `セール　対象アイテムが最大${deepestCut}%OFF`,
    link: "セールを見る",
    to: paths.list("sale=1"),
  },
  newTitle: { en: "New arrivals", jp: "新着" },
  railPrev: "前の商品へ",
  railNext: "次の商品へ",
  newCount: 8,
  seeAll: "すべて見る",
  categoriesTitle: { en: "Categories", jp: "カテゴリー" },
  categoryEn: {
    tops: "Tops",
    bottoms: "Bottoms",
    outer: "Outerwear",
    onepiece: "Dresses",
    acc: "Accessories",
    shoes: "Shoes",
  } as Record<string, string>,
  itemCount: (n: number) => `${n}点`,
  categoryImages: {
    tops: "om-knit-white",
    bottoms: "om-jeans-blue",
    outer: "om-down-black",
    onepiece: "om-dress-white",
    acc: "pk-tote-natural",
    shoes: "pk-sneaker-navy",
  } as Record<string, string>,
  rankingTitle: { en: "Ranking", jp: "ランキング" },
  rankingCount: 5,
  looksId: "looks",
  looksTitle: { en: "Lookbook", jp: "ルックブック" },
  looksLead: "ASAGIの服で組んだ、冬の着こなし。",
  member: {
    title: "会員登録で、初回10%OFF。",
    before: "登録のあと、レジでクーポンコード ",
    code: "WELCOME10",
    after: " を入れてください。注文履歴とお届け先の保存も使えます。",
    button: "会員登録（無料）",
  },
  newsTitle: { en: "News", jp: "お知らせ" },
};
