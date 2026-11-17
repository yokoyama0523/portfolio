import { image } from "../assets";
import { clinic } from "./clinic";

export const latestNewsCount = 3;

export const newsPage = {
  meta: {
    title: `お知らせ｜${clinic.name}`,
    slug: "news/",
    description: "まどべ歯科のお知らせ。休診日、予約、診療のお知らせです。",
  },
  title: "お知らせ",
  lead: ["休診日や、予約・診療についてのお知らせです。"],
  image: image("window.jpg"),
  alt: "診療室の窓をあける歯科衛生士",
  filterLabel: "お知らせの種類",
  all: "すべて",
  pageSize: 10,
  empty: "この種類のお知らせは、いまはありません。",
  pager: { label: "ページ", prev: "前へ", next: "次へ", page: (n: number) => `${n}ページ` },
};

export const newsPostPage = {
  meta: (title: string) => ({ title: `${title}｜お知らせ｜${clinic.name}` }),
  newer: "新しいお知らせ",
  older: "以前のお知らせ",
  back: "お知らせの一覧へ",
  notFound: {
    crumb: "見つかりません",
    text: "このお知らせは見つかりませんでした。",
    lead: "削除されたか、まだ公開されていない可能性があります。",
  },
};
