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
    heading: `${shop.name} 公式オンラインストア`,
    label: "特集",
    slideLabel: (n: number, total: number) => `${total}枚中${n}枚目`,
    tab: (n: number) => `${n}枚目を表示`,
    pause: "スライドを止める",
    play: "スライドを再生",
    slides: [
      {
        id: "new",
        eyebrow: "2026 秋冬",
        title: "ニットとダウン",
        link: "新作を見る",
        to: paths.list("new=1"),
        images: [
          { name: "look-2", alt: "白いニットにデニムを合わせた女性", tone: "mist" },
          { name: "look-25", alt: "黒いダウンジャケットを羽織った女性", tone: "stone" },
        ],
      },
      {
        id: "looks",
        eyebrow: "ルックブック",
        title: `冬の着こなしを${looks.length}つ`,
        link: "ルックを見る",
        to: paths.looks,
        images: [
          { name: "look-8", alt: "ボルドーのニットに黒いプリーツスカートの女性", tone: "sand" },
          { name: "look-24", alt: "ピンクのシアーシャツに白いロングスカートの女性", tone: "mist" },
        ],
      },
      {
        id: "sale",
        eyebrow: "セール",
        title: `対象アイテムが最大${deepestCut}%OFF`,
        link: "セールを見る",
        to: paths.list("sale=1"),
        images: [
          { name: "look-10", alt: "赤いケーブルニットにネイビーのコートを持つ女性", tone: "stone" },
          {
            name: "om-cable-red-d",
            alt: "赤いケーブルニットにチェックのスカートを合わせた着こなし",
            tone: "fog",
          },
        ],
      },
    ],
  },
  intro: {
    title: shop.tagline,
    lines: [
      "毎日着る服だから、素材と縫製をひとつずつ選びました。",
      "日本の工場で仕立てた、長く着られる定番です。",
    ],
    link: "すべての商品を見る",
    to: paths.list(),
  },
  duo: [
    { id: "outer", label: "アウター", image: "om-down-black-d", tone: "stone" },
    { id: "tops", label: "ニット・トップス", image: "om-knit-white-d", tone: "mist" },
  ],
  basicsTitle: "毎日の定番",
  basics: [
    { id: "bottoms", label: "ボトムス", image: "om-jeans-blue", tone: "fog" },
    { id: "onepiece", label: "ワンピース", image: "om-dress-white", tone: "sand" },
    { id: "acc", label: "バッグ・小物", image: "pk-tote-natural", tone: "mist" },
    { id: "shoes", label: "シューズ", image: "pk-sneaker-navy", tone: "stone" },
  ],
  looksBand: {
    eyebrow: "ルックブック",
    title: "ASAGIの服で組んだ、冬の着こなし",
    hint: "写真を押すと、その着こなしの服を見られます。",
  },
  lookTones: ["mist", "stone", "sand", "fog"],
  newTitle: "新着",
  railPrev: "前の商品へ",
  railNext: "次の商品へ",
  newCount: 8,
  seeAll: "すべて見る",
  rankingTitle: "よく選ばれている服",
  rankingCount: 5,
  looksId: "looks",
  member: {
    title: "会員登録で、初回10%OFF。",
    before: "登録のあと、レジでクーポンコード ",
    code: "WELCOME10",
    after: " を入れてください。注文履歴とお届け先の保存も使えます。",
    button: "会員登録（無料）",
  },
  newsTitle: "お知らせ",
};
