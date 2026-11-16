import { image } from "../assets";
import { salon } from "./salon";

export const home = {
  meta: {
    title: `${salon.name}｜中目黒の美容室`,
    description:
      "中目黒駅から徒歩4分、スタイリスト4名の小さな美容室。乾かすだけで形になる切り方を。WEB予約は24時間。",
  },
  navLabel: "メニュー",
  nav: [
    { href: "#concept", label: "考え" },
    { href: "#menu", label: "メニュー" },
    { href: "#stylists", label: "スタイリスト" },
    { href: "#gallery", label: "写真" },
    { href: "#shop", label: "店" },
  ],
  bookLabel: "WEB予約",
  hero: {
    label: "紹介",
    title: "髪型を決めるのは、流行じゃなくて、その人の毎日。",
    small: image("cut.jpg"),
    large: image("editorial.jpg"),
    meta: ["中目黒・徒歩4分", "火〜日 10:00–20:00", "スタイリスト4名"],
  },
  concept: {
    id: "concept",
    title: "「似合う」は、鏡の前だけで決めない。",
    paragraphs: [
      "中目黒駅から徒歩4分、スタイリスト4名の小さなサロンです。はじめに30分、暮らしの話を聞いてから切ります。朝のセットにかけられる時間、仕事の制約、結びたいかどうか。鏡の中で似合っていても、翌朝の洗面所で再現できなければ意味がないと思っています。",
      "だから、乾かすだけで形になる切り方を。カラーは、伸びてきたときの境目がきれいなものを。次に来るのが2か月後でも、3か月後でも、その間ずっと「いい感じ」でいられるように。",
    ],
    strip: [
      { image: image("interior.jpg"), caption: "店内・2F" },
      { image: image("cut.jpg"), caption: "ドライカット" },
      { image: image("scissors.jpg"), caption: "道具", focus: "86% 50%" },
    ],
  },
  menu: {
    id: "menu",
    title: "メニューと料金",
    columns: [
      [
        {
          title: "Cut",
          items: [
            { name: "カット", note: "カウンセリング30分・シャンプー・ブロー込み", price: "¥7,700" },
            { name: "前髪カット", price: "¥2,200" },
            { name: "学生カット", note: "高校生まで", price: "¥5,500" },
            { name: "メンズカット", note: "眉カット込み", price: "¥6,600" },
          ],
        },
        {
          title: "Perm",
          items: [
            { name: "パーマ", note: "カット別", price: "¥9,900" },
            { name: "縮毛矯正", note: "カット別・3時間", price: "¥19,800" },
          ],
        },
      ],
      [
        {
          title: "Color",
          items: [
            { name: "カラー", note: "リタッチ ¥6,600", price: "¥9,900" },
            { name: "ハイライト", note: "部分 ¥6,600〜", price: "¥13,200" },
            { name: "白髪ぼかし", note: "伸びても境目が出にくい配合", price: "¥11,000" },
          ],
        },
        {
          title: "Care",
          items: [
            { name: "トリートメント", note: "3種から", price: "¥4,400" },
            { name: "ヘッドスパ", note: "30分", price: "¥5,500" },
          ],
        },
      ],
    ],
    note: "すべて税込。指名料はありません。初回の方は、カットに30分のカウンセリングがつきます。施術の前に、必ず合計の金額をお伝えします。",
  },
  stylists: {
    id: "stylists",
    title: "スタイリスト",
    items: [
      {
        name: "宗 一樹",
        latin: "Kazuki So, owner",
        text: "ドライカットと白髪ぼかし。15年目。",
        image: image("stylist-owner.jpg"),
        focus: "50% 12%",
      },
      {
        name: "早川 りお",
        latin: "Rio Hayakawa",
        text: "ショートとボブ。乾かすだけで決まる形を。",
        image: image("portrait.jpg"),
      },
      {
        name: "田所 慎",
        latin: "Shin Tadokoro",
        text: "メンズとパーマ。ひげも整えます。",
        image: image("stylist-2.jpg"),
      },
      {
        name: "北村 芽衣",
        latin: "Mei Kitamura",
        text: "カラーとハイライト。透明感のある寒色。",
        image: image("color.jpg"),
      },
    ],
  },
  gallery: {
    id: "gallery",
    label: "写真",
    items: [
      { area: "g1", image: image("hero.jpg") },
      { area: "g2", image: image("wash.jpg") },
      { area: "g3", image: image("scissors.jpg"), focus: "86% 50%" },
      { area: "g4", image: image("interior-2.jpg") },
      { area: "g5", image: image("cut.jpg") },
      { area: "g6", image: image("editorial.jpg") },
    ],
  },
  shop: {
    id: "shop",
    hours: "10:00–20:00",
    days: "火〜日　／　月曜定休",
    rows: [
      { term: "住所", value: `${salon.address}（中目黒駅 正面口から徒歩4分）` },
      { term: "電話", value: salon.tel },
      { term: "席", value: "4席。個室はありません。お子さま連れは平日の午前にどうぞ。" },
      { term: "支払い", value: "現金、カード、交通系IC、PayPay" },
      { term: "予約", value: "WEBは24時間。当日は電話で。" },
    ],
    image: image("interior-2.jpg"),
    alt: "店内",
  },
  footer: `© ${salon.name}　｜　このページはポートフォリオ用の架空の店です。人物の写真はフリー素材（ぱくたそ・Unsplash・Pexels）のモデルで、本文の人物とは関係ありません。`,
};
