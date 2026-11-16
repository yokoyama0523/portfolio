import { image } from "../assets";
import { type ItemId, store } from "./store";

const nav = [
  { href: "#pieces", label: "うつわ" },
  { href: "#makers", label: "作り手" },
  { href: "#care", label: "手入れ" },
  { href: "#gift", label: "贈りもの" },
  { href: "#guide", label: "ご案内" },
];

export const home = {
  meta: {
    title: `${store.name}｜うつわの店`,
    description:
      "日々つかううつわを、作り手の工房からひとつずつ検品してお届けします。冬の企画展「湯呑と急須」11月20日より。",
  },
  navLabel: "メニュー",
  nav,
  hero: {
    label: "紹介",
    image: image("hero.jpg"),
    alt: "積まれた器",
    title: ["土と火が、", "かたちになる。"],
    latin: "TSUCHI TO HI",
    copy: "日々つかううつわを、作り手の工房からひとつずつ検品して、お届けしています。同じ釉薬でも、ひとつとして同じ表情のものはありません。",
    exhibition: "冬の企画展「湯呑と急須」",
    exhibitionDate: "十一月二十日より",
  },
  pieces: {
    id: "pieces",
    title: "新しく届いたうつわ",
    text: "毎週金曜に、工房から届いたものを並べます。一点ものは売り切れ次第、終了です。",
    order: ["hakuji", "seiji", "kohiki", "kaiyu", "kyusu", "yunomi"] as ItemId[],
    alts: { yunomi: "白釉の湯呑と匙" } as Partial<Record<ItemId, string>>,
    terms: { maker: "作り手", size: "寸法", weight: "重さ" },
    taxIncluded: "円（税込）",
    remaining: (count: number) => `残り ${count}`,
    add: "かごに入れる",
  },
  makers: {
    id: "makers",
    title: "作り手",
    text: "土を掘るところから自分でやる人も、釉薬だけを何年も研究している人もいます。それぞれの工房を、年に二度たずねています。",
    items: [
      {
        name: "小野 晴子",
        place: "佐賀・有田",
        text: "有田の磁土で、薄くて軽い日用の器を。ろくろの速さが速く、一日に百個の碗を挽きます。",
        image: image("maker-throw.jpg"),
      },
      {
        name: "三谷工房",
        place: "岐阜・多治見",
        text: "夫婦ふたりの工房。青磁と白釉を中心に、食卓で重ねられる形を考えています。",
        image: image("maker-hands.jpg"),
      },
      {
        name: "宮下 玄",
        place: "長野・松本",
        text: "薪窯で年に四回焼きます。灰釉と朱泥。釉の流れをそのまま残す人です。",
        image: image("maker-vase.jpg"),
      },
    ],
  },
  care: {
    id: "care",
    title: "うつわの手入れ",
    items: [
      {
        term: "使いはじめ",
        text: "粉引・貫入のある器は、使う前に水に十分ほど浸けると、染みが入りにくくなります。",
      },
      {
        term: "洗う",
        text: "やわらかいスポンジと中性洗剤で。食洗機は、磁器は可、陶器は手洗いをおすすめします。",
      },
      { term: "しまう", text: "よく乾かしてから。湿ったまま重ねるとカビの原因になります。" },
      { term: "欠けたら", text: "金継ぎの職人を紹介します。送料とあわせて、目安は五千円から。" },
    ],
  },
  gift: {
    id: "gift",
    image: image("gift-vases.jpg"),
    title: ["贈りものには、", "桐の箱と、作り手の手紙を。"],
    text: "器は、作り手の名前と工房の場所を記した手紙を添えて、桐箱に入れてお送りします。のし・名入れもできます。箱代は一律 880円。",
    button: "贈りものとして注文する",
  },
  guide: {
    id: "guide",
    title: "ご案内",
    rows: [
      { term: "送料", value: "全国一律 770円。11,000円以上で無料。" },
      { term: "発送", value: "ご注文から3営業日以内。器は一点ずつ、紙で包んで送ります。" },
      {
        term: "返品",
        value:
          "到着から7日以内、未使用のものに限ります。割れていた場合は写真をお送りください。すぐにお取り替えします。",
      },
      { term: "支払い", value: "クレジットカード、コンビニ払い、銀行振込。" },
      { term: "店", value: "東京都目黒区青葉台 2-9-4　金・土・日 12:00〜18:00" },
    ],
  },
  footer: {
    navLabel: "フッター",
    copy: `${store.copyright}　｜　このページはポートフォリオ用の架空の店です。`,
  },
  cart: {
    label: "かご",
    open: (count: number) => `かご（${count}）`,
    title: "かご",
    close: "閉じる",
    empty: "かごは空です。",
    decrease: "減らす",
    increase: "増やす",
    subtotal: "小計",
    shipping: "送料",
    free: "無料",
    total: "合計（税込）",
    note: "送料は全国一律 770円。11,000円以上で無料。器は一点ずつ紙で包みます。",
    checkout: "ご購入手続きへ",
    added: (name: string) => `${name} をかごに入れました`,
  },
};
