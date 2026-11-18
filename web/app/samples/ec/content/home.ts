import { looks, products, shop } from "./catalog";
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
    label: "特集",
    heading: `${shop.name} 公式オンラインストア`,
    slideLabel: (n: number, total: number) => `${total}枚中${n}枚目`,
    tab: (n: number) => `${n}枚目を表示`,
    pause: "スライドを止める",
    play: "スライドを再生",
    slides: [
      {
        id: "new",
        title: "2026 秋冬　ニットとダウンが入荷しました。",
        link: "新着をすべて見る",
        to: paths.list("new=1"),
        images: [
          { name: "look-3", alt: "白いニットにダウンジャケットを持つ女性" },
          { name: "look-25", alt: "黒いダウンジャケットを羽織った女性" },
        ],
      },
      {
        id: "looks",
        title: `ルックブック　冬の着こなしを${looks.length}つ。`,
        link: "ルックを見る",
        to: paths.looks,
        images: [
          { name: "look-8", alt: "ボルドーのニットに黒いプリーツスカートの女性" },
          { name: "look-24", alt: "ピンクのシアーシャツに白いロングスカートの女性" },
        ],
      },
      {
        id: "sale",
        title: `セール　対象アイテムが最大${deepestCut}%OFF。`,
        link: "セールを見る",
        to: paths.list("sale=1"),
        images: [
          { name: "look-10", alt: "赤いケーブルニットにネイビーのコートを持つ女性" },
          {
            name: "om-cable-red-d",
            alt: "赤いケーブルニットにチェックのスカートを合わせた着こなし",
          },
        ],
      },
    ],
  },
  newTitle: "新着",
  railPrev: "前の商品へ",
  railNext: "次の商品へ",
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
